export interface ICdma {
  _id?: string;
  consumerid: string;
  ulbcode: string;
  service_code: string;
  rurl: string;
  dept_code: string;
  dept_transaction_id: string;
  amount: string;
  mobile: string;
  email: string;
  heading_msg: string;
  body_message: string;
  image_link: string;
  others: {};
  tr_billfetch_response: {};
  tr_create_response: {};
  tr_payment_response: string;
  msg_payload: {};
  msg_wid: string;
  trans_status: string;
  callback_url: string;
  is_payment_status: string;
  created_date: string;
}

export interface IRevenue {
  _id?: string;
  amount: number;
  servicename: string;
  transactionid: string;
  message_body: string;
  transactionid_payment: string;
  mobileno: string;
  wabanumber: string;
  metadata: {};
  merchantid: string;
  orderid: string;
  reference_id: string;
  response_payload: string;
  payment_status: string;
  order_send_msg_id: string;
  refund_status: any;
  status_msg_id: string;
  is_msg_sent: boolean;
}
