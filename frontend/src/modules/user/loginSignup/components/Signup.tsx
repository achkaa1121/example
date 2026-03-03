import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { MailIcon, UserPen, KeyRound } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
export const Signup = () => {
  const { mutate } = useSignup();
  const signupFormSchema = z
    .object({
      email: z.email(),
      username: z.string(),
      password: z.string(),
      rePassword: z.string(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Password don't match",
      path: ["resPassword"],
    });
  const { handleSubmit, register } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      rePassword: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = (data) => {
    mutate(data);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full h-96 items-start max-w-sm gap-3 outline outline-1 px-5 py-3 outline-slate-400 rounded-xl ">
          <h1 className="text-3xl font-bold flex justify-center">Signup</h1>
          <InputGroup className="">
            <InputGroupInput
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <UserPen />
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              placeholder="Enter your username (optional)"
              {...register("username")}
            ></InputGroupInput>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <KeyRound />
            </InputGroupAddon>
            <InputGroupInput
              type="password"
              placeholder="Create your password"
              {...register("password")}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <KeyRound />
            </InputGroupAddon>
            <InputGroupInput
              type="password"
              placeholder="Enter your password again"
              {...register("rePassword")}
            />
          </InputGroup>
          <Button className="rounded-md bg-slate-400 text-black" type="submit">
            Signup
          </Button>
        </div>
      </form>
      <div>
        <span>
          {"Already have a account? "}
          <Link to="/user/login">
            <button className=" text-blue-500 cursor-pointer">Login</button>
          </Link>
        </span>
      </div>
    </div>
  );
};
