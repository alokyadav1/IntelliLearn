import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, StepList, Diagram, CodeBlock
} from "@/components/TopicContent";

export default function IamUsersGroups() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>👥 IAM Users & Groups</SectionTitle>
                <P>
                    Managing identities starting with two foundational components: <Bold>Users</Bold> and <Bold>Groups</Bold>. This allows you to define who can access your AWS environment and organize them logically based on their roles.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>👤 IAM Users</SectionTitle>
                <P>
                    An IAM User is an identity you create in AWS for a person or application. Each IAM user has a unique name and can have different types of credentials.
                </P>
                
                <div className="mt-6">
                    <DataTable
                        headers={["Access Type", "Used For", "Credentials"]}
                        rows={[
                            [<Bold>Console access</Bold>, "Logging into AWS Web UI", "Username + Password + MFA"],
                            [<Bold>Programmatic access</Bold>, "CLI, SDK, API calls", "Access Key ID + Secret Access Key"],
                        ]}
                    />
                </div>

                <Callout variant="warning" title="Security Best Practice">
                    <P className="mb-0">
                        Never share credentials. Create one IAM user per person. Avoid embedding access keys in code — use environment variables or AWS CLI profiles instead.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>👥 IAM User Groups</SectionTitle>
                <P>
                    An IAM user group is a collection of IAM users. Groups let you specify permissions for multiple users at once, making permissions management much easier.
                </P>
                
                <BulletList
                    items={[
                        <><Bold>Inheritance:</Bold> Any user in a group automatically inherits the permissions attached to that group.</>,
                        <><Bold>Efficiency:</Bold> Instead of editing permissions for 50 people individually, you just update one group policy.</>,
                        <><Bold>Job Rotation:</Bold> When a developer becomes a manager, simply move them from the "Developers" group to the "Managers" group.</>,
                    ]}
                />

                <Diagram label="Group Permission Flow">
                    <pre className="text-[13px] leading-relaxed font-mono text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-100 overflow-x-auto">
                        {`IAM Policy (S3 Read) ──Attached To──► [ Marketing Group ]
                                                  │
                                          ┌───────┴───────┐
                                          ▼               ▼
                                    [ User: Bob ]   [ User: Alice ]
                                    (Inherits S3)   (Inherits S3)`}
                    </pre>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔒 Multi-Factor Authentication (MFA)</SectionTitle>
                <P>
                    MFA adds an extra layer of protection on top of your username and password. With MFA enabled, when a user signs in, they will be prompted for their password and then for an authentication code from their MFA device.
                </P>
                <Callout variant="info">
                    <P className="mb-0">
                        Always enable MFA for your Root user and all IAM users with console access.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: Managing Users & Groups</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Create a User Group",
                            description: "In the IAM console, click 'User groups' → 'Create group'. Name it 'Admins' and attach the 'AdministratorAccess' policy."
                        },
                        {
                            title: "Create a User",
                            description: "Click 'Users' → 'Create user'. Set a name (e.g., 'your-name')."
                        },
                        {
                            title: "Add User to Group",
                            description: "On the 'Set permissions' page, select 'Add user to group' and select the 'Admins' group you just created."
                        },
                        {
                            title: "Configure Security",
                            description: "Once the user is created, click on their name → 'Security credentials' to enable MFA or generate Access Keys."
                        }
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Checkpoint: Understanding Identities</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Should you give a user multiple groups?",
                            answer: "Yes, a user can belong to multiple groups (up to 10 by default). They will inherit the sum of all permissions from all groups they are in."
                        },
                        {
                            question: "Why use groups instead of attaching policies to users?",
                            answer: "Scalability. It's much easier to manage permissions for roles (Developers, Admins, Finance) than for individuals. If a permission needs to change, you change it in one place."
                        },
                        {
                            question: "What should you do with a user's Secret Access Key after creating it?",
                            answer: "Save it immediately in a secure location (like a password manager). You can never see the secret key again after the initial creation — if you lose it, you must delete the old access key and create a new one."
                        },
                        {
                            question: "What is the primary best practice for IAM user creation?",
                            answer: "One IAM user per physical person. Never share credentials."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
