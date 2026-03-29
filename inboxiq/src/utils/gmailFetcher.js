export async function fetchGmailMessages() {
  const token = localStorage.getItem('gmail_access_token');

  if (!token) {
    throw new Error('No Gmail access token found. Please login with Google again.');
  }

  const listRes = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!listRes.ok) {
    throw new Error('Failed to list Gmail messages');
  }

  const listData = await listRes.json();
  const messages = listData.messages || [];

  const detailedEmails = await Promise.all(
    messages.map(async (msg) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!msgRes.ok) {
        throw new Error(`Failed to fetch message ${msg.id}`);
      }

      const msgData = await msgRes.json();
      const headers = msgData.payload?.headers || [];

      const getHeader = (name) =>
        headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

      return {
        id: msg.id,
        sender: getHeader('From'),
        subject: getHeader('Subject') || '(No Subject)',
        body: msgData.snippet || '',
        date: getHeader('Date'),
      };
    })
  );

  return detailedEmails;
}