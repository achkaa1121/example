import type { LoginSignup } from "@/types/loginSignup";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  useMutation({
    mutationFn: async (value: LoginSignup) => {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    },
  });
};
