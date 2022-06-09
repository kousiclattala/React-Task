import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCandidate } from "../utils/Config";

function CreateCandidateModal({ getAllCandidatesData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [state, setState] = useState("");
  const [age, setAge] = useState(0);
  const [pincode, setPincode] = useState(0);

  const [target, setTarget] = useState("");

  //creating the user
  const handleCreateCandidate = async () => {
    const token = localStorage.getItem("@token");

    if (
      !name ||
      !email ||
      !dob ||
      !address ||
      !state ||
      !result ||
      !age ||
      !pincode
    ) {
      return toast.error("Please include all fields"), setTarget("");
    } else {
      setTarget("modal");
      const candidate = {
        name,
        email,
        dob,
        address,
        state,
        result: result.toLowerCase(),
        age,
        pincode,
      };

      await axios
        .post(createCandidate, candidate, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("res from create candidate ", res.data);
          toast.success(res.data.msg);
          getAllCandidatesData();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.msg);
        });
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-none mt-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{
          color: "#06b1e0",
        }}
        onClick={() => {
          setName("");
          setEmail("");
          setAddress("");
          setAge(0);
          setDob("");
          setResult("");
          setPincode(0);
          setState("");
        }}
      >
        + Add new candidate
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Candidate
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-5">
              <form>
                <div className="row g-5 mb-4">
                  <div className="col">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      aria-label="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>

                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email id"
                      aria-label="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row g-5 mb-4">
                  <div className="col">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter your address"
                      aria-label="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="result" className="form-label">
                      Result
                    </label>

                    <div className="dropdown w-100">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {result ? result : "Select Result Status"}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <p
                            className="dropdown-item"
                            onClick={(e) => setResult(e.target.innerText)}
                          >
                            Shortlist
                          </p>
                        </li>
                        <li>
                          <p
                            className="dropdown-item"
                            onClick={(e) => setResult(e.target.innerText)}
                          >
                            Selected
                          </p>
                        </li>
                        <li>
                          <p
                            className="dropdown-item"
                            onClick={(e) => setResult(e.target.innerText)}
                          >
                            Rejected
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row g-5 mb-4">
                  <div className="col">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>

                    <input
                      type="text"
                      name="dob"
                      className="form-control"
                      placeholder="Enter your Date of Birth"
                      aria-label="Date of Birth"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      placeholder="Enter your State"
                      aria-label="State"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row g-5 mb-4">
                  <div className="col">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>

                    <input
                      type="text"
                      name="age"
                      className="form-control"
                      placeholder="Enter your Age"
                      aria-label="Age"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      placeholder="Enter your Pincode"
                      aria-label="Pincode"
                      value={pincode}
                      maxLength={6}
                      onChange={(e) => {
                        setPincode(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn px-5 py-3"
                data-bs-dismiss="modal"
                style={{
                  borderColor: "#06b1e0",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn  px-5 py-3"
                data-bs-dismiss={target}
                style={{
                  backgroundColor: "#06b1e0",
                  color: "#fff",
                }}
                onClick={() => handleCreateCandidate()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCandidateModal;
