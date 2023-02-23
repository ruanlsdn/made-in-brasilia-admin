import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  CreateCities,
  DeleteCities,
  PagesHeader,
  SharedMenu,
  SharedModal,
  UpdateCities,
} from "../../components";
import { useApplicationControlContext } from "../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../contexts/DataControlContext";
import iCity from "../../interfaces/iCity";
import { listAllPaginatedCityRequest } from "../../services/api";
import "./cities.css";

const Cities = () => {
  const { setIsModalActive } = useApplicationControlContext();
  const { refreshCityData } = useDataControlContext();
  const [cities, setCities] = useState<iCity[] | []>([]);
  const [modalOption, setModalOption] = useState<number>(0);

  const handlePaginationChange = async (page: number) => {
    try {
      const response = await listAllPaginatedCityRequest(page - 1);
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshData = async () => {
    try {
      const response = await listAllPaginatedCityRequest(null);
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshCityData]);

  return (
    <div className="cities">
      <PagesHeader />
      <div className="cities-content">
        <div className="cities-content_button">
          {/* <input className="" /> */}
          <button
            className=" gradient-bg-colorful"
            onClick={() => {
              setModalOption(1);
              setIsModalActive(true);
            }}
          >
            <span>Adicionar</span>
          </button>
        </div>
        <TableContainer>
          <Table className="cities-content-table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <h3>ID</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>NOME</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>TÍTULO</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>TEXTO</h3>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <span>{city.id}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{city.name}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{city.title}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{city.text}</span>
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <SharedMenu entity={city} setModalOption={setModalOption} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className="pagination"
          color="primary"
          count={999}
          onChange={(e, page) => handlePaginationChange(page)}
        />
      </div>
      {modalOption == 1 && <SharedModal children={<CreateCities />} />}
      {modalOption == 2 && <SharedModal children={<UpdateCities />} />}
      {modalOption == 3 && <SharedModal children={<DeleteCities />} />}
    </div>
  );
};

export default Cities;
