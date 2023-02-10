import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type SharedModalProps = {
  children: React.ReactNode;
};

const SharedModal = ({ children }: SharedModalProps) => {
  const { isModalActive, setIsModalActive } = useApplicationControlContext();

  return (
    <div>
      <Modal
        open={isModalActive}
        onClose={() => {
          setIsModalActive(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default SharedModal;
