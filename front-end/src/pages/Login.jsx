import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callApi } from "../api/callApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await callApi("auth/login", "post", {
      email,
      password,
    });
    if (result && result.statusCode === 200) {
      localStorage.setItem("token", result.data.accessToken);
      navigate("/")
    }
  };

  return (
    <div>
      <h1
        className="text-3xl font-bold mt-9 text-center mb-8"
        data-testid="login-heading"
      >
        Login
      </h1>
      <div className="flex justify-center ">
        <form onSubmit={handleSubmit} className="w-3/4">
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                value={email}
                onChange={handleEmail}
                type="text"
                name="username"
                id="username"
                data-testid="username"
                className="px-3 py-2 bg-white border w-full"
                required
              />
            </div>
          </div>
          <div className="mt-6 w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                value={password}
                onChange={handlePassword}
                type="password"
                name="password"
                id="password"
                data-testid="password"
                className="px-3 py-2 bg-white border w-full"
                required
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              data-testid="submit"
              className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm w-2/4 text-white text-center"
            >
              Login
            </button>
            <div>
              <Link
                to="/sign-up"
                className={
                  "font-medium px-3 py-2 text-slate-700 rounded-lg hover:text-blue-500 "
                }
                // onClick={() => setPage("new")}
              >
                Create a new Account ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
