import { ReportService } from '@/services/report.service';
import { NextFunction, Request, Response } from 'express';

export class ReportController {
  private reportService = new ReportService();

  public getReport = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const revenueReports = await this.reportService.fetchRevenueReports();

      return response.status(200).send({ status: 'SUCCESS', message: 'Revenue reports successfully fetched', data: revenueReports });
    } catch (error) {
      next(error);
    }
  };
}
