import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import { iUserDto } from "../../../dtos/iUserDto";
import { createUserRequest, updateUserRequest } from "../../../services/api";
import "./create-posts.css";

const USER_TYPES = ["COMUM", "MODERADOR", "ADMINISTRADOR"];

type CreatePostsProps = {
  modalOption: number;
};

const CreatePosts = ({ modalOption }: CreatePostsProps) => {
  const { setIsModalActive } = useApplicationControlContext();
  const { selectedUser, setRefreshUserData } = useDataControlContext();
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newUserType, setNewUserType] = useState<number>(0);

  const handleSubmit = async () => {
    const dto: iUserDto = {
      username: newUsername,
      password: newPassword,
      userTypeId: newUserType,
    };

    console.log(dto);

    try {
      if (modalOption === 1) {
        const response = await createUserRequest(dto);
        console.log(response);
      } else {
        const response = await updateUserRequest(selectedUser?.id, dto);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshUserData((prev) => !prev);
    setIsModalActive(false);
  };

  useEffect(() => {
    if (modalOption == 2) {
      setNewUsername(selectedUser.username);
      setNewPassword(selectedUser.password);
      setNewUserType(selectedUser.userType.id);
    }
  }, []);

  return (
    <div className="create-posts-content">
      <div className="create-posts-header">
        <h1>{modalOption === 1 ? "Adicionar usuário" : "Atualizar usuário"}</h1>
        <p>Preencha os campos abaixo com as informações do usuário</p>
      </div>
      <div className="create-posts-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              variant="outlined"
              label="Nome"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Informe um nome de usuário"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              placeholder="Informe a senha"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-select-small">Tipo</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Tipo"
                value={newUserType}
                onChange={(e) => {
                  setNewUserType(Number(e.target.value));
                  console.log(e.target.value);
                }}
              >
                <MenuItem value={0}>
                  <em>Selecione um tipo de usuário</em>
                </MenuItem>
                {USER_TYPES.map((type, index) => (
                  <MenuItem key={index} value={Number(index + 1)}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <button onClick={handleSubmit}>
        <BsCheck2 size={40} />
      </button>
    </div>
  );
};

export default CreatePosts;
