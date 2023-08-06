import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  imgSource: string;
  text: string;
  onClick: () => void;
};


const styleButtonSocialMedia = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: 1,
  paddingBottom: 1,
  borderRadius: "4px",
  border: "1px solid #CCC",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#CCC",
    border: "1px solid #111",
  },
};

const SocialMediaButton: React.FC<Props> = ({
  imgSource,
  text,
  onClick,
}) => {
  return (
    <Box sx={styleButtonSocialMedia} onClick={onClick}>
      <img src={imgSource} />
      <Typography variant="h6">
        {text}
      </Typography>
    </Box>
  );
};

export default SocialMediaButton;
