const rules = [
  {
    category: 'Spam',
    department: 'Blocked',
    keywords: ['winner', 'congratulations', 'prize', 'gift card', 'act now', 'limited time', 'expires tonight', 'click here', 'free iphone', 'upgrade now!!!', 'fake2024', 'claim', 'verify', 'lucky winner', '!!!'],
    priority: 'Low',
    urgency: 1,
    sentiment: 'Manipulative',
    label: 'Spam',
    action: 'Block sender and move to spam folder',
    confidence: [88, 98],
  },
  {
    category: 'Billing',
    department: 'Finance',
    keywords: ['invoice', 'payment', 'overdue', 'refund', 'charged', 'billing', 'subscription', 'charge', 'finance', 'credit card', 'prorated', 'renewal cost', 'fee', 'transaction', 'cash flow'],
    priority: 'High',
    urgency: 8,
    sentiment: 'Formal',
    label: 'Genuine',
    action: 'Forward to Finance team for immediate review',
    confidence: [82, 95],
  },
  {
    category: 'Technical',
    department: 'Engineering',
    keywords: ['server', 'down', 'bug', 'error', 'api', 'crash', 'critical', 'production', 'vulnerability', 'sql injection', 'penetration', 'oauth', 'security', 'patch', 'hotfix', 'rate limit', 'endpoint', 'postgresql', 'timeout', 'alert'],
    priority: 'Critical',
    urgency: 10,
    sentiment: 'Urgent',
    label: 'Genuine',
    action: 'Escalate to Engineering on-call immediately',
    confidence: [87, 97],
  },
  {
    category: 'Sales',
    department: 'Sales',
    keywords: ['enterprise', 'license', 'renewal', 'partnership', 'proposal', 'revenue', 'deal', 'account', 'quota', 'demo', 'trial', 'upgrade', 'plan', 'seats', 'synergy', 'co-marketing', 'roadmap', 'add-on'],
    priority: 'Medium',
    urgency: 5,
    sentiment: 'Professional',
    label: 'Genuine',
    action: 'Assign to Sales team for follow-up within 24 hours',
    confidence: [79, 93],
  },
  {
    category: 'Support',
    department: 'Support',
    keywords: ['cancellation', 'cancel', 'help', 'issue', 'problem', 'feature request', 'feedback', 'complaint', 'question', 'inquiry', 'request', 'export', 'integration', 'bulk'],
    priority: 'Medium',
    urgency: 6,
    sentiment: 'Neutral',
    label: 'Genuine',
    action: 'Assign to Customer Support queue',
    confidence: [75, 90],
  },
];

const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function detectCategory(text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const rule of rules) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = rule;
    }
  }

  return best || rules[4]; // default to Support
}

function extractKeywords(text, category) {
  const lower = text.toLowerCase();
  const rule = rules.find(r => r.category === category) || rules[4];
  return rule.keywords
    .filter(kw => lower.includes(kw.toLowerCase()))
    .slice(0, 5)
    .map(kw => kw.charAt(0).toUpperCase() + kw.slice(1));
}

function generateSummary(email, category) {
  const templates = {
    Billing: `Financial correspondence regarding ${email.subject.toLowerCase()}. Requires prompt attention from the Finance department for processing.`,
    Technical: `Technical incident or engineering request detected. Immediate escalation to Engineering team recommended to prevent or resolve service disruption.`,
    Sales: `Sales or business development communication from ${email.senderName}. Opportunity for revenue or partnership growth identified.`,
    Support: `Customer support or product inquiry from ${email.senderName}. Standard support workflow applies — assign and resolve within SLA.`,
    Spam: `Unsolicited and potentially malicious email detected. Multiple spam indicators and deceptive patterns identified. Do not interact.`,
  };
  return templates[category] || `Email from ${email.senderName} requires review and appropriate routing.`;
}

function generateReply(category, email) {
  const replies = {
    Billing: `Dear ${email.senderName},\n\nThank you for reaching out regarding billing. We have received your message and our Finance team will review and respond within 1 business day.\n\nBest regards,\nInboxIQ Support`,
    Technical: `Hi Team,\n\nWe've received the technical alert and have escalated this to our Engineering on-call team immediately. We are investigating and will provide an update within 30 minutes.\n\nInboxIQ Engineering`,
    Sales: `Hi ${email.senderName},\n\nThank you for your message. Our team will review your inquiry and one of our account executives will be in touch within 24 hours.\n\nBest,\nInboxIQ Sales Team`,
    Support: `Dear ${email.senderName},\n\nThank you for contacting us. We have received your request and it has been assigned to our support team. You can expect a response within 1 business day.\n\nKind regards,\nInboxIQ Support`,
    Spam: `[No reply recommended — spam detected]`,
  };
  return replies[category] || replies.Support;
}

export function analyzeEmail(email) {
  const fullText = `${email.subject} ${email.body}`;
  const rule = detectCategory(fullText);
  const keywords = extractKeywords(fullText, rule.category);
  const confidence = getRandom(rule.confidence[0], rule.confidence[1]);
  const summary = generateSummary(email, rule.category);
  const suggestedReply = generateReply(rule.category, email);

  return {
    ...email,
    category: rule.category,
    priority: rule.priority,
    department: rule.department,
    urgency: rule.urgency + getRandom(-1, 1),
    sentiment: rule.sentiment,
    label: rule.label,
    confidence,
    keywords,
    summary,
    action: rule.action,
    suggestedReply,
    analyzed: true,
  };
}

export function analyzeEmails(emails) {
  return emails
    .map(analyzeEmail)
    .sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
}

export function computeStats(emails) {
  const total = emails.length;
  const critical = emails.filter(e => e.priority === 'Critical').length;
  const spam = emails.filter(e => e.category === 'Spam').length;
  const analyzed = emails.filter(e => e.analyzed).length;

  const categoryBreakdown = {};
  const departmentBreakdown = {};

  for (const e of emails) {
    categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + 1;
    departmentBreakdown[e.department] = (departmentBreakdown[e.department] || 0) + 1;
  }

  return { total, critical, spam, analyzed, categoryBreakdown, departmentBreakdown };
}
