import { ApiService } from "./index";

const PaymentService = {
    getPaymentList: (payload) => ApiService.post("/payment", payload),
    getPayment: (id) => ApiService.get(`/payment/${id}`),
};

export default PaymentService;
