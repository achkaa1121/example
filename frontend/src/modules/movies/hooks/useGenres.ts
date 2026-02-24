import { getGenres } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
