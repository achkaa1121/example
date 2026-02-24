import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/services/api";
import type { GetMoviesParams } from "@/types/movie";
export const useMovies = (params: GetMoviesParams) =>
  useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
  });
