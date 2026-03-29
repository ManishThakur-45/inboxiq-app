const { google } = require("googleapis");
const oauth2Client = require("../utils/oauthClient");

async function fetchEmails(accessToken, maxResults = 10) {
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client
  });

  const messagesRes = await gmail.users.messages.list({
    userId: "me",
    maxResults
  });

  const messages = messagesRes.data.messages || [];
  const emailData = [];

  for (const msg of messages) {
    const msgRes = await gmail.users.messages.get({
      userId: "me",
      id: msg.id
    });

    const payload = msgRes.data.payload;
    const headers = payload.headers || [];

    const subject = headers.find(h => h.name === "Subject")?.value || "No Subject";
    const from = headers.find(h => h.name === "From")?.value || "Unknown";
    const snippet = msgRes.data.snippet || "";

    emailData.push({
      id: msg.id,
      subject,
      from,
      snippet
    });
  }

  return emailData;
}

module.exports = { fetchEmails };