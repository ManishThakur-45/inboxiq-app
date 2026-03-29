export const rawEmails = [
  {
    id: 'e001',
    subject: 'Invoice #4821 — Payment Overdue by 14 Days',
    sender: 'billing@acmecorp.com',
    senderName: 'Acme Corp Billing',
    receivedAt: '2024-06-15T08:32:00Z',
    body: `Dear Finance Team,

This is a reminder that Invoice #4821 for $12,450 is now overdue by 14 days. 
The original due date was June 1st, 2024.

Failure to pay within 7 days will result in late fees of 2% per month.
Please process the payment immediately or contact us to arrange a payment plan.

Payment methods: Wire Transfer, ACH, or Credit Card via our portal.

Best regards,
Acme Corp Billing Department`,
  },
  {
    id: 'e002',
    subject: 'URGENT: Production Server Down — All Services Affected',
    sender: 'alerts@monitoring.io',
    senderName: 'System Monitoring',
    receivedAt: '2024-06-15T09:15:00Z',
    body: `CRITICAL ALERT

Production server prod-east-1 is DOWN.
Incident started: 09:12 UTC
Duration: 3 minutes and counting

Services affected:
- API Gateway (100% downtime)
- User authentication service
- Payment processing pipeline

Error: Connection timeout on port 5432 (PostgreSQL)

Auto-scaling failed to spin up replacement nodes.
Manual intervention required immediately.

On-call engineer: Please check PagerDuty.`,
  },
  {
    id: 'e003',
    subject: 'Congratulations! You\'ve won a $1000 Amazon Gift Card',
    sender: 'noreply@prizewin99.xyz',
    senderName: 'Prize Center',
    receivedAt: '2024-06-15T09:45:00Z',
    body: `Dear Lucky Winner!

You have been selected as our GRAND PRIZE WINNER!

Claim your $1000 Amazon Gift Card NOW before it expires!
Click here: http://totally-legit-prizes.xyz/claim?ref=spam123

Limited time offer — expires in 24 hours!
This offer is exclusively for you!

Winners must verify their identity by providing:
- Full name
- Credit card number for "verification"
- Social security number

ACT NOW! Don't miss out!`,
  },
  {
    id: 'e004',
    subject: 'Enterprise License Renewal — InboxIQ Suite Q3 2024',
    sender: 'sales@techsuite.com',
    senderName: 'TechSuite Sales',
    receivedAt: '2024-06-15T10:02:00Z',
    body: `Hello,

Your enterprise license for InboxIQ Suite expires on July 31, 2024.

Current plan: Enterprise Pro (500 seats)
Annual cost: $48,000/year
Renewal discount: 15% if renewed before July 1st

Includes:
- Unlimited email processing
- Advanced AI triage
- Priority support SLA
- Custom routing rules

Please confirm renewal or schedule a call with our account executive.

Best,
Sarah Chen
Enterprise Account Manager`,
  },
  {
    id: 'e005',
    subject: 'Bug Report: OAuth Login Fails on Safari 17.4',
    sender: 'developer@clientxyz.com',
    senderName: 'Alex Mercer',
    receivedAt: '2024-06-15T10:30:00Z',
    body: `Hi Support Team,

We're experiencing a critical issue with OAuth login failing specifically on Safari 17.4 (macOS Sonoma).

Steps to reproduce:
1. Navigate to login page
2. Click "Login with Google"
3. Safari blocks the popup due to new ITP restrictions
4. Authentication fails silently

Error in console:
TypeError: Cannot read properties of null (reading 'postMessage')

This affects approximately 30% of our user base on Apple devices.
We need a hotfix urgently as this is blocking new user onboarding.

Attached: error logs, Safari console output, network traces.

Alex Mercer
Lead Developer, ClientXYZ`,
  },
  {
    id: 'e006',
    subject: 'Subscription Cancellation Request — Account #98234',
    sender: 'user@customerbiz.com',
    senderName: 'Marcus Johnson',
    receivedAt: '2024-06-15T11:00:00Z',
    body: `Hello,

I am writing to request the cancellation of our subscription, Account #98234.

Reason: We are migrating to an internal solution.
Effective date: July 1, 2024

Please confirm:
1. Cancellation is processed
2. No further charges after July 1st
3. Data export will be available for 30 days

We would also appreciate a refund for unused days of the current billing cycle ($840 prorated).

Thank you,
Marcus Johnson
Operations Director, CustomerBiz`,
  },
  {
    id: 'e007',
    subject: 'Partnership Proposal — AI Integration Opportunity',
    sender: 'partnerships@aiventures.io',
    senderName: 'Diana Park',
    receivedAt: '2024-06-15T11:45:00Z',
    body: `Dear Business Development Team,

I am reaching out from AIVentures, a Series B startup focused on enterprise AI tooling.

We believe there's a significant synergy between our platforms. We'd like to propose:
- API-level integration between InboxIQ and our workflow engine
- Co-marketing to our 2,400 enterprise clients
- Revenue share model: 20% on referred conversions

Our platform currently processes 50M+ emails monthly and serves 800+ enterprise clients.

Would you be available for a 30-minute intro call next week?

Best regards,
Diana Park
VP Partnerships, AIVentures`,
  },
  {
    id: 'e008',
    subject: 'RE: API Rate Limits — Need Increase for Q3 Traffic',
    sender: 'techops@bigretail.com',
    senderName: 'James Liu',
    receivedAt: '2024-06-15T12:15:00Z',
    body: `Hi Team,

Following up on our previous discussion about API rate limits.

Current limits: 1,000 req/min
Needed for Q3: 10,000 req/min (10x increase)

Context: We're launching a major campaign in August and expect traffic spikes.
Current limits will cause throttling and degraded user experience.

We're on the Enterprise plan — does this qualify for limit increases?
Can we schedule a technical review call?

Thanks,
James Liu
CTO, BigRetail Inc.`,
  },
  {
    id: 'e009',
    subject: 'Your Free Trial Ends Tomorrow — Upgrade Now!',
    sender: 'noreply@spamtool99.net',
    senderName: 'ToolPro Team',
    receivedAt: '2024-06-15T12:30:00Z',
    body: `ACT NOW OR LOSE ACCESS FOREVER!!!

Your free trial expires in 24 HOURS!!!

Don't lose your data! Upgrade to PRO for just $9.99/month!!!
LIMITED TIME: Use code FAKE2024 for 90% off!!!

Click here to upgrade: http://spammy-upgrade.net

BONUS: Free iPhone 15 with annual subscription!!!!

THIS OFFER EXPIRES TONIGHT AT MIDNIGHT!!!`,
  },
  {
    id: 'e010',
    subject: 'Security Audit Report — Q2 2024 Penetration Testing Results',
    sender: 'security@auditfirm.com',
    senderName: 'SecureAudit Labs',
    receivedAt: '2024-06-15T13:00:00Z',
    body: `Confidential — Security Report

Dear Engineering Team,

Attached is the Q2 2024 penetration testing report for your infrastructure.

Summary:
- Critical vulnerabilities: 2
- High severity: 5  
- Medium: 12
- Low: 8

Critical issues requiring immediate attention:
1. SQL injection vulnerability in /api/v2/search endpoint
2. Exposed admin panel at /internal/admin without MFA

We recommend patching the critical issues within 72 hours.
Full report with proof-of-concept included in attachment.

SecureAudit Labs`,
  },
  {
    id: 'e011',
    subject: 'Refund Request — Double Charged for June Subscription',
    sender: 'finance@smallbiz.com',
    senderName: 'Sandra Williams',
    receivedAt: '2024-06-15T13:30:00Z',
    body: `Hello Billing Team,

I noticed our credit card was charged twice for the June subscription:
- Charge 1: June 1, 2024 — $499.00
- Charge 2: June 3, 2024 — $499.00

Transaction IDs: TXN-88291, TXN-88304

Please issue a refund for the duplicate charge of $499.00 to the original payment method.

Account: SmallBiz Inc., Account #45891

This is urgent as it's affecting our cash flow.

Sandra Williams
Finance Manager`,
  },
  {
    id: 'e012',
    subject: 'Feature Request — Bulk Export to Salesforce CRM',
    sender: 'product@enterprise-co.com',
    senderName: 'Ryan Torres',
    receivedAt: '2024-06-15T14:00:00Z',
    body: `Hi Product Team,

We've been using InboxIQ for 8 months and love it. One feature that would dramatically improve our workflow:

Bulk export of analyzed emails directly to Salesforce CRM with:
- Auto-populated contact records
- Sentiment scores as custom fields
- Category tags synced as Salesforce tags
- Priority mapped to CRM opportunity stage

We have 150 seats and would be willing to pay for this as an add-on.
Could this be considered for Q4 roadmap?

Ryan Torres
Head of Revenue Ops`,
  },
];
