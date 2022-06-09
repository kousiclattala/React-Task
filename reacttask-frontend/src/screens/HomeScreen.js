import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCandidates, setIsLoggedIn } from "../redux/authSlice";
import {
  deleteCandidate,
  getAllCandidates,
  getSingleCandidateData,
  updateSingleCandidate,
} from "../utils/Config";
import axios from "axios";
import CreateCandidateModal from "./CreateCandidateModal";
import Editcandidate from "./Editcandidate";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.auth);

  const [candidateId, setCandidateId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [state, setState] = useState("");
  const [age, setAge] = useState(0);
  const [pincode, setPincode] = useState(0);

  // const [target, setTarget] = useState("modal");

  //handling logout
  const handleLogout = () => {
    const res = localStorage.removeItem("@token");
    console.log("res after localstorage clear ", res);
    dispatch(setIsLoggedIn(false));
  };

  //getting all candidates details
  const getAllCandidatesData = async () => {
    const token = localStorage.getItem("@token");

    await axios
      .get(getAllCandidates, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(setCandidates(res.data.candidates));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handling deleting candidate
  const handleDeleteCandidate = async (id) => {
    const token = localStorage.getItem("@token");

    await axios
      .delete(`${deleteCandidate}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success(res.data.msg);
        getAllCandidatesData();
      })
      .catch((err) => {
        console.log("err from delete candidate", err.response.data);
        toast.error(err.response.data.msg);
      });
  };

  //handling to get single candidate
  const getSingleCandidate = async (id) => {
    const token = localStorage.getItem("@token");

    await axios
      .get(`${getSingleCandidateData}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const { name, email, address, result, dob, age, state, pincode } =
          res.data.candidate;

        setName(name);
        setEmail(email);
        setAddress(address);
        setResult(result);
        setDob(dob);
        setAge(age);
        setState(state);
        setPincode(pincode);
      })
      .catch((err) => {
        console.log("err from get single candidate ", err.response.data);
      });
  };

  //handling to update single candidate
  const handleUpdateSingleCandidate = async (id) => {
    if (
      !name ||
      !email ||
      !address ||
      !result ||
      !dob ||
      !age ||
      !state ||
      !pincode
    ) {
      return toast.error("Please include all fileds");
    } else {
      const token = localStorage.getItem("@token");

      const candidate = {
        name,
        email,
        address,
        result: result.toLowerCase(),
        dob,
        age,
        state,
        pincode,
      };

      await axios
        .put(`${updateSingleCandidate}/${id}`, candidate, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success(res.data.msg);
          getAllCandidatesData();
        })
        .catch((err) => {
          console.log("err from update single candidate | ", err.response.data);
          toast.error(err.response.data.msg);
        });
    }
  };

  useEffect(() => {
    getAllCandidatesData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-5">
        <p onClick={(e) => console.log(e.target.outerText)}>
          Candidates List: {candidates.length}
        </p>
        <button className="btn btn-danger" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Email</th>
                <th scope="col">Result</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{candidate.name}</td>
                  <td>{candidate.dob}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.result}</td>
                  <FiEdit2
                    size={40}
                    color="#06b1e0"
                    data-bs-toggle="modal"
                    data-bs-target="#editCandidateModal"
                    onClick={() => {
                      getSingleCandidate(candidate._id);
                      setCandidateId(candidate._id);
                    }}
                  />
                  <RiDeleteBin6Line
                    size={40}
                    color="#06b1e0"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteCandidateModal"
                    onClick={() => setCandidateId(candidate._id)}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateCandidateModal getAllCandidatesData={getAllCandidatesData} />

      <Editcandidate
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        address={address}
        setAddress={setAddress}
        result={result}
        setResult={setResult}
        age={age}
        setAge={setAge}
        state={state}
        setState={setState}
        pincode={pincode}
        setPincode={setPincode}
        dob={dob}
        setDob={setDob}
        id={"editCandidateModal"}
        target={"modal"}
        onClick={() => handleUpdateSingleCandidate(candidateId)}
      />

      {/* modal to delete the user */}
      <div
        className="modal fade"
        id="deleteCandidateModal"
        tabIndex="-1"
        aria-labelledby="deleteCandidateModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Candidate
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-5">
              <p>Are you sure want to delete the user ?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn px-3"
                data-bs-dismiss="modal"
                style={{
                  borderColor: "#06b1e0",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger  px-3"
                data-bs-dismiss="modal"
                onClick={() => handleDeleteCandidate(candidateId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
