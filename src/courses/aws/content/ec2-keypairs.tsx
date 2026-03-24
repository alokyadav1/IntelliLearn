import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList, NumberedList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, Diagram, CodeBlock, TerminalOutput
} from "@/components/TopicContent";

export default function Ec2KeyPairs() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What Is a Key Pair?</SectionTitle>
                <P>
                    A key pair consists of a <Bold>public key</Bold> and a <Bold>private key</Bold> — a set of security credentials used to prove your identity when connecting to an EC2 instance.
                </P>
                <BulletList
                    items={[
                        <><Bold>Public key:</Bold> AWS stores this on your instance, specifically injected into <InlineCode>~/.ssh/authorized_keys</InlineCode>.</>,
                        <><Bold>Private key:</Bold> YOU store this locally as a <InlineCode>.pem</InlineCode> or <InlineCode>.ppk</InlineCode> file. This is downloaded once and never again.</>,
                    ]}
                />
                <Callout variant="warning" title="Critical Note">
                    <P className="mb-0">
                        Anyone who possesses your private key can connect to your instances. Because AWS doesn't keep a copy of your private key, there is <Bold>no way to recover it</Bold> if you lose it.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 How SSH Authentication Works</SectionTitle>
                <P>
                    When you SSH into an EC2 instance, the SSH client uses the private key to prove ownership. The EC2 instance verifies this against the stored public key.
                </P>
                <Diagram label="SSH Handshake Process">
                    <pre className="text-[13px] leading-relaxed font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto transition-colors">
                        {`Your machine                          EC2 Instance
──────────────────────────────────    ──────────────────────────
1. ssh -i key.pem ec2-user@<ip>  ──► checks ~/.ssh/authorized_keys
2. proves ownership of private key ◄── challenges with random data
3. connection established         ──► session symmetric key created
4. all traffic encrypted              using session key`}
                    </pre>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📁 .pem vs .ppk — File Formats</SectionTitle>
                <DataTable
                    headers={["Format", "Used By", "When to use"]}
                    rows={[
                        [<InlineCode>.pem</InlineCode>, "OpenSSH (Mac, Linux, modern Windows)", "Default — use this for most cases"],
                        [<InlineCode>.ppk</InlineCode>, "PuTTY (older Windows SSH client)", "Only if using PuTTY"],
                    ]}
                />
                <SubTitle>Converting between formats</SubTitle>
                <P>If you need to move between formats, you can use <Bold>PuTTYgen</Bold> on Windows:</P>
                <TerminalOutput label="PuTTYgen CLI (Linux/Mac)">
{`# .pem → .ppk
puttygen my-key.pem -o my-key.ppk

# .ppk → .pem
puttygen my-key.ppk -O private-openssh -o my-key.pem`}
                </TerminalOutput>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Full Key Pair Workflow</SectionTitle>
                
                <SubTitle>Option A: Create via AWS Console</SubTitle>
                <StepList
                    steps={[
                        {
                            title: "Navigate to Key Pairs",
                            description: "EC2 → Network & Security → Key Pairs → Create key pair"
                        },
                        {
                            title: "Configure Key",
                            description: "Name: my-app-key. Type: ED25519 (preferred for modern security) or RSA. Format: .pem."
                        },
                        {
                            title: "Save and Secure",
                            description: "Download saved automatically. Move to a secure folder like ~/.ssh/ and set permissions."
                        }
                    ]}
                />

                <SubTitle>Option B: Create via CLI (More Secure)</SubTitle>
                <CodeBlock label="AWS CLI Method" language="bash">
{`# Generate and download in one command
aws ec2 create-key-pair \\
  --key-name my-app-key \\
  --key-type ed25519 \\
  --query 'KeyMaterial' \\
  --output text > ~/.ssh/my-app-key.pem

# CRITICAL: SSH rejects keys with open permissions
chmod 400 ~/.ssh/my-app-key.pem`}
                </CodeBlock>

                <SubTitle>Option C: Import Your Own Key (Most Secure)</SubTitle>
                <P>The private key never touches AWS — you only upload the public portion.</P>
                <CodeBlock label="SSH Keygen + Import" language="bash">
{`# Generate locally
ssh-keygen -t ed25519 -f ~/.ssh/my-app-key -C "my-app-key"

# Import public key to AWS
aws ec2 import-key-pair \\
  --key-name my-app-key \\
  --public-key-material fileb://~/.ssh/my-app-key.pub`}
                </CodeBlock>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🚨 Lost Your Key? — Recovery Options</SectionTitle>
                <P>
                    If you lose your private key, you lose access. However, you can recover if the instance is EBS-backed:
                </P>
                <NumberedList
                    items={[
                        "Stop the instance (do not terminate).",
                        "Detach the root EBS volume and attach it to a temporary 'rescue' instance.",
                        "Mount the volume and edit /home/ec2-user/.ssh/authorized_keys.",
                        "Replace the old public key with your new one.",
                        "Reattach the volume to the original instance and start it."
                    ]}
                />
                <Callout variant="tip" title="Better Alternative">
                    <P className="mb-2">
                        Avoid key management entirely by using <Bold>AWS Systems Manager Session Manager</Bold>.
                    </P>
                    <TerminalOutput label="SSM Connection">
                        {`aws ssm start-session --target i-1234567890abcdef0`}
                    </TerminalOutput>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔒 Modern Alternative — EC2 Instance Connect</SectionTitle>
                <P>
                    EC2 Instance Connect uses IAM to control SSH access. It pushes a one-time SSH public key to the instance metadata service, valid for only 60 seconds.
                </P>
                <DataTable
                    headers={["Traditional Keypairs", "EC2 Instance Connect"]}
                    rows={[
                        ["Long-term .pem file (leaks = risk)", "One-time key (expires in 60s)"],
                        ["Access controlled by file possession", "Access controlled by IAM policies"],
                        ["No AWS-level audit trail", "Full audit trail in CloudTrail"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚡ Production Best Practices</SectionTitle>
                <BulletList
                    items={[
                        <><Bold>Blast Radius:</Bold> Use unique key pairs per instance or environment.</>,
                        <><Bold>Storage:</Bold> Store private keys in AWS Secrets Manager or encrypted vaults — never in Git.</>,
                        <><Bold>Permissions:</Bold> Always use <InlineCode>chmod 400</InlineCode> on Linux/Mac.</>,
                        <><Bold>Network Control:</Bold> Restrict SSH access (Port 22) in Security Groups to specific IP addresses, never <InlineCode>0.0.0.0/0</InlineCode>.</>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Checkpoint: Test Your Knowledge</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "What happens if you lose your private key?",
                            answer: "AWS has no copy. You lose access unless you use a recovery procedure (detaching EBS) or have pre-configured alternatives like SSM Session Manager."
                        },
                        {
                            question: "Why does SSH return 'WARNING: UNPROTECTED PRIVATE KEY FILE'?",
                            answer: "Your file permissions are too open. SSH requires the private key file to be readable only by the owner for security. Fix it with 'chmod 400 key.pem'."
                        },
                        {
                            question: "Should you share one .pem file with a team of 10 developers?",
                            answer: "No. This creates a security risk and loses auditing. Use EC2 Instance Connect or IAM roles for proper per-user access control."
                        },
                        {
                            question: "Why is SSM Session Manager preferred over SSH in production?",
                            answer: "It requires no open inbound ports (no Port 22), needs no SSH keys to manage/leak, and provides a full audit log of every command in CloudWatch/S3."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
