import { OpenRouterService } from '../../open-router/service/open-router-service';
import { InvoiceData } from '../validations/schemas';

export class InvoiceService {
  constructor(private readonly openRouterService: OpenRouterService) {}

  async createInvoice(invoiceData: InvoiceData): Promise<any> {
    return this.openRouterService.createInvoice(invoiceData);
  }
}
