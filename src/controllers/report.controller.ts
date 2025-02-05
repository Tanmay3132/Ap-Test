import { ReportService } from '@/services/report.service';
import { logger } from '@/utils/logger';
import { NextFunction, query, Request, Response } from 'express';

export class ReportController {
  private reportService = new ReportService();

  public getReport = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestLog = {
        body: request.body,
        query: request.query,
        params: request.params,
      };
      logger.info(JSON.stringify(requestLog));
      const revenueReports = await this.reportService.fetchRevenueReports();

      const reponseLogger = {
        documentCount: revenueReports.length,
      };
      logger.info(JSON.stringify(reponseLogger));

      return response.status(200).send({ status: 'SUCCESS', message: 'Revenue reports successfully fetched', data: revenueReports });
    } catch (error) {
      next(error);
    }
  };
}
