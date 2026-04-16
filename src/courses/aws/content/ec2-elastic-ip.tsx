import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList, NumberedList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, Diagram, CodeBlock, TerminalOutput
} from "@/components/TopicContent";

export default function Ec2ElasticIp() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🌐 What Is an Elastic IP?</SectionTitle>
                <P>
                    An <Bold>Elastic IP address</Bold> is a static public IPv4 address allocated to your AWS account and yours until you explicitly release it. 
                </P>
                <P>
                    Its primary purpose is to give your EC2 instance a <Bold>consistent, fixed public IP</Bold>. Even if the underlying instance fails and you remap the address to a replacement instance, external clients and DNS records continue pointing to the same IP without any change on their end.
                </P>
                <Callout variant="info">
                    <P className="mb-0">
                        Without an Elastic IP, EC2 instances get a <Bold>dynamic public IP</Bold> that changes every time you stop and start the instance. While fine for testing, this breaks DNS records, firewall allowlists, and SSL certificates tied to an IP.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 The Core Problem Elastic IP Solves</SectionTitle>
                <P>
                    Every time you stop and start a regular EC2 instance, the public IP is released back to the AWS pool and a new one is assigned:
                </P>
                <Diagram label="Dynamic IP vs. Elastic IP">
                    <pre className="text-[13px] leading-relaxed font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto transition-colors">
                        {`Regular Public IP (Dynamic):
Start ──► 54.23.11.45  (New IP)
Stop  ──► Released back to AWS
Start ──► 18.197.32.89 (Different IP)

Elastic IP (Static):
Allocate ──► 52.10.20.30 (Yours)
Attach   ──► My-Instance-A
Stop/Start ──► 52.10.20.30 (Stays same)
Remap    ──► My-Instance-B (Same IP)`}
                    </pre>
                </Diagram>
                <P>
                    This remapping capability allows you to mask instance failures by rapidly rerouting traffic to a healthy replacement instance without updating DNS or notifying clients.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>💰 Pricing — The Important 2024 Change</SectionTitle>
                <P>
                    Effective <Bold>February 1, 2024</Bold>, AWS charges <InlineCode>$0.005 per hour</InlineCode> for every public IPv4 address — including Elastic IPs — whether they are attached to a running instance or not.
                </P>
                <BulletList
                    items={[
                        <><Bold>Monthly Cost:</Bold> Approximately $3.60 per month per IP address.</>,
                        <><Bold>Free Tier:</Bold> Users get 750 hours of public IPv4 usage per month for the first 12 months.</>,
                        <><Bold>Idle Charges:</Bold> Every IP costs money, even idle ones sitting unattached in your account.</>,
                    ]}
                />
                <Callout variant="warning" title="Anti-Pattern Alert">
                    <P className="mb-0">
                        The single most common mistake is allocating an IP for testing, stopping the instance, forgetting about the IP, and paying for it indefinitely. <Bold>Always release IPs you no longer need.</Bold>
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📊 Quota and Limits</SectionTitle>
                <P>
                    By default, all AWS accounts have a quota of <Bold>five Elastic IP addresses per Region</Bold>. This is because public IPv4 addresses are a scarce resource globally.
                </P>
                <BulletList
                    items={[
                        <>You can request a quota increase via the <Bold>Service Quotas</Bold> console.</>,
                        <>Needing more than five EIPs is often a sign of poor architecture. Production systems should typically use a <Bold>Load Balancer</Bold> instead of individual IPs.</>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: Managing Elastic IPs</SectionTitle>
                <SubTitle>Basic Lifecycle via CLI</SubTitle>
                <TerminalOutput label="AWS CLI Commands">
{`# 1. Allocate an IP to your account
aws ec2 allocate-address --domain vpc

# 2. Associate it with a running EC2 instance
aws ec2 associate-address \\
  --instance-id i-1234567890abcdef0 \\
  --allocation-id eipalloc-xxx

# 3. Disassociate when done (Warning: still billing!)
aws ec2 disassociate-address --association-id eipassoc-xxx

# 4. Release it (Stops billing permanently)
aws ec2 release-address --allocation-id eipalloc-xxx`}
                </TerminalOutput>

                <SubTitle>Find Idle IPs costing you money</SubTitle>
                <TerminalOutput label="Audit Command">
{`# Lists all EIPs with no AssociationId (Idle = Wasted Money)
aws ec2 describe-addresses \\
  --query 'Addresses[?AssociationId==null].[PublicIp,AllocationId]' \\
  --output table`}
                </TerminalOutput>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚖️ When to Use Elastic IP — and When Not To</SectionTitle>
                <DataTable
                    headers={["Use Case", "Better Alternative", "Recommendation"]}
                    rows={[
                        ["Third-party allowlist requires your IP", "None", "Use EIP"],
                        ["Failover to a backup instance", "ALB + Local Health Checks", "Use EIP for simple setups"],
                        ["Stable access to a web app", "Elastic Load Balancer (ELB)", "Use ELB"],
                        ["Multiple instances behind one IP", "Elastic Load Balancer (ELB)", "Use ELB"],
                        ["Dev/Test environments", "Dynamic Public IP", "Skip EIP"],
                    ]}
                />
                <Callout variant="tip" title="Cost-Effective Architecture">
                    <P className="mb-0">
                        Instead of giving 10 instances public IPs ($36/month), place them in private subnets and front them with one <Bold>Elastic Load Balancer</Bold> ($3.60/month for the IP). This reduces both cost and your attack surface.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Checkpoint: Test Your Knowledge</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "What happens to a dynamic public IP when an instance is stopped?",
                            answer: "AWS releases it back to the pool. When restarted, the instance gets a completely different IP. An Elastic IP prevents this by staying assigned to your account."
                        },
                        {
                            question: "Do you pay for an Elastic IP if the instance it's attached to is stopped?",
                            answer: "Yes. Since Feb 2024, AWS charges $0.005/hr for all public IPv4s, whether attached, unattached, or on stopped instances."
                        },
                        {
                            question: "What is the primary security benefit of using a Load Balancer over Elastic IPs?",
                            answer: "With a Load Balancer, your EC2 instances can stay in private subnets with no public IP at all, making them inaccessible to direct internet attacks."
                        },
                        {
                            question: "What happens to an Elastic IP when you terminate its associated instance?",
                            answer: "The IP remains allocated to your account (idle) and continues to accrue charges. You must explicitly 'Release' the address to stop billing."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
