import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, Diagram, CodeBlock
} from "@/components/TopicContent";

export default function IamOverview() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What is IAM?</SectionTitle>
                <P>
                    IAM (Identity and Access Management) is the security gatekeeper of AWS — it controls <Bold>who</Bold> can access what, and <Bold>what</Bold> they can do once they're in.
                </P>
                <P>
                    Think of it like an office building ID system: admins get access to every floor, developers can only enter their department, and some are just visiting with temporary access.
                </P>
                <Callout variant="info">
                    <P className="mb-0">
                        IAM works in two steps: first it <Bold>authenticates</Bold> (verifies your identity), then it <Bold>authorizes</Bold> (checks what you're allowed to do) by evaluating the policies attached to your identity.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>👤 The 4 Core IAM Concepts</SectionTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <SubTitle className="mt-0">1. Users</SubTitle>
                        <P className="text-sm">
                            Represents a person or application with long-term credentials. Never use the root account for daily tasks — create an IAM user instead.
                        </P>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <SubTitle className="mt-0">2. Groups</SubTitle>
                        <P className="text-sm">
                            A collection of users. Attach a policy to a group, and all users in it inherit those permissions (e.g., "Developers" group).
                        </P>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <SubTitle className="mt-0">3. Roles</SubTitle>
                        <P className="text-sm">
                            A temporary identity assumed by entities (EC2, Lambda, or cross-account users). No long-term passwords; uses temporary security tokens.
                        </P>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <SubTitle className="mt-0">4. Policies</SubTitle>
                        <P className="text-sm">
                            JSON documents that define permissions. They specify who (Principal), what (Action), which (Resource), and when (Condition).
                        </P>
                    </div>
                </div>

                <div className="mt-8">
                    <CodeBlock 
                        language="json"
                        code={`{
  "Effect": "Allow",
  "Action": "s3:ListBucket",
  "Resource": "arn:aws:s3:::my-bucket"
}`}
                    />
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔑 Users vs Roles — The Key Difference</SectionTitle>
                <DataTable
                    headers={["Feature", "IAM User", "IAM Role"]}
                    rows={[
                        [<Bold>Credentials</Bold>, "Long-term (password, access key)", "Temporary (short-lived tokens)"],
                        [<Bold>Assigned to</Bold>, "A specific person", "Any trusted entity (EC2, Lambda)"],
                        [<Bold>Use case</Bold>, "Human logging into console", "Applications or cross-account access"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔒 IAM Policy Evaluation — How AWS Decides</SectionTitle>
                <P>
                    By default, all requests are <Bold>denied</Bold>. An explicit Allow overrides this. However, an explicit <Bold>Deny always wins</Bold> — even if another policy allows it.
                </P>
                <Diagram label="Policy Evaluation Logic">
                    <pre className="text-[13px] leading-relaxed font-mono text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-100 overflow-x-auto">
                        {`Request comes in
      │
      ▼
Is there an explicit DENY? ──Yes──► ❌ DENIED
      │ No
      ▼
Is there an explicit ALLOW? ──No───► ❌ DENIED (default)
      │ Yes
      ▼
      ✅ ALLOWED`}
                    </pre>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: Least Privilege in Action</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Create Group",
                            description: "Go to IAM → User Groups → Create Group 'Developers'. Attach 'AmazonS3ReadOnlyAccess'."
                        },
                        {
                            title: "Add User",
                            description: "Create User 'alice' and add her to the 'Developers' group."
                        },
                        {
                            title: "Verify Boundary",
                            description: "Log in as alice. Try to launch an EC2 instance. You'll get 'Access Denied' because she only has S3 read access."
                        },
                        {
                            title: "Inspect JSON",
                            description: "Go to Policies → Search 'AmazonS3ReadOnlyAccess' → Click JSON tab to see the raw statement logic."
                        }
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Checkpoint: Are You Ready?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "What's the difference between an IAM User and an IAM Role?",
                            answer: "A User has long-term credentials (password, access keys) and is tied to a person. A Role has no long-term credentials — it issues temporary credentials when assumed, and is used by entities like EC2 or Lambda."
                        },
                        {
                            question: "Your EC2 app needs to read from S3. Should you use access keys or a role?",
                            answer: "Always use an IAM Role. Hardcoding access keys is a security risk. A role attached to EC2 provides temporary, auto-rotating credentials via the instance metadata service — much more secure."
                        },
                        {
                            question: "Alice is in 'Developers' (S3FullAccess) but has an explicit Deny on DeleteObject. Can she delete?",
                            answer: "No. An explicit Deny always wins regardless of any Allow. This is the 'Deny > Allow > Default Deny' rule of IAM."
                        },
                        {
                            question: "What are the 4 elements of an IAM policy statement?",
                            answer: "Effect (Allow/Deny), Action (the API call), Resource (the ARN), and Condition (optional restrictions like IP or time)."
                        },
                        {
                            question: "Why should you never use the root account for daily tasks?",
                            answer: "The root account has unrestricted access that cannot be limited. If compromised, an attacker can take over or delete everything. Use specialized IAM admin users instead."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
