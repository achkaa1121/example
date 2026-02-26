import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Film, LogIn } from "lucide-react";
import { useMovies } from "@/modules/movies/hooks/useMovies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";
import { useGenres } from "@/modules/movies/hooks/useGenres";
import * as React from "react";
("use client");
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const MoviesView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );
  const [open, setOpen] = React.useState(false);
  const sort = searchParams.get("sort") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";
  const selectedGenre = searchParams.get("genre") ?? "";
  const { data, isLoading, isError, refetch } = useMovies({
    page,
    sort: sort || "",
    limit: 20,
    search: search || undefined,
    genre: selectedGenre || undefined,
  });

  const movies = data?.movies ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;
  const {
    data: genres,
    isLoading: genreLoading,
    isError: genreError,
  } = useGenres();
  const setParam = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => {
        if (v) next.set(k, v);
        else next.delete(k);
      });
      return next;
    });
  };
  const handleSort = (value: string) => {
    setParam({ sort: value, page: "1" });
    setOpen(false);
  };
  const sortClear = () => {
    setOpen(false);
    setParam({ sort: "", page: "1" });
  };
  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    setParam({ search: searchInput, page: "1" });
  };
  const handleGenreSelect = (genre: string) => {
    setParam({ genre: selectedGenre === genre ? "" : genre, page: "1" });
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <Film className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">Movies</span>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  <DropdownMenuRadioItem value="popular">
                    Popularity
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="highest">
                    Rating
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">
                    Latest
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <button
                className="flex justify-start pl-2 px-2 py-1.5 text-sm font-semibold hover:bg-slate-100 rounded-sm w-full"
                onClick={sortClear}
              >
                Clear sort
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/user/login">
            <Button
              variant="outline"
              size="icon"
              className="relative group w-11"
            >
              <LogIn />
              <div className="absolute max-w-11 left-0 top-full mt-2 hidden group-hover:block bg-white text-black text-sm px-1 py-1 rounded outline outline-1 outline-slate-100">
                <p>Login</p>
              </div>
            </Button>
          </Link>
          {total > 0 && (
            <span className="text-muted-foreground text-sm ml-auto hidden md:block">
              {total.toLocaleString()} movies
            </span>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={!selectedGenre ? "default" : "outline"}
            size="sm"
            onClick={() => setParam({ genre: "", page: "1" })}
            className="rounded-full text-xs"
          >
            All
          </Button>
          {genres?.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => handleGenreSelect(genre)}
              className="rounded-full text-xs"
            >
              {genre}
            </Button>
          ))}
        </div>

        {(search || selectedGenre || sort) && (
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <span>Showing results for:</span>
            {search && <Badge variant="secondary">"{search}"</Badge>}
            {selectedGenre && (
              <Badge variant="secondary">{selectedGenre}</Badge>
            )}
            {sort && <Badge variant={"secondary"}>{sort}</Badge>}
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => {
                setSearchInput("");
                setParam({ search: "", genre: "", page: "1", sort: "" });
              }}
            >
              Clear all
            </Button>
          </div>
        )}

        {isError ||
          (genreError && (
            <div className="border border-destructive/50 text-destructive rounded-lg p-6 text-center mb-6">
              <p className="font-medium">
                Failed to load movies. Make sure the backend server is running.
              </p>
              <Button
                variant="destructive"
                onClick={() => refetch()}
                className="mt-3"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          ))}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading || genreLoading
            ? Array.from({ length: 20 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={() => navigate(`/movies/${movie._id}`)}
                />
              ))}
        </div>

        {!isLoading && !isError && movies.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No movies found</p>
            <p className="text-sm mt-1">
              Try a different search or genre filter.
            </p>
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setParam({ page: String(Math.max(1, page - 1)) })}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setParam({ page: String(Math.min(totalPages, page + 1)) })
              }
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export { MoviesView };
