import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Accordion
} from "@/components/TopicContent";

export default function PublicPrivateHybridCloud() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>Deployment Models: Where Does it Run?</SectionTitle>
                <Callout variant="info" title="Important Distinction">
                    <P className="mb-0">
                        <Bold>Service Models</Bold> (IaaS/PaaS/SaaS) = <Bold>What</Bold> you get.<br />
                        <Bold>Deployment Models</Bold> (Public/Private/Hybrid) = <Bold>Where</Bold> it runs and who owns it.
                    </P>
                </Callout>

                <SubTitle>The Office Space Analogy</SubTitle>
                <P>Think of it like choosing an office for your team:</P>
                <DataTable
                    headers={["Model", "Office Analogy"]}
                    rows={[
                        [<Bold>Public Cloud</Bold>, "WeWork (shared coworking space — you rent a desk, others are around you)"],
                        [<Bold>Private Cloud</Bold>, "Your own corporate HQ (only your employees, full control)"],
                        [<Bold>Hybrid Cloud</Bold>, "HQ for sensitive work + WeWork for overflow when busy"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🌐 Public Cloud</SectionTitle>
                <P>
                    The public cloud is a computing model where services are delivered over the internet by third-party providers like <Bold>AWS</Bold>, Microsoft Azure, and Google Cloud. Resources are shared among multiple users (tenants) and are accessible on demand.
                </P>
                <P><Bold>Best for:</Bold></P>
                <BulletList items={[
                    "Startups & small teams who want zero upfront cost.",
                    "Applications with unpredictable or spiky traffic.",
                    "Dev/test environments where instances are temporary.",
                    "When speed of deployment is the top priority."
                ]} />
                <Callout variant="warning" title="The Trade-off">
                    Less fine-grained control over hardware and shared underlying infrastructure with other customers.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔒 Private Cloud</SectionTitle>
                <P>
                    In a private cloud, a single organization controls and maintains the underlying infrastructure. The organization purchases hardware, maintains it in a central data center, and delivers these resources over a private network.
                </P>
                <P><Bold>Best for:</Bold></P>
                <BulletList items={[
                    "Industries with strict compliance (Healthcare, Finance, Government).",
                    "Sensitive data that legally cannot leave your physical premises.",
                    "Organizations with highly predictable, stable workloads.",
                    "Ultra-low latency requirements that public cloud regions can't meet."
                ]} />
                <Callout variant="warning" title="The Trade-off">
                    Expensive upfront capital expenditure (CapEx), slower to provision, and you are responsible for 100% of maintenance.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔀 Hybrid Cloud</SectionTitle>
                <P>
                    Hybrid cloud combines on-premises infrastructure (private) with public cloud services. This allows organizations to keep sensitive workloads secure on-site while taking advantage of public cloud scalability for others.
                </P>
                <SubTitle>3 Common Hybrid Patterns</SubTitle>
                <StepList
                    steps={[
                        {
                            title: "Cloud Bursting",
                            description: "Your private cloud handles normal load; the public cloud steps in automatically during traffic spikes."
                        },
                        {
                            title: "Disaster Recovery",
                            description: "Primary data stays in your private cloud, while the public cloud serves as a cheap, scalable backup target."
                        },
                        {
                            title: "Dynamic Scaling",
                            description: "Public cloud scales front-facing resources while the private cloud maintains critical workloads."
                        },
                    ]}
                />
                <P className="mt-6">
                    <Bold>Real AWS Example:</Bold> <Bold>AWS Outposts</Bold> — AWS installs their hardware physically in YOUR data center, so you get AWS services with your data never leaving your building.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📊 Side-by-Side Comparison</SectionTitle>
                <DataTable
                    headers={["Feature", "Public", "Private", "Hybrid"]}
                    rows={[
                        ["Who owns hardware", "Cloud provider", "You", "Both"],
                        ["Cost Model", "Pay-as-you-go", "High Upfront (CapEx)", "Mixed"],
                        ["Security Control", "Provider-managed", "Full Control", "Shared"],
                        ["Scalability", "Instant / Unlimited", "Limited to Hardware", "Flexible"],
                        ["Best For", "Startups, Dev/Test", "Banks, Healthcare", "Large Enterprises"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: See the Concepts</SectionTitle>
                <BulletList items={[
                    <span><Bold>Public Cloud</Bold> — Everything you've done in AWS so far (EC2, S3) is public cloud.</span>,
                    <span><Bold>Private-like Networking</Bold> — Explore <Bold>VPC (Virtual Private Cloud)</Bold>. It provides an isolated network segment within the public cloud.</span>,
                    <span><Bold>Hybrid Bridge</Bold> — Research <Bold>AWS Outposts</Bold>. This is how AWS brings its infrastructure directly to your data center.</span>,
                ]} />

                <Callout variant="tip" title="Bonus: VPC ≠ Private Cloud">
                    <P className="mb-0">
                        Don't confuse the two! A <Bold>VPC</Bold> is a private, isolated network segment <Bold>inside</Bold> a public cloud. A <Bold>Private Cloud</Bold> is physically owned and managed by the organization on their own hardware.
                    </P>
                </Callout>
            </Section>

            <Section>
                <SectionTitle>Checkpoint: Are You Ready?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "A hospital needs to store patient records but wants to use AWS for its public website. Which cloud model fits?",
                            answer: "Hybrid Cloud. The hospital can keep sensitive patient records on-premises (Private Cloud) to meet strict compliance laws, while hosting its public-facing website on AWS (Public Cloud) for better scalability and lower cost."
                        },
                        {
                            question: "A startup with unpredictable traffic wants minimal upfront cost — which model?",
                            answer: "Public Cloud. It requires zero upfront capital expenditure (CapEx) and offers massive elasticity, allowing the startup to pay only for the resources they use as their traffic spikes or dips."
                        },
                        {
                            question: "What is the difference between a VPC and a Private Cloud?",
                            answer: "A Private Cloud is dedicated hardware owned and managed by an organization. A VPC (Virtual Private Cloud) is a logically isolated section of the AWS Public Cloud infrastructure; it feels private, but it still runs on AWS's shared physical hardware."
                        },
                        {
                            question: "Name one AWS service that enables a hybrid cloud architecture.",
                            answer: "AWS Outposts (physical AWS hardware in your data center), AWS Direct Connect (dedicated network link), or AWS Site-to-Site VPN."
                        },
                        {
                            question: "Why would a company choose private cloud even though it's more expensive?",
                            answer: "Usually for extreme data sovereignty requirements, specific regulatory compliance that forbids third-party hosting, or the need for complete control over the physical hardware and networking stack."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
