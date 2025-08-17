import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordInputType, setPasswordInputType] = useState("password");

  const handleSetPasswordVisible = () => {
    passwordInputType === "password"
      ? setPasswordInputType("text")
      : setPasswordInputType("password");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    const req = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (req.status === 404) {
      console.error(res.message);
      return;
    }

    if (req.status === 401) {
      console.error(res.message);
      return;
    }

    if (req.status === 201) {
      localStorage.setItem("accessToken", res.access_token);
      console.log(localStorage.getItem("accessToken"));
      return;
    }
  }

  return (
    <>
      <div className="absolute inset-0 bg-gradient-feature z-0 opacity-50"></div>

      <div className="w-screen h-screen flex pt-16 items-center justify-center">
        <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[25%] h-auto bg-background z-30 relative flex justify-center items-center shadow-xl flex-col border-[0.1rem] border-border rounded-xl">
          <div className="w-full h-2.5 bg-gradient-to-r from-purple-500 to-orange-400 absolute top-0 rounded-t-xl"></div>

          <h1 className="text-foreground text-[2rem] font-semibold mt-16">
            Faça seu login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="
  w-full h-full flex flex-col items-center justify-center gap-4 
  py-4 sm:py-4 md:py-6 lg:py-8 xl:py-11
  px-4 sm:px-6 md:px-10 lg:px-8 xl:px-10
"
          >
            <div className="w-full flex flex-col gap-2">
              <p className="text-foreground/80 text-[1rem] font-semibold">
                Email
              </p>
              <input
                type="email"
                placeholder="johndoe@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full p-2 bg-input/20 border-[1px] border-border hover:bg-input/30 focus:bg-input/30 text-foreground/50 hover:text-foreground/80 placeholder:text-foreground/40 focus:text-foreground/80  transition-colors duration-300 ease-in-out text-[1rem] rounded-sm outline-none"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className="text-foreground/80 text-[1rem] font-semibold">
                Password
              </p>
              <div className="w-full bg-input/20 flex border-[1px] border-border hover:bg-input/30 focus:bg-input/30 text-foreground/50 hover:text-foreground/80 placeholder:text-foreground/40 focus:text-foreground/80  transition-colors duration-300 ease-in-out text-[1rem] rounded-sm outline-none">
                <input
                  type={passwordInputType}
                  placeholder="●●●●●●●●●●●●●"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full p-2 bg-transparent text-foreground/50 hover:text-foreground/80 placeholder:text-foreground/40 focus:text-foreground/80  transition-colors duration-300 ease-in-out text-[1rem] rounded-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleSetPasswordVisible}
                  className="text-foreground/50 px-3 hover:text-foreground/80 transition-colors flex justify-center items-center duration-300 ease-in-out"
                >
                  {passwordInputType === "password" ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-foreground text-background shadow-xl mt-5 font-semibold text-[1rem] rounded-sm hover:opacity-90 transition-opacity duration-300 ease-in-out"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
