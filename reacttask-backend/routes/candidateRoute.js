const express = require("express");
const {
  createCandidate,
  getAllCandidates,
  getSingleCandidate,
  updateSingleCandidate,
  deleteSingleCandidate,
} = require("../controllers/candidateController");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");

router.route("/createcandidate").post(isLoggedIn, createCandidate);
router.route("/getAllCandidates").get(isLoggedIn, getAllCandidates);

router
  .route("/candidate/:candidateId")
  .get(isLoggedIn, getSingleCandidate)
  .put(isLoggedIn, updateSingleCandidate)
  .delete(isLoggedIn, deleteSingleCandidate);

module.exports = router;
