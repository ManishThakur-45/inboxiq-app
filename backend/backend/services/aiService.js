function detectCategory(text) {
  if (
    text.includes("urgent") ||
    text.includes("asap") ||
    text.includes("immediately") ||
    text.includes("action needed") ||
    text.includes("deadline today") ||
    text.includes("security alert")
  ) {
    return "Urgent";
  }

  if (
    text.includes("invoice") ||
    text.includes("payment") ||
    text.includes("billing") ||
    text.includes("transaction") ||
    text.includes("refund") ||
    text.includes("subscription")
  ) {
    return "Billing";
  }

  if (
    text.includes("bug") ||
    text.includes("issue") ||
    text.includes("error") ||
    text.includes("technical") ||
    text.includes("server") ||
    text.includes("system")
  ) {
    return "Technical";
  }

  if (
    text.includes("meeting") ||
    text.includes("project") ||
    text.includes("client") ||
    text.includes("deadline") ||
    text.includes("interview") ||
    text.includes("hiring") ||
    text.includes("job") ||
    text.includes("registration") ||
    text.includes("hackathon") ||
    text.includes("submission") ||
    text.includes("team")
  ) {
    return "Work";
  }

  if (
    text.includes("offer") ||
    text.includes("sale") ||
    text.includes("discount") ||
    text.includes("buy now") ||
    text.includes("deal") ||
    text.includes("limited time")
  ) {
    return "Promotions";
  }

  if (
    text.includes("lottery") ||
    text.includes("won") ||
    text.includes("free money") ||
    text.includes("click here") ||
    text.includes("claim now") ||
    text.includes("prize") ||
    text.includes("congratulations")
  ) {
    return "Spam";
  }

  return "Personal";
}

function detectPriority(category, text) {
  if (category === "Urgent") return "Critical";
  if (category === "Billing" || category === "Technical" || category === "Work") return "High";
  if (category === "Promotions" || category === "Spam") return "Low";

  if (
    text.includes("important") ||
    text.includes("deadline") ||
    text.includes("action required")
  ) {
    return "High";
  }

  return "Medium";
}

function detectDepartment(category) {
  switch (category) {
    case "Billing":
      return "Finance";
    case "Technical":
      return "Support";
    case "Work":
    case "Urgent":
      return "Business";
    case "Spam":
      return "Blocked";
    case "Promotions":
      return "Marketing";
    default:
      return "General";
  }
}

function detectLabel(category) {
  return category === "Spam" ? "Spam" : "Useful";
}

function detectConfidence(category, text) {
  let confidence = 75;

  if (category === "Urgent") confidence = 95;
  else if (category === "Billing") confidence = 92;
  else if (category === "Technical") confidence = 90;
  else if (category === "Work") confidence = 88;
  else if (category === "Promotions") confidence = 84;
  else if (category === "Spam") confidence = 97;
  else confidence = 80;

  if (text.length > 120) confidence += 2;
  return Math.min(confidence, 99);
}

function detectUrgency(priority) {
  switch (priority) {
    case "Critical":
      return 10;
    case "High":
      return 8;
    case "Medium":
      return 5;
    case "Low":
      return 2;
    default:
      return 5;
  }
}

function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 4);

  return [...new Set(words)].slice(0, 6);
}

function generateSummary(email, category, department) {
  const sender = email.from || "Sender";

  switch (category) {
    case "Urgent":
      return `This email from ${sender} appears urgent and needs immediate attention.`;
    case "Billing":
      return `This email is related to billing or payment and should be reviewed by ${department}.`;
    case "Technical":
      return `This email looks like a technical issue or support request and should be checked by ${department}.`;
    case "Work":
      return `This email appears work-related and may need professional follow-up.`;
    case "Promotions":
      return `This email looks promotional and is likely low priority.`;
    case "Spam":
      return `This email has suspicious or spam-like patterns and should be avoided.`;
    default:
      return `This email appears personal or general in nature.`;
  }
}

function generateAction(category, department) {
  switch (category) {
    case "Urgent":
      return "Review immediately and respond as soon as possible.";
    case "Billing":
      return `Route to ${department} and verify billing/payment details.`;
    case "Technical":
      return `Assign to ${department} for issue resolution.`;
    case "Work":
      return `Move to ${department} queue and review soon.`;
    case "Promotions":
      return "Keep low priority or archive for later review.";
    case "Spam":
      return "Archive or block this sender.";
    default:
      return `Route to ${department} if further review is needed.`;
  }
}

function generateSuggestedReply(category) {
  switch (category) {
    case "Urgent":
      return "Thank you for your email. I have seen this and will take action immediately.";
    case "Billing":
      return "Thank you for reaching out. I will review the billing details and get back to you shortly.";
    case "Technical":
      return "Thank you for reporting this issue. I will check it and respond with an update soon.";
    case "Work":
      return "Thank you for your email. I have reviewed it and will follow up shortly.";
    case "Promotions":
      return "Thank you for sharing this information.";
    case "Spam":
      return "No reply recommended for this email.";
    default:
      return "Thank you for your email. I will review it and get back to you soon.";
  }
}

function generateReason(category, keywords) {
  if (!keywords.length) {
    return `Detected as ${category} based on content pattern.`;
  }

  return `Detected as ${category} because keywords found: ${keywords.join(", ")}`;
}

function classifyEmail(email) {
  const text = `${email.subject || ""} ${email.snippet || ""}`.toLowerCase();

  const category = detectCategory(text);
  const priority = detectPriority(category, text);
  const department = detectDepartment(category);
  const confidence = detectConfidence(category, text);
  const urgency = detectUrgency(priority);
  const label = detectLabel(category);
  const keywords = extractKeywords(text);
  const summary = generateSummary(email, category, department);
  const action = generateAction(category, department);
  const suggestedReply = generateSuggestedReply(category);
  const reason = generateReason(category, keywords);

  return {
    category,
    priority,
    department,
    confidence,
    urgency,
    label,
    summary,
    action,
    suggestedReply,
    keywords,
    reason,
    archived: false,
    blocked: category === "Spam",
    important: priority === "Critical" || priority === "High",
  };
}

module.exports = { classifyEmail };