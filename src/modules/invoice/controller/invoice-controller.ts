import { NextFunction, Request, Response } from 'express';
import { InvoiceService } from '../service/invoice-service';
import { InvoiceData } from '../validations/schemas';

export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  async generateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceData: InvoiceData = req.body;
      const invoice = await this.invoiceService.createInvoice(invoiceData);
      res.status(201).json(invoice);
    } catch (error) {
      console.error('Error generating invoice:', error);
      next(error);
    }
  }
}
