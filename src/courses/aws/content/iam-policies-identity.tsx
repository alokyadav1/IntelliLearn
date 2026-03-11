import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, CodeBlock
} from "@/components/TopicContent";

export default function IdentityBasedPolicies() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What Are Identity-based Policies?</SectionTitle>
                <P>
                    Identity-based policies are attached directly to an IAM identity — a <Bold>user, group, or role</Bold>. They define what that identity is allowed or denied to do across AWS resources.
                </P>
                <P>There are 3 main types to understand:</P>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 font-mono text-sm space-y-2">
                    <div className="text-slate-900 font-bold">Identity-based Policies</div>
                    <div className="pl-4 text-slate-600">├── <Bold className="text-indigo-600">AWS Managed Policies</Bold> (AWS writes & maintains)</div>
                    <div className="pl-4 text-slate-600">├── <Bold className="text-emerald-600">Customer Managed Policies</Bold> (You write & maintain)</div>
                    <div className="pl-4 text-slate-600">└── <Bold className="text-amber-600">Inline Policies</Bold> (Embedded directly in one identity)</div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔵 Type 1 — AWS Managed Policies</SectionTitle>
                <P>
                    Standalone policies created and administered by AWS. They are convenient because AWS updates them automatically when new services or APIs launch.
                </P>
                <DataTable
                    headers={["Policy Name", "What it allows"]}
                    rows={[
                        [<InlineCode>AdministratorAccess</InlineCode>, "Full access to everything"],
                        [<InlineCode>ReadOnlyAccess</InlineCode>, "Read-only across all services"],
                        [<InlineCode>AmazonS3FullAccess</InlineCode>, "Full S3 control"],
                        [<InlineCode>PowerUserAccess</InlineCode>, "Full access except IAM management"],
                    ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <Bold className="text-emerald-800">When to use:</Bold>
                        <P className="text-sm mt-1 mb-0">Getting started, dev environments, or when a pre-built policy matches exactly.</P>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <Bold className="text-amber-800">Trade-off:</Bold>
                        <P className="text-sm mt-1 mb-0">They don't grant least privilege — they're intentionally broad. Use them to start, then specialize.</P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🟡 Type 2 — Customer Managed Policies</SectionTitle>
                <P>
                    Standalone policies <Bold>you</Bold> create in your account. This is the recommended approach for production because they let you apply <Bold>least privilege</Bold>.
                </P>
                <Callout variant="tip" title="IAM Best Practice">
                    <P className="mb-0">
                        Always start with a Customer Managed Policy for specific jobs. It ensures that if a resource is compromised, the damage is contained to exactly what that policy allowed.
                    </P>
                </Callout>
                
                <div className="mt-8">
                    <SubTitle>Example: S3 Read-Only (One Bucket)</SubTitle>
                    <CodeBlock 
                        language="json"
                        code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::my-app-bucket",
        "arn:aws:s3:::my-app-bucket/*"
      ]
    }
  ]
}`}
                    />
                </div>

                <div className="mt-6 p-6 bg-slate-50 border border-slate-100 rounded-xl">
                    <Bold>Key feature — versioning:</Bold>
                    <P className="text-sm mt-2 mb-0">
                        IAM stores up to <Bold>5 versions</Bold> of customer managed policies. If you update a policy and break production, you can instantly roll back to a previous version.
                    </P>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔴 Type 3 — Inline Policies</SectionTitle>
                <P>
                    These have a strict <Bold>one-to-one</Bold> relationship. They are embedded directly within a single user, group, or role and cannot be reused.
                </P>
                <BulletList items={[
                    <span><Bold>Usage:</Bold> Reserved for very specific, one-off permissions that must never be reused elsewhere.</span>,
                    <span><Bold>Trade-off:</Bold> Deleting the identity deletes the policy. Harder to manage at scale.</span>,
                    <span><Bold>In Practice:</Bold> Rarely used by modern teams; Customer Managed policies are generally preferred.</span>
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📊 Side-by-Side Comparison</SectionTitle>
                <DataTable
                    headers={["Feature", "AWS Managed", "Customer Managed", "Inline"]}
                    rows={[
                        [<Bold>Who creates it</Bold>, "AWS", "You", "You"],
                        [<Bold>Reusable</Bold>, "✅ Yes", "✅ Yes", "❌ No"],
                        [<Bold>Least privilege</Bold>, "❌ Broad", "✅ Exact", "✅ Exact"],
                        [<Bold>Versioning</Bold>, "❌", "✅ Up to 5", "❌"],
                        [<Bold>Best for</Bold>, "Starting out", "Production workloads", "Unique 1:1 needs"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Create a Least Privilege Policy</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Open Policy Editor",
                            description: "IAM → Policies → Create Policy → Select the JSON tab."
                        },
                        {
                            title: "Define Permissions",
                            description: "Paste an S3 read-only statement restricted to a specific bucket ARN."
                        },
                        {
                            title: "Name & Tag",
                            description: "Name it 'MyAppS3ReadOnly' and add descriptive tags for cost tracking."
                        },
                        {
                            title: "Test Access",
                            description: "Attach it to a test user. Verify they can list the bucket but cannot delete any objects."
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
                            question: "What are the 3 types of identity-based policies and when would you use each?",
                            answer: "AWS Managed (getting started/convenience), Customer Managed (production/least privilege/reuse), and Inline (unique 1:1 needs). Customer Managed is the default choice for most professional teams."
                        },
                        {
                            question: "You have 20 developers needing the same permissions. What's the best approach?",
                            answer: "Create one Customer Managed Policy, attach it to a 'Developers' Group, and add all users to that group. This is far more maintainable than attaching individual inline policies."
                        },
                        {
                            question: "What's the risk of using AmazonS3FullAccess on a simple Lambda function?",
                            answer: "It violates least privilege. If the Lambda code is compromised, the attacker gets full control over every bucket in your account. Specialized Customer Managed policies prevent this 'blast radius' expansion."
                        },
                        {
                            question: "You update a policy and production breaks. How do you recover?",
                            answer: "Use IAM policy versioning. Go to the policy's Versions tab and instantly set the previous working version as the default."
                        },
                        {
                            question: "What does a policy with Effect: Deny and Action: s3:DeleteObject do?",
                            answer: "It acts as a safety guardrail. No matter what other 'Allow' policies exist, this user/role will be blocked from deleting any objects, because Deny always overrides Allow in IAM."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
