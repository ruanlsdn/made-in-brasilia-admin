import axios from "axios";
import iCreateCityDto from "../dtos/iCreateCityDto";
import iUpdateCityDto from "../dtos/iUpdateCityDto";
import { iPostDto } from "../dtos/iPostDto";

const api = axios.create({ baseURL: "http://localhost:3000/" });

// CITY REQUEST
export const createCityRequest = async (dto: iCreateCityDto) => {
  return await api.post("/city", dto);
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
  return await api.get(`city/get-ai-texts/${cityName}`);
};
// END OF CITY REQUEST

// POST REQUEST
export const createPostRequest = async (dto: iPostDto) => {
  return await api.post("/post", dto);
};

export const listPendingPostRequest = async (page: number | null) => {
  return await api.get(`/post/pending?page=${page}`);
};

export const listAllPostRequest = async (page: number | null) => {
  return await api.get(`/post?page=${page}`);
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
