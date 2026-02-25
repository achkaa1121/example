import { Request, Response } from "express";
import User from "../models/User";
import Movie from "../models/Movie";
import bcrypt from "bcrypt";
export const loginSignup = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, { email: 1, password: 1 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", userId: user._id });
  } catch (e) {
    console.error(e, "Server error");
  }
};
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 12);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    const sortQuery: Record<string, -1> = {};
    if (req.query.search) {
      filter.title = { $regex: req.query.search as string, $options: "i" };
    }

    if (req.query.genre) {
      filter.genres = req.query.genre as string;
    }
    if (req.query.sort) {
      if (req.query.sort) {
        const sort = req.query.sort as string;
        switch (sort) {
          case "popular":
            sortQuery["imdb.votes"] = -1;
            break;
          case "newest":
            sortQuery["year"] = -1;
            break;
          case "highest":
            sortQuery["imdb.rating"] = -1;
        }
      }
    }
    const [movies, total] = await Promise.all([
      Movie.find(filter)
        .skip(skip)
        .limit(limit)
        .select(
          "title year runtime genres directors cast plot poster rated imdb awards type",
        )
        .sort(sortQuery),
      Movie.countDocuments(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      movies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const genres = await Movie.find().distinct("genres");
    res.json(genres);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
