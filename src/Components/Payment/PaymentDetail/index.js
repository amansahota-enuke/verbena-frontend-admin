import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { FullWidthContainer, Loader } from "../..";
import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { PaymentActions } from "../../../redux/slice/payment.slice";

function Index() {
    const { id: paymentId } = useParams();
    const dispatch = useDispatch();
    const paymentStatus = useSelector(selector.paymentStatus);
    const selectedPayment = useSelector(selector.selectedPayment);

    useEffect(() => {
        dispatch(PaymentActions.fetchPaymentDetail(paymentId));
    }, []);

    return (
        <FullWidthContainer>
            {(paymentStatus === statusConstants.PENDING) === <Loader />}
            <h4 className="mb-4">Payment Summary</h4>

            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-5">
                <div className="box-header thead-bg p-3">
                    <h5>Invoice</h5>
                </div>

                <div className="box-body p-3 bg-white">
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mb-6">
                        <div>
                            <h3 className="calibre-bold uppercase text-2xl text-black border-b-2 pb-2 mb-3">
                                Home Address
                            </h3>
                            <h5 className="calibre-regular text-black text-2xl mb-2">
                                Verbena
                            </h5>
                            <div className="address w-48 ">
                                <p className="calibre-regular mid-dark-gray-color font-20">
                                    D 103, Verbana Hospital,h Opposite Town
                                    Hall,h Avenue New York-10001
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="calibre-bold uppercase text-2xl text-black border-b-2 pb-2 mb-3">
                                Bill To
                            </h3>
                            <h5 className="calibre-regular text-black text-2xl mb-2">
                                Joe Smith
                            </h5>
                            <div className="address w-48 ">
                                <p className="calibre-regular mid-dark-gray-color font-20">
                                    D 103, Verbana Hospital,h Opposite Town
                                    Hall,h Avenue New York-10001
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden border mb-6">
                        <table className="min-w-full calibre-regular">
                            <thead className="calibre-regular thead-gray-bg ">
                                <tr>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Invoice
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Date & Time
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        34576819
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        18 April 2021 | 4:40PM
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        <span className="success">Success</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-hidden mb-6">
                        <table className="min-w-full calibre-regular">
                            <thead className="calibre-regular thead-gray-bg border-l border-r">
                                <tr>
                                    <th
                                        scope="col"
                                        className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Detail
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Doctor
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Appointment Date & Time
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        1
                                    </td>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        Consultation Charges
                                    </td>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        Dr. Robert
                                    </td>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        18 April 2021 | 4:40PM
                                    </td>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        $20
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="border-b border-l px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        <strong>Sub Total Amount</strong>
                                    </td>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        $60
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="border-b border-l px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        <strong>Vat</strong>
                                    </td>
                                    <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        $10
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        &nbsp;
                                    </td>
                                    <td className="thead-gray-bg border-l border-b px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        <strong>Total Amount</strong>
                                    </td>
                                    <td className="thead-gray-bg border-l border-r border-b px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                        $90
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end">
                        <button
                            // onclick={window.print()}
                            type="submit"
                            className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                        >
                            <i className="fas fa-print"></i> Print
                        </button>
                        {/* <button onclick={window.print()}>Print this page</button> */}
                    </div>
                </div>
            </div>
        </FullWidthContainer>
    );
}

export default Index;
