import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Accordion
} from "@/components/TopicContent";

export default function WhatIsCloudComputing() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>Mental Model First</SectionTitle>
                <P>
                    Before cloud computing, companies had to buy physical servers, set them up in a data center, and hire people to maintain them.
                    If traffic spiked, you had to wait weeks for new hardware to arrive.
                </P>
                <Callout title="The Core Idea">
                    <Bold>Cloud computing = on-demand delivery of compute power, database, storage, and other IT resources over the internet with pay-as-you-go pricing.</Bold>
                </Callout>
                <P>
                    Think of it like electricity — you don't build a power plant to power your house. You plug in and pay for what you use.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>On-Premises vs Cloud</SectionTitle>
                <DataTable
                    headers={["Feature", "On-Premises", "Cloud"]}
                    rows={[
                        ["Cost", "Buy servers upfront", "Pay per use"],
                        ["Provisioning", "Weeks to provision", "Minutes to provision"],
                        ["Management", "You manage everything", "Provider manages hardware"],
                        ["Scalability", "Fixed capacity", "Scale up/down instantly"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The 3 Big Benefits</SectionTitle>
                <P>These are the fundamental reasons businesses migrate to the cloud:</P>
                <BulletList items={[
                    <span><Bold>Speed & Agility</Bold> — Resources go from weeks to minutes to provision.</span>,
                    <span><Bold>Cost Savings</Bold> — Trade capital expense for variable expense. Focus on your product.</span>,
                    <span><Bold>Go Global in Minutes</Bold> — Deploy to multiple regions worldwide with a few clicks.</span>,
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What is AWS Actually?</SectionTitle>
                <P>
                    Amazon Web Services (AWS) provides <Bold>on-demand delivery</Bold> of technology services—compute, storage, databases, networking, security, and more—all available in seconds with pay-as-you-go pricing.
                </P>
                <P>
                    It is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Hands-On: First Steps in the Cloud</SectionTitle>

                <SubTitle>Step 1 — Create a Free AWS Account</SubTitle>
                <P>Go to <Bold>aws.amazon.com</Bold> and create a Free Tier account. You get 6 months of free access to core services like EC2, S3, RDS, and Lambda.</P>
                <Callout variant="warning" title="Critical Billing Note">
                    <P className="mb-0 italic">Set up a Billing Alarm immediately (CloudWatch → Alarms → set $5 threshold) to avoid unexpected costs.</P>
                </Callout>

                <SubTitle className="mt-8">Step 2 — Explore the AWS Console</SubTitle>
                <P>Log in and explore the Services menu. Notice how services are grouped: <Bold>Compute, Storage, Database, Networking</Bold>. This is your control plane—everything you'll ever do lives here.</P>

                <SubTitle className="mt-8">Step 3 — Launch Your First "Cloud Resource"</SubTitle>
                <P>AWS Console → S3 → Create Bucket → Upload a file. This demonstrates the core cloud concept:</P>
                <BulletList items={[
                    "No server bought",
                    "No setup time",
                    "You paid fractions of a cent",
                    "It's globally accessible"
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Terms to Know Cold</SectionTitle>
                <DataTable
                    headers={["Term", "What it means"]}
                    rows={[
                        ["Region", "Physical location (e.g. us-east-1 = N. Virginia)"],
                        ["Availability Zone (AZ)", "Isolated data center within a region"],
                        ["Pay-as-you-go", "Billed only for what you use, when you use it"],
                        ["Elasticity", "Ability to scale up or down based on demand"],
                        ["Managed Service", "AWS handles patching, backups, scaling for you"],
                    ]}
                />
            </Section>

            <Section>
                <SectionTitle>Checkpoint: Are You Ready?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Why would a startup choose cloud over buying physical servers?",
                            answer: "Startups choose cloud to trade capital expense (upfront hardware costs) for variable expense (pay-per-use). It allows them to scale instantly as they grow, experiment without heavy investment, and go to market much faster."
                        },
                        {
                            question: "What's the difference between a Region and an Availability Zone?",
                            answer: "A Region is a physical geographical area (e.g., US East). Each Region consists of multiple, isolated, and physically separate Availability Zones (AZs). AZs are data centers (or clusters of data centers) designed for fault tolerance within a Region."
                        },
                        {
                            question: "You launched an EC2 instance and forgot to stop it — what happens to your bill?",
                            answer: "AWS bills you for the time the instance is in a 'running' state. Your bill will continue to accumulate hourly or per-second charges until you stop or terminate the instance, even if it's sitting idle."
                        },
                        {
                            question: "Name 3 AWS services and what problem each solves.",
                            answer: (
                                <BulletList items={[
                                    <span><Bold>Amazon EC2</Bold> — Provides virtual servers (compute) to run applications without managing hardware.</span>,
                                    <span><Bold>Amazon S3</Bold> — Scalable object storage for files, images, and backups.</span>,
                                    <span><Bold>Amazon RDS</Bold> — Managed relational databases that handle backups and patching for you.</span>
                                ]} />
                            )
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
