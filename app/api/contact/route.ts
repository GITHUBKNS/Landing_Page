import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validation';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  if (resend && process.env.CONTACT_TO_EMAIL) {
    await resend.emails.send({
      from: 'Portfolio <no-reply@example.com>',
      to: [process.env.CONTACT_TO_EMAIL],
      subject: `Portfolio contact from ${parsed.data.name}`,
      text: `${parsed.data.message}\n\nSender: ${parsed.data.email}`
    });
  }

  return NextResponse.json({ ok: true });
}
