import axios from "axios";
import type { Movie, MoviesResponse, GetMoviesParams } from "@/types/movie";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

export const getMovies = async (
  params: GetMoviesParams = {},
): Promise<MoviesResponse> => {
  const { data } = await api.get<MoviesResponse>("/movies", { params });
  return data;
};

export const getMovie = async (id: string): Promise<Movie> => {
  const { data } = await api.get<Movie>(`/movies/${id}`);
  return data;
};
export const getGenres = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/movies/genres");
  return data;
};
export default api;
