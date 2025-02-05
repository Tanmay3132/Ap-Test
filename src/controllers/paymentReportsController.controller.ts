import { HttpException } from '@/exceptions/HttpException';
import { IPaymentReport } from '@/interfaces/paymentReports.interface';
import PaymentReportsService from '@/services/paymentReportsService';
import { NextFunction, Request, Response } from 'express';

export class PaymentReportsController {
  private paymentReportsService = new PaymentReportsService();
  public getReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const department = req.query.department ? String(req.query.department) :null;
      const serviceName = req.query.service ? String(req.query.service) : null;
      const status = req.query.status ? String(req.query.status).toLowerCase() : null;
      const startTime = req.query.startTime ? String(req.query.startTime) : '';
      const endTime = req.query.endTime ? String(req.query.endTime) : '';

      if (!department || !['revenue', 'cdma'].includes(department)) {
        throw new HttpException(404, 'Invalid department!. Please send the valid department');
      };

      if(status && !['success', 'failed', 'pending'].includes(status)){
        throw new HttpException(404, 'Invalid Status!. Please send the valid status.')
      }

      const paymentReports : IPaymentReport[] = await this.paymentReportsService.getPaymentReports({department, serviceName, status ,startTime,endTime});

      return res.status(200).json({paymentReports, status:'success'});
    
    } catch (error) {
      next(error);
    }
  };
}
