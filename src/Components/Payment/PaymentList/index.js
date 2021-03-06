import React, { useEffect, useState } from "react";
import { FullWidthContainer, Pagination } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import selector from "../../../redux/selector";
import ReactDatePicker from "react-datepicker";
import { PaymentActions } from "../../../redux/slice/payment.slice";
import statusConstants from "../../../constants/status.constants";
import ButtonLoader from "../../Common/ButtonLoader";
import moment from "moment";
import { PaymentService } from "../../../services";
import { DocumentDownloadIcon } from "@heroicons/react/solid";

function Index() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const paymentStatus = useSelector(selector.paymentStatus);
  const paymentCount = useSelector(selector.paymentCount);
  const paymentList = useSelector(selector.paymentList);

  const [pageCount, setPageCount] = useState(1);
  const [appointmentId, setAppointmentId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [providerName, setProviderName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getPaymentList = (page = null) => {
    dispatch(
      PaymentActions.fetchPaymentList({
        ...(page && { page }),
        ...(appointmentId && { appointment_id: appointmentId }),
        ...(patientName && { patient_name: patientName }),
        ...(providerName && { provider_name: providerName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      })
    );
  };

  useEffect(() => {
    setPageCount(Math.ceil(Number(paymentCount) / 10));
  }, [paymentCount]);

  const handlePageChange = ({ selected }) => {
    getPaymentList(selected + 1);
  };

  useEffect(() => {
    getPaymentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseName = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  };

  const resetSearch = () => {
    setAppointmentId("");
    setPatientName("");
    setProviderName("");
    setStartDate("");
    setEndDate("");
    getPaymentList();
  };

  async function savePdf(paymentId) {
    //     const file = await AppointmentService.getPdf(id);
    //     const fileBlog = await file.blob();
    //     const fileURL = URL.createObjectURL(fileBlog);

    //     const link = document.createElement("a");
    //     link.href = fileURL;
    //     link.download = fileName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    const response = await PaymentService.fetchPaymentReceipt(paymentId);
    const file = await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/pdf/${response.data.data}`
    );
    const fileBlog = await file.blob();
    const fileURL = URL.createObjectURL(fileBlog);

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = response.data.data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <FullWidthContainer>
      <div className="bg-white rounded-md mb-6">
        <div className="border-b-1 p-4 wrapper-title">
          <h3 className="mb-0 hepta-slab text-lg leading-none">
            Search Payments
          </h3>
        </div>
        <div className="p-4 wrapper-content">
          <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative">
              <input
                type="text"
                className="custom-input input-border-color border text-justify"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                className="custom-input input-border-color border text-justify"
                placeholder="Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
              />
            </div>
            <div className="relative">
              <ReactDatePicker
                className="custom-input input-border-color border text-justify"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
              />
            </div>
            <div className="relative">
              <ReactDatePicker
                className="custom-input input-border-color border text-justify"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
              />
            </div>
            <div className="relative">
              <div className="flex">
                <button
                  type="button"
                  className="btn-search calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
                  onClick={() => getPaymentList()}
                >
                  Search
                </button>
                <button
                  type="button"
                  className="btn-reset calibre-regular font-16 uppercase primary-light-bg-color primary-text-color mr-3"
                  onClick={resetSearch}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 calibre-regular">
              <thead className="bg-gray-50 calibre-regular thead-bg">
                <tr>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Patient's Name
                  </th>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Provider's Name
                  </th>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Appointment Id
                  </th>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Total Amount
                  </th>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Payment Receipt
                  </th>
                  <th
                    scope="col"
                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentStatus === statusConstants.PENDING ? (
                  <ButtonLoader color="#000" />
                ) : paymentList.length === 0 ? (
                  <p>No Payments</p>
                ) : (
                  paymentList.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        {`${parseName(
                          payment.appointment.patient.first_name
                        )} ${parseName(payment.appointment.patient.last_name)}`}
                      </td>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        {`Dr. ${parseName(
                          payment.appointment.provider.first_name
                        )} ${parseName(
                          payment.appointment.provider.last_name
                        )}`}
                      </td>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        {payment.appointment_id}
                      </td>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        {moment(payment.created_on).format("MM-DD-YYYY HH:MM")}
                      </td>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        {Number(payment.amount) / 100}
                      </td>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        <button onClick={() => savePdf(payment.id)}>
                          <DocumentDownloadIcon className="w-5 m-auto" />
                        </button>
                      </td>
                      <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                        <Link
                          to={`${path}/${payment.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {paymentCount > 0 && (
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      )}
    </FullWidthContainer>
  );
}

export default Index;
