import type { Login } from "@/types/loginSignup";
import { useMutation } from "@tanstack/react-query";
export const useLogin = () => {
  return useMutation({
    mutationFn: async (value: Login) => {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      return response.json();
    },
  });
};
