import React, { useEffect, useState } from "react";
import { FullWidthContainer, Pagination } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import selector from "../../../redux/selector";
import ReactDatePicker from "react-datepicker";
import ReactPaginate from "react-paginate";
import { PaymentActions } from "../../../redux/slice/payment.slice";
import statusConstants from "../../../constants/status.constants";
import ButtonLoader from "../../Common/ButtonLoader";
import moment from "moment";

function SubscriptionList() {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const paymentSatus = useSelector(selector.paymentStatus)
    const subscriptionCount = useSelector(selector.subscriptionCount);
    const SubscriptionList = useSelector(selector.subscriptionList);

    const [pageCount, setPageCount] = useState(1);
    const [userType, setUserType] = useState("patient");
    const [status, setStatus] = useState("");
    // const [patientNumber, setPatientNumber] = useState("");
    // const [patientEmail, setPatientEmail] = useState("");
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");

    const clearFilter = (page = null) => {
        dispatch(PaymentActions.fetchSubscriptionList({
            ...(page && { page }),
                type: userType,
        }))
    }
    const getSubscriptionList = (page = null) => {
        dispatch(
            PaymentActions.fetchSubscriptionList({
                ...(page && { page }),
                type: userType,
                ...(status && { status }),
            })
        );
    };

    useEffect(() => {
        setPageCount(Math.ceil(Number(subscriptionCount) / 10));
    }, [subscriptionCount]);

    const handlePageChange = ({ selected }) => {
        getSubscriptionList(Number(selected)+1);
    };

    useEffect(() => {
        getSubscriptionList()
    }, []);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const resetSearch = () => {
        setStatus("")
        clearFilter()
    };

    return (
        <FullWidthContainer>
            <div className="bg-white rounded-md mb-6">
                <div className="border-b-1 p-4 wrapper-title">
                    <h3 className="mb-0 hepta-slab text-lg leading-none">
                        Search Subscriptions
                    </h3>
                </div>
                <div className="p-4 wrapper-content">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div className="relative">
                            <select
                                className="custom-input input-border-color border text-justify"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="patient">Patient</option>
                                <option value="provider">Provider</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                className="custom-input input-border-color border text-justify"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value={false}>Active</option>
                                <option value={true}>Cancelled</option>
                            </select>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="btn-search calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
                                    onClick={() => getSubscriptionList()}
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

            <div className="overflow-x-auto mb-8">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 calibre-regular">
                            <thead className="bg-gray-50 calibre-regular thead-bg">
                                <tr>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Subscription ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Gender
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Mobile Number
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Plan
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Expiration
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paymentSatus === statusConstants.PENDING ? (
                                    <ButtonLoader color="#000" />
                                ) : SubscriptionList.length === 0 ? (
                                    <p>No Subscriptions</p>
                                ) : (
                                    SubscriptionList.map((subscription) => (
                                        <tr key={subscription.id}>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.id}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.patient ? `${parseName(
                                                    subscription.patient.first_name
                                                )} ${parseName(subscription.patient.last_name)}` : `${parseName(
                                                    subscription.provider.first_name
                                                )} ${parseName(subscription.provider.last_name)}`}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.patient ? `${subscription.patient.gender === "M" ? "Male" : "Female"}` : `${subscription.provider.gender === "M" ? "Male" : "Female"}`}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.patient ? subscription.patient.mobile_number : subscription.provider.mobile_number}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.patient ? subscription.patient.email : subscription.provider.email}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                ${Number(subscription.amount)/100}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {`${moment(
                                                    Number(JSON.parse(subscription.res_body).current_period_end + "000")
                                                ).format("D MMMM YYYY")}`}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {subscriptionCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    handlePageChange={handlePageChange}
                />
            )}
        </FullWidthContainer>
    );
}

export default SubscriptionList;
