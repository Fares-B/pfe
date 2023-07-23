import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Modal from "../ModalBase";
import { forgotPasswordRequest, resetPasswordRequest } from "../../../api/auth";
import ForgotPasswordUpdate from "./Update";
import ForgotPasswordRequest from "./Request";


interface Props {
  open: boolean;
  onClose: () => void;
  onOpenLoginModal: () => void;
}

const Forgot: React.FC<Props> = ({
  open,
  onClose,
  onOpenLoginModal,
}) => {
  const [errorRequest, setErrorRequest] = React.useState<null|string>(null);
  const [successRequest, setSuccessRequest] = React.useState<boolean|string>(false);

  const onSubmitRequest = async (data:any) => {
    const res = await forgotPasswordRequest(data);
    console.log(res);
    if (res.message) return setErrorRequest(res.message);
    setSuccessRequest(data.email);
  }

  const onSubmitUpdate = async (data:any) => {
    const res = await resetPasswordRequest({ ...data, email: successRequest });
    if (res.message) return setErrorRequest(res.message);
    onClose();

    // A FAIRE
    // Notification success
  }


  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      {successRequest ? (
        <ForgotPasswordUpdate
          email={successRequest}
          errorRequest={errorRequest}
          onSubmit={onSubmitUpdate}
        />
      ) : (
        <ForgotPasswordRequest
          errorRequest={errorRequest}
          onSubmit={onSubmitRequest}
          onOpenLoginModal={onOpenLoginModal}
        />
      )}
    </Modal>
  );
}

export default Forgot;
