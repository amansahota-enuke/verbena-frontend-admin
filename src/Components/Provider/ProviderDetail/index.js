import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { ProviderActions } from "../../../redux/slice/provider.slice";
import { Loader, FullWidthContainer } from "../../";

function Index(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id: providerId } = useParams();
    const providerStatus = useSelector(selector.providerStatus);
    const providerDetail = useSelector(selector.selectedProvider);

    useEffect(() => {
        if (Object.keys(providerDetail).length === 0) {
            dispatch(ProviderActions.fetchProviderDetail(providerId));
        }
        if (Number(providerId) !== Number(providerDetail.id)) {
            dispatch(ProviderActions.fetchProviderDetail(providerId));
        }
    }, [providerDetail]);

    const parseName = (name) => {
        if (!name) return null;
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    return (
        <FullWidthContainer>
            <button
                onClick={() => history.goBack()}
                type="button"
                className="px-4 py-2 rounded-full mb-3 calibre-regular leading-none font-18 uppercase primary-bg-color text-white"
            >
                <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
            {providerStatus === statusConstants.PENDING && <Loader />}
            <>
                <div className="page-title">
                    <h2 className="hepta-bold text-left primary-text-color mb-10">
                        Provider Profile
                    </h2>
                </div>

                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                        <div className="bg-white p-8 rounded-lg mb-8">
                            <div className="flex justify-between items-center xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap">
                                <div>
                                    <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap">
                                        <div
                                            className="profile-image border-2 rounded mr-5"
                                            style={{
                                                backgroundImage:
                                                    providerDetail.profile_logo &&
                                                    `url("${
                                                        process.env
                                                            .REACT_APP_API_SERVER_URL +
                                                        providerDetail.profile_logo
                                                    }")`,
                                            }}
                                        ></div>
                                        <div>
                                            <h3 className="hepta-slab mb-3 text-2xl">
                                                {providerDetail &&
                                                    `Dr. ${parseName(
                                                        providerDetail.first_name
                                                    )} ${parseName(
                                                        providerDetail.last_name
                                                    )}`}
                                            </h3>
                                            <h6 className="font-18 calibre-regular uppercase mb-1 light-dark-gray-color">
                                                {providerDetail &&
                                                    providerDetail.provider_speciality_master &&
                                                    providerDetail
                                                        .provider_speciality_master
                                                        .name}
                                            </h6>
                                            <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-0 whitespace-nowrap">
                                                <div className="edu-icon mr-3">
                                                    <i className="fas fa-graduation-cap"></i>
                                                </div>
                                                <div className="light-dark-gray-color font-18">
                                                    {providerDetail.hospital_affiliations &&
                                                        JSON.parse(
                                                            providerDetail.hospital_affiliations
                                                        ).map(
                                                            (
                                                                hospital,
                                                                index
                                                            ) => {
                                                                let test =
                                                                    index + 1;
                                                                if (
                                                                    providerDetail
                                                                        .hospital_affiliations
                                                                        .length ===
                                                                    test
                                                                ) {
                                                                    return hospital.value;
                                                                } else {
                                                                    return `${hospital.value}, `;
                                                                }
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                            <div className="provider-address calibre-regular flex xl:flex-nowrap md:flex-wrap mb-4">
                                                <div className="address-icon mr-3">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div className="light-dark-gray-color font-18">
                                                    {providerDetail &&
                                                        providerDetail.address &&
                                                        `${
                                                            providerDetail
                                                                .address
                                                                .address_line1
                                                        }, ${
                                                            providerDetail
                                                                .address
                                                                .address_line2 +
                                                            ","
                                                        } ${
                                                            providerDetail
                                                                .address.city
                                                        }, ${
                                                            providerDetail
                                                                .address.state
                                                        } ${
                                                            providerDetail
                                                                .address.zipcode
                                                        }`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <div className="bg-white p-8 rounded-lg mb-8">
                            <h3 className="hepta-bold text-2xl mb-6">
                                About me
                            </h3>
                            <p className="about-content mid-dark-gray-color text-base mb-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est
                                laborum.hExcepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui offici.h
                            </p>
                            <p className="about-content mid-dark-gray-color text-base mb-2">
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae
                                ab illo inventore veritatis et quasi architecto
                                beatae vitae dicta sunt explicabo. Nemo enim
                                ipsam voluptatem quia voluptas sit aspernatur
                                aut odit aut fugit, sed quia consequuntur magni
                                dolores eos qui ratione voluptatem sequi
                                nesciunt. Neque porro quisquam est, qui dolorem
                                ipsum quia dolor sit amet, consectetur, adipisci
                                velit, sed quia non numquam eius modi tempora
                                incidunt ut labore et dolore magnam aliquam
                                quaerat voluptatem. Ut enim ad minima veniam,
                                quis nostrum exercitationem ullam corporis
                                suscipit laboriosam, nisi ut aliquid ex ea
                                commodi consequatur? Quis autem vel eum iure
                                reprehenderit qui in ea voluptate velit esse
                                quam nihil molestiae consequatur, vel illum qui
                                dolorem eum fugiat quo voluptas nulla pariatu.
                                qui dolorem ipsum quia dolor sit amet.h
                            </p>
                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <div className="bg-white p-8 rounded-lg mb-8">
                            <div className="specialtites">
                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                                    <div className="mr-4">
                                        <img
                                            src="images/icon-1.png"
                                            alt=""
                                            title=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-2 text-lg leading-none">
                                            Speciality
                                        </h2>
                                        <p className="mid-dark-gray-color mb-2 text-lg">
                                            {providerDetail &&
                                                providerDetail.provider_speciality_master &&
                                                providerDetail
                                                    .provider_speciality_master
                                                    .name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                                    <div className="mr-4">
                                        <img
                                            src="images/icon-2.png"
                                            alt=""
                                            title=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-2 text-lg leading-none">
                                            Hospital Affiliations
                                        </h2>
                                        <p className="mid-dark-gray-color mb-2 text-lg">
                                            {providerDetail.hospital_affiliations &&
                                                JSON.parse(
                                                    providerDetail.hospital_affiliations
                                                ).map((hospital, index) => (
                                                    <p
                                                        className="mid-dark-gray-color mb-2 text-lg"
                                                        key={index}
                                                    >
                                                        {hospital.value}
                                                    </p>
                                                ))}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                                    <div className="mr-4">
                                        <img
                                            src="images/icon-3.png"
                                            alt=""
                                            title=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-2 text-lg leading-none">
                                            Board Certifications
                                        </h2>
                                        <p className="mid-dark-gray-color mb-2 text-lg">
                                            {providerDetail.board_certifications &&
                                                JSON.parse(
                                                    providerDetail.board_certifications
                                                ).map((board, index) => (
                                                    <p
                                                        className="mid-dark-gray-color mb-2 text-lg"
                                                        key={index}
                                                    >
                                                        {board.value}
                                                    </p>
                                                ))}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                                    <div className="mr-4">
                                        <img
                                            src="images/icon-4.png"
                                            alt=""
                                            title=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-2 text-lg leading-none">
                                            Languages
                                        </h2>
                                        {providerDetail.languages_spoken &&
                                            JSON.parse(
                                                providerDetail.languages_spoken
                                            ).map((language, index) => (
                                                <p
                                                    className="mid-dark-gray-color mb-2 text-lg"
                                                    key={index}
                                                >
                                                    {language.value}
                                                </p>
                                            ))}
                                    </div>
                                </div>

                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                                    <div className="mr-4">
                                        <img
                                            src="images/icon-5.png"
                                            alt=""
                                            title=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-2 text-lg leading-none">
                                            Gender
                                        </h2>
                                        <p className="mid-dark-gray-color mb-2 text-lg">
                                            Male
                                        </p>
                                    </div>
                                </div>

                                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                                    <div className="mr-4">
                                        <img
                                            src="images/icon-6.png"
                                            alt=""
                                            title=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-2 text-lg leading-none">
                                            Consultation Fees
                                        </h2>
                                        <p className="mid-dark-gray-color mb-2 text-lg">
                                            {providerDetail.consultation_fee}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <div className="bg-white p-8 rounded-lg mb-8">
                            <h2 className="hepta-slab text-4xl mb-20 text-center">
                                Patient Recognitions and Testimonials
                            </h2>

                            <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap items-center">
                                <div className="dd mr-16">
                                    <div className="testimonial-image">
                                        <div className="img-wrapper rounded-full primary-bg-color"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonial-content relative">
                                        <span className="absolute blockquote">
                                            <img
                                                src="images/blockquote.png"
                                                alt=""
                                                title=""
                                            />
                                        </span>
                                        <p className="calibre-regular text-lg mid-dark-gray-color mb-8">
                                            Visited for acne advanced facial and
                                            full body laser hair removal. I have
                                            been visiting Dr. Rajveer Singh for
                                            last 4 years for various skin
                                            problems. I took few advanced
                                            facials with Dr. Rahveer Singh
                                            before my wedding 2 years back. I
                                            was extremely happy and satisfied
                                            with results. I am happy that I did
                                            not spend money on parlour/ salon
                                            facials. 1 year back I started
                                            taking full body laser hair removal
                                            and again results were to my
                                            expectations. Now I hardly go
                                            through painful waxing.
                                        </p>
                                        <h4 className="client-name hepta-slab text-xl mb-0">
                                            Riya Malhotra
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </FullWidthContainer>
    );
}

export default Index;
