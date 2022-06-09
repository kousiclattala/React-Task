import React, { useState } from "react";
import axios from "axios";
import { signin } from "../utils/Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/authSlice";
import { EMAIL_REG } from "../utils/Constants";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //handling signin
  const handleUserSignin = async () => {
    console.log("inside api call method");

    setIsLoading(true);
    const user = {
      email,
      password,
    };

    await axios
      .post(signin, user)
      .then((res) => {
        console.log("inside api call method", res.data);
        toast.success(res.data.msg);
        setIsLoading(false);
        dispatch(setIsLoggedIn(true));
        localStorage.setItem("@token", res.data.token);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.msg);
        console.log(err);
        dispatch(setIsLoading(false));
      });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-content-center">
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card w-25">
        <div className="card-body px-5">
          <h5 className="card-title text-center mb-5">Signin</h5>
          <form>
            <div className="mb-4">
              <label htmlFor="emailId" className="form-label fw-bold">
                Email id
              </label>
              <input
                type="email"
                className="form-control w-100"
                id="emailId"
                aria-describedby="emailHelp"
                placeholder="Enter Email Id"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailEmpty(false);
                }}
                onMouseOut={() => {
                  EMAIL_REG.test(email) == false
                    ? setIsEmailEmpty(true)
                    : setIsEmailEmpty(false);
                }}
              />
              {isEmailEmpty && EMAIL_REG.test(email) == false && (
                <p className="text-danger fs-6">Please enter valid email id</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                minLength={6}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordEmpty(false);
                }}
                onMouseOut={() => {
                  password.length !== 6
                    ? setIsPasswordEmpty(true)
                    : setIsPasswordEmpty(false);
                }}
              />
              {isPasswordEmpty && (
                <p className="text-danger fs-6">Please enter valid password</p>
              )}
              <p
                className="text-end fs-6 fw-lighter "
                style={{
                  color: "#06b1e0",
                }}
              >
                Minimum 8 alphanumeric
              </p>
            </div>

            <div className="d-flex justify-content-center mt-5">
              <button
                type="submit"
                className="btn text-white fw-bold px-5 py-3"
                style={{
                  backgroundColor: "#06b1e0",
                }}
                onClick={() => handleUserSignin()}
              >
                Sign In
              </button>
            </div>

            {/* {isLoading ? (
              <div className="d-flex justify-content-center mt-5 btn text-white fw-bold px-5 py-3">
                <span
                  className="spinner-border spinner-grow-sm "
                  role="status"
                  aria-hidden="true"
                ></span>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <button
                  type="submit"
                  className="btn text-white fw-bold px-5 py-3"
                  style={{
                    backgroundColor: "#06b1e0",
                  }}
                  onClick={() => handleUserSignin()}
                >
                  Sign In
                </button>
              </div>
            )} */}
          </form>
          <div className="my-4">
            <p className="fs-6">
              Forgot Password ?,
              <span
                className="fw-bold fs-6"
                style={{
                  color: "#06b1e0",
                }}
                onClick={() => navigate("/forgot")}
                role="button"
              >
                {" "}
                Reset Now
              </span>
            </p>
          </div>
          <div className="my-4">
            <span className="fs-6">
              Don't have an account ?,
              <span
                className="fw-bold"
                style={{
                  color: "#06b1e0",
                }}
                onClick={() => navigate("/signup")}
                role="button"
              >
                {" "}
                Signup Here
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
