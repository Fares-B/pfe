import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface Props {
  email: string|boolean;
  errorRequest: string|null;
  onSubmit: (data: any) => void;
}

const ForgotPasswordUpdate: React.FC<Props> = ({
  errorRequest,
  onSubmit,
}) => {
  const {
    register,
    control,
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
          Entrez le code de vérification que vous avez reçu par email ainsi que votre nouveau mot de passe.
        </Typography>

        <Typography variant="body2" mt={1}>
          {errorRequest}
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1} mt={2}>
          <Box>
            <TextField
              id="code"
              // name="email"
              label="Code de vérification"
              variant="outlined"
              fullWidth={true}
              {...register('code')}
              error={errors.code ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.code?.message}
            </Typography>
          </Box>
          <Box>
            <TextField
              id="password"
              // name="email"
              label="Nouveau mot de passe"
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
            METTRE À JOUR
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPasswordUpdate;

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Le code est requis"),
  password: Yup.string()
    .required("Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial"
    ),
});
