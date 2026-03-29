const express = require("express");
const router = express.Router();
const { getInboxEmails } = require("../controllers/emailController");

router.post("/inbox", getInboxEmails);

module.exports = router;