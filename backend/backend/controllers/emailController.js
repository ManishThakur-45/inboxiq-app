const { fetchEmails } = require("../services/gmailService");
const { classifyEmail } = require("../services/aiService");

exports.getInboxEmails = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: "Access token is required" });
    }

    const emails = await fetchEmails(accessToken, 15);

    const classifiedEmails = emails.map(email => {
      const classification = classifyEmail(email);

      return {
        ...email,
        ...classification
      };
    });

    res.status(200).json({
      success: true,
      count: classifiedEmails.length,
      emails: classifiedEmails
    });
  } catch (error) {
    console.error("Fetch inbox error:", error.message);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};