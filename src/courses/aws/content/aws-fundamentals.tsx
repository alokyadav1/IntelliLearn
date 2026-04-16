import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Diagram, CodeBlock, Accordion
} from "@/components/TopicContent";

export default function AwsFundamentalsOverview() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>The Big Picture First</SectionTitle>
                <P>
                    AWS offers over 200 fully featured services spanning compute, storage, networking, databases, analytics, machine learning, security, and more — available across multiple geographic regions globally.
                </P>
                <Callout variant="tip">
                    <P className="mb-0 italic">
                        "You don't need to learn all of them. As a DevOps or Cloud Engineer, roughly <Bold>15 services</Bold> cover 90% of real-world work."
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🗺️ The AWS Service Map — Grouped by Category</SectionTitle>
                <P>Think of AWS as a city. Each district handles one specific concern:</P>
                <DataTable
                    headers={["Category", "Core Service", "What it does"]}
                    rows={[
                        [<Bold>Compute</Bold>, "EC2", "Rent virtual machines"],
                        [<Bold>Storage</Bold>, "S3", "Store & retrieve any data"],
                        [<Bold>Database</Bold>, "RDS / DynamoDB", "Managed relational & NoSQL DBs"],
                        [<Bold>Networking</Bold>, "VPC", "Isolated private networks"],
                        [<Bold>Security</Bold>, "IAM", "Control who can do what"],
                        [<Bold>Monitoring</Bold>, "CloudWatch", "Metrics, logs, alarms"],
                        [<Bold>Developer Tools</Bold>, "CodePipeline", "CI/CD pipelines"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔗 How Services Connect in a Real App</SectionTitle>
                <P>
                    Here's how a typical production application on AWS looks. Every service you'll learn maps to a specific slot in this architecture:
                </P>

                <Diagram label="Standard AWS Production Architecture">
                    <pre className="text-[13px] leading-relaxed font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto transition-colors">
                        {`      User
       │
       ▼
[Route 53]          ← DNS (Routing)
       │
       ▼
[CloudFront]        ← CDN (Caching)
       │
       ▼
[ALB / ELB]         ← Load Balancer
       │
       ▼
[EC2 / ECS / Lambda] ← Compute (App Logic)
       │         │
       ▼         ▼
[RDS]     [DynamoDB]  ← Database (Data Storage)
       │
       ▼
[S3]                ← Static Storage (Assets/Backups)
       │
       ▼
[CloudWatch]        ← Monitoring (Logs/Alarms)
       │
[IAM]               ← Security (Identity/Permissions)`}
                    </pre>
                </Diagram>
                <P className="mt-4">
                    This architecture covers about 80% of real-world AWS setups. Every topic in your roadmap feeds into one of these boxes.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: Quick Start</SectionTitle>

                <SubTitle>Task 1 — Console Exploration (10 min)</SubTitle>
                <P>Go to the AWS Console and click <Bold>"Services"</Bold> in the top left. Browse the categories: Compute, Storage, Database, Networking. Build visual familiarity with where things live.</P>

                <SubTitle>Task 2 — Compute ↔ Storage Connectivity (20 min)</SubTitle>
                <StepList
                    steps={[
                        { title: "S3", description: "Create a bucket and upload any image file." },
                        { title: "EC2", description: "Launch a t2.micro Ubuntu instance (Free Tier)." },
                        { title: "Connect", description: "SSH into the instance and run 'aws s3 ls' to list your bucket." },
                    ]}
                />

                <SubTitle>Task 3 — Billing Protection (5 min)</SubTitle>
                <Callout variant="warning" title="Required Task">
                    <P className="mb-0">
                        Go to <Bold>Billing → Budgets</Bold> and set a <Bold>$5/month alert</Bold>. You will get an email when nearing this limit. Never skip this on a new account.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚡ 5 AWS Facts Every Beginner Must Know Cold</SectionTitle>
                <BulletList items={[
                    <span><Bold>Everything is Regional</Bold> — You always pick a Region first (e.g., us-east-1). Resources in one region don't automatically appear in another.</span>,
                    <span><Bold>IAM is Global</Bold> — Users, roles, and policies are not region-specific (the big exception).</span>,
                    <span><Bold>Free Tier has Limits</Bold> — It's not "completely free," but free within specific usage boundaries. Always monitor your dashboard.</span>,
                    <span><Bold>The AWS CLI is Power</Bold> — Programmatic access is almost always faster and more reliable than clicking in the console.</span>,
                    <span><Bold>Tags are Mandatory</Bold> — Real-world projects use tags (Environment: Production) to track costs and manage thousands of resources.</span>,
                ]} />
            </Section>

            <Section>
                <SectionTitle>Checkpoint: Are You Ready?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Can you draw the standard architecture diagram? What service sits at each layer?",
                            answer: "The standard flow is: Route 53 (DNS) → CloudFront (CDN/Edge) → Application Load Balancer (Traffic Routing) → EC2/ECS/Lambda (Compute) → RDS/S3 (Storage/Database). Monitoring handles the whole stack via CloudWatch."
                        },
                        {
                            question: "You need to store user uploads — which AWS service do you use?",
                            answer: "Amazon S3 (Simple Storage Service). It is the primary service for storing objects like images, videos, and user-generated content due to its high durability and scalability."
                        },
                        {
                            question: "You need to run a Node.js API — which compute options does AWS give you?",
                            answer: "You have several options: EC2 (Virtual Machines), AWS Lambda (Serverless functions), or ECS/EKS (Docker Containers). The choice depends on how much management overhead you want."
                        },
                        {
                            question: "Your EC2 instance got hacked — which service controls who had access?",
                            answer: "IAM (Identity and Access Management) controls what users/roles can do, while Security Groups (Virtual Firewalls) control network access. CloudTrail would be used to audit exactly what happened."
                        },
                        {
                            question: "Where do you go to see if your app is running slow?",
                            answer: "AWS CloudWatch. It is the central monitoring service that tracks metrics like CPU usage, response times (latency), and application logs."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
