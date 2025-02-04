import { Payment } from '@/interfaces/payment.interface';
import { PaymentModel } from '@/models/payment.model';
import { User } from '@interfaces/users.interface';
import { Service } from 'typedi';

@Service()
export class ReportService {
  //   public paymentModel = new PaymentModel();
  public async findAllUser(): Promise<User[]> {
    const paymentReport: Payment[] = await PaymentModel.find();
    return paymentReport;
  }
}
