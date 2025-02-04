import { IRevenue } from '@/interfaces/payment.interface';
import { Document, model, Schema } from 'mongoose';

const RevenueSchema: Schema = new Schema({
  amount: {
    type: Number,
    required: false,
  },
  servicename: {
    type: String,
    required: true,
  },
  transactionid: {
    type: String,
    required: true,
  },
  message_body: {
    type: String,
    required: true,
  },
  transactionid_payment: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    required: true,
  },
  wabanumber: {
    type: String,
    required: true,
  },
  metadata: {
    type: Object,
  },
  merchantid: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  reference_id: {
    type: String,
    required: true,
  },
  response_payload: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  order_send_msg_id: {
    type: String,
    required: true,
  },
  refund_status: {
    type: Schema.Types.Mixed,
    required: true,
  },
  status_msg_id: {
    type: String,
    required: true,
  },
  is_msg_sent: {
    type: Boolean,
    required: true,
  },
  createdate: {
    type: Date,
    required: false,
  },
});

export const RevenueModel = model<IRevenue & Document>('apgovtuseramountdetails', RevenueSchema, 'apgovtuseramountdetails');
