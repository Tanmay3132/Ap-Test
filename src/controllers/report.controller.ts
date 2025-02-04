import { HttpException } from '@/exceptions/httpException';
import { Payment } from '@/interfaces/payment.interface';
import { ReportService } from '@/services/report.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class ReportController {
  public report = Container.get(ReportService);

  public getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: Payment[] = await this.report.findAllUser();
      if (findAllUsersData && findAllUsersData.length > 0) {
        res.status(200).json({ data: findAllUsersData, message: 'findAll' });
      }
      throw new HttpException(400, 'Unable to get logs.');
    } catch (error) {
      next(error);
    }
  };
}
