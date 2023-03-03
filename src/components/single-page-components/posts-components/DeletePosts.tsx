import { BsCheck2 } from "react-icons/bs";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import { deletePostRequest } from "../../../services/api";
import "./delete-posts.css";

const DeleteCities = () => {
  const { selectedPost, setRefreshPostData } = useDataControlContext();
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();

  const handleDelete = async () => {
    try {
      const response = await deletePostRequest(selectedPost?.id);
      setRefreshPostData((prev) => !prev);
      console.log(response);
    } catch (error) {
      const err = error as Error;
      setIsSnackbarOpen(true);
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
    }
    setIsModalActive(false);
  };

  return (
    <div className="delete-posts-content">
      <div className="delete-posts-header">
        <h1>Excluir local</h1>
        <p>Deseja realmente excluir este local?</p>
      </div>
      <div className="delete-posts-footer">
        <p>Clique no botão abaixo para confirmar</p>
        <button onClick={handleDelete}>
          <BsCheck2 size={40} />
        </button>
      </div>
    </div>
  );
};

export default DeleteCities;
