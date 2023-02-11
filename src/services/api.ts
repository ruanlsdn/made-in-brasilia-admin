import axios from "axios";
import iCreateCityDto from "../dtos/iCreateCityDto";
import iUpdateCityDto from "../dtos/iUpdateCityDto";

const api = axios.create({ baseURL: "http://localhost:3000/" });

// CITY REQUEST
export const createCityRequest = async (dto: iCreateCityDto) => {
  return await api.post("/city", dto);
};

export const listAllCityRequest = async (page: number | null) => {
  if (page === null) return await api.get("/city/list-all");
  return await api.get(`/city/list-all?page=${page}`);
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
