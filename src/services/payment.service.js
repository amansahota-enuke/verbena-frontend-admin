import { ApiService } from "./index";

const PaymentService = {
    getPaymentList: (payload) => ApiService.post("/payment", payload),
    getPayment: (id) => ApiService.get(`/payment/${id}`),
    fetchPaymentReceipt: (id) => ApiService.get(`/payment/payment-receipt/${id}`),

};

export default PaymentService;
