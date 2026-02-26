import { Router } from "express";
import {
  getMovies,
  getMovieById,
  getGenres,
} from "../controllers/movieController";

const moviesRouter = Router();
moviesRouter.get("/genres", getGenres);
moviesRouter.get("/", getMovies);
moviesRouter.get("/:id", getMovieById);
export default moviesRouter;
