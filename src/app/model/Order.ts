export interface PlaceOrderRequest{
  reference: string,
  totalPrice: number,
  customerId: number,
  status: Status,
  paymentMethod: PaymentMethod,
  paymentStatus: PaymentStatus,
  shippingFee: number,
  shippingAddress: string,
  note: string,
  orderLines: Array<PurchaseRequest>
}

export enum PaymentMethod{
  COD,
  ATM,
  QR,
  EWALLET
}

export enum PaymentStatus{
  UNPAID,
  PAID,
  REFUNED
}

export enum Status{
  PENDING,
  CONFIRMED,
  SHIPPED,
  CANCELED,
  DELIVERED
}

export interface PurchaseRequest{
  id: number,
  quantity: number
}
