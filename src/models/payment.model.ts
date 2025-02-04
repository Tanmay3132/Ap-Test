import { Payment } from '@/interfaces/payment.interface';
import { Document, model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const PaymentModel = model<Payment & Document>('User', UserSchema);
