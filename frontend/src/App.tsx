import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesPage from "@/pages/movies/MoviesPage";
import MovieDetailPage from "@/pages/movies/MovieDetailPage";
import { Login } from "./modules/user/loginSignup/components/Login";
import { Signup } from "./modules/user/loginSignup/components/Signup";
import { AuthContextProvider } from "./modules/user/admin/components/auth/AuthContextProvider";
import { AdminLayout } from "./modules/user/admin/components/AdminLayout";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route element={<AuthContextProvider />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="create-movie" element={<div>create-movie</div>} />
            <Route path="get-comments" element={<div>get-movies</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
