import { AxiosError } from "axios";
import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import { deleteCityRequest } from "../../../services/api";
import "./delete-cities.css";

const DeleteCities = () => {
  const { selectedCity, setRefreshCityData } = useDataControlContext();
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();

  const handleDelete = async () => {
    try {
      const response = await deleteCityRequest(selectedCity?.id);
      setRefreshCityData((prev) => !prev);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
    setIsModalActive(false);
  };

  return (
    <div className="delete-cities-content">
      <div className="delete-cities-header">
        <h1>Excluir bairro</h1>
        <p>Deseja realmente excluir esta bairro?</p>
      </div>
      <div className="delete-cities-footer">
        <p>Clique no botão abaixo para confirmar</p>
        <button onClick={handleDelete}>
          <BsCheck2 size={40} />
        </button>
      </div>
    </div>
  );
};

export default DeleteCities;
