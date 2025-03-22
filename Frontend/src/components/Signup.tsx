import { useRecoilState, useSetRecoilState } from "recoil";
import { Cross } from "../icons/Cross";
import { Button } from "./Button";
import { Input } from "./Input";
import { SignupModelStatus } from "../store/atoms/SignupModelStatus";
import { SigninModelStatus } from "../store/atoms/SigninModelStatus";
import { useState } from "react";
import { AuthformDataProps } from "../types/FormData";
import axios from "axios";
import { URL } from "../utils/contants";
import { Alert } from "../icons/Alert";
import { Auth } from "../routes/auth";

export function Signup() {
  const [isSignupModelOpen, setIsSignupModelOpen] =
    useRecoilState(SignupModelStatus);
  const setIsSigninModelOpen = useSetRecoilState(SigninModelStatus);
  const { login } = Auth();

  let [formData, setFormData] = useState<AuthformDataProps>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<String>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  if (!isSignupModelOpen) {
    return null;
  }

  const onClickHandler = () => {
    setIsSignupModelOpen(false);
    setIsSigninModelOpen(true);
  };

  const handleChange = (name: string, value: string) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/signup`, formData);
      const token = response.data.token;
      console.log(token);
      const user = {
        id: response.data.user._id,
        username: response.data.user.username,
      };
      login(token, user);
      setIsSignupModelOpen(false);
      setIsLoading(false);
      setFormData({
        username: "",
        password: "",
      });
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400) {
          setError("Either username or password doesn't meet requirements");
          setIsLoading(false);
        } else if (err.response.status === 409) {
          setError("User already exists");
          setIsLoading(false);
        } else if (err.response.status === 500) {
          setError("Server error");
          setIsLoading(false);
        } else {
          setError(err.response.data.message || `An error occurred ${err}`);
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div onClick={() => setIsSignupModelOpen(false)}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          className="p-5 bg-white rounded-md flex flex-col justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between h-8">
            <div className="sm:font-2xl text-xl font-semibold pb-5 text-gray-700">
              Signup To Brainiac
            </div>
            <div
              className="text-gray-500 hover:text-gray-800 hover:cursor-pointer transition-colors p-1 rounded-full hover:bg-gray-100"
              onClick={() => setIsSignupModelOpen(false)}
            >
              <Cross />
            </div>
          </div>
          {error && (
            <div className="flex items-center bg-[#ff9b9b5b] border border-red-700 text-red-800 p-2 rounded-md mt-5 space-x-2 font-playwrite max-w-96">
              <Alert />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <Input
              text="Username"
              type="text"
              placeholder="Enter Username"
              name="username"
              formData={formData}
              onChange={handleChange}
              required={true}
            />
            <Input
              text="Password"
              type="password"
              placeholder="•••••••••••••••"
              name="password"
              formData={formData}
              onChange={handleChange}
              required={true}
            />
            <p className="text-sm text-left font-playwrite text-gray-700">
              Password must have: 6-20 chars,with lowercase, <br />
              uppercase, number, and special character
            </p>
            <Button
              variant="primary"
              text="Sign up"
              type="submit"
              size="lg"
              isLoading={isLoading}
            />
          </form>
          <div className="flex justify-center items-center mt-5 text-gray-700">
            <a
              href="#"
              className="hover:underline hover:text-purple-800"
              onClick={onClickHandler}
            >
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
