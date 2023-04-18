const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const signInMiddleware = require("../middlewares/signInMiddleware");
const clientController = require("../controllers/clientController");
const vetController = require("../controllers/vetController");

const router = express.Router();

// client routes
router.post("/signup/petParent", clientController.signUp);
router.get("/profile/me", authMiddleware.client, clientController.profile);
router.post("/pet/add", authMiddleware.client, clientController.addPet);
router.get("/pet/info", authMiddleware.client, clientController.petInfo);
router.post(
  "/appointment/book",
  authMiddleware.client,
  clientController.createAppointment
);
router.post(
  "/question/add",
  authMiddleware.client,
  clientController.postQuestion
);
router.post("/upvotes", clientController.postVote);

// Common routes
router.post("/signin", signInMiddleware);
router.get("/feed", clientController.feed);

// vet routes
router.post("/signup/vet", vetController.signUp);
router.post("/vet/info", authMiddleware.vet, vetController.vetInfo);
router.get("/profile/vet", authMiddleware.vet, vetController.profile);
router.post("/vet/postAnswer", authMiddleware.vet, vetController.postAnswer);
module.exports = router;
