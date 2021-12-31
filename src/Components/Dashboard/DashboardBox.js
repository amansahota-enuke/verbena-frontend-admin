import {React,useEffect} from "react";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import $ from 'jquery'

function DashboardBox() {
  const providerCount = useSelector(selector.providerCount);
  const patientCount = useSelector(selector.patientCount);
  const appointmentCount = useSelector(selector.appointmentCount);

  useEffect(() => {
    $("#providerHeader").click(function() {
      $('html,body').animate({
          scrollTop: $(".providerTable").offset().top-150},
          'slow');
  });

  $("#patientHeader").click(function() {
    $('html,body').animate({
        scrollTop: $(".patientTable").offset().top-150},
        'slow');
});

$("#appointmentHeader").click(function() {
  $('html,body').animate({
      scrollTop: $(".appointmentTable").offset().top-150},
      'slow');
});
}, []);

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 mb-6">
      <div className="bg-white rounded-lg py-4 px-4 pointer cursor-pointer" id="patientHeader">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
                Patients
              </h4>
              <h2 className="count-total calibre-bold text-6xl text-black">
                {patientCount}
              </h2>
            </div>
            <div>
              <img src="/images/count-patient-vector.png" alt="" title="" />
            </div>
          </div>
      </div>
      <div className="bg-white rounded-lg py-4 px-4 cursor-pointer" id="providerHeader">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
              Providers
            </h4>
            <h2 className="count-total calibre-bold text-6xl text-black">
              {providerCount}
            </h2>
          </div>
          <div>
            <img src="/images/count-provider-vector.png" alt="" title="" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg py-4 px-4 cursor-pointer" id="appointmentHeader">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
              Appointments
            </h4>
            <h2 className="count-total calibre-bold text-6xl text-black">
              {appointmentCount}
            </h2>
          </div>
          <div>
            <img src="/images/count-appointment-vector.png" alt="" title="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBox;
