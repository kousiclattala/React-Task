import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLoggedIn } from "../redux/authSlice";
import { forgotPassword, signup } from "../utils/Config";
import { EMAIL_REG } from "../utils/Constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isRePasswordEmpty, setIsRePasswordEmpty] = useState(false);

  //handling forgot password
  const handleResetPassword = async () => {
    const user = {
      email,
      password,
    };

    await axios
      .post(forgotPassword, user)
      .then((res) => {
        console.log("res from forgotpassword | ", res.data);
        toast.success(res.data.msg);
        dispatch(setIsLoggedIn(true));

        localStorage.setItem("@token", res.data.token);
      })
      .catch((err) => {
        console.log("err from forgotpassword | ", err.response.data);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card w-25">
        <div className="card-body px-5">
          <h5 className="card-title text-center mb-5">Reset Password</h5>
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
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">
                Re-Enter Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repassword"
                placeholder="Re-Enter Password"
                value={rePassword}
                minLength={6}
                onChange={(e) => {
                  setRePassword(e.target.value);
                  setIsRePasswordEmpty(false);
                }}
                onMouseOut={() => {
                  rePassword.length !== 6
                    ? setIsRePasswordEmpty(true)
                    : setIsRePasswordEmpty(false);
                }}
              />
              {isRePasswordEmpty && (
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
                onClick={() => handleResetPassword()}
              >
                Reset Password
              </button>
            </div>
          </form>
          <div className="my-4">
            <span className="fs-6">
              Already have an account ?,
              <span
                className="fw-bold"
                style={{
                  color: "#06b1e0",
                }}
                role="button"
                onClick={() => navigate("/signin")}
              >
                {" "}
                Login Here
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
