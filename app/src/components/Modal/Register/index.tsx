import React from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Modal from "../ModalBase";
import SocialMediaButton from "../../Button/SocialMedia";
import { loginRequest, registerRequest } from "../../../api/auth";
import { useAppDispatch } from "../../../store/hooks";
import { loginRequest as loginRequestReducer } from "../../../reducers/account";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenLoginModal: () => void;
}

const Register: React.FC<Props> = ({
  open,
  onClose,
  onOpenLoginModal,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const [errorRequest, setErrorRequest] = React.useState<null|string>(null);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    const res = await registerRequest({
      email: data.email,
      password: data.password,
      username: data.username,
    });
    if (res.message) return setErrorRequest(res.message);
    const resLogin = await loginRequest({
      email: data.email,
      password: data.password,
    });
    dispatch(loginRequestReducer(resLogin.token));
    onClose();
    // INTEGRER - Notification de succès
    
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <Box>
        <Typography variant="h5">
          S'inscrire via un réseau social
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1} mt={2}>
          <SocialMediaButton
            imgSource={"images/google-icon.png"}
            text={"via Google"}
            onClick={() => console.log("inscription with google")}
          />
        </Box>
      </Box>

      <Divider variant="middle" component="div" style={{ marginTop: 20, color: "rgba(0, 0, 0, 0.45)" }} children="OU" />


      <Box mt={2}>
        <Typography variant="h5">
          Inscription via email
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
              id="username"
              // name="email"
              label="Nom d'utilisateur"
              variant="outlined"
              fullWidth={true}
              {...register('username')}
              error={errors.username ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
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
          <Box>
            <TextField
              id="confirmPassword"
              label="Confirmer le mot de passe"
              variant="outlined"
              fullWidth={true}
              {...register('confirmPassword')}
              error={errors.confirmPassword ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.confirmPassword?.message}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
            S'inscrire
          </Button>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Typography variant="body2">
              <span onClick={onOpenLoginModal} style={{ cursor: "pointer" }}>
                Déjà inscrit ?
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default Register;


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("L'email est requis")
    .email("L'email est invalide"),
  username: Yup.string()
    .required("Le nom d'utilisateur est requis")
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur doit contenir au maximum 20 caractères"),
  password: Yup.string()
    .required("Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial"
    ),
  confirmPassword: Yup.string()
    .required("La confirmation du mot de passe est requise")
    .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre"),
});
