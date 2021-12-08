import { ApiService } from "./index";

const PaymentService = {
    getPaymentList: (payload) => ApiService.post("/payment", payload),
    getPayment: (id) => ApiService.get(`/payment/${id}`),
    fetchPaymentReceipt: (id) => ApiService.get(`/payment/payment-receipt/${id}`),
    getSubscriptionList: (body) => ApiService.post(`/payment/get-subscriptions`, body)
};

export default PaymentService;
