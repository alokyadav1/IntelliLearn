import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, CodeBlock
} from "@/components/TopicContent";

export default function IamRoles() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What is an IAM Role?</SectionTitle>
                <P>
                    An IAM role is an identity that can be assumed by an authorized principal — an IAM user, AWS service, or other authenticated identity. Unlike IAM users, roles have no long-term credentials. Instead, when assumed, they provide temporary credentials that automatically expire.
                </P>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">👤</span>
                            <Bold className="text-blue-900 text-lg">IAM User</Bold>
                        </div>
                        <P className="text-sm text-blue-800 mb-0">
                            <Bold>Employee badge</Bold> — Permanent, belongs to one specific person or application.
                        </P>
                    </div>
                    <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">🎫</span>
                            <Bold className="text-purple-900 text-lg">IAM Role</Bold>
                        </div>
                        <P className="text-sm text-purple-800 mb-0">
                            <Bold>Visitor pass</Bold> — Temporary, anyone eligible can "wear it" for a specific duration.
                        </P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔑 A Role Has Exactly 2 Policies</SectionTitle>
                <P>Every IAM role is built on two distinct types of policies that work together to secure access:</P>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm space-y-3 mt-6">
                    <div className="text-slate-900 font-bold text-base">IAM Role Structure</div>
                    <div className="pl-4 flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">├── Trust Policy</span>
                        <span className="text-slate-500">→ <Bold>WHO</Bold> can wear this hat? (The "Front Door")</span>
                    </div>
                    <div className="pl-4 flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">└── Permissions Policy</span>
                        <span className="text-slate-500">→ <Bold>WHAT</Bold> can they do while wearing it?</span>
                    </div>
                </div>
                <P className="mt-4 italic text-slate-500 text-sm">Think of it as a two-door system — you must pass both doors to get in.</P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🚪 Door 1 — Trust Policy</SectionTitle>
                <P>
                    A trust policy is a <Bold>resource-based policy</Bold> attached to the role. it defines which principals (services, users, accounts) are trusted to assume the role.
                </P>
                
                <div className="space-y-6 mt-8">
                    <div>
                        <SubTitle>Example: EC2 Service Trust</SubTitle>
                        <CodeBlock 
                            language="json"
                            code={`{
  "Effect": "Allow",
  "Principal": { "Service": "ec2.amazonaws.com" },
  "Action": "sts:AssumeRole"
}`}
                        />
                    </div>

                    <div>
                        <SubTitle>Example: Cross-Account Trust</SubTitle>
                        <CodeBlock 
                            language="json"
                            code={`{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::ACCOUNT-B-ID:root" },
  "Action": "sts:AssumeRole"
}`}
                        />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🚪 Door 2 — Permissions Policy</SectionTitle>
                <P>
                    This is a standard <Bold>identity-based policy</Bold>. Once the trust policy allows someone in, this policy determines exactly what actions they can perform.
                </P>
                <CodeBlock 
                    language="json"
                    code={`{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::my-app-data/*"
}`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 How Role Assumption Works</SectionTitle>
                <P>When a principal requests to assume a role, AWS STS (Security Token Service) handles the verification and credential issuance.</P>
                
                <div className="bg-slate-900 text-slate-100 p-8 rounded-xl font-mono text-sm leading-relaxed border border-slate-700 mt-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-32 py-2 bg-slate-800 rounded border border-slate-600 text-center">Principal</div>
                            <div className="text-slate-500">─── sts:AssumeRole ───►</div>
                            <div className="w-32 py-2 bg-indigo-900 rounded border border-indigo-700 text-center">AWS STS</div>
                        </div>
                        
                        <div className="pl-44 space-y-4 border-l-2 border-slate-700 ml-16">
                            <div className="flex items-start gap-4">
                                <span className="text-amber-400">1.</span>
                                <span>Check <Bold className="text-indigo-400">Trust Policy</Bold> (Is Principal allowed?)</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-amber-400">2.</span>
                                <span>Check <Bold className="text-emerald-400">Permissions</Bold> (Are they allowed to assume?)</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32 py-2 bg-emerald-900 rounded border border-emerald-700 text-center">Success</div>
                            <div className="text-slate-500">◄── Temp Credentials ───</div>
                            <div className="w-32 py-2 bg-slate-800 rounded border border-slate-600 text-center text-xs">AccessKey + Secret<br/>+ SessionToken</div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-slate-500 border-t border-slate-800 pt-4">
                        <P className="text-xs italic mb-0">Credentials auto-expire (1hr default, up to 12hrs)</P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📦 4 Common Role Types</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Bold className="text-slate-900 block mb-1">1. Service Role</Bold>
                        <P className="text-sm text-slate-600 mb-0">Used by EC2, Lambda, or ECS to interact with other AWS services automatically.</P>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Bold className="text-slate-900 block mb-1">2. Cross-Account Role</Bold>
                        <P className="text-sm text-slate-600 mb-0">Allows users from Account A to securely manage resources in Account B without creating local users.</P>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Bold className="text-slate-900 block mb-1">3. EC2 Instance Profile</Bold>
                        <P className="text-sm text-slate-600 mb-0">A container for an IAM role that you can use to pass role information to an EC2 instance at launch.</P>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Bold className="text-slate-900 block mb-1">4. CI/CD Pipeline Role</Bold>
                        <P className="text-sm text-slate-600 mb-0">Allows GitHub Actions or Jenkins to deploy code to AWS using temporary, secure credentials.</P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Attach a Role to EC2</SectionTitle>
                <P>The gold standard for security: Give your EC2 instance permissions without ever touching a secret key.</P>
                <StepList
                    steps={[
                        {
                            title: "Create the Role",
                            description: "IAM → Roles → Create Role → AWS Service → EC2. Attach 'AmazonS3ReadOnlyAccess'."
                        },
                        {
                            title: "Attach to Instance",
                            description: "EC2 → select instance → Actions → Security → Modify IAM Role. Select your new role."
                        },
                        {
                            title: "Verify via CLI",
                            description: "SSH into the instance and run 'aws s3 ls'. It works without any 'aws configure' setup!"
                        }
                    ]}
                />
                <Callout variant="info" title="Why is this better?">
                    <P className="mb-0 text-sm">
                        No access keys are stored on the instance disk. If the instance is compromised, the temporary credentials expire shortly, and you can revoke the role instantly.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Checkpoint: Ready to Move On?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Your Lambda needs to write to DynamoDB. Keys in env vars or a Role?",
                            answer: "Always a Role (Execution Role). Lambda automatically assumes it and handles credential rotation for you. Putting keys in env vars is a security risk as they could be leaked in logs or the console."
                        },
                        {
                            question: "You added full S3 permissions but EC2 still gets 'Access Denied'. Why?",
                            answer: "Likely the Trust Policy matches. Either the trust policy doesn't allow 'ec2.amazonaws.com' to assume the role, or the role hasn't been attached to the instance via an Instance Profile."
                        },
                        {
                            question: "What's the difference between a Trust Policy and a Permissions Policy?",
                            answer: "Trust Policy = Who can assume the role (Front door). Permissions Policy = What can they do once they've assumed it (What's inside)."
                        },
                        {
                            question: "What does AWS STS return when you assume a role?",
                            answer: "Three things: An Access Key ID, a Secret Access Key, and a Session Token. All three are required to make authenticated requests with temporary credentials."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
