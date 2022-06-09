const Candidate = require("../models/candidate");

exports.createCandidate = async (req, res, next) => {
  try {
    const { name, dob, age, address, state, pincode, email, result } = req.body;

    if (!name || !dob || !age || !address || !state || !pincode || !email) {
      return res.status(404).json({
        msg: "Please include all fields",
      });
    }

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

    res.status(200).json({
      msg: "Candidate created successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json({
      msg: "All candidates list",
      candidates,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.getSingleCandidate = async (req, res, next) => {
  try {
    if (!req.params.candidateId) {
      return res.status(400).json({
        msg: "Candidate id is missing",
      });
    }

    const candidate = await Candidate.findById(req.params.candidateId).populate(
      "user",
      "_id email phoneNumber"
    );

    if (!candidate) {
      return res.status(404).json({
        msg: "No candidate found",
      });
    }

    res.status(200).json({
      msg: "Candidate Fetched successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.updateSingleCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.candidateId,
      req.body,
      {
        new: true,
      }
    );

    if (!candidate) {
      return res.status(404).json({
        msg: "No candidate found",
      });
    }

    res.status(200).json({
      msg: "Candidate updated successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.deleteSingleCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.candidateId);

    res.status(200).json({
      msg: "Candidate deleted successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};
