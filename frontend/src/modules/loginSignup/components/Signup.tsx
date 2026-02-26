import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { MailIcon, UserPen, KeyRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
export const Signup = () => {
  const [email, emailSetter] = useState("");
  const [password, passSetter] = useState("");
  const [rePassword, rePassSetter] = useState("");
  const [username, nameSetter] = useState("");
  const { mutate } = useSignup();
  const clickHandler = () => {
    if (password === rePassword) {
      mutate({ email, username, password });
    } else {
      window.alert("Reenter same password!");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
      <div className="grid w-full h-96 items-start max-w-sm gap-3 outline outline-1 px-5 py-3 outline-slate-400 rounded-xl ">
        <h1 className="text-3xl font-bold flex justify-center">Signup</h1>
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
            <UserPen />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            placeholder="Enter your username (optional)"
            onChange={(e) => nameSetter(e.target.value)}
          ></InputGroupInput>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <KeyRound />
          </InputGroupAddon>
          <InputGroupInput
            type="password"
            placeholder="Create your password"
            onChange={(e) => passSetter(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <KeyRound />
          </InputGroupAddon>
          <InputGroupInput
            type="password"
            placeholder="Enter your password again"
            onChange={(e) => rePassSetter(e.target.value)}
          />
        </InputGroup>
        <Button
          className="rounded-md bg-slate-400 text-black"
          onClick={clickHandler}
        >
          Signup
        </Button>
      </div>
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
