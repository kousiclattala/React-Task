const Candidate = require("../models/candidate");

exports.createCandidate = async (req, res, next) => {
  try {
    //getting data from frontend
    const { name, dob, age, address, state, pincode, email, result } = req.body;

    //checking whether all fields are there or not, if not raise exception.
    if (!name || !dob || !age || !address || !state || !pincode || !email) {
      return res.status(404).json({
        msg: "Please include all fields",
      });
    }

    // creating the candidate with the response data.
    const candidate = await Candidate.create({
      name,
      email,
      dob,
      age,
      address,
      state,
      pincode,
      result,
      user: req.user._id,
    });

    // sending the success response back to user.
    res.status(200).json({
      msg: "Candidate created successfully",
      candidate,
    });
  } catch (error) {
    //if any error occur from the above process, then we are raising an exception.
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.getAllCandidates = async (req, res, next) => {
  try {
    // getting all candidates from db.
    const candidates = await Candidate.find();

    // sending the res back to user.
    res.status(200).json({
      msg: "All candidates list",
      candidates,
    });
  } catch (error) {
    //if any error occur while fetching candidate, we send an exception
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.getSingleCandidate = async (req, res, next) => {
  try {
    //if id is not present in params, then we send err response.
    if (!req.params.candidateId) {
      return res.status(400).json({
        msg: "Candidate id is missing",
      });
    }

    // fetching the candidate from db using id from params and populating the
    // created user object.
    const candidate = await Candidate.findById(req.params.candidateId).populate(
      "user",
      "_id email phoneNumber"
    );

    //if no candidate found with the id, we sent and exception
    if (!candidate) {
      return res.status(404).json({
        msg: "No candidate found",
      });
    }

    // if candidate found, we send res back to user.
    res.status(200).json({
      msg: "Candidate Fetched successfully",
      candidate,
    });
  } catch (error) {
    //if any error occurs, we send error to user
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.updateSingleCandidate = async (req, res, next) => {
  try {
    //finding the user and updating it with the updated values.
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.candidateId,
      req.body,
      {
        new: true,
      }
    );

    //if no candidate found, we raise exception.
    if (!candidate) {
      return res.status(404).json({
        msg: "No candidate found",
      });
    }

    //if found, we send back res to user with updated values.
    res.status(200).json({
      msg: "Candidate updated successfully",
      candidate,
    });
  } catch (error) {
    //if error occurs, we send back the error
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.deleteSingleCandidate = async (req, res, next) => {
  try {
    //finding th candidate with id and deleting that candidate.
    const candidate = await Candidate.findByIdAndDelete(req.params.candidateId);

    //sending the res back to user.
    res.status(200).json({
      msg: "Candidate deleted successfully",
      candidate,
    });
  } catch (error) {
    //if error occurs, we send back err to user
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};
