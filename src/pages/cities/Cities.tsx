import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { PagesHeader } from "../../components";
import { useDataControllContext } from "../../contexts/DataControllContext";
import { useStateContext } from "../../contexts/StateContext";
import { listAllCityRequest } from "../../services/api";
import "./cities.css";

const Cities = () => {
  const { setIsModalActive } = useStateContext();
  const { refreshCityData } = useDataControllContext();
  const [cities, setCities] = useState([]);

  const refreshData = async () => {
    try {
      const response = await listAllCityRequest();
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(refreshCityData);
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
            onClick={() => setIsModalActive(true)}
          >
            <span>Adicionar</span>
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table className="cities-content-table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Nome</h3>
                </TableCell>
                <TableCell>
                  <h3>Título</h3>
                </TableCell>
                <TableCell>
                  <h3>Texto</h3>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <span>{city.name}</span>
                  </TableCell>
                  <TableCell>
                    <span>{city.title}</span>
                  </TableCell>
                  <TableCell>
                    <span>{city.text}</span>
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <HiDotsVertical size={25} color="white" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Cities;
