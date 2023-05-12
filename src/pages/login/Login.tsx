import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SharedSnackbar } from "../../components";
import { useApplicationControlContext } from "../../contexts/ApplicationControlContext";
import { useAuthControlContext } from "../../contexts/AuthControlContext";
import { iLoginDto } from "../../interfaces/iLoginDto";
import "./login.css";

const Login = () => {
  const { signIn } = useAuthControlContext();
  const { setIsSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } =
    useApplicationControlContext();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto: iLoginDto = {
      username: newUsername,
      password: newPassword,
    };

    try {
      const response = await signIn(dto);
      if (response) navigate("/home");
    } catch (error) {
      const err = error as Error;
      setIsSnackbarOpen(true);
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className="login-container scale-up-hor-center-02">
      <div className="login-form-container gradient-bg ">
        <h1>Bem-vindo de volta</h1>
        <p>Preencha o formulário abaixo para entrar</p>
        <form className="login-form " onSubmit={handleSubmit}>
          <div className="login-form-input-container">
            <TextField
              className="login-form-input"
              id="username"
              placeholder="Usuário"
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <TextField
              className="login-form-input"
              type={"password"}
              id="password"
              placeholder="Senha"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="gradient-bg-colorful" type="submit">
            <span>Entrar</span>
          </button>
        </form>
      </div>
      <SharedSnackbar />
    </div>
  );
};

export default Login;
