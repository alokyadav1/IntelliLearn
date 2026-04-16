import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    InlineCode, StepList,
} from "@/components/TopicContent";

export default function WhatIsJenkins() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>Mental Model First</SectionTitle>
                <P>
                    Before touching any tool, lock in this mental model:
                </P>
                <Callout title="The Core Idea">
                    <Bold>Jenkins = a robot that watches your code and automatically builds, tests, and deploys it every time something changes.</Bold>
                </Callout>
                <P>
                    Without CI/CD, developers manually run tests and deploy — slow, error-prone, and inconsistent.
                    With Jenkins, every <InlineCode>git push</InlineCode> triggers a pipeline that does all of that <Bold>automatically</Bold>.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What is Jenkins?</SectionTitle>
                <P>
                    Jenkins is an <Bold>open-source automation server</Bold> written in Java.
                </P>
                <DataTable
                    headers={["Property", "Detail"]}
                    rows={[
                        ["First released", "2011 (forked from Hudson)"],
                        ["Language", "Java"],
                        ["License", "MIT"],
                        ["Runs on", "Any OS with Java (Linux, macOS, Windows, Docker)"],
                        ["Core job", "Automate repetitive software delivery tasks"],
                    ]}
                />
                <P className="mt-6">
                    It sits at the heart of a <Bold>CI/CD pipeline</Bold>:
                </P>
                <StepList
                    steps={[
                        { title: "Developer pushes code", description: "A pull request is merged or code is pushed directly to the main branch." },
                        { title: "Jenkins detects change", description: "Via a webhook (GitHub/GitLab) or by periodically polling the repository." },
                        { title: "Builds the application", description: "Compiles source code, downloads dependencies, and prepares the executable." },
                        { title: "Runs automated tests", description: "Executes unit, integration, and security tests to ensure quality." },
                        { title: "Deploys to environment", description: "Moves the passing build to staging, pre-prod, or production." },
                        { title: "Notifies the team", description: "Sends status updates via Slack, email, or updating the PR status." },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What is CI/CD? (Plain English)</SectionTitle>

                <SubTitle>Continuous Integration (CI)</SubTitle>
                <Callout variant="info">
                    <P className="mb-0 italic">"Merge code often. Test it every single time."</P>
                </Callout>
                <BulletList items={[
                    "Developers push small changes frequently (multiple times a day)",
                    "Jenkins immediately builds and tests those changes",
                    "Broken code is caught <Bold>within minutes</Bold>, not days"
                ]} />

                <SubTitle>Continuous Delivery (CD)</SubTitle>
                <Callout variant="info">
                    <P className="mb-0 italic">"Always have a deployable artifact ready."</P>
                </Callout>
                <BulletList items={[
                    "After CI passes, Jenkins packages and prepares the app for deployment",
                    "You can deploy at any time with one click (or automatically)"
                ]} />

                <SubTitle>Continuous Deployment</SubTitle>
                <Callout variant="info">
                    <P className="mb-0 italic">"Deploy automatically to production — no human needed."</P>
                </Callout>
                <BulletList items={[
                    "Every passing build goes straight to production",
                    "Requires high test coverage and confidence"
                ]} />

                <SubTitle>The CI/CD Lifecycle</SubTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 transition-colors">
                        <P className="font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-xs tracking-tighter">CI</span>
                            Continuous Integration
                        </P>
                        <StepList
                            steps={[
                                { title: "Commit", description: "Code is pushed to the repository." },
                                { title: "Build", description: "Source code is compiled and packaged." },
                                { title: "Unit Tests", description: "Individual units of code are verified." },
                                { title: "Integration Tests", description: "Verification of combined code modules." },
                            ]}
                        />
                    </div>
                    <div className="p-6 rounded-2xl bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 transition-colors">
                        <P className="font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center text-xs tracking-tighter">CD</span>
                            Continuous Delivery
                        </P>
                        <StepList
                            steps={[
                                { title: "Package", description: "Create a production-ready artifact." },
                                { title: "Deploy to Staging", description: "Automated deployment for testing." },
                                { title: "Deploy to Production", description: "Live application deployment." },
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Core Concepts You'll Use Daily</SectionTitle>
                <DataTable
                    headers={["Concept", "What it means"]}
                    rows={[
                        ["Job / Project", "A task Jenkins runs (e.g., 'build my app')"],
                        ["Build", "A single execution of a job"],
                        ["Pipeline", "A multi-step automated workflow (written as code)"],
                        ["Workspace", "Temporary directory where Jenkins runs your job"],
                        ["Artifact", "Output of a build (JAR, Docker image, zip file)"],
                        ["Plugin", "Extension that adds capability (Git, Docker, Slack…)"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Hands-On: Your First Mental Exercise</SectionTitle>
                <P>
                    Trace this real-world scenario step by step:
                </P>
                <P>
                    <Bold>Scenario:</Bold> A developer on your team pushes a bug fix to <InlineCode>main</InlineCode>.
                </P>
                <StepList
                    steps={[
                        { title: "Developer Push", description: "git push origin main triggers the workflow." },
                        { title: "Webhook Activation", description: "GitHub notifies Jenkins of the new code changes." },
                        { title: "Code Checkout", description: "Jenkins pulls the latest source code into its workspace." },
                        { title: "Build & Test", description: "Jenkins runs 'mvn clean install' or 'npm test' to verify code." },
                        { title: "Dockerization", description: "Tests pass ✅ → Jenkins builds a new versioned Docker image." },
                        { title: "Image Push", description: "The image is pushed to ECR or Docker Hub." },
                        { title: "Deployment", description: "Jenkins deploys the image to the staging environment." },
                        { title: "Notification", description: "Jenkins posts the final status to Slack: ✅ Build #42 passed." },
                    ]}
                />
                <P className="mt-4">
                    <Bold>Without Jenkins:</Bold> Steps 3–8 are manual. Takes 30+ minutes. Humans forget steps.<br />
                    <Bold>With Jenkins:</Bold> All automated. Takes 3 minutes. Runs on every push.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Hands-On Lab (Do This Now)</SectionTitle>

                <SubTitle>Lab 1 — See Jenkins in Action (15 minutes)</SubTitle>
                <CodeBlock
                    language="bash"
                    code={`# Pull and run Jenkins locally
docker run -p 8080:8080 -p 50000:50000 \\
  --name jenkins-demo \\
  jenkins/jenkins:lts

# Open browser
# http://localhost:8080`}
                />
                <P>Get the initial admin password:</P>
                <CodeBlock
                    language="bash"
                    code={`docker exec jenkins-demo cat /var/jenkins_home/secrets/initialAdminPassword`}
                />

                <SubTitle className="mt-8">Lab 2 — Create Your First Freestyle Job (20 minutes)</SubTitle>
                <BulletList items={[
                    "Click <Bold>New Item</Bold> → name it <InlineCode>hello-jenkins</InlineCode> → choose <Bold>Freestyle project</Bold>",
                    "Under <Bold>Build Steps</Bold> → Add build step → <Bold>Execute shell</Bold>",
                    "Enter the following commands:",
                ]} />
                <CodeBlock
                    language="bash"
                    code={`echo "Hello from Jenkins!"
echo "Build number: $BUILD_NUMBER"
echo "Workspace: $WORKSPACE"
date`}
                />
                <BulletList items={[
                    "Click <Bold>Save</Bold> → Click <Bold>Build Now</Bold>",
                    "Click the build number → <Bold>Console Output</Bold>",
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why Jenkins Over GitHub Actions?</SectionTitle>
                <DataTable
                    headers={["Feature", "Jenkins", "GitHub Actions"]}
                    rows={[
                        ["Hosting", "Self-hosted (you control it)", "Cloud (GitHub hosts it)"],
                        ["Customization", "Unlimited (plugins, agents)", "Limited to YAML workflows"],
                        ["Cost", "Free (you pay for infra)", "Free tier, then paid"],
                        ["Use case", "Enterprise, complex pipelines", "Standard open-source projects"],
                        ["Learning curve", "Steeper", "Easier to start"],
                    ]}
                />
            </Section>

            <SummaryCard
                title="Key Takeaways"
                items={[
                    "Jenkins automates software delivery via CI/CD pipelines.",
                    "CI (Continuous Integration) focuses on frequent commits and automated testing.",
                    "CD (Continuous Delivery/Deployment) focuses on keeping code in a deployable state.",
                    "Jenkins is highly extensible with thousands of plugins.",
                    "Self-hosting provides maximum control for enterprise requirements."
                ]}
            />
        </div>
    );
}
