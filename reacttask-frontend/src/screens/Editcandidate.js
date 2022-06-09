import React from "react";

const Editcandidate = ({
  target,
  id,
  name,
  setName,
  email,
  setEmail,
  address,
  setAddress,
  result,
  setResult,
  age,
  setAge,
  state,
  setState,
  pincode,
  setPincode,
  dob,
  setDob,
  onClick,
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="editCandidateModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Candidate
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
              onClick={onClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editcandidate;
