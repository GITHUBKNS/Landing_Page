import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/validation';

describe('contact schema', () => {
  it('accepts valid payload', () => {
    const parsed = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello, I would like to discuss your consulting availability.',
      company: ''
    });

    expect(parsed.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const parsed = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'not-email',
      message: 'Hello world hello world',
      company: ''
    });

    expect(parsed.success).toBe(false);
  });
});
