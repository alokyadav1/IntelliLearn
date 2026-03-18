import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, CodeBlock, Diagram, TerminalOutput,
    IOBlock
} from "@/components/TopicContent";

export default function IamAssumingRoles() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What Does "Assuming a Role" Mean?</SectionTitle>
                <P>
                    When a principal assumes a role, they aren't logging in with a password. Instead, they are requesting **temporary, short-lived tokens**. The role itself has no long-term credentials — no permanent access keys or passwords to leak.
                </P>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="md:col-span-2 p-6 bg-slate-900 rounded-2xl border border-slate-800 text-slate-100 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xl">👤</div>
                            <div className="flex-1 h-px bg-slate-700 relative">
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">sts:AssumeRole</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl">🛡️</div>
                        </div>
                        <P className="text-sm text-slate-400 mb-0 italic">
                            "I am User-A, and I want to act as Role-B for the next hour."
                        </P>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <Bold className="text-indigo-900 block mb-2">Key Card Swap</Bold>
                        <ul className="text-xs space-y-2 text-indigo-800">
                            <li>• Hand in your permanent badge</li>
                            <li>• Get a temp visitor pass</li>
                            <li>• Pass expires automatically</li>
                            <li>• No cleanup needed!</li>
                        </ul>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 The Full AssumeRole Flow</SectionTitle>
                <P>To assume a role, an identity calls the <Bold>AWS STS AssumeRole</Bold> API. STS acts as the secure gatekeeper that issues the credentials.</P>
                
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 my-8 overflow-hidden">
                    <div className="relative flex flex-col items-center gap-12">
                        {/* Step 1 */}
                        <div className="flex items-center gap-6 w-full max-w-2xl">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-400">01</div>
                            <div className="flex-1 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <Bold className="text-slate-800">Request:</Bold>
                                <P className="text-xs text-slate-500 mb-0 mt-1">Calling <InlineCode>sts:AssumeRole</InlineCode> with Role ARN and Session Name.</P>
                            </div>
                        </div>
                        
                        {/* Step 2 */}
                        <div className="flex items-center gap-6 w-full max-w-2xl">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-400">02</div>
                            <div className="flex-1 p-4 bg-indigo-600 rounded-xl text-white shadow-lg relative">
                                <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Evaluation</div>
                                <Bold className="text-white">The Double Lock Check:</Bold>
                                <ul className="text-xs mt-2 space-y-1 opacity-90">
                                    <li>1. Does the **Trust Policy** allow this principal?</li>
                                    <li>2. Does the principal have **Permission** to assume?</li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center gap-6 w-full max-w-2xl">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-400">03</div>
                            <div className="flex-1 p-4 bg-emerald-500 rounded-xl text-white shadow-lg">
                                <Bold className="text-white">Credentials Issued:</Bold>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded font-mono">AccessKey</span>
                                    <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded font-mono">SecretKey</span>
                                    <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded font-mono text-amber-200">SessionToken</span>
                                </div>
                            </div>
                        </div>

                        {/* vertical line connecting */}
                        <div className="absolute left-[30px] top-12 bottom-12 w-0.5 bg-slate-200 -z-10"></div>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ AssumeRole in Practice</SectionTitle>
                <P>Depending on whether you are working in the terminal or in code, role assumption looks slightly different.</P>
                
                <div className="space-y-8 mt-8">
                    <div>
                        <SubTitle>Option A: Manual via CLI</SubTitle>
                        <TerminalOutput label="AWS CLI AssumeRole">
{`# 1. Assume the role
aws sts assume-role \\
  --role-arn arn:aws:iam::123456789012:role/MyRole \\
  --role-session-name my-dev-session

# 2. Export the returned credentials to your environment
export AWS_ACCESS_KEY_ID="ASIA..."
export AWS_SECRET_ACCESS_KEY="wJal..."
export AWS_SESSION_TOKEN="FQoG..."

# 3. You are now acting as the role!
aws s3 ls`}
                        </TerminalOutput>
                    </div>

                    <div>
                        <SubTitle>Option B: Automated via SDK (Python/boto3)</SubTitle>
                        <CodeBlock 
                            language="python"
                            code={`import boto3

# Start STS client
sts = boto3.client('sts')

# Request temp credentials
response = sts.assume_role(
    RoleArn='arn:aws:iam::123456789012:role/MyRole',
    RoleSessionName='app-session'
)

creds = response['Credentials']

# Create a new client using the temporary session
s3 = boto3.client(
    's3',
    aws_access_key_id=creds['AccessKeyId'],
    aws_secret_access_key=creds['SecretAccessKey'],
    aws_session_token=creds['SessionToken']
)

# This request uses the assumed role!
s3.list_buckets()`}
                        />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🌍 Cross-Account Role Assumption</SectionTitle>
                <P>This is the most common use case for roles. It allows a user in Account A to securely manage resources in Account B without creating a second set of long-term credentials.</P>
                <P className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-6">The Setup (Both Sides Required)</P>
                <IOBlock 
                    inputLabel="Account A (Requester)"
                    outputLabel="Account B (Resource Owner)"
                    input={
                        <div className="space-y-2">
                            <Bold className="text-indigo-600 block text-xs underline">Identity-based Policy</Bold>
                            <CodeBlock 
                                className="!mb-0"
                                language="json"
                                code={`{
  "Effect": "Allow",
  "Action": "sts:AssumeRole",
  "Resource": "arn:aws:iam::ACC-B:role/Prod"
}`}
                            />
                        </div>
                    }
                    output={
                        <div className="space-y-2">
                            <Bold className="text-emerald-600 block text-xs underline">Trust Policy (on Role)</Bold>
                            <CodeBlock 
                                className="!mb-0"
                                language="json"
                                code={`{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::ACC-A:root" },
  "Action": "sts:AssumeRole"
}`}
                            />
                        </div>
                    }
                />
                <Callout variant="tip">
                    <P className="mb-0 text-sm">
                        <Bold>Security Pro-Tip:</Bold> In Account B's trust policy, you can add a <InlineCode>Condition</InlineCode> requiring <InlineCode>aws:MultiFactorAuthPresent: true</InlineCode>. This ensures that even if Account A is compromised, the role can't be assumed unless the attacker also has the MFA device.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⛓️ Role Chaining & Gotchas</SectionTitle>
                <P>
                    Role chaining happens when you assume one role, and then use those credentials to assume <Bold>another</Bold> role.
                </P>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="space-y-4">
                        <SubTitle className="mt-0">Common Scenario</SubTitle>
                        <P className="text-sm text-slate-500">A developer assumes a "Hub" role in Account-B, then from there assumes a "Database" role in Account-C to perform maintenance.</P>
                        <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="px-2 py-1 bg-slate-100 rounded">User-A</span>
                            <span>→</span>
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Role-B</span>
                            <span>→</span>
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">Role-C</span>
                        </div>
                    </div>
                    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl relative">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-red-600 text-white font-black text-[10px] rounded-full uppercase tracking-widest">The Big Warning</div>
                        <Bold className="text-red-900 block mb-2">The 1-Hour Wall</Bold>
                        <P className="text-sm text-red-800 mb-0 leading-relaxed">
                            When you chain roles, the session is **hard-limited to 1 hour**. This applies even if the destination role has a 12-hour max session duration. There is no workaround.
                        </P>
                    </div>
                </div>

                <SubTitle>Session Duration Quick Reference</SubTitle>
                <DataTable 
                    headers={["Scenario", "Min", "Default", "Max Limit"]}
                    rows={[
                        ["Direct (User → Role)", "15 min", "1 hr", "12 hours"],
                        ["Role Chaining (Role → Role)", "15 min", "1 hr", "1 hour (Hard limit)"],
                        ["EC2 Instance Profile", "—", "Automatic", "Managed by AWS"],
                        ["Lambda Execution Role", "—", "Automatic", "Managed by AWS"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Checkpoint: Ready to Move On?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "What are the 3 pieces of data returned by sts:AssumeRole and why do you need all 3?",
                            answer: "AccessKeyId, SecretAccessKey, and SessionToken. All three are required together. The SessionToken is the 'signature' that proves the credentials are temporary and scoped to a specific session; without it, the credentials won't work."
                        },
                        {
                            question: "Your CI/CD pipeline assumes a role but times out after exactly 1 hour. What is happening?",
                            answer: "You are likely hitting the Role Chaining limit. If your pipeline is already running as a service role and then assumes a second role, it is restricted to a 1-hour session maximum."
                        },
                        {
                            question: "What is RoleSessionName and why should you care in production?",
                            answer: "It's a identifier you provide when assuming a role. It appears in CloudTrail logs. In production, setting this to something like 'github-actions-deploy' or 'dev-manual-fix' is critical for auditing who used a role and when."
                        },
                        {
                            question: "Why are temporary credentials safer than long-term IAM User keys?",
                            answer: "They have a limited 'blast radius'. If leaked, they expire automatically in a few hours. Long-term keys stay valid potentially forever until manually rotated, increasing the risk of long-term account compromise."
                        }
                    ]}
                />

                <div className="mt-16 p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Section 2 Complete</div>
                        <h2 className="text-3xl font-black mb-4">You've Mastered IAM! 🏆</h2>
                        <P className="text-emerald-50 mb-0 opacity-90 max-w-lg">
                            You've finished all 7 topics in Identity & Security. You now understand the full IAM picture — users, groups, roles, policies, instance profiles, and cross-account assumption. Ready for Section 3: Compute?
                        </P>
                    </div>
                    {/* decorative background element */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </Section>
        </div>
    );
}
