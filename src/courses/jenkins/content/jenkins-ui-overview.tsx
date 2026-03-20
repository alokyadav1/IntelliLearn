import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList, NumberedList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard, StepList,
    InlineCode, Diagram
} from "@/components/TopicContent";

export default function JenkinsUIOverview() {
    return (
        <div className="space-y-10">
            {/* ── Mental Model ── */}
            <Section>
                <SectionTitle>Mental Model First</SectionTitle>
                <Callout title="The UI is a window into $JENKINS_HOME">
                    <P className="mb-0 italic">
                        Every button, table, and link you see is just a rendered view of <Bold>XML files</Bold> and <Bold>build logs</Bold> on disk.
                        Learn the UI by doing things, then finding the corresponding files — that's how it sticks.
                    </P>
                </Callout>
            </Section>

            <Divider />

            {/* ── Dashboard Overview ── */}
            <Section>
                <SectionTitle>The Dashboard — Your Home Base</SectionTitle>
                <P>Open <InlineCode>http://localhost:8080</InlineCode>. This is your command center.</P>

                <Diagram className="bg-slate-900 border-none p-8 text-slate-300 font-mono shadow-2xl">
                    <div className="border border-slate-700 rounded-lg overflow-hidden">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                            <span className="text-white font-bold">Jenkins</span>
                            <span className="text-xs">🔔 admin [logout]</span>
                        </div>
                        <div className="flex min-h-[200px]">
                            <div className="w-1/4 bg-slate-800/50 p-4 border-r border-slate-700 space-y-2 text-[10px]">
                                <div className="text-indigo-400 font-bold mb-2 uppercase tracking-widest">Navigation</div>
                                <div className="p-1 hover:bg-slate-700 rounded cursor-default">New Item</div>
                                <div className="p-1 hover:bg-slate-700 rounded cursor-default">People</div>
                                <div className="p-1 hover:bg-slate-700 rounded cursor-default">History</div>
                                <div className="p-1 hover:bg-slate-700 rounded cursor-default text-indigo-400 font-bold border-l-2 border-indigo-400 pl-2 bg-indigo-500/10">Manage Jenkins</div>
                            </div>
                            <div className="w-3/4 p-6 space-y-4">
                                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                                    <div className="text-xs font-bold mb-3 border-b border-slate-700 pb-2">All Jobs</div>
                                    <div className="flex justify-between text-[10px] opacity-60 mb-2">
                                        <span>Name</span>
                                        <span>Last Success</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] items-center mb-1">
                                        <span className="text-indigo-300">● my-app</span>
                                        <span className="bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded text-[8px]">2 min ago</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] items-center">
                                        <span className="text-indigo-300">● deploy</span>
                                        <span className="bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded text-[8px]">1 hr ago</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 text-[9px]">
                                        <div className="font-bold opacity-40 mb-1">Build Queue</div>
                                        <div className="italic opacity-30">(empty)</div>
                                    </div>
                                    <div className="w-1/2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 text-[9px]">
                                        <div className="font-bold opacity-40 mb-1">Executors</div>
                                        <div className="text-indigo-400/70">#1 my-app » Build</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Diagram>

                <P className="mt-8 italic text-sm text-slate-500 dark:text-slate-400 text-center transition-colors">Map of the 5 standard UI zones.</P>

                <DataTable
                    headers={["Area", "What it does"]}
                    rows={[
                        ["Job List", "Central table showing all your pipelines and freestyle jobs."],
                        ["Build Queue", "History of builds waiting for a free agent/executor."],
                        ["Executor Status", "Real-time view of what is running on which node."],
                        ["Left Navigation", "Primary controls like New Item and Manage Jenkins."],
                        ["Top-right Header", "Search, User profile, and system notifications."],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Left Nav ── */}
            <Section>
                <SectionTitle>🧭 Left Navigation — Action Links</SectionTitle>

                <SubTitle>New Item</SubTitle>
                <P>This is where you define work. The most common types are:</P>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/20 transition-colors">
                        <Bold className="text-indigo-800 dark:text-indigo-400 block mb-1">Pipeline</Bold>
                        <P className="text-xs mb-0">The modern standard. Defined via a <InlineCode>Jenkinsfile</InlineCode> in your Git repo.</P>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                        <Bold className="text-slate-800 dark:text-slate-200 block mb-1">Freestyle project</Bold>
                        <P className="text-xs mb-0">Simple, GUI-based configuration. Good for quick scripts.</P>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                        <Bold className="text-slate-800 dark:text-slate-200 block mb-1">Multibranch Pipeline</Bold>
                        <P className="text-xs mb-0">Automatically discovers and builds all branches in a repo.</P>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                        <Bold className="text-slate-800 dark:text-slate-200 block mb-1">Folder</Bold>
                        <P className="text-xs mb-0">Use this to group jobs by team, project, or environment.</P>
                    </div>
                </div>

                <SubTitle className="mt-8">Manage Jenkins</SubTitle>
                <P>The admin control panel. You will spend 40% of your admin time here.</P>
                <DataTable
                    headers={["Category", "Primary Use Case"]}
                    rows={[
                        ["System", "Set the Global Jenkins URL and admin email."],
                        ["Tools", "Configure paths for JDK, Maven, Git, and Node.js versions."],
                        ["Plugins", "Install new features like Docker, Slack, or Blue Ocean."],
                        ["Nodes & Clouds", "Expand your capacity by adding SSH or Cloud agents."],
                        ["Credentials", "The vault for SSH keys, API tokens, and passwords."],
                        ["System Log", "The first place to look when things go 'boom'."],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Page Anatomy ── */}
            <Section>
                <SectionTitle>🔍 Page Anatomy: Jobs vs. Builds</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <SubTitle>The Job Page</SubTitle>
                        <P className="text-[13px]">Focuses on the <Bold>Future</Bold> and the <Bold>Trend</Bold>.</P>
                        <BulletList items={[
                            <span><Bold>Build Now:</Bold> Triggers a new execution.</span>,
                            <span><Bold>Configure:</Bold> Edit the settings or Git source.</span>,
                            <span><Bold>Workspace:</Bold> Browse files checked out on the agent.</span>,
                            <span><Bold>Stage View:</Bold> Visual progression of the last few builds.</span>,
                        ]} />
                    </div>
                    <div className="space-y-4">
                        <SubTitle>The Build Page</SubTitle>
                        <P className="text-[13px]">Focuses on the <Bold>Past</Bold> and the <Bold>Details</Bold>.</P>
                        <BulletList items={[
                            <span><Bold>Console Output:</Bold> Your #1 debugging tool.</span>,
                            <span><Bold>Artifacts:</Bold> Download produced JARs, binaries, or logs.</span>,
                            <span><Bold>Test Result:</Bold> Detailed failure reports from JUnit/Pytest.</span>,
                            <span><Bold>Changes:</Bold> See exactly which commits triggered this build.</span>,
                        ]} />
                    </div>
                </div>

                <Callout variant="tip" title="Pro Tip: /console" className="mt-8">
                    Append <InlineCode>/console</InlineCode> to any build URL to jump straight to the logs:
                    <br />
                    <InlineCode className="mt-2 block w-max">.../job/my-app/45/console</InlineCode>
                </Callout>
            </Section>

            <Divider />

            {/* ── Modern UI ── */}
            <Section>
                <SectionTitle>🌊 Blue Ocean — The Modern View</SectionTitle>
                <P>Blue Ocean is a plugin that provides a modern, visual alternative to the Jenkins Classic UI.</P>
                <DataTable
                    headers={["Classic UI", "Blue Ocean"]}
                    rows={[
                        ["Best for Administration", "Best for Pipeline Visualization"],
                        ["Text-heavy XML Configs", "Visual Graph-based pipeline views"],
                        ["Full System Logs", "Stage-by-stage diagnostic logs"],
                        ["Building Jobs", "Monitoring Pipelines"],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Hands-On Labs ── */}
            <Section>
                <SectionTitle>Hands-On Labs</SectionTitle>

                <SubTitle>Lab 1 — Create a "ui-exploration" Pipeline</SubTitle>
                <StepList
                    steps={[
                        { title: "New Item", description: "Create a job named 'ui-exploration' of type 'Pipeline'." },
                        {
                            title: "Pipeline Script",
                            description: <CodeBlock language="groovy" className="mt-2 text-xs">
                                {`pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo "Building..."
        writeFile file: 'artifact.txt', text: "Hello World"
      }
    }
  }
  post {
    always { archiveArtifacts 'artifact.txt' }
  }
}`}
                            </CodeBlock>
                        },
                        { title: "Run & Observe", description: "Click 'Build Now'. Navigate to the Job page and find the 'Stage View'." },
                    ]}
                />

                <Divider className="opacity-30" />

                <SubTitle className="mt-8">Lab 2 — Add and Use a Credential</SubTitle>
                <NumberedList items={[
                    "Go to Manage Jenkins → Credentials → Global → Add Credentials.",
                    "Kind: 'Secret text', Secret: 'my-password', ID: 'demo-secret'.",
                    <span>Create a pipeline referencing it with <InlineCode>credentialsId: 'demo-secret'</InlineCode>.</span>,
                    "Run the build and verify that the secret is masked with **** in the console output."
                ]} />
            </Section>

            {/* ── Mistakes ── */}
            <Section>
                <SectionTitle>Common Beginner Mistakes</SectionTitle>
                <DataTable
                    headers={["Mistake", "Fix"]}
                    rows={[
                        ["Ignoring Console Output", "It's the first stop for every 'Failure' result."],
                        ["Leaving built-in executors > 0", "Set to 0 in Manage Nodes to keep controller stable."],
                        ["No Jenkins URL set", "Go to Manage Jenkins → System to fix broken email/Blue Ocean links."],
                        ["Secrets in Pipeline scripts", "Always use the Credentials plugin for security."],
                    ]}
                />
            </Section>

            <SummaryCard
                title="✅ UI Mastery Checkpoint"
                items={[
                    "Jenkins Dashboard shows current activity (Queue/Executors).",
                    "Manage Jenkins is the 'Admin Panel' for Tools, Plugins, and Security.",
                    "The Build Page's Console Output is your primary debugging tool.",
                    "Blue Ocean is for visual pipeline graphs; Classic is for configuration.",
                    "Search bar (top-right) is the fastest way to navigate anywhere."
                ]}
            />

            <Section className="mt-12 bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 text-center transition-colors">
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest mb-2">Next Topic</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Jobs, Builds & Workspaces</h3>
                <P className="mb-0">Understand the core primitives that drive every CI/CD workflow.</P>
            </Section>
        </div>
    );
}
