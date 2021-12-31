import React, { useEffect, useState } from "react";
import { FullWidthContainer, Pagination } from "..";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../redux/selector";
import { NewsletterSubscriptionActions } from "../../redux/slice/newslettersubscriptions.slice";
import statusConstants from "../../constants/status.constants";
import ButtonLoader from "../Common/ButtonLoader";

function NewsletterSubscription() {
    const dispatch = useDispatch();
    const subscriptionList = useSelector(selector.newsLetterSubscriptions);
    const subscriptionListStatus = useSelector(selector.subscriptionListStatus)
    const subscribersCount = useSelector(selector.subscribersCount)

    const [pageCount, setPageCount] = useState(1);

    const getSubscriptionList = (page = null) => {
        dispatch(NewsletterSubscriptionActions.fetchNewsletterSubscribers({
            ...(page && { page }),
        }));
    };

    useEffect(() => {
        setPageCount(Math.ceil(Number(subscribersCount) / 10));
    }, [subscribersCount]);

    const handlePageChange = ({ selected }) => {
        getSubscriptionList(Number(selected)+1);
    };  

    useEffect(() => {
        getSubscriptionList()
    }, []);

    return (
        <>
        <div className="bg-white rounded-lg py-4 px-4 pointer cursor-pointer mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
                Subscribers
              </h4>
              <h2 className="count-total calibre-bold text-6xl text-black">
                {subscribersCount}
              </h2>
            </div>
            <div>
              <img src="/images/count-patient-vector.png" alt="" title="" />
            </div>
          </div>
      </div>
        <FullWidthContainer>
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
                                        Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Subscribers
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {subscriptionListStatus === statusConstants.PENDING ? (
                                    <ButtonLoader color="#000" />
                                ) : subscriptionList.length === 0 ? (
                                    <p>No Subscriptions</p>
                                ) : (
                                    subscriptionList.map((subscription) => (
                                        <tr key={subscription.id}>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.id}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {subscription.email}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {subscribersCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    handlePageChange={handlePageChange}
                />
            )}
        </FullWidthContainer>
        </>
    );
}

export default NewsletterSubscription;
