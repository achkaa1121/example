import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MailIcon, KeyRound, ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
export const Login = () => {
  const [email, emailSetter] = useState("");
  const [password, passSetter] = useState("");
  const { mutate } = useLogin();
  const clickHandler = () => {
    mutate({ email, password });
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
        <Button variant="outline" size="icon" className="absolute top-4 left-4">
          <ArrowBigLeft />
        </Button>
        <div className="grid w-full h-64 items-start max-w-sm gap-3 outline outline-1 px-5 py-3 outline-slate-400 rounded-xl ">
          <h1 className="text-3xl font-bold flex justify-center">Login</h1>
          <InputGroup className="">
            <InputGroupInput
              type="email"
              placeholder="Enter your email"
              onChange={(e) => emailSetter(e.target.value)}
            />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <KeyRound />
            </InputGroupAddon>
            <InputGroupInput
              type="password"
              placeholder="Enter your password"
              onChange={(e) => passSetter(e.target.value)}
            />
          </InputGroup>
          <Button
            className="rounded-md bg-slate-400 text-black"
            onClick={clickHandler}
          >
            Login
          </Button>
        </div>
        <div>
          <span>
            {"Don't have a account? "}
            <Link to="/user/signup">
              <button className=" text-blue-500 cursor-pointer">Signup</button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
