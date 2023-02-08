import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useStateContext } from "../../contexts/StateContext";
import { BsArrowRepeat, BsCheck2, BsSearch } from "react-icons/bs";
import "./modal.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = () => {
  const { isModalActive, setIsModalActive } = useStateContext();
  const response = false;
  const json = JSON.stringify({
    pessoa: {
      nome: "João Silva",
      idade: 30,
      endereço: {
        rua: "Rua ABC",
        numero: 123,
        cidade: "São Paulo",
        país: "Brasil",
      },
    },
  });

  return (
    <div>
      <Modal
        open={isModalActive}
        onClose={() => setIsModalActive(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-content">
            <div className="modal-header">
              <h1>Adicionar cidade</h1>
              <p>
                Este cadastro é automatizado por inteligência artificial.
                Preencha o formulário, aguarde o resultado e confirme para
                salvar ou tente novamente para gerar um novo texto.
              </p>
            </div>
            <div className="modal-form">
              <TextField
                className="modal-form-input"
                id="outlined-basic"
                label="Nome da cidade"
                placeholder="Informe o nome da cidade..."
                variant="outlined"
              />
              <button className="gradient-bg-colorful">
                <BsSearch size={30} />
              </button>
            </div>
            {response && (
              <div className="modal-ia-response">
                <span>{json}</span>
              </div>
            )}
            <div className="modal-footer">
              <button>
                <BsCheck2 size={30} />
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
