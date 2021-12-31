import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";

function SignupTokenConfirmation() {
  const dispatch = useDispatch();
  const [text, setText] = useState("")

  const closeModal = () => {
    dispatch(ConfirmationActions.closeConfirmation());
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Signup One time Generated Link
      </Dialog.Title>
      <div className="mt-2">
        {/* <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We’ve sent your an email
          with all of the details of your order.
        </p> */}
        {/* <textarea className="input-border-color border h-40 w-full rounded-lg" type="text"  id="myInput" ></textarea> */}
        <input
          type="text"
          className="custom-input input-border-color border"
          placeholder="Signup Link"
          name="email"
         // value="Hello World"
          id="myInput"
        />
        {/* <button onClick={() => {navigator.clipboard.writeText("amit singh")}}>Copy text</button> */}
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={closeModal}
          onClick={() => {navigator.clipboard.writeText("amit singh")}}
        >
          Copy Link
        </button>
        {/* <button
          onClick={() =>
            navigator.clipboard.writeText("Copy this text to clipbasasasoard")
          }
        >
          Copy
        </button> */}
      </div>
    </>
  );
}

export default SignupTokenConfirmation;
