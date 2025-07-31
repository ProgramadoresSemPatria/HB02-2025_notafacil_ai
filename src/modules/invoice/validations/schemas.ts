import { z } from 'zod';

export const InvoiceDataSchema = z.object({
  municipal_registration: z.object({
    certificate_file: z.string().min(1, 'Certificate file is required'),
  }),
  password: z.string().min(1, 'Password is required'),
  issue_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Issue date must be in YYYY-MM-DD format'),
  service_receiver_cnpj: z.object({
    value: z
      .string()
      .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Invalid CNPJ format'),
    format: z.literal('CNPJ'),
  }),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  service_tax_code: z.string().min(1, 'Service tax code is required'),
  cnae: z.string().min(1, 'CNAE is required'),
  service_description: z.string().min(1, 'Service description is required'),
  tax_situation_code: z.string().min(1, 'Tax situation code is required'),
  unit_price: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, 'Unit price must be a valid decimal number'),
  quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid number'),
  general_information: z.string().optional(),
});

export type InvoiceData = z.infer<typeof InvoiceDataSchema>;
