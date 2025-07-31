import { z } from 'zod';

export const InvoiceGenerationSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
});
