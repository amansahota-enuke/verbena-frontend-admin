import { ApiService } from "./index";

const NewsletterSubscriptionsService = {
    getNewsletterSubscribers: (payload) => ApiService.post("/newsletter-subscription", payload),
};

export default NewsletterSubscriptionsService;
