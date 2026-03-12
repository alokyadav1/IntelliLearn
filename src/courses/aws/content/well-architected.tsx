import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Diagram, Accordion
} from "@/components/TopicContent";

export default function WellArchitectedFramework() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>What Is It?</SectionTitle>
                <P>
                    The AWS Well-Architected Framework is a body of knowledge that describes design principles, key concepts, and architectural best practices to help you build reliable, efficient, cost-effective, and secure workloads on AWS.
                </P>
                <Callout variant="info">
                    <P className="mb-0 italic">
                        "Think of it as AWS's official rulebook for building production-grade systems — used by architects, DevOps engineers, and developers worldwide."
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🏛️ The 6 Pillars — One Line Each</SectionTitle>
                <P>
                    Neglecting even one of these pillars makes it challenging to build a system that delivers on your expectations and scales effectively.
                </P>
                <DataTable
                    headers={["#", "Pillar", "One-line Summary"]}
                    rows={[
                        ["1", <span className="text-indigo-600 font-bold italic">Operational Excellence</span>, "Run, monitor, and continuously improve systems."],
                        ["2", <span className="text-red-600 font-bold italic">Security</span>, "Protect data, systems, and assets at every layer."],
                        ["3", <span className="text-emerald-600 font-bold italic">Reliability</span>, "Recover quickly from failures, meet demand consistently."],
                        ["4", <span className="text-blue-600 font-bold italic">Performance Efficiency</span>, "Use the right resources, right-sized, efficiently."],
                        ["5", <span className="text-amber-600 font-bold italic">Cost Optimization</span>, "Deliver business value at the lowest possible cost."],
                        ["6", <span className="text-green-600 font-bold italic">Sustainability</span>, "Minimize environmental impact of cloud workloads."],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔵 Pillar 1 — Operational Excellence</SectionTitle>
                <P>Focuses on running and monitoring systems and continually improving processes. Key theme: <Bold>Automation</Bold>.</P>
                <BulletList items={[
                    <span><Bold>Operations as Code</Bold> — Code your changes to provide consistent results.</span>,
                    <span><Bold>Frequent, Small Changes</Bold> — Reversible changes help reduce risk.</span>,
                    <span><Bold>Anticipate Failure</Bold> — Learn from every operational incident.</span>,
                ]} />
                <Callout variant="tip" title="Real Example">
                    <P className="mb-0">Instead of manual console clicks, use a CI/CD pipeline (Jenkins/CodePipeline) to deploy on every git push.</P>
                </Callout>
            </Section>

            <Section>
                <SectionTitle>🔴 Pillar 2 — Security</SectionTitle>
                <P>Focuses on protecting information and systems. Key theme: <Bold>Layers of Defense</Bold>.</P>
                <BulletList items={[
                    <span><Bold>Strong Identity Foundation</Bold> — Least privilege access using IAM.</span>,
                    <span><Bold>Enable Traceability</Bold> — Monitor and audit every action (CloudTrail).</span>,
                    <span><Bold>Protect Data</Bold> — Encryption at rest (KMS) and in transit (TLS).</span>,
                ]} />
                <Callout variant="tip" title="Real Example">
                    <P className="mb-0">A Lambda function having only <InlineCode>s3:GetObject</InlineCode> for one bucket, rather than full admin access.</P>
                </Callout>
            </Section>

            <Section>
                <SectionTitle>🟢 Pillar 3 — Reliability</SectionTitle>
                <P>Ensures workloads perform intended functions and recover quickly from failure. Key theme: <Bold>High Availability</Bold>.</P>
                <BulletList items={[
                    <span><Bold>Self-healing</Bold> — Scaling and health checks to replace failed instances.</span>,
                    <span><Bold>Redundancy</Bold> — Distributed architectures to avoid single points of failure.</span>,
                    <span><Bold>Horizontal Scaling</Bold> — Add parallel resources rather than just sizing up one.</span>,
                ]} />
                <Callout variant="tip" title="Real Example">
                    <P className="mb-0">Airbnb using Auto Scaling to handle traffic spikes during peak booking periods without manual intervention.</P>
                </Callout>
            </Section>

            <Section>
                <SectionTitle>🟡 Pillar 4 — Performance Efficiency</SectionTitle>
                <P>Choosing the right resource types and evolving with technology. Key theme: <Bold>Optimization</Bold>.</P>
                <BulletList items={[
                    <span><Bold>Go Global in Minutes</Bold> — Deploy across regions to reduce latency.</span>,
                    <span><Bold>Serverless Architectures</Bold> — Remove operational burden and scale faster.</span>,
                    <span><Bold>Caching</Bold> — Use CloudFront or ElastiCache to serve data faster.</span>,
                ]} />
            </Section>

            <Section>
                <SectionTitle>🟠 Pillar 5 — Cost Optimization</SectionTitle>
                <P>Delivering value at the lowest price point. Key theme: <Bold>Right-Sizing</Bold>.</P>
                <BulletList items={[
                    <span><Bold>Consumption Model</Bold> — Pay only for what you use.</span>,
                    <span><Bold>Measure Efficiency</Bold> — Use Cost Explorer to identify waste.</span>,
                    <span><Bold>Delete the Unused</Bold> — Terminate unattached volumes or idle load balancers.</span>,
                ]} />
            </Section>

            <Section>
                <SectionTitle>🌱 Pillar 6 — Sustainability</SectionTitle>
                <P>Minimizing environmental impact through maximizing utilization. Key theme: <Bold>Efficiency</Bold>.</P>
                <BulletList items={[
                    <span><Bold>Shared Responsibility</Bold> — AWS manages facility energy; you manage workload efficiency.</span>,
                    <span><Bold>Maximizing Utilization</Bold> — Avoid idle compute to reduce wasted power.</span>,
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: The Well-Architected Tool</SectionTitle>
                <P>AWS provides a free tool to evaluate your own workloads against these 6 pillars.</P>
                <StepList
                    steps={[
                        { title: "Define Workload", description: "Open the Well-Architected Tool in the AWS Console." },
                        { title: "Review", description: "Answer the structured questions across all 6 pillars." },
                        { title: "Identify Risk", description: "The tool generates a report flagging High/Medium risks." },
                    ]}
                />
            </Section>

            <Section>
                <SectionTitle>📊 Pillar → AWS Service Mapping</SectionTitle>
                <DataTable
                    headers={["Pillar", "Key AWS Services"]}
                    rows={[
                        ["Operational Excellence", "CloudFormation, CloudWatch, Systems Manager"],
                        ["Security", "IAM, KMS, CloudTrail, Shield, GuardDuty"],
                        ["Reliability", "Auto Scaling, Route53, Multi-AZ RDS"],
                        ["Performance Efficiency", "CloudFront, ElastiCache, Lambda, Compute Optimizer"],
                        ["Cost Optimization", "Cost Explorer, Budgets, Savings Plans"],
                        ["Sustainability", "Lambda, Fargate, Graviton Processors"],
                    ]}
                />
            </Section>

            <Section>
                <SectionTitle>✅ Knowledge Check</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Manual console deployments violate which pillar?",
                            answer: "Operational Excellence. It advocates for 'Operations as Code' and automated CI/CD pipelines to ensure consistency and reversibility."
                        },
                        {
                            question: "Deploying everything to a single AZ is a violation of which pillar?",
                            answer: "Reliability. Distributing workloads across multiple AZs is essential to avoid single points of failure."
                        },
                        {
                            question: "Your CPU utilization stays under 5% on a large instance. Which pillars apply?",
                            answer: "Cost Optimization (wasted money) and Performance Efficiency (wrong resource choice). You should right-size."
                        },
                        {
                            question: "Where should you store DB passwords instead of plaintext environment variables?",
                            answer: "AWS Secrets Manager or Parameter Store (SSM) — this follows the Security pillar's principle of protecting data."
                        }
                    ]}
                />
            </Section>

            <SummaryCard
                title="🎉 Section 1 Complete!"
                items={[
                    "You've mastered the 7 foundational topics of Cloud Fundamentals.",
                    "You understand Service Models (IaaS/PaaS/SaaS) and Deployment Models.",
                    "You know the Shared Responsibility Model (OF vs IN the cloud).",
                    "Next Up: Section 2 — Identity & Security (IAM).",
                ]}
            />
        </div>
    );
}
