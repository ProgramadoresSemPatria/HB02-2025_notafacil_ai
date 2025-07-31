import { Router } from 'express';
import { validate } from '../../../common/middlewares/validation-middleware';
import { makeInvoiceController } from '../../../common/factories/invoice/invoice-controller-factory';
import { InvoiceGenerationSchema } from '../validations/schemas';

const invoiceController = makeInvoiceController();

export default (router: Router): void => {
  router.post(
    '/invoice/generate',
    validate(InvoiceGenerationSchema),
    (req, res, next) => invoiceController.generateInvoice(req, res, next)
  );
};
