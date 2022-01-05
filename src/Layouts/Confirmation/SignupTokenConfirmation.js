import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { ProviderService } from "../../services";
import copy from "copy-to-clipboard";  

function SignupTokenConfirmation() {
  const dispatch = useDispatch();
  const [link, setLink] = useState("")

  const closeModal = () => {
    copy(link)

    dispatch(ConfirmationActions.closeConfirmation());
  };


  const getSignUpLink = async() => {
    const response = await ProviderService.fetchSignupLink()
    setLink(response.data.data)
  }

  useEffect(() => {
    getSignUpLink()
  },[])

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Signup One time Generated Link
      </Dialog.Title>
      <div className="mt-2">
        <input
          type="text"
          className="custom-input input-border-color border"
          placeholder="Signup Link"
          name="email"
          id="myInput"
          value={link}
          disabled={true}
        />
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="btn-login calibre-regular font-16 leading-none uppercase primary-bg-color text-white"
          onClick={closeModal}
        >
          Copy Link
        </button>
      </div>
    </>
  );
}

export default SignupTokenConfirmation;
