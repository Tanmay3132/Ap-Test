import { CdmaModel } from '@/models/cdma.modet';
import { RevenueModel } from '@/models/revenue.modet';
import { Service } from 'typedi';

@Service()
export class ReportService {
  private cdmaModel = CdmaModel;

  private revenueModel = RevenueModel;

  public async fetchRevenueReports(): Promise<any> {
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    const paymentsReports = await this.revenueModel
      .find({
        createdate: { $gte: twoHoursAgo, $lte: new Date() },
      })
      .lean()
      .select('amount servicename transactionid merchantid orderid reference_id payment_status order_send_msg_id -_id');

    return paymentsReports;
  }
}
