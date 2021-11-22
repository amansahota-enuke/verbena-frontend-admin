import { Switch } from "@headlessui/react";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonLoader } from "..";
import statusConstants from "../../constants/status.constants";
import selector from "../../redux/selector";
import { ProviderActions } from "../../redux/slice/provider.slice";
import { ProviderService } from "../../services";

function ProviderTable() {
    const dispatch = useDispatch();
    const providerStatus = useSelector(selector.providerStatus);
    const providerList = useSelector(selector.providerList);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
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
            dispatch(ProviderActions.fetchProviderList());
        } catch (error) {
            toast(error);
        }
    };

    return (
        <>
            <h4 className="hepta-slab mb-4">Providers</h4>
            <div className="overflow-x-auto mb-8 providerTable">
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
                                    Action
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
                                                        : "primary-dim-bg-color"
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
                                                to={`/home/providers/${provider.id}`}
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
        </>
    );
}

export default ProviderTable;
