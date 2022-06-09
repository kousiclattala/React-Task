import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLoggedIn } from "../redux/authSlice";
import { signup } from "../utils/Config";
import { EMAIL_REG, PASSWORD_REG } from "../utils/Constants";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //handling signup
  const handleUserSignup = async () => {
    if (
      EMAIL_REG.test(email) === false &&
      PASSWORD_REG.test(password) === false &&
      phoneNumber.length !== 10
    ) {
      return setIsEmailEmpty(true), setIsPasswordEmpty(true);
    } else if (EMAIL_REG.test(email) === false) {
      return setIsEmailEmpty(true);
    } else if (PASSWORD_REG.test(password) === false) {
      return setIsPasswordEmpty(true);
    } else if (phoneNumber.length !== 10) {
      return setIsPhoneNumberEmpty(true);
    } else {
      setIsLoading(true);
      const user = {
        email,
        phoneNumber,
        password,
      };

      await axios
        .post(signup, user)
        .then((res) => {
          setIsLoading(false);
          console.log("res from user signup | ", res.data);
          toast.success(res.data.msg);
          dispatch(setIsLoggedIn(true));

          localStorage.setItem("@token", res.data.token);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("err from user signup | ", err.response.data);
          toast.error(err.response.data.msg);
        });
    }
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
          <h5 className="card-title text-center mb-5">Signup</h5>
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
                  EMAIL_REG.test(email) === false
                    ? setIsEmailEmpty(true)
                    : setIsEmailEmpty(false);
                }}
              />
              {isEmailEmpty && EMAIL_REG.test(email) === false && (
                <p className="text-danger fs-6">Please enter valid email id</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label fw-bold">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control w-100"
                id="phoneNumber"
                aria-describedby="phoneNumberHelp"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                maxLength={10}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setIsPhoneNumberEmpty(false);
                }}
                onMouseOut={() => {
                  phoneNumber.length !== 10
                    ? setIsPhoneNumberEmpty(true)
                    : setIsPhoneNumberEmpty(false);
                }}
              />
              {isPhoneNumberEmpty && (
                <p className="text-danger fs-6">
                  Phone number should be of 10 digits
                </p>
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
                  PASSWORD_REG.test(password) === false
                    ? setIsPasswordEmpty(true)
                    : setIsPasswordEmpty(false);
                }}
              />
              {isPasswordEmpty && PASSWORD_REG.test(password) === false && (
                <p className="text-danger fs-6">
                  Password should contain 1 uppercase, 1 lowercase, 1 number, 1
                  special character and must be min 6 characters
                </p>
              )}
              <p
                className="text-end fs-6 fw-lighter "
                style={{
                  color: "#06b1e0",
                }}
              >
                Minimum 6 alphanumeric
              </p>
            </div>

            <div className="d-flex justify-content-center mt-5">
              <button
                type="submit"
                className="btn text-white fw-bold px-5 py-3"
                style={{
                  backgroundColor: "#06b1e0",
                }}
                onClick={() => handleUserSignup()}
              >
                Sign Up
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

export default Signup;
