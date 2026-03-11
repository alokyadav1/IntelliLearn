import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Accordion
} from "@/components/TopicContent";

export default function IaaSvsPaaSvsSaaS() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>The Best Analogy: Building a House</SectionTitle>
                <P>
                    This is the #1 mental model to distinguish between service models. Everything maps perfectly to how you handle a property:
                </P>
                <DataTable
                    headers={["Model", "Analogy", "You manage", "Provider manages"]}
                    rows={[
                        [<Bold>On-Premises</Bold>, "Build your own house on your own land", "Everything", "Nothing"],
                        [<Bold>IaaS</Bold>, "Rent an empty plot + utilities", "OS, apps, data", "Hardware, network, storage"],
                        [<Bold>PaaS</Bold>, "Rent an unfurnished house", "Apps & data only", "OS, runtime, infra"],
                        [<Bold>SaaS</Bold>, "Stay in a hotel", "Your data only", "Everything"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔵 IaaS — Infrastructure as a Service</SectionTitle>
                <P>
                    IaaS contains the basic building blocks for cloud IT. It typically provides access to networking features, computers (virtual or on dedicated hardware), and data storage space.
                </P>
                <Callout variant="info" title="Target Audience">
                    IT Administrators, Network Architects, and DevOps teams who need the highest level of flexibility and management control.
                </Callout>
                <P>
                    <Bold>Real AWS Example:</Bold> You spin up an <InlineCode>EC2</InlineCode> instance. AWS gives you the Virtual Machine — you are responsible for installing the OS (e.g., Ubuntu), configuring the web server, deploying your app, and managing security patches.
                </P>
                <P>
                    <Bold>When to use it:</Bold> You need full control, are running custom/legacy software, or are performing deep DevOps work.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🟡 PaaS — Platform as a Service</SectionTitle>
                <P>
                    PaaS removes the need for organizations to manage the underlying infrastructure (hardware and operating systems) so you can focus on the deployment and management of your applications.
                </P>
                <P>
                    It builds upon IaaS by offering managed OSs, middleware, and runtime environments, making it easier for developers to build CI/CD pipelines.
                </P>
                <P>
                    <Bold>Real AWS Example:</Bold> <Bold>AWS Elastic Beanstalk</Bold> — you simply push your code, and AWS handles the load balancer, EC2 instances, auto-scaling, and OS patching automatically.
                </P>
                <P>
                    <Bold>When to use it:</Bold> You're a developer who wants to ship applications fast without the overhead of managing servers.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🟢 SaaS — Software as a Service</SectionTitle>
                <P>
                    With a SaaS offering, you do not have to worry about how the service is maintained or how the underlying infrastructure is managed — you only need to think about how you will use that particular piece of software.
                </P>
                <P>
                    <Bold>Real AWS Example:</Bold> <Bold>Amazon WorkMail</Bold>, Salesforce, Gmail, or Slack. You log in and use it. Zero infrastructure management, zero setup.
                </P>
                <P>
                    <Bold>When to use it:</Bold> You need a functional tool (like email or CRM), not a platform to build on. You just want it to work.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📊 The "Who Manages What" Breakdown</SectionTitle>
                <DataTable
                    headers={["Component", "On-Prem", "IaaS", "PaaS", "SaaS"]}
                    rows={[
                        ["Applications", "YOU", "YOU", "YOU", "AWS"],
                        ["Data", "YOU", "YOU", "YOU", "YOU*"],
                        ["Runtime", "YOU", "YOU", "AWS", "AWS"],
                        ["OS", "YOU", "YOU", "AWS", "AWS"],
                        ["Virtualization", "YOU", "AWS", "AWS", "AWS"],
                        ["Servers", "YOU", "AWS", "AWS", "AWS"],
                        ["Storage", "YOU", "AWS", "AWS", "AWS"],
                        ["Networking", "YOU", "AWS", "AWS", "AWS"],
                    ]}
                />
                <P className="text-sm italic text-slate-500 mt-2">*Your data, but their storage infrastructure.</P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Hands-On: See All 3 in AWS Console</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Explore IaaS (EC2)",
                            description: "Go to EC2 → Launch Instance. Pick Ubuntu. You now manage the OS. That's IaaS."
                        },
                        {
                            title: "Explore PaaS (Elastic Beanstalk)",
                            description: "Go to Elastic Beanstalk → Create Application. Upload a sample app. AWS provisions everything. That's PaaS."
                        },
                        {
                            title: "Explore SaaS (Amazon WorkMail)",
                            description: "Sign up and use it. No servers, no OS, no config. That's SaaS."
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚡ Quick-Fire AWS Classification</SectionTitle>
                <P>Try to classify these services before looking at the model type:</P>
                <DataTable
                    headers={["AWS Service", "Model Type"]}
                    rows={[
                        ["EC2", "IaaS"],
                        ["Elastic Beanstalk", "PaaS"],
                        ["RDS (Relational Database Service)", "PaaS (Managed Database)"],
                        ["S3 (Simple Storage Service)", "IaaS (Storage Primitive)"],
                        ["Amazon WorkMail", "SaaS"],
                        ["AWS Lambda", "PaaS / FaaS (Function as a Service)"],
                    ]}
                />
            </Section>

            <Section>
                <SectionTitle>Checkpoint: Are You Ready?</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "Your team wants to deploy a Node.js app but hates managing servers — which model do you recommend?",
                            answer: "PaaS (Platform as a Service). It allows the team to focus on the code and deployment without worrying about the underlying infrastructure, operating system, or scaling. Examples include AWS Elastic Beanstalk or App Runner."
                        },
                        {
                            question: "A client needs to migrate their custom legacy Java app to AWS with full OS control — IaaS, PaaS, or SaaS?",
                            answer: "IaaS (Infrastructure as a Service). This provides the highest level of flexibility and control over the resources, including the operating system and the software stack, which is often required for legacy applications with specific dependencies. AWS EC2 is the classic example."
                        },
                        {
                            question: "Is Gmail IaaS, PaaS, or SaaS? Why?",
                            answer: "SaaS (Software as a Service). It is a complete product that is run and managed by the service provider (Google). As a user, you don't manage any servers or platforms; you simply use the application over the internet."
                        },
                        {
                            question: "Where does Lambda (serverless) fit in this picture?",
                            answer: "AWS Lambda is generally classified as PaaS (specifically FaaS - Function as a Service). It abstracts away the server entirely, allowing you to run code (functions) triggered by events without provisioning or managing any infrastructure."
                        }
                    ]}
                />
            </Section>
        </div>
    );
}
