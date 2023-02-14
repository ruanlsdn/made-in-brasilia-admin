import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import "./shared-menu.css";

type SharedMenuProps = {
  entity: any;
  setModalOption: React.Dispatch<React.SetStateAction<number>>;
};

const SharedMenu = ({ entity, setModalOption }: SharedMenuProps) => {
  const { activeRoute } = useApplicationControlContext();
  const { anchorEl, setAnchorEl, setIsModalActive } =
    useApplicationControlContext();
  const { setSelectedCity, setSelectedPost, setSelectedUser } =
    useDataControlContext();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    switch (activeRoute.path) {
      case "/cities":
        setSelectedCity(entity);
        break;

      case "/posts":
        setSelectedPost(entity);
        break;

      case "/users":
        setSelectedUser(entity);
        break;

      default:
        break;
    }
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
