import { NextFunction, Request, Response } from 'express';
import { InvoiceService } from '../service/invoice-service';

export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  async generateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceData = req.body;
      const invoice = await this.invoiceService.createInvoice(invoiceData);
      res.status(201).json(invoice);
    } catch (error) {
      console.error('Error generating invoice:', error);
      next(error);
    }
  }
}
