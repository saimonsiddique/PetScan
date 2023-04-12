const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.post("/signup", clientController.signUp);
router.post("/signin", clientController.signIn);
router.get("/me", authMiddleware.client, clientController.profile);

module.exports = router;
