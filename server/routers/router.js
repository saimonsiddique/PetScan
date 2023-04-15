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

// Common routes
router.post("/signin", signInMiddleware);

// vet routes
router.post("/signup/vet", vetController.signUp);
router.get("/profile/vet", authMiddleware.vet, vetController.profile);
module.exports = router;
