import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton, useMediaQuery } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 28,
};

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BasicModal: React.FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); 

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={isSmallScreen ? "100%" : "auto"} maxWidth={isSmallScreen ? "100%" : 400}>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          m={1}
        >
          <IconButton onClick={onClose} >
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box px={4} pb={4}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

export default BasicModal;
