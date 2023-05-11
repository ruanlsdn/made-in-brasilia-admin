import axios from "axios";
import iCreateCityDto from "../interfaces/iCreateCityDto";
import { iLoginDto } from "../interfaces/iLoginDto";
import { iPostDto } from "../interfaces/iPostDto";
import iUpdateCityDto from "../interfaces/iUpdateCityDto";
import { iUserDto } from "../interfaces/iUserDto";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// LOGIN REQUEST
export const loginRequest = async (dto: iLoginDto) => {
  return await api.post("/auth/login", dto);
};
// END OF LOGIN REQUEST

// CITY REQUEST
export const createCityRequest = async (dto: iCreateCityDto) => {
  return await api.post("/city", dto);
};

export const uploadCityImagesRequest = async (form: FormData) => {
  return await api.post("/city/images/upload", form);
};

export const listAllCityRequest = async () => {
  return await api.get("/city");
};

export const listAllPaginatedCityRequest = async (page: number | null) => {
  if (page === null) return await api.get("/city/paginated");
  return await api.get(`/city/paginated?page=${page}`);
};

export const updateCityRequest = async (
  id: string | undefined,
  dto: iUpdateCityDto
) => {
  return await api.put(`/city/${id}`, dto);
};

export const deleteCityRequest = async (id: string | undefined) => {
  return await api.delete(`/city/${id}`);
};

export const getCityIaTextsRequest = async (cityName: string) => {
  return await api.get(`/city/get-ai-texts/${cityName}`);
};
// END OF CITY REQUEST

// POST REQUEST
export const createPostRequest = async (dto: iPostDto) => {
  return await api.post("/post", dto);
};

export const uploadPostImagesRequest = async (form: FormData) => {
  return await api.post("/post/images/upload", form);
};

export const listPendingPostRequest = async (page: number | null) => {
  return await api.get(`/post/status/pending?page=${page}`);
};

export const listAllPostRequest = async (page: number | null) => {
  return await api.get(`/post?page=${page}`);
};

export const listAllPostCategoriesRequest = async () => {
  return await api.get("post-category");
};

export const updatePostRequest = async (
  id: string | undefined,
  dto: iPostDto
) => {
  return await api.put(`/post/${id}`, dto);
};

export const deletePostRequest = async (id: string | undefined) => {
  return await api.delete(`/post/${id}`);
};
// END OF POST REQUEST

// USER REQUEST
export const createUserRequest = async (dto: iUserDto) => {
  return await api.post("/user", dto);
};

export const findUniqueUserRequest = async (id: string) => {
  return await api.get(`/user/${id}`);
};

export const listAllPaginatedUserRequest = async (page: number | null) => {
  return await api.get(`/user?page=${page}`);
};

export const updateUserRequest = async (
  id: string | undefined,
  dto: iUserDto
) => {
  return await api.put(`/user/${id}`, dto);
};

export const deleteUserRequest = async (id: string | undefined) => {
  return await api.delete(`/user/${id}`);
};
