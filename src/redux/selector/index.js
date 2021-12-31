export default {
    //User Reducer
    userStatus: (state) => state.user.status,
    user: (state) => state.user.data,
    //Confirmation Reducer
    confirmationStatus: (state) => state.confirmation.status,
    confirmationType: (state) => state.confirmation.type,
    //Appointment Reducer
    appointmentStatus: (state) => state.appointment.status,
    appointmentList: (state) => state.appointment.list,
    appointmentCount: (state) => state.appointment.count,
    selectedAppointment: (state) => state.appointment.selectedAppointment,
    //Patient Reducer
    patientStatus: (state) => state.patient.status,
    patientList: (state) => state.patient.patientList,
    patientCount: (state) => state.patient.count,
    selectedPatient: (state) => state.patient.selectedPatient,
    //Questionnaire Reducer
    questionnaireStatus: (state) => state.questionnaire.status,
    basicQuestionnaire: (state) => state.questionnaire.basicQuestionnaire,
    questionnaireAnswers: (state) => state.questionnaire.answers,
    //Provider Reducer
    providerStatus: (state) => state.provider.status,
    providerList: (state) => state.provider.providerList,
    providerCount: (state) => state.provider.count,
    selectedProvider: (state) => state.provider.selectedProvider,
    //Payment Reducer
    paymentStatus: (state) => state.payment.status,
    paymentList: (state) => state.payment.paymentList,
    paymentCount: (state) => state.payment.count,
    selectedPayment: (state) => state.payment.selectedPayment,
    subscriptionList: (state) => state.payment.subscriptionList,
    subscriptionCount: (state) => state.payment.subscriptionCount,
    //Newsletter Subscriptions Reducer
    subscribersCount: (state) => state.newslettersubscribers.count,
    subscriptionListStatus: (state) => state.newslettersubscribers.status,
    newsLetterSubscriptions: (state) => state.newslettersubscribers.subscribersList,
};
