import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { PagesHeader } from "../../components";
import { useDataControlContext } from "../../contexts/DataControlContext";
import { iPost } from "../../dtos/iPost";
import { iPostDto } from "../../dtos/iPostDto";
import { listPendingPostRequest, updatePostRequest } from "../../services/api";
import "./pending-posts.css";

const PendingPosts = () => {
  const { refreshPostData, setRefreshPostData } = useDataControlContext();
  const [posts, setPosts] = useState<iPost[] | []>([]);

  const handlePaginationChange = async (page: number) => {
    try {
      const response = await listPendingPostRequest(page - 1);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleThumbsUp = async (id: string) => {
    try {
      const dto: iPostDto = {
        postStatusId: 2,
      };
      const response = await updatePostRequest(id, dto);
    } catch (error) {
      console.log(error);
    }
    setRefreshPostData((prev) => !prev);
  };

  const handleThumbsDown = async (id: string) => {
    try {
      const dto: iPostDto = {
        postStatusId: 3,
      };
      const response = await updatePostRequest(id, dto);
    } catch (error) {
      console.log(error);
    }
    setRefreshPostData((prev) => !prev);
  };

  const refreshData = async () => {
    try {
      const response = await listPendingPostRequest(0);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshPostData]);

  return (
    <div className="pending-posts">
      <PagesHeader />
      <div className="pending-posts-content">
        <TableContainer>
          <Table className="pending-posts-content-table" sx={{ minWidth: 650 }}>
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
                  <h3>AÇÕES</h3>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post, index) => (
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
                    <div className="pending-posts-thumbs-container">
                      <button
                        className="pending-posts-thumbs"
                        onClick={() => handleThumbsUp(post.id)}
                      >
                        <FiThumbsUp size={30} />
                      </button>
                      <button
                        className="pending-posts-thumbs"
                        onClick={() => handleThumbsDown(post.id)}
                      >
                        <FiThumbsDown size={30} />
                      </button>
                    </div>
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
    </div>
  );
};

export default PendingPosts;
