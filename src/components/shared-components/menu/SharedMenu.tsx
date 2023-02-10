import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import iCity from "../../../dtos/iCity";
import "./shared-menu.css";

type SharedMenuProps = {
  city: iCity;
  setModalOption: React.Dispatch<React.SetStateAction<number>>;
};
const SharedMenu = ({ city, setModalOption }: SharedMenuProps) => {
  const { anchorEl, setAnchorEl, setIsModalActive } =
    useApplicationControlContext();
  const { setSelectedCity } = useDataControlContext();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectedCity(city);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setModalOption(2);
    setIsModalActive(true);
    handleClose();
  };

  const handleDelete = () => {
    setModalOption(3);
    setIsModalActive(true);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <HiDotsVertical size={25} />
      </Button>
      <Menu
        id="basic-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="menu" onClick={handleUpdate}>
          Atualizar
        </MenuItem>
        <MenuItem className="menu" onClick={handleDelete}>
          Excluir
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SharedMenu;
