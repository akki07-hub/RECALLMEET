// Pre-defined demo transcripts for Acme Fitness timeline.
// Matches exact dates: Sep 12, Sep 19, Sep 26, 2026.

export interface DemoTranscript {
  id: string;
  title: string;
  clientName: string;
  date: string;
  participants: string;
  description: string;
  text: string;
  decisions: string[];
  commitments: string[];
  requirements: string[];
  openItems: string[];
  summary: string;
}

export const DEMO_TRANSCRIPTS: DemoTranscript[] = [
  {
    id: 'acme-meeting-1',
    title: 'Meeting 1 — Initial Discussion',
    clientName: 'Acme Fitness',
    date: 'September 12, 2026',
    participants: 'Alex Morgan (Account Manager), Rahul Sharma (Acme Fitness), Priya Nair (Acme Fitness)',
    description: 'Initial project discussion for customer engagement platform.',
    summary: 'Acme Fitness wants a new customer engagement platform. Initial budget is set to ₹1,00,000 with a target launch in December. WhatsApp integration is desirable. Rahul committed to sending the proposal by Friday.',
    decisions: [
      'Budget set to ₹1,00,000',
      'Target launch date confirmed for December 2026'
    ],
    commitments: [
      'Rahul Sharma → Send formal project proposal by Friday'
    ],
    requirements: [
      'Customer engagement platform',
      'WhatsApp integration (Desirable)'
    ],
    openItems: [
      'Formal proposal delivery from Rahul'
    ],
    text: `Alex Morgan: Good morning everyone. Welcome to our kickoff meeting for Acme Fitness.

Rahul Sharma: Thanks Alex. We are eager to get moving on our new customer engagement platform. Our current setup is outdated.

Priya Nair: Exactly. Our key goals are modernizing the portal and adding WhatsApp support. WhatsApp integration is desirable for our member communication.

Alex Morgan: That sounds very straightforward. What timeline and budget are we looking at?

Rahul Sharma: We have set an initial budget of ₹1,00,000 for this first phase. The target launch must be December 2026 before our peak season.

Alex Morgan: Understood. ₹1,00,000 budget and December launch target.

Priya Nair: Perfect. Rahul, can you provide the proposal draft so Alex's team can review?

Rahul Sharma: Yes, I will send over the formal proposal by Friday.

Alex Morgan: Excellent. We will review it as soon as it arrives.`
  },
  {
    id: 'acme-meeting-2',
    title: 'Meeting 2 — Requirements Update',
    clientName: 'Acme Fitness',
    date: 'September 19, 2026',
    participants: 'Alex Morgan (Account Manager), Rahul Sharma (Acme Fitness), Priya Nair (Acme Fitness)',
    description: 'Scope expansion and budget revision meeting.',
    summary: 'Scope expanded during internal review. Budget was increased to ₹1,25,000 to accommodate mandatory WhatsApp integration and a new analytics dashboard requirement. Proposal delivery remains pending.',
    decisions: [
      'Budget increased from ₹1,00,000 to ₹1,25,000',
      'WhatsApp integration status changed from desirable to mandatory',
      'Analytics dashboard added to scope'
    ],
    commitments: [
      'Rahul Sharma → Deliver pending proposal',
      'Priya Nair → Document detailed analytics requirements'
    ],
    requirements: [
      'WhatsApp integration (Mandatory)',
      'Analytics dashboard (New requirement)'
    ],
    openItems: [
      'Proposal from Rahul still pending',
      'Analytics detailed requirements document'
    ],
    text: `Alex Morgan: Welcome back everyone. Let's discuss the scope updates.

Priya Nair: After reviewing with our leadership, we have two major updates. First, WhatsApp integration is no longer just desirable — it is now MANDATORY for launch.

Rahul Sharma: Second, we decided to increase the budget from ₹1,00,000 to ₹1,25,000 to support WhatsApp and also add an analytics dashboard for tracking member engagement.

Alex Morgan: Got it. Budget increased to ₹1,25,000, WhatsApp is mandatory, and an analytics dashboard is added. The December launch target remains unchanged?

Priya Nair: Yes, December is still the hard deadline. I will document the detailed analytics requirements.

Alex Morgan: Great. Rahul, any update on the proposal?

Rahul Sharma: It's almost ready, I am finalizing the timeline figures and will send it shortly.

Alex Morgan: Thanks Rahul. We will wait for the proposal.`
  },
  {
    id: 'acme-meeting-3',
    title: 'Meeting 3 — Latest Discussion',
    clientName: 'Acme Fitness',
    date: 'September 26, 2026',
    participants: 'Alex Morgan (Account Manager), Rahul Sharma (Acme Fitness), Priya Nair (Acme Fitness)',
    description: 'Status review on proposal and payment credentials.',
    summary: 'Reviewed latest project state. Confirmed ₹1,25,000 budget, mandatory WhatsApp, analytics dashboard, and December launch. Proposal and payment gateway credentials remain unresolved blockers.',
    decisions: [
      'Confirmed final budget at ₹1,25,000',
      'Confirmed December launch target'
    ],
    commitments: [
      'Rahul Sharma → Submit pending proposal immediately',
      'Priya Nair → Acquire payment gateway credentials'
    ],
    requirements: [
      'WhatsApp integration (Mandatory)',
      'Analytics dashboard (Required)'
    ],
    openItems: [
      'Proposal from Rahul still pending',
      'Payment gateway credentials still required'
    ],
    text: `Alex Morgan: Good afternoon. Let's do a quick alignment on where we stand today, September 26.

Priya Nair: Let's review the current parameters. Budget is set at ₹1,25,000. WhatsApp integration is mandatory, and the analytics dashboard is required. Launch is December.

Alex Morgan: Correct. What about the blockers?

Rahul Sharma: I apologize for the delay on the proposal. It is undergoing final internal approval at our end. I will get it over to you as soon as possible.

Priya Nair: Also, we still need to provide the payment gateway credentials to your technical team. I am coordinating with our finance team to get those.

Alex Morgan: Understood. So the two main open items are Rahul's proposal and the payment gateway credentials. Once we have those, we can kick off execution immediately for the December launch.

Rahul Sharma: Agreed. We will resolve these items quickly.`
  }
];

export function getDemoTranscript(id: string): DemoTranscript | undefined {
  return DEMO_TRANSCRIPTS.find((t) => t.id === id);
}

export function getAllDemoTranscripts(): DemoTranscript[] {
  return DEMO_TRANSCRIPTS;
}
