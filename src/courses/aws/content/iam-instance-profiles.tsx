import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, CodeBlock, Diagram, TerminalOutput
} from "@/components/TopicContent";

export default function IamInstanceProfiles() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What is an Instance Profile?</SectionTitle>
                <P>
                    An <Bold>Instance Profile</Bold> is a container that holds exactly one IAM role and passes it to an EC2 instance at launch. It acts as the bridge that delivers an IAM Role's identities and permissions to the compute resource.
                </P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <Bold className="text-indigo-600 border-b border-indigo-100 pb-1 mb-3 block">IAM Role</Bold>
                        <P className="text-sm mb-0">The <Bold>Identity</Bold>. Defines the permissions (what can be done) and trust policy (who can assume it).</P>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <Bold className="text-emerald-600 border-b border-emerald-100 pb-1 mb-3 block">Instance Profile</Bold>
                        <P className="text-sm mb-0">The <Bold>Delivery Mechanism</Bold>. Attaches the role to the EC2 instance so the code inside can use it.</P>
                    </div>
                </div>

                <Callout variant="warning" className="mt-8">
                    <P className="mb-0 text-sm">
                        <Bold>The Console Trick:</Bold> When you create a role via the IAM Console, AWS automatically creates an instance profile with the same name. However, if you're using the <Bold>CLI or Terraform</Bold>, you must create the role and the instance profile separately.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📡 The Instance Metadata Service (IMDS)</SectionTitle>
                <P>
                    How does your application code actually get the credentials? It doesn't find them in a config file or environment variable. Instead, it queries a special, internal AWS endpoint called <Bold>IMDS</Bold>.
                </P>
                
                <div className="flex flex-col items-center justify-center p-8 bg-indigo-900 rounded-2xl text-white my-8 text-center border-4 border-indigo-800 shadow-lg">
                    <div className="text-4xl font-black tracking-widest mb-2 font-mono">169.254.169.254</div>
                    <P className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-0">The Magic IP Address</P>
                    <div className="mt-4 text-sm opacity-80 max-w-md">
                        This is a <Bold className="text-white">link-local address</Bold> reachable only from inside the EC2 instance. It never routes to the public internet or other instances.
                    </div>
                </div>

                <SubTitle>Automatic Discovery</SubTitle>
                <P>
                    When your code uses an AWS SDK (like Boto3 or AWS SDK for JS), you don't need to specify credentials. The SDK automatically tries several sources, ending with a request to mapping above.
                </P>
                <Diagram label="Credential Retrieval Flow">
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="flex items-center gap-4 w-full justify-between">
                            <div className="w-1/3 p-4 bg-slate-100 border border-slate-200 rounded text-center font-bold text-slate-800">Your App / SDK</div>
                            <div className="flex-1 border-t-2 border-dashed border-slate-300 relative">
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-[10px] text-slate-400 font-bold uppercase">Requests Creds</span>
                            </div>
                            <div className="w-1/3 p-4 bg-amber-100 border border-amber-200 rounded text-center font-bold text-amber-900 underline decoration-amber-300 underline-offset-4">IMDS (169.254.169.254)</div>
                        </div>
                        <div className="h-8 border-l-2 border-dashed border-slate-300"></div>
                        <div className="w-full flex justify-center">
                            <div className="w-2/3 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                                <Bold className="text-emerald-800 block mb-2">Result: Rotating Credentials</Bold>
                                <div className="font-mono text-xs text-emerald-700 bg-white/50 p-3 rounded">
                                    &#123; "AccessKeyId": "ASIA...", "SecretKey": "...", "Token": "..." &#125;
                                </div>
                                <P className="text-[10px] text-emerald-600 mt-2 mb-0 italic">AWS auto-refreshes these before they expire.</P>
                            </div>
                        </div>
                    </div>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔐 IMDSv1 vs IMDSv2 — Security First</SectionTitle>
                <P>
                    There are two versions of the Metadata service. Modern security requirements demand <Bold>IMDSv2</Bold> because it is significantly more secure against SSRF (Server-Side Request Forgery) attacks.
                </P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-5 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-red-500 font-bold">IMDSv1</span>
                            <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold">Legacy</span>
                        </div>
                        <P className="text-sm text-slate-500">Uses simple GET requests. Easier to exploit if your web app has an SSRF bug.</P>
                        <InlineCode className="block mt-2">curl http://169.../meta-data/iam/security-credentials/</InlineCode>
                    </div>
                    <div className="p-5 border border-emerald-200 bg-emerald-50/30 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-emerald-600 font-bold font-lg">IMDSv2</span>
                            <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase font-bold">Recommended</span>
                        </div>
                        <P className="text-sm text-slate-700">Session-oriented. Requires a <Bold>PUT</Bold> request to get a token first. SSRF attacks usually can't perform PUTs.</P>
                        <InlineCode className="block mt-2">PUT → Get Token → Use Token in GET</InlineCode>
                    </div>
                </div>

                <Callout variant="tip" className="mt-8" title="AWS Best Practice">
                    <P className="mb-0 text-sm">
                        Always enforce <Bold>IMDSv2-only</Bold> by setting <InlineCode>HttpTokens: required</InlineCode> on your EC2 instances. This disables the insecure v1 fallback entirely.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Inspect Credentials</SectionTitle>
                <P>Follow these steps to see how the IMDSv2 protocol works from inside an EC2 instance.</P>
                
                <StepList
                    steps={[
                        {
                            title: "Attach Role",
                            description: "Launch an EC2 instance and attach an IAM Role (e.g., 'EC2-S3-ReadOnly')."
                        },
                        {
                            title: "Generate Token",
                            description: "Request a session token from the IMDSv2 endpoint using a PUT request."
                        },
                        {
                            title: "Fetch Credentials",
                            description: "Pass the token in the headers of a GET request to see the real temporary keys."
                        }
                    ]}
                />

                <TerminalOutput label="IMDSv2 Request Flow">
{`# 1. Get a 6-hour session token
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# 2. Use the token to fetch the credentials
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/EC2-S3-Role

# 3. View the rotating keys!
{
  "Code" : "Success",
  "LastUpdated" : "2026-03-13T12:00:00Z",
  "Type" : "AWS-HMAC",
  "AccessKeyId" : "ASIA...",
  "SecretAccessKey" : "...",
  "Token" : "...",
  "Expiration" : "2026-03-13T18:00:00Z"
}`}
                </TerminalOutput>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Checkpoint: Ready to Move On?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "What is the difference between an IAM Role and an Instance Profile?",
                            answer: "The Role is the identity containing permissions. The Instance Profile is the container that attaches that role to an EC2 instance. The console usually manages both for you, but they are separate objects in AWS."
                        },
                        {
                            question: "Your app code does boto3.client('s3') with no keys. How does it work?",
                            answer: "The SDK queries the IMDS endpoint at 169.254.169.254, fetches the temporary credentials provided by the instance profile, and uses them automatically."
                        },
                        {
                            question: "Why is 169.254.169.254 safe from external attackers?",
                            answer: "It is a link-local address. It is technologically impossible to route traffic to this address from outside the instance boundary. It is only accessible to the CPU running inside that specific VM."
                        },
                        {
                            question: "How did the Capital One breach happen and how does IMDSv2 fix it?",
                            answer: "An SSRF attack allowed a remote attacker to trigger a simple GET request to IMDSv1. IMDSv2 requires a PUT request to get a session token first. Since most SSRF vulnerabilities are limited to GET requests, this blocks the credential theft."
                        },
                        {
                            question: "Can you attach 5 different roles to a single EC2 instance?",
                            answer: "No. An Instance Profile can contain exactly ONE role. If you need 5 sets of permissions, you must consolidate them into a single role."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
