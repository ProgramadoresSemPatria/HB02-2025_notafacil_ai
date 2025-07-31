import { OpenRouterService } from '../../open-router/service/open-router-service';

export class InvoiceService {
  constructor(private readonly openRouterService: OpenRouterService) {}

  async createInvoice(invoiceData: any): Promise<any> {
    return this.openRouterService.createInvoice(invoiceData);
  }
}
