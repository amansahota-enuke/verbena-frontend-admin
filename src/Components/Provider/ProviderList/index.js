import React, { useEffect, useState } from "react";
import { FullWidthContainer, Pagination } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import selector from "../../../redux/selector";
import { ProviderActions } from "../../../redux/slice/provider.slice";
import statusConstants from "../../../constants/status.constants";
import ButtonLoader from "../../Common/ButtonLoader";
import moment from "moment";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";
import { ProviderService } from "../../../services";
import { ConfirmationActions } from "../../../redux/slice/confirmation.slice";
import confirmationConstants from "../../../constants/confirmation.constants";

function ProviderList() {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const providerStatus = useSelector(selector.providerStatus);
    const providerCount = useSelector(selector.providerCount);
    const providerList = useSelector(selector.providerList);
    const [pageCount, setPageCount] = useState(1);
    const [status, setStatus] = useState("");
    const [providerName, setProviderName] = useState("");
    const [providerNumber, setProviderNumber] = useState("");
    const [providerEmail, setProviderEmail] = useState("");

    const clearFilter = () => {
        dispatch(ProviderActions.fetchProviderList({}))
    }
    const getProviderList = (page = null) => {
        dispatch(
            ProviderActions.fetchProviderList({
                ...(page && { page }),
                ...(providerName && { provider_name: providerName }),
                ...(providerNumber && { provider_number: providerNumber }),
                ...(providerEmail && { provider_email: providerEmail }),
                ...(status && { status }),
            })
        );
    };

    useEffect(() => {
        setPageCount(Math.ceil(Number(providerCount) / 10));
    }, [providerCount]);

    const handlePageChange = ({ selected }) => {
        getProviderList(selected);
    };

    useEffect(() => {
        getProviderList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const resetSearch = () => {
        setStatus("");
        setProviderName("");
        setProviderNumber("");
        setProviderEmail("");
        clearFilter()
    };

    const updateProviderStatus = async (providerId, value) => {
        try {
            const response = await ProviderService.updateProviderStatus(
                providerId,
                {
                    status: value ? 1 : 0,
                }
            );
            toast.success(response.data.message);
            getProviderList();
        } catch (error) {
            toast(error);
        }
    };

    const openSignupConfirmation = () => {
        dispatch(
          ConfirmationActions.setConfirmationType(
            confirmationConstants.SIGNUP_LINK
          )
        );
        dispatch(ConfirmationActions.openConfirmation());
      };

    return (
        <FullWidthContainer>
            <div className="bg-white rounded-md mb-6">
                <div className="border-b-1 p-4 wrapper-title">
                    <h3 className="mb-0 hepta-slab text-lg leading-none">
                        Search Providers
                    </h3>
                <div className="flex justify-end mb-2">
                    <button
                        type="button"
                        className="btn-login calibre-regular font-16 leading-none uppercase primary-bg-color text-white"
                        onClick={openSignupConfirmation}
                    >
                        Add Provider
                    </button>
                </div>
                </div>
                
                <div className="p-4 wrapper-content">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Provider Name"
                                value={providerName}
                                onChange={(e) =>
                                    setProviderName(e.target.value)
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getProviderList();
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Provider Mobile"
                                value={providerNumber}
                                onChange={(e) =>
                                    setProviderNumber(e.target.value)
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getProviderList();
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Provider Email"
                                nvalue={providerEmail}
                                onChange={(e) =>
                                    setProviderEmail(e.target.value)
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getProviderList();
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="custom-input input-border-color border text-justify"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="btn-search calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
                                    onClick={() => getProviderList()}
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
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 calibre-regular thead-bg">
                            <tr>
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
                                    Specialization
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
                                    Joining Date
                                </th>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                >
                                    Profile
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 calibre-regular">
                            {providerStatus === statusConstants.PENDING ? (
                                <ButtonLoader color="#000" />
                            ) : providerList.length === 0 ? (
                                <p>No Providers</p>
                            ) : (
                                providerList.map((provider) => (
                                    <tr key={provider.id}>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            {`${parseName(
                                                provider.first_name
                                            )} ${parseName(
                                                provider.last_name
                                            )}`}
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            {
                                                provider
                                                    .provider_speciality_master
                                                    .name
                                            }
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            {provider.mobile_number}
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            {provider.email}
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            {moment(provider.created_on).format(
                                                "MM-DD-YYYY"
                                            )}
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            <Switch
                                                checked={
                                                    Number(provider.status) ===
                                                    1
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    updateProviderStatus(
                                                        provider.id,
                                                        e
                                                    )
                                                }
                                                className={`${
                                                    Number(provider.status) ===
                                                    1
                                                        ? "primary-bg-color"
                                                        : "primary-light-bg-color"
                                                } relative inline-flex items-center h-6 rounded-full w-11`}
                                            >
                                                <span className="sr-only">
                                                    Enable notifications
                                                </span>
                                                <span
                                                    className={`${
                                                        Number(
                                                            provider.status
                                                        ) === 1
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                                                />
                                            </Switch>
                                        </td>

                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            <Link
                                                to={`${path}/${provider.id}`}
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
            {providerCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    handlePageChange={handlePageChange}
                />
            )}
        </FullWidthContainer>
    );
}

export default ProviderList;
