const oauth2Client = require("../utils/oauthClient");

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.readonly"
];

exports.googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES
  });

  res.redirect(url);
};

exports.googleCallback = async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const accessToken = tokens.access_token;

    res.redirect(
      `${process.env.FRONTEND_URL}?accessToken=${encodeURIComponent(accessToken)}`
    );
  } catch (error) {
    console.error("OAuth callback error:", error.message);
    res.status(500).json({ message: "Authentication failed" });
  }
};