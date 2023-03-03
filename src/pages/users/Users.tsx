import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  PagesHeader,
  SharedMenu,
  SharedModal,
  SharedSnackbar,
} from "../../components";
import CreateUsers from "../../components/single-page-components/users-components/CreateUsers";
import DeleteUsers from "../../components/single-page-components/users-components/DeleteUsers";
import { useApplicationControlContext } from "../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../contexts/DataControlContext";
import { iUser } from "../../interfaces/iUser";
import { listAllPaginatedUserRequest } from "../../services/api";
import "./users.css";

const Users = () => {
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();
  const { refreshUserData } = useDataControlContext();
  const [users, setUsers] = useState<iUser[] | []>([]);
  const [modalOption, setModalOption] = useState<number>(0);

  const handlePaginationChange = async (page: number) => {
    try {
      const response = await listAllPaginatedUserRequest(page - 1);
      setUsers(response.data);
    } catch (error) {
      const err = error as Error;
      setIsSnackbarOpen(true);
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
    }
  };

  const refreshData = async () => {
    try {
      const response = await listAllPaginatedUserRequest(0);
      setUsers(response.data);
    } catch (error) {
      const err = error as Error;
      setIsSnackbarOpen(true);
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshUserData]);

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
                  <h3>TIPO</h3>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <span>{user.id}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{user.username}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{user.userType.description}</span>
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <SharedMenu entity={user} setModalOption={setModalOption} />
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
      {modalOption == 1 || modalOption == 2 ? (
        <SharedModal children={<CreateUsers modalOption={modalOption} />} />
      ) : (
        <SharedModal children={<DeleteUsers />} />
      )}
      <SharedSnackbar />
    </div>
  );
};

export default Users;
