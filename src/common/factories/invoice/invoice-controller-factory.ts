import { InvoiceController } from '../../../modules/invoice/controller/invoice-controller';
import { InvoiceService } from '../../../modules/invoice/service/invoice-service';
import { OpenRouterService } from '../../../modules/open-router/service/open-router-service';

export const makeInvoiceController = (): InvoiceController => {
  const openRouterService = new OpenRouterService();
  const invoiceService = new InvoiceService(openRouterService);
  return new InvoiceController(invoiceService);
};
