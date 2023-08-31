import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/thunks";
import { joiResolver } from "@hookform/resolvers/joi";
import { schemaLogin } from "./validations";
import Input from "../../Shared/Input";
import { AppDispatch } from "../../../redux/types";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: joiResolver(schemaLogin),
  });

  const onSubmit = (data: FormData) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input<FormData>
        name="email"
        title="Email"
        register={register}
        error={errors.email?.message}
      />
      <Input<FormData>
        name="password"
        title="Password"
        type="password"
        register={register}
        error={errors.password?.message}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;