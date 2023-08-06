import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface Props {
  errorRequest: string|null;
  onOpenLoginModal: () => void;
  onSubmit: (data: any) => void;
}

const ForgotPasswordRequest: React.FC<Props> = ({
  errorRequest,
  onOpenLoginModal,
  onSubmit,
}) => {
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <>
      <Box>
        <Typography variant="h5">
          Réinitialiser votre mot de passe
        </Typography>

        <Typography variant="body2" mt={1}>
          Entrez votre adresse email pour réinitialiser votre mot de passe. Un code sera envoyé à votre adresse email.
        </Typography>

        <Typography variant="body2" mt={1}>
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

          <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
            ENVOYER LA DEMANDE
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" mt={1}>
        <span onClick={onOpenLoginModal} style={{ cursor: "pointer" }}>
          Revenir à la page de connexion
        </span>
      </Typography>
    </>
  );
};

export default ForgotPasswordRequest;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("L'email est requis")
    .email("L'email est invalide"),
});
