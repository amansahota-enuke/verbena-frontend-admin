import React from "react";

function Detail({ selectedAppointment }) {
  return (
    <>
      <h4 className="hepta-slab mb-4">Patient's Complaint</h4>
      <div className="bg-white rounded-md mb p-6 mb-6">
        <p>
          {selectedAppointment.appointment_detail &&
            selectedAppointment.appointment_detail.patient_complaint}
        </p>
      </div>
      <h4 className="hepta-slab mb-4">Provider's Reply</h4>
      <div className="bg-white rounded-md mb p-6 mb-6">
        <p>
          {selectedAppointment.appointment_detail &&
            selectedAppointment.appointment_detail.provider_complaint}
        </p>
      </div>
      <h4 className="hepta-slab mb-4">Diagnosis</h4>
      <div className="bg-white rounded-md mb p-6 mb-6">
        <p>
          {selectedAppointment.appointment_detail &&
            selectedAppointment.appointment_detail.provider_diagnosis}
        </p>
      </div>
      <h4 className="hepta-slab mb-4">Assessment and Plan</h4>
      <div className="bg-white rounded-md mb p-6 mb-6">
        <p>
          {selectedAppointment.appointment_detail &&
            selectedAppointment.appointment_detail.provider_assesment_plans}
        </p>
      </div>
    </>
  );
}

export default Detail;
