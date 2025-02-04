import { ReportController } from '@/controllers/report.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class ReportRoute implements Routes {
  public path = '/report';
  public router = Router();
  public report = new ReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.report.getReport);
  }
}
