import React from "react";
import { PagesHeader } from "../../components";
import "./cities.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HiDotsVertical } from "react-icons/hi";
import { useStateContext } from "../../contexts/StateContext";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Cities = () => {
  const { setIsModalActive } = useStateContext();
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
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <span>{row.name}</span>
                  </TableCell>
                  <TableCell>
                    <span>{row.name}</span>
                  </TableCell>
                  <TableCell>
                    <span>{row.name}</span>
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
