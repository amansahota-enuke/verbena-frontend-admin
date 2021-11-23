import React from "react";

function DoctorDetail({ selectedAppointment }) {
    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    return (
        <>
            <h4 className="hepta-slab mb-4">Doctor Details</h4>

            <div className="bg-white rounded-md mb-3 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between">
                    <div>
                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                            <div>
                                <div
                                    className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                                    style={{
                                        backgroundImage:
                                            selectedAppointment.provider &&
                                            `url("${
                                                process.env
                                                    .REACT_APP_API_SERVER_URL +
                                                selectedAppointment.provider
                                                    .profile_logo
                                            }")`,
                                    }}
                                ></div>
                            </div>
                            <div>
                                <h3 className="hepta-slab mb-2 text-xl leading-none">
                                {selectedAppointment.provider &&
                                        `Dr. ${parseName(
                                            selectedAppointment.provider
                                                .first_name
                                        )} ${parseName(
                                            selectedAppointment.provider
                                                .last_name
                                        )}`}
                                </h3>
                                <h6 className="text-base uppercase mb-3 light-dark-gray-color calibre-regular">
                                    {selectedAppointment.provider && selectedAppointment.provider.provider_speciality_master && 
                                        selectedAppointment.provider.provider_speciality_master.name}
                                </h6>
                                <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-0 whitespace-nowrap">
                                    <div className="edu-icon mr-3">
                                        <i className="fas fa-graduation-cap"></i>
                                    </div>
                                    <div className="light-dark-gray-color font-18">
                                    {selectedAppointment.provider && 
                                                JSON.parse(
                                                    selectedAppointment.provider.board_certifications
                                                ).map((board, index) => (
                                                    <p
                                                        className="mid-dark-gray-color text-lg"
                                                        key={index}
                                                    >
                                                        {board.value}
                                                    </p>
                                                ))}
                                    </div>
                                </div>
                                <div className="provider-address calibre-regular flex xl:flex-nowrap md:flex-wrap">
                                    <div className="address-icon mr-3">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="light-dark-gray-color font-18">
                                        {selectedAppointment.provider && selectedAppointment.provider.address &&
                                            `${selectedAppointment.provider.address.address_line1}, ${
                                                selectedAppointment.provider.address.address_line2 &&
                                                selectedAppointment.provider.address.address_line2 + ","
                                            } ${selectedAppointment.provider.address.city}, ${
                                                selectedAppointment.provider.address.state.state_name
                                            } ${selectedAppointment.provider.address.zipcode}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorDetail;
