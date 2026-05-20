import { z } from 'zod';

export const applicationSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă minim 2 caractere').max(100, 'Numele este prea lung'),
  email: z.string().email('Adresa de email nu este validă'),
  phone: z.string().min(6, 'Minim 6 cifre').max(20, 'Telefonul este prea lung').optional(),
  website: z.string().optional(),
  sales: z.string().min(1, 'Completează vânzările lunare'),
  budget: z.string().min(1, 'Completează bugetul de reclame'),
  message: z.string().max(2000, 'Mesajul este prea lung').optional(),
  honeypot: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
