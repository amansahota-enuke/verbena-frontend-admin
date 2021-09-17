import { ApiService } from "./index";

const AppointmentService = {
    getAppointmentList: (payload) => ApiService.post("/appointment", payload),
    getAppointmentDetail: (id) => ApiService.get(`/appointment/${id}`),
};

export default AppointmentService;
