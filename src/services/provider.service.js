import { ApiService } from "./index";

const ProviderService = {
    getProviderList: (payload) => ApiService.post("/provider", payload),
    getProviderDetail: (id) => ApiService.get(`/provider/${id}`),
    updateProviderStatus: (id, body) => ApiService.put(`/provider/status/${id}`, body),
    fetchSignupLink: () => ApiService.get("/provider/generate-signup-link"),
    deleteProvider:(id) => ApiService.delete(`/provider/delete-provider/${id}`),
};

export default ProviderService;
