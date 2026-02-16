import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  company: z.string().max(0).optional().default('')
});
