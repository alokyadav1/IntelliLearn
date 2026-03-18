import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, CodeBlock, TerminalOutput, ImageBlock
} from "@/components/TopicContent";

export default function Ec2Overview() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What is EC2?</SectionTitle>
                <P>
                    Amazon EC2 (Elastic Compute Cloud) is a foundational AWS service that provides secure, resizable compute capacity in the cloud — virtual machine instances you can launch, configure, and control.
                </P>
                <Callout variant="definition" title="EC2 in One Line">
                    <P className="mb-0">
                        <Bold>EC2 = Renting a computer in AWS's data center, billed by the second.</Bold>
                    </P>
                </Callout>
                <P>
                    EC2 uses <Bold>multi-tenancy</Bold> — multiple customers share the same physical hardware, but virtual machines remain fully isolated and secure. AWS manages the hypervisor and hardware so you get dedicated resources without managing physical servers yourself.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🏗️ The 5 Core Components</SectionTitle>
                <P>When launching an EC2 instance, you are essentially assembling a virtual server from these base pieces:</P>
                
                <ImageBlock 
                    src="/images/courses/aws/ec2/ec2-components.png" 
                    alt="EC2 Core Components"
                    caption="The foundational configuration for every EC2 instance"
                />

                <BulletList 
                    items={[
                        <>
                            <Bold>AMI (Amazon Machine Image):</Bold> A template that contains the software configuration (OS, application server, and applications).
                        </>,
                        <>
                            <Bold>Instance Type:</Bold> determines the hardware specifications (CPU, Memory, Network performance).
                        </>,
                        <>
                            <Bold>Key Pair:</Bold> Security credentials for SSH access (Linux) or RDP (Windows).
                        </>,
                        <>
                            <Bold>Network (VPC/Subnet):</Bold> The virtual network location where your instance will live.
                        </>,
                        <>
                            <Bold>Security Group:</Bold> A virtual firewall that controls inbound and outbound traffic.
                        </>
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 EC2 Instance Lifecycle</SectionTitle>
                <P>Every instance moves through specific states. Understanding these is critical for both operations and cost management.</P>

                <ImageBlock 
                    src="/images/courses/aws/ec2/ec2-lifecycle.png" 
                    alt="EC2 Instance Lifecycle"
                    caption="Instance states and billing transitions"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                        <Bold className="text-emerald-900 block mb-2 text-lg">Running 🟢</Bold>
                        <P className="text-sm text-emerald-800 mb-0">
                            Billed per-second. Compute resources are active and you are fully operational.
                        </P>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <Bold className="text-slate-900 block mb-2 text-lg">Stopped 🛑</Bold>
                        <P className="text-sm text-slate-800 mb-0">
                            No compute charge. However, <Bold>EBS volumes</Bold> attached still accrue storage charges.
                        </P>
                    </div>
                </div>

                <Callout variant="warning" className="mt-6">
                    <P className="mb-0 text-sm">
                        <Bold>Important:</Bold> Terminated instances cannot be "started" again. All data on the root volume is deleted by default upon termination.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📦 Instance Families at a Glance</SectionTitle>
                <P>EC2 offers specialized families optimized for different workloads. Choosing the right one balances cost and performance.</P>
                
                <DataTable 
                    headers={["Family", "Optimized for", "Example Types", "Use Case"]}
                    rows={[
                        ["General Purpose", "Balanced CPU/RAM/Network", "t3, m6i", "Web servers, dev environments"],
                        ["Compute Optimized", "High CPU / Batch processing", "c6i, c7g", "Batch jobs, media encoding"],
                        ["Memory Optimized", "Large RAM / In-memory data", "r6i, x2idn", "Databases, in-memory caching"],
                        ["Storage Optimized", "High disk I/O / Throughput", "i3, d3", "Data warehouses, Hadoop"],
                        ["Accelerated", "GPU / FPGA", "p4, g5", "ML training, graphics"]
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔗 How EC2 Connects to Everything</SectionTitle>
                <P>EC2 is the "Hub" module—it's the service where IAM, VPC, and Storage all meet to form a functional application.</P>
                
                <ImageBlock 
                    src="/images/courses/aws/ec2/ec2-connections.png" 
                    alt="EC2 Connectivity Hub"
                    caption="How EC2 interacts with other core AWS services"
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Launch Your First EC2</SectionTitle>
                <P>Follow these steps to launch a free-tier eligible instance and verify its connectivity.</P>
                
                <StepList 
                    steps={[
                        {
                            title: "Launch Config",
                            description: "Go to EC2 Console → Launch Instance. Name: 'my-first-ec2'. Select 'Amazon Linux 2023'."
                        },
                        {
                            title: "Instance Type",
                            description: "Select 't2.micro' (Free Tier Eligible)."
                        },
                        {
                            title: "Access Control",
                            description: "Create a new Key Pair → Download .pem file. In Security Groups, allow SSH (Port 22) from 'My IP'."
                        },
                        {
                            title: "Storage & IAM",
                            description: "Accept default 8GiB gp3 storage."
                        }
                    ]}
                />

                <SubTitle>Verify Connectivity</SubTitle>
                <TerminalOutput label="SSH Connection">
{`# 1. Set permissions on your key
chmod 400 my-key.pem

# 2. Connect to the public IP
ssh -i my-key.pem ec2-user@<public-ip>
`}
                </TerminalOutput>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Knowledge Check</SectionTitle>
                <Accordion 
                    items={[
                        {
                            question: "What does 'Elastic' mean in Elastic Compute Cloud?",
                            answer: "It means scaling compute capacity up or down on demand. You can launch 1 or 1,000 instances in minutes, resize them as needed, and pay only for what you use."
                        },
                        {
                            question: "You stop an EC2 instance overnight. Are you paying anything?",
                            answer: "Yes. While compute (CPU/RAM) charges stop, the EBS volumes attached to the instance continue to accrue storage charges (e.g., ~$1.60/month for 20GB)."
                        },
                        {
                            question: "Missing/misconfiguring which component causes 'Connection Timed Out'?",
                            answer: "Usually the Security Group or the Network/VPC configuration. If the security group doesn't allow your IP on port 22, you will be blocked before you even reach the instance."
                        },
                        {
                            question: "Should you SSH into prod and edit files directly?",
                            answer: (
                                <>
                                    <Bold className="text-red-600">No.</Bold> Direct edits are untraceable and not reproducible. Treat instances as <Bold>immutable</Bold>. Changes should be made via version control and deployed through a CI/CD pipeline or new AMIs.
                                </>
                            )
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
