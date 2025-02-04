import { ICdma } from '@/interfaces/payment.interface';
import { Document, model, Schema } from 'mongoose';

const CdmaSchema: Schema = new Schema(
  {
    consumerid: {
      type: String,
      required: false,
    },
    ulbcode: {
      type: String,
      required: false,
    },
    service_code: {
      type: String,
      required: false,
    },
    rurl: {
      type: String,
      required: false,
    },
    dept_code: {
      type: String,
      required: false,
    },
    dept_transaction_id: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    heading_msg: {
      type: String,
      required: false,
    },
    body_message: {
      type: String,
      required: false,
    },
    image_link: {
      type: String,
      required: false,
    },
    others: {
      type: Object,
      required: false,
    },
    tr_billfetch_response: {
      type: Object,
      required: false,
    },
    tr_create_response: {
      type: Object,
      required: false,
    },
    tr_payment_response: {
      type: String,
      required: false,
    },
    msg_payload: {
      type: Object,
      required: false,
    },
    msg_wid: {
      type: String,
      required: false,
    },
    trans_status: {
      type: String,
      required: false,
    },
    callback_url: {
      type: String,
      required: false,
    },
    is_payment_status: {
      type: String,
      required: false,
    },
    created_date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const CdmaModel = model<ICdma & Document>('cdma_cfms_ap_gov_schemas', CdmaSchema, 'cdma_cfms_ap_gov_schemas');
