import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  CreatePosts,
  DeletePosts,
  PagesHeader,
  SharedMenu,
  SharedModal,
  SharedSnackbar,
} from "../../components";
import { useApplicationControlContext } from "../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../contexts/DataControlContext";
import { iPost } from "../../interfaces/iPost";
import { listAllPostRequest } from "../../services/api";
import "./posts.css";

const Posts = () => {
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();
  const { refreshPostData } = useDataControlContext();
  const [posts, setPosts] = useState<iPost[] | []>([]);
  const [modalOption, setModalOption] = useState<number>(0);

  const handlePaginationChange = async (page: number) => {
    try {
      const response = await listAllPostRequest(page - 1);
      setPosts(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
  };

  const refreshData = async () => {
    try {
      const response = await listAllPostRequest(0);
      setPosts(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshPostData]);

  return (
    <div className="posts">
      <PagesHeader />
      <div className="posts-content">
        <div className="posts-content_button">
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
          <Table className="posts-content-table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <h3>NOME</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>TEXTO</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>DIAS DE FUNCIONAMENTO</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>HORÁRIO DE FUNCIONAMENTO</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>CATEGORIA</h3>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post, index) =>
                post.postStatusId === 2 ? (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <span>{post.name}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{post.text}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{`${post.openDay} - ${post.closeDay}`}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{`${post.openTime} - ${post.closeTime}`}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{post.postCategory.description}</span>
                    </TableCell>
                    <TableCell />
                    <TableCell>
                      <SharedMenu
                        entity={post}
                        setModalOption={setModalOption}
                      />
                    </TableCell>
                  </TableRow>
                ) : null
              )}
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
        <SharedModal children={<CreatePosts modalOption={modalOption} />} />
      ) : (
        <SharedModal children={<DeletePosts />} />
      )}
      <SharedSnackbar />
    </div>
  );
};

export default Posts;
