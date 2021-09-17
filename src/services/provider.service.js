import { ApiService } from "./index";

const ProviderService = {
    getProviderList: (payload) => ApiService.post("/provider", payload),
    getProviderDetail: (id) => ApiService.get(`/provider/${id}`),
    updateProviderStatus: (id, body) => ApiService.put(`/provider/status/${id}`, body),
};

export default ProviderService;
