import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, CodeBlock
} from "@/components/TopicContent";

export default function ResourceBasedPolicies() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 What Are Resource-based Policies?</SectionTitle>
                <P>
                    Resource-based policies are JSON policy documents attached directly to a resource — not to an identity. They define what actions a specified principal can perform on that resource and under what conditions.
                </P>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 transition-colors">
                        <Bold className="text-indigo-900 dark:text-indigo-400 block mb-2">Identity-based</Bold>
                        <P className="text-sm text-indigo-800 dark:text-indigo-300 mb-0">Attached to <Bold>WHO</Bold> is acting (user, role, group)</P>
                    </div>
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 transition-colors">
                        <Bold className="text-emerald-900 dark:text-emerald-400 block mb-2">Resource-based</Bold>
                        <P className="text-sm text-emerald-800 dark:text-emerald-300 mb-0">Attached to <Bold>WHAT</Bold> is being accessed (S3, SNS, SQS...)</P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔑 The Unique Element: Principal</SectionTitle>
                <P>
                    Identity-based policies never have a <InlineCode>Principal</InlineCode> because they're already attached to the identity. Resource-based policies <Bold>always</Bold> need one — the resource needs to know who is allowed in.
                </P>
                <CodeBlock 
                    language="json"
                    code={`{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::123456789012:user/alice" },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-bucket/*"
}`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📦 Most Common Example: S3 Bucket Policy</SectionTitle>
                <P>
                    S3 bucket policies are the most common implementation. You can review a bucket policy to immediately see all principals who have access, without hunting through individual IAM users.
                </P>
                
                <div className="space-y-8 mt-8">
                    <div>
                        <SubTitle>Pattern 1 — Publicly Readable (Static Website)</SubTitle>
                        <P>Using <InlineCode>"Principal": "*"</InlineCode> allows anyone in the world to access the objects. Use with extreme caution!</P>
                        <CodeBlock 
                            language="json"
                            code={`{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-website-bucket/*"
}`}
                        />
                    </div>

                    <div>
                        <SubTitle>Pattern 2 — Restrict to Specific IAM Role Only</SubTitle>
                        <P>You can use a <InlineCode>Deny</InlineCode> and a <InlineCode>Condition</InlineCode> to block everyone <Bold>except</Bold> a specific role, even admins.</P>
                        <CodeBlock 
                            language="json"
                            code={`{
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:*",
  "Resource": "arn:aws:s3:::prod-bucket/*",
  "Condition": {
    "StringNotEquals": {
      "aws:PrincipalArn": "arn:aws:iam::123456789012:role/AppRole"
    }
  }
}`}
                        />
                    </div>

                    <div>
                        <SubTitle>Pattern 3 — Cross-account Access</SubTitle>
                        <P>The primary way to grant another AWS account access to your resources.</P>
                        <CodeBlock 
                            language="json"
                            code={`{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::ACCOUNT-B-ID:root"
  },
  "Action": ["s3:GetObject", "s3:ListBucket"],
  "Resource": "arn:aws:s3:::my-bucket/*"
}`}
                        />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔀 Cross-Account Access: The "Double Lock" Rule</SectionTitle>
                <P>
                    For cross-account access, <Bold>both sides must agree</Bold>. It's like a door with two locks.
                </P>
                <div className="bg-slate-900 text-slate-100 p-8 rounded-xl font-mono text-sm leading-relaxed border border-slate-700 overflow-x-auto">
                    <div className="flex justify-between gap-8 mb-4">
                        <div className="flex-1">Account A (Resource Owner)</div>
                        <div className="flex-1 text-right">Account B (Requester)</div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 mb-4">
                        <div className="flex-1 border-t border-slate-700"></div>
                        <div className="flex-none">─────────</div>
                        <div className="flex-1 border-t border-slate-700"></div>
                    </div>
                    <div className="flex justify-between gap-8">
                        <div className="flex-1 p-4 bg-slate-800 rounded border border-slate-700 text-emerald-400">
                            Bucket policy must<br/>ALLOW Account B
                        </div>
                        <div className="flex-none flex flex-col justify-center text-slate-500 font-bold">
                            +
                        </div>
                        <div className="flex-1 p-4 bg-slate-800 rounded border border-slate-700 text-sky-400">
                            IAM policy must<br/>ALLOW the actions
                        </div>
                    </div>
                    <div className="mt-8 text-center text-slate-400">
                        <P className="text-xs italic mb-0">Note: Account B cannot delegate more access than Account A granted.</P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚡ When to Use Which?</SectionTitle>
                <DataTable
                    headers={["Scenario", "Recommended Policy Type"]}
                    rows={[
                        ["Give a Lambda role access to DynamoDB", "Identity-based (attach to role)"],
                        ["Allow another AWS account to read your S3 bucket", "Resource-based (bucket policy)"],
                        ["Make an S3 bucket publicly accessible", "Resource-based (bucket policy)"],
                        ["Block a specific user from deleting S3 objects", "Either (explicit Deny)"],
                        ["Control access to SNS, SQS, KMS", "Resource-based"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Try a Bucket Policy</SectionTitle>
                <P>Follow these steps to grant read-only access to your own account via bucket policy:</P>
                <StepList
                    steps={[
                        {
                            title: "Navigate to S3",
                            description: "Open the S3 Console and select any existing bucket."
                        },
                        {
                            title: "Open Permissions",
                            description: "Click the 'Permissions' tab and scroll down to 'Bucket policy'."
                        },
                        {
                            title: "Edit and Paste",
                            description: "Click 'Edit' and paste the JSON below (replace placeholders with your ARNs)."
                        },
                        {
                            title: "Save and Verify",
                            description: "Save changes. Try accessing the bucket from a user who has NO S3 IAM permissions. It should work!"
                        }
                    ]}
                />
                <div className="mt-6">
                    <CodeBlock 
                        language="json"
                        code={`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::YOUR-ACCOUNT-ID:root"
    },
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": [
      "arn:aws:s3:::YOUR-BUCKET-NAME",
      "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    ]
  }]
}`}
                    />
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Checkpoint: Ready to Move On?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "What is the one element in a resource-based policy that identity-based policies never have?",
                            answer: "Principal — because a resource-based policy is attached to the resource itself, it needs to explicitly state who is allowed in. Identity-based policies don't need this because they're already attached to the identity doing the action."
                        },
                        {
                            question: "Your S3 bucket has a bucket policy allowing Account B full access. A developer in Account B still can't access the bucket. Why?",
                            answer: "The double lock rule — cross-account access requires both sides to allow it. The bucket policy (Account A's side) is open, but the developer in Account B also needs an IAM identity-based policy in their own account explicitly allowing the S3 actions."
                        },
                        {
                            question: "What's the difference between Principal: '*' and Principal: {'AWS': '*' }?",
                            answer: "For S3 public access, both allow anyone to access. However, '*' is broader as it also covers non-AWS service principals. Use both with extreme caution."
                        },
                        {
                            question: "How can you ensure ONLY one specific Lambda role can access a bucket, blocking even admins?",
                            answer: "Use an explicit Deny on 'Principal': '*' combined with a Condition using StringNotEquals on aws:PrincipalArn pointing to the Lambda role. Explicit Deny always wins over other Allow permissions."
                        },
                        {
                            question: "Why choose a bucket policy over an IAM policy for cross-account access?",
                            answer: "Because IAM policies can't grant access to another account's resources; the resource itself must grant it. Also, bucket policies have larger size limits (20KB vs 10KB) and provide a single place to audit all bucket access."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
