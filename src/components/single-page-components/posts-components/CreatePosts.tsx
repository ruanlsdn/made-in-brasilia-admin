import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import iCity from "../../../interfaces/iCity";
import { iPostDto } from "../../../interfaces/iPostDto";
import {
  createPostRequest,
  listAllCityRequest,
  listAllPostCategoriesRequest,
  updatePostRequest,
  uploadPostImagesRequest,
} from "../../../services/api";
import "./create-posts.css";
import { iCategory } from "../../../interfaces/iCategory";

const WEEK_DAYS = [
  "SEGUNDA-FEIRA",
  "TERÇA-FEIRA",
  "QUARTA-FEIRA",
  "QUINTA-FEIRA",
  "SEXTA-FEIRA",
  "SÁBADO",
  "DOMINGO",
];

type CreatePostsProps = {
  modalOption: number;
};

const CreatePosts = ({ modalOption }: CreatePostsProps) => {
  const { selectedPost, setRefreshPostData } = useDataControlContext();
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();
  const [cities, setCities] = useState<iCity[]>([]);
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [newPostName, setNewPostName] = useState<string | undefined>("");
  const [newPostDescription, setNewPostDescription] = useState<
    string | undefined
  >("");
  const [newPostLocation, setNewPostLocation] = useState<string | undefined>(
    ""
  );
  const [newPostOpenTime, setNewPostOpenTime] = useState<string | undefined>(
    ""
  );
  const [newPostCloseTime, setNewPostCloseTime] = useState<string | undefined>(
    ""
  );
  const [newPostOpenDay, setNewPostOpenDay] = useState<string | undefined>("");
  const [newPostCloseDay, setNewPostCloseDay] = useState<string | undefined>(
    ""
  );
  const [newPostCityId, setNewPostCityId] = useState<string | undefined>("");
  const [newPostStatusId, setNewPostStatusId] = useState<number | undefined>(1);
  const [newPostCategory, setNewPostCategory] = useState<number | undefined>(
    undefined
  );
  const [postImages, setPostImages] = useState<FormData[] | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const array = e.target.files;
    let images: FormData[] = [];

    for (let index = 0; index < array!.length; index++) {
      const formData = new FormData();
      formData.append("file", array![index]);
      images.push(formData);
    }

    setPostImages(images);
  };

  const upload = async (form: FormData) => {
    try {
      await uploadPostImagesRequest(form);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
  };

  const handleSubmit = async () => {
    const dto: iPostDto = {
      name: newPostName,
      text: newPostDescription,
      location: newPostLocation,
      openDay: newPostOpenDay,
      closeDay: newPostCloseDay,
      openTime: newPostOpenTime,
      closeTime: newPostCloseTime,
      cityId: newPostCityId,
      postStatusId: newPostStatusId,
      postCategoryId: newPostCategory,
    };

    try {
      if (modalOption === 1) {
        const response = await createPostRequest(dto);

        if (response.status == 201) {
          postImages?.map((form) => {
            form.append("postId", response.data.id);
            upload(form);
          });
        }
      } else {
        const response = await updatePostRequest(selectedPost?.id, dto);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }

    setRefreshPostData((prev) => !prev);
    setIsModalActive(false);
  };

  const fetchCities = async () => {
    try {
      const response = await listAllCityRequest();
      setCities(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await listAllPostCategoriesRequest();
      setCategories(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
  };

  useEffect(() => {
    if (modalOption == 2) {
      setNewPostName(selectedPost?.name);
      setNewPostDescription(selectedPost?.text);
      setNewPostLocation(selectedPost?.location);
      setNewPostOpenDay(selectedPost?.openDay);
      setNewPostCloseDay(selectedPost?.closeDay);
      setNewPostOpenTime(selectedPost?.openTime);
      setNewPostCloseTime(selectedPost?.closeTime);
      setNewPostCityId(selectedPost?.cityId);
      setNewPostStatusId(selectedPost?.postStatusId);
      setNewPostCategory(selectedPost?.postCategory.id);
    }

    fetchCities();
    fetchCategories();
  }, []);

  return (
    <div className="create-posts-content">
      <div className="create-posts-header">
        <h1>{modalOption === 1 ? "Adicionar local" : "Atualizar local"}</h1>
        <p>Preencha os campos abaixo com as informações do local</p>
      </div>
      <div className="create-posts-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <span>Local</span>
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleImageUpload} multiple />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              variant="outlined"
              label="Nome"
              value={newPostName}
              onChange={(e) => setNewPostName(e.target.value)}
              placeholder="Informe o nome do local"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="Descrição"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
              variant="outlined"
              placeholder="Informe uma breve descrição sobre o local"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="Localização"
              value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)}
              variant="outlined"
              placeholder="Informe um link com a localização do local"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-select-small">Categoria</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Categoria"
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(Number(e.target.value))}
              >
                <MenuItem value="">
                  <em>Selecione uma categoria</em>
                </MenuItem>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <span>Funcionamento</span>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="form-text-input"
              type={"time"}
              id="outlined-basic"
              variant="outlined"
              value={newPostOpenTime}
              onChange={(e) => setNewPostOpenTime(e.target.value)}
              label="Abertura"
              placeholder="Horário de abertura do local"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="form-text-input"
              type={"time"}
              id="outlined-basic"
              variant="outlined"
              value={newPostCloseTime}
              onChange={(e) => setNewPostCloseTime(e.target.value)}
              label="Fechamento"
              placeholder="Horário de fechamento do local"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-select-small">De</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="De"
                value={newPostOpenDay}
                onChange={(e) => setNewPostOpenDay(e.target.value)}
              >
                <MenuItem value="">
                  <em>Selecione um dia da semana</em>
                </MenuItem>
                {WEEK_DAYS.map((day, index) => (
                  <MenuItem key={index} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-select-small">Até</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Até"
                value={newPostCloseDay}
                onChange={(e) => setNewPostCloseDay(e.target.value)}
              >
                <MenuItem value="">
                  <em>Selecione um dia da semana...</em>
                </MenuItem>
                {WEEK_DAYS.map((day, index) => (
                  <MenuItem key={index} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <span>Endereço</span>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-select-small">Bairro</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Bairro"
                value={newPostCityId}
                onChange={(e) => setNewPostCityId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Selecione uma bairro...</em>
                </MenuItem>
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city.id}>
                    {city.name}
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
