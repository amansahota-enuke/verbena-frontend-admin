import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { ProviderActions } from "../../../redux/slice/provider.slice";
import { Loader, FullWidthContainer } from "../../";
import Slider from "react-slick";

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

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
                            process.env.REACT_APP_API_SERVER_URL +
                            providerDetail.profile_logo
                          }")`,
                      }}
                    ></div>
                    <div>
                      <h3 className="hepta-slab mb-3 text-2xl">
                        {providerDetail &&
                          `Dr. ${parseName(
                            providerDetail.first_name
                          )} ${parseName(providerDetail.last_name)}`}
                      </h3>
                      <h6 className="font-18 calibre-regular uppercase mb-1 light-dark-gray-color">
                        {providerDetail &&
                          providerDetail.provider_speciality_master &&
                          providerDetail.provider_speciality_master.name}
                      </h6>
                      <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-0 whitespace-nowrap">
                        <div className="edu-icon mr-3">
                          <i className="fas fa-graduation-cap"></i>
                        </div>
                        <div className="light-dark-gray-color font-18">
                          {providerDetail.board_certifications &&
                            JSON.parse(providerDetail.board_certifications).map(
                              (board, index) => (
                                <p
                                  className="mid-dark-gray-color text-lg"
                                  key={index}
                                >
                                  {board.value}
                                </p>
                              )
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
                            `${providerDetail.address.address_line1}, ${
                              providerDetail.address.address_line2 + ","
                            } ${providerDetail.address.city}, ${
                              providerDetail.address.state.state_name
                            } ${providerDetail.address.zipcode}`}
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
              <h3 className="hepta-bold text-2xl mb-6">About me</h3>
              <p className="about-content mid-dark-gray-color text-base mb-2">
                {providerDetail.bio}
              </p>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <div className="bg-white p-8 rounded-lg mb-8">
              <div className="specialtites">
                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                  <div className="mr-4">
                    <img src="images/icon-1.png" alt="" title="" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-lg leading-none">Speciality</h2>
                    <p className="mid-dark-gray-color mb-2 text-lg">
                      {providerDetail &&
                        providerDetail.provider_speciality_master &&
                        providerDetail.provider_speciality_master.name}
                    </p>
                  </div>
                </div>

                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                  <div className="mr-4">
                    <img src="images/icon-2.png" alt="" title="" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-lg leading-none">
                      Hospital Affiliations
                    </h2>
                    <p className="mid-dark-gray-color mb-2 text-lg">
                      {providerDetail.hospital_affiliations &&
                        JSON.parse(providerDetail.hospital_affiliations).map(
                          (hospital, index) => (
                            <p
                              className="mid-dark-gray-color mb-2 text-lg"
                              key={index}
                            >
                              {hospital.value}
                            </p>
                          )
                        )}
                    </p>
                  </div>
                </div>

                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                  <div className="mr-4">
                    <img src="images/icon-3.png" alt="" title="" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-lg leading-none">
                      Board Certifications
                    </h2>
                    <p className="mid-dark-gray-color mb-2 text-lg">
                      {providerDetail.board_certifications &&
                        JSON.parse(providerDetail.board_certifications).map(
                          (board, index) => (
                            <p
                              className="mid-dark-gray-color mb-2 text-lg"
                              key={index}
                            >
                              {board.value}
                            </p>
                          )
                        )}
                    </p>
                  </div>
                </div>

                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                  <div className="mr-4">
                    <img src="images/icon-4.png" alt="" title="" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-lg leading-none">Languages</h2>
                    {providerDetail.languages_spoken &&
                      JSON.parse(providerDetail.languages_spoken).map(
                        (lang, index) => (
                          <p
                            className="mid-dark-gray-color mb-2 text-lg"
                            key={index}
                          >
                            {index ===
                            providerDetail.languages_spoken.length - 1
                              ? lang.value
                              : `${lang.value}, `}
                          </p>
                        )
                      )}
                  </div>
                </div>

                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap mb-4 border-b-2">
                  <div className="mr-4">
                    <img src="images/icon-5.png" alt="" title="" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-lg leading-none">Gender</h2>
                    <p className="mid-dark-gray-color mb-2 text-lg">Male</p>
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

              {/* Slick Carousel */}
              <div className="slick-slider">
                <div className="">
                  <Slider {...settings} className="slick-slider-inner">
                    {providerDetail.patient_testimonial &&
                      JSON.parse(providerDetail.patient_testimonial).map(
                        (testimonial, index) => (
                          <div>
                            <div class="author-profile text-center">
                              {[
                                ...Array(
                                  testimonial && testimonial.rating
                                    ? Number(testimonial.rating)
                                    : 0
                                ),
                              ].map((x, i) => (
                                <i className="fas fa-star mr-2"></i>
                              ))}
                            </div>
                            {testimonial.value ? (
                              <p class="my-8 hepta-slab text-4xl text-center relative">
                                <span className="absolute right-full -mt-4">
                                  <i class="fas fa-quote-left"></i>
                                </span>

                                {testimonial.value && testimonial.value}
                                <span className="absolute left-full mt-4">
                                  <i class="fas fa-quote-right"></i>
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <span class="caption-author text-center block">
                              {testimonial.patient_name &&
                                `-${testimonial.patient_name}`}
                            </span>
                          </div>
                        )
                      )}
                  </Slider>
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
