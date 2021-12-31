import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";
import ConfirmationReducer from "./slice/confirmation.slice";
import AppointmentReducer from "./slice/appointment.slice";
import PatientReducer from "./slice/patient.slice";
import QuestionnaireReducer from "./slice/questionnaire.slice";
import ProviderReducer from "./slice/provider.slice";
import PaymentReducer from "./slice/payment.slice";
import NewsletterSubscriptionsReducer from "./slice/newslettersubscriptions.slice"

const store = configureStore({
    reducer: {
        user: UserReducer,
        confirmation: ConfirmationReducer,
        appointment: AppointmentReducer,
        patient: PatientReducer,
        questionnaire: QuestionnaireReducer,
        provider: ProviderReducer,
        payment: PaymentReducer,
        newslettersubscribers: NewsletterSubscriptionsReducer,
    },
});

export default store;
