import { Router } from "express";
import {
  getMovies,
  getMovieById,
  getGenres,
} from "../controllers/movieController";

const router = Router();
router.get("/genres", getGenres);
router.get("/", getMovies);
router.get("/:id", getMovieById);
export default router;
