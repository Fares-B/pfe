import React from "react";
import { Box, TextField, Typography, Button, Divider } from "@mui/material";
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Modal from "../ModalBase";
import SocialMediaButton from "../../Button/SocialMedia";
import { loginRequest } from "../../../api/auth";
import { useAppDispatch } from "../../../store/hooks";
import { loginRequest as loginRequestReducer } from "../../../reducers/account";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenRegisterModal: () => void;
  onOpenForgotModal: () => void;
}

const ERRORS = {
  "Invalid credentials": "Email ou mot de passe incorrect",
  "Internal issues": "Une erreur est survenue, veuillez réessayer plus tard",
}


const Login: React.FC<Props> = ({
  open,
  onClose,
  onOpenRegisterModal,
  onOpenForgotModal,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const dispatch = useAppDispatch();
  const [errorRequest, setErrorRequest] = React.useState<null|string>(null);

  const onSubmit = async (data: any) => {
    const res = await loginRequest(data)
    if(res.message) return setErrorRequest(res.message);
    dispatch(loginRequestReducer(res.token));
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box>
        <Typography variant="h5">
          Connectez-vous via un réseau social
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1} mt={2}>
          <SocialMediaButton
            imgSource={"images/google-icon.png"}
            text={"via Google"}
            onClick={() => console.log("connect with google")}
          />
        </Box>
      </Box>

      <Divider variant="middle" component="div" style={{ marginTop: 20, color: "rgba(0, 0, 0, 0.45)" }} children="OU" />

      <Box mt={4}>
        <Typography variant="h5">
          Connectez-vous
        </Typography>

        <Typography variant="body2" color="error">
          {errorRequest}
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1} mt={2}>
          <Box>
            <TextField
              id="email"
              // name="email"
              label="Email"
              variant="outlined"
              fullWidth={true}
              {...register('email')}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
          </Box>
          <Box>
            <TextField
              id="password"
              label="Mot de passe"
              variant="outlined"
              fullWidth={true}
              {...register('password')}
              error={errors.password ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </Box>

          <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
            Se connecter
          </Button>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Typography variant="body2">
              <span onClick={onOpenForgotModal} style={{ cursor: "pointer" }}>
                Mot de passe oublié ?
              </span>
            </Typography>
            <Typography variant="body2">
              &nbsp;|&nbsp;
            </Typography>
            <Typography variant="body2">
              <span onClick={onOpenRegisterModal} style={{cursor: "pointer"}}>
                S'inscrire
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>

    </Modal>
  );
}

export default Login;


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("L'email est requis")
    .email("L'email est invalide"),
  password: Yup.string()
    .required("Le mot de passe est requis"),
});
