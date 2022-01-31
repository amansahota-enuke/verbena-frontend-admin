import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../redux/selector";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { ProviderService } from "../../services";
import ButtonLoader from "../../Components/Common/ButtonLoader";

function DeleteConfirmation() {
  const dispatch = useDispatch();
  const deleteProvider = useSelector(selector.deleteProvider)
  const providerId = useSelector(selector.providerId)
  const [processing, setProcessing] = useState("");

  const handleCancel = () => {
    dispatch(ConfirmationActions.closeConfirmation());
  };

  const handleDelete = async() => {
    try{
      setProcessing(true);
      await ProviderService.deleteProvider(providerId)
      setProcessing(false);
      dispatch(ConfirmationActions.closeConfirmation());
      deleteProvider()
    }catch(error){
      console.log(error.response.data.message)
    }
  }

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 text-center"
      >
        Delete Provider
      </Dialog.Title>

      <div className="mt-2">
        <p className="text-md text-center text-black-500 font-semibold">
          Deleting a provider, will delete all provider details such as
          provider's personal information, appointments, subscription details.
          Are you sure want to delete?
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white mr-4"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
          onClick={handleDelete}
        >
         <span>{processing ? <ButtonLoader /> : "Confirm"}</span>
        </button>
      </div>
    </>
  );
}

export default DeleteConfirmation;
