import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Diagram, Accordion
} from "@/components/TopicContent";

export default function SharedResponsibilityModel() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>The One-Line Summary</SectionTitle>
                <P>
                    Security and compliance is a shared responsibility between AWS and the customer — commonly referred to as <Bold>Security "of" the Cloud</Bold> (AWS's job) vs <Bold>Security "in" the Cloud</Bold> (your job).
                </P>
                <Callout variant="info" title="The Apartment Analogy">
                    <DataTable
                        headers={["Who", "Responsibility"]}
                        rows={[
                            [<Bold>Landlord (AWS)</Bold>, "Building structure, locks on main door, electricity wiring, security guards."],
                            [<Bold>Tenant (You)</Bold>, "Locking your apartment door, protecting your valuables, not sharing your keys."],
                        ]}
                    />
                    <P className="mb-0 italic text-sm">
                        "The landlord can't control what you do inside — and you can't control the building's structure. Both must do their part."
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔵 AWS's Responsibility — "Security OF the Cloud"</SectionTitle>
                <P>
                    AWS is accountable for securing the infrastructure that supports its cloud services — the physical hardware, networking, and software systems.
                </P>
                <BulletList items={[
                    <span><Bold>Physical data centers</Bold> — Locks, guards, biometric access, and 24/7 surveillance.</span>,
                    <span><Bold>Networking hardware</Bold> — Routers, switches, cables, and fiber connections.</span>,
                    <span><Bold>Virtualization layer</Bold> — Securing the hypervisor that runs the virtual machines.</span>,
                    <span><Bold>Host Operating Systems</Bold> — Patching the physical servers.</span>,
                    <span><Bold>Global Infrastructure</Bold> — Maintaining Regions, AZs, and Edge Locations.</span>,
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🟡 Your Responsibility — "Security IN the Cloud"</SectionTitle>
                <P>
                    As the customer, you are responsible for securing what's inside your cloud environment — operating systems, applications, and your data.
                </P>
                <BulletList items={[
                    <span><Bold>Your Data</Bold> — Encryption at rest and in transit.</span>,
                    <span><Bold>Identity & Access</Bold> — Configuring IAM users, roles, and permissions.</span>,
                    <span><Bold>Operating System Patches</Bold> — Patching your EC2 instances (Windows/Linux).</span>,
                    <span><Bold>Network Configuration</Bold> — Setting up VPCs, Subnets, and NACLs.</span>,
                    <span><Bold>Firewall Rules</Bold> — Configuring Security Group inbound/outbound rules.</span>,
                    <span><Bold>Application Code</Bold> — Ensuring your code is secure and configuration is correct.</span>,
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚡ Responsibility Shifts Based on Service Type</SectionTitle>
                <P>
                    How much you own depends on the service model. With IaaS (EC2), you own almost everything. With managed services (S3/RDS), AWS takes over the platform layer.
                </P>
                <DataTable
                    headers={["Layer", "EC2 (IaaS)", "RDS (PaaS)", "S3 (Managed)", "SaaS"]}
                    rows={[
                        ["Data", <Bold>YOU</Bold>, <Bold>YOU</Bold>, <Bold>YOU</Bold>, <Bold>YOU</Bold>],
                        ["App Code", <Bold>YOU</Bold>, <Bold>YOU</Bold>, "N/A", "N/A"],
                        ["OS Patch", <Bold>YOU</Bold>, "AWS", "AWS", "AWS"],
                        ["Runtime", <Bold>YOU</Bold>, "AWS", "AWS", "AWS"],
                        ["Network", <Bold>YOU</Bold>, <Bold>YOU*</Bold>, "AWS", "AWS"],
                        ["Hardware", "AWS", "AWS", "AWS", "AWS"],
                    ]}
                />
                <P className="text-xs text-slate-400 mt-2">*Security groups still your responsibility.</P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: Responsibility in Action</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "EC2 (IaaS) — Patch the OS",
                            description: <span>Launch an EC2 instance and run <InlineCode>sudo apt update && sudo apt upgrade -y</InlineCode>. You just patched the OS — something AWS will never do for you in IaaS.</span>
                        },
                        {
                            title: "S3 — Access Control",
                            description: "Create a bucket. Try to make it public. Notice the warnings. AWS provides the security tools, but the decision to open or close the 'door' is yours."
                        },
                        {
                            title: "IAM — Principle of Least Privilege",
                            description: "Create a user with 'AdministratorAccess' vs a user with no permissions. AWS provides the IAM service, but the level of risk you take with permissions is your config."
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Knowledge Check</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Your EC2 instance gets hacked because the OS wasn't patched. Is this AWS's fault?",
                            answer: "No. EC2 is IaaS. AWS patches the underlying host and hypervisor, but the 'Guest OS' on your instance is 100% your responsibility. You own the software stack from the OS upward."
                        },
                        {
                            question: "An S3 bucket is left publicly accessible and gets breached. Who is responsible?",
                            answer: "The Customer. AWS secures the physical servers and the S3 service logic, but the encryption and access control settings for your specific data are your responsibility."
                        },
                        {
                            question: "AWS's data center in Mumbai is physically broken into. Is that your problem?",
                            answer: "No. Physical security (guards, biometrics, surveillance) is a core part of 'Security OF the Cloud,' handled entirely by AWS."
                        },
                        {
                            question: "You use RDS (managed database). Who patches the database engine?",
                            answer: "AWS patches the DB engine (e.g. MySQL version updates) because RDS is a managed service. However, YOU are still responsible for the data, the users, and the security groups."
                        },
                        {
                            question: "What is the simplest test to determine responsibility?",
                            answer: "If it's something AWS built and runs (the facility, the hardware, the service code) → AWS. If it's something you deployed, configured, or stored → YOU."
                        }
                    ]}
                />
            </Section>

            <SummaryCard
                items={[
                    <span><Bold>Security OF the Cloud:</Bold> AWS owns hardware, networking, and the physical security of data centers.</span>,
                    <span><Bold>Security IN the Cloud:</Bold> You own your data, your OS, your app code, and your identity policies.</span>,
                    "Responsibility shifts toward AWS as you move from IaaS to Managed Services.",
                    "Both AWS and Customer share controls for Patching and Training.",
                ]}
            />
        </div>
    );
}
