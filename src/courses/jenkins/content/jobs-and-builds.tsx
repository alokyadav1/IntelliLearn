import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList, NumberedList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard, StepList,
    InlineCode
} from "@/components/TopicContent";

export default function JobsAndBuilds() {
    return (
        <div className="space-y-10">
            {/* ── Mental Model ── */}
            <Section>
                <SectionTitle>Mental Model First</SectionTitle>
                <Callout title="The Core Primitives">
                    <P className="mb-0">
                        <Bold>Job = recipe. Build = one time you cooked it. Workspace = the kitchen.</Bold>
                    </P>
                    <BulletList className="mt-4" items={[
                        <span>A <Bold>Job</Bold> defines <Bold>what</Bold> to do (steps, triggers, config) — it never changes unless you edit it.</span>,
                        <span>A <Bold>Build</Bold> is a single execution of that job — a snapshot in time with its own number, logs, and result.</span>,
                        <span>A <Bold>Workspace</Bold> is the temporary directory on the agent where files live <Bold>during</Bold> a build.</span>
                    ]} />
                </Callout>
                <P className="mt-4">
                    These three primitives underpin everything in Jenkins. Every pipeline, every plugin, and every feature is built on top of them.
                </P>
            </Section>

            <Divider />

            {/* ── Jobs ── */}
            <Section>
                <SectionTitle>📋 Jobs — The Definition Layer</SectionTitle>
                <P>A Job is a named, reusable unit of work. On disk, it's defined in <InlineCode>$JENKINS_HOME/jobs/&lt;job-name&gt;/config.xml</InlineCode>.</P>

                <SubTitle>Common Job Types</SubTitle>
                <DataTable
                    headers={["Type", "Description"]}
                    rows={[
                        ["Pipeline", "Modern standard. Defined via Jenkinsfile. Version controlled."],
                        ["Freestyle", "UI-based 'click-to-configure' projects. No code required."],
                        ["Multibranch", "Automatically manages multiple pipelines for one Git repo."],
                        ["Folder", "Organizational containers for grouping related jobs."],
                    ]}
                />

                <SubTitle className="mt-8">Job File Structure</SubTitle>
                <CodeBlock language="bash" label="$JENKINS_HOME/jobs/my-pipeline/">
                    {`├── config.xml          # The job definition (triggers, script, etc.)
├── nextBuildNumber     # Text file containing the next ID (e.g., "47")
└── builds/             # Directory containing all execution history
    ├── 45/
    └── 46/`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Builds ── */}
            <Section>
                <SectionTitle>🔨 Builds — The Execution Layer</SectionTitle>
                <P>Every run creates an <Bold>immutable</Bold> record. A build is a snapshot of the job's configuration at a specific point in time.</P>

                <SubTitle>Build States</SubTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-3 border rounded-xl border-green-200 bg-green-50 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-green-700">Success</span>
                    </div>
                    <div className="p-3 border rounded-xl border-red-200 bg-red-50 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs font-bold text-red-700">Failure</span>
                    </div>
                    <div className="p-3 border rounded-xl border-yellow-200 bg-yellow-50 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-xs font-bold text-yellow-700">Unstable</span>
                    </div>
                    <div className="p-3 border rounded-xl border-slate-200 bg-slate-50 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-500" />
                        <span className="text-xs font-bold text-slate-700">Aborted</span>
                    </div>
                    <div className="p-3 border rounded-xl border-blue-200 bg-blue-50 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-spin" />
                        <span className="text-xs font-bold text-blue-700">In Progress</span>
                    </div>
                </div>

                <SubTitle>Environment Variables</SubTitle>
                <P>These variables are available in every build by default:</P>
                <DataTable
                    headers={["Variable", "Example Value"]}
                    rows={[
                        ["BUILD_NUMBER", "\"45\""],
                        ["JOB_NAME", "\"frontend-build\""],
                        ["WORKSPACE", "\"/var/jenkins_home/workspace/frontend-build\""],
                        ["GIT_COMMIT", "\"abc1234...\" (if using Git)"],
                        ["BUILD_URL", "\"http://jenkins:8080/job/frontend-build/45/\""],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Workspaces ── */}
            <Section>
                <SectionTitle>📁 Workspaces — The File Layer</SectionTitle>
                <P>The workspace is the temporary scratchpad where the build happens. It lives on the <Bold>Agent</Bold>.</P>

                <Callout variant="warning" title="The Persistence Trap">
                    Workspaces <Bold>persist</Bold> after a build ends. If you don't clean them, files from Build #44 can leak into Build #45, causing "ghost" bugs that are impossible to track down.
                </Callout>

                <SubTitle className="mt-8">Workspace Lifecycle</SubTitle>
                <StepList
                    steps={[
                        { title: "Allocation", description: "Jenkins assigns a directory on an agent for the job." },
                        { title: "Checkout", description: "Source code is cloned or updated from Git/SCM." },
                        { title: "Execution", description: "Build steps run; compilers create binaries, tests generate reports." },
                        { title: "Persist", description: "Artifacts are archived, but the remaining files stay on disk for reuse." },
                    ]}
                />

                <SubTitle className="mt-8">Production Best Practice: cleanWs()</SubTitle>
                <P>Always start your pipeline by wiping the slate clean:</P>
                <CodeBlock language="groovy">
                    {`pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        cleanWs() // Delete everything in the workspace
        checkout scm
      }
    }
  }
}`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Artifacts & Retention ── */}
            <Section>
                <SectionTitle>🗃️ Artifacts & Retention</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <SubTitle>Artifacts</SubTitle>
                        <P className="text-sm">Files moved from the <InlineCode>workspace</InlineCode> to the <InlineCode>build</InlineCode> directory permanently.</P>
                        <CodeBlock language="groovy" className="text-xs">
                            {`post {
  success {
    archiveArtifacts 'dist/*.zip'
  }
}`}
                        </CodeBlock>
                    </div>
                    <div>
                        <SubTitle>Retention</SubTitle>
                        <P className="text-sm">Don't fill your disk! Tell Jenkins to delete old builds automatically.</P>
                        <CodeBlock language="groovy" className="text-xs">
                            {`options {
  buildDiscarder(
    logRotator(numToKeepStr: '10')
  )
}`}
                        </CodeBlock>
                    </div>
                </div>
            </Section>

            <Divider />

            {/* ── Labs ── */}
            <Section>
                <SectionTitle>💻 Hands-On Labs</SectionTitle>

                <SubTitle>Lab 1 — Inspect the Filesystem (Terminal)</SubTitle>
                <BulletList items={[
                    <span>Run a job, then run <InlineCode>docker exec -it jenkins bash</InlineCode>.</span>,
                    <span>Locate your job: <InlineCode>cd /var/jenkins_home/jobs/&lt;name&gt;</InlineCode>.</span>,
                    <span>Read the build logs directly from disk: <InlineCode>cat builds/1/log</InlineCode>.</span>,
                    <span>Check the <InlineCode>nextBuildNumber</InlineCode> file.</span>
                ]} />

                <SubTitle className="mt-8">Lab 2 — Build with Parameters</SubTitle>
                <P>Configure a job with a "String Parameter" named <InlineCode>ENVIRONMENT</InlineCode>. Access it in your pipeline:</P>
                <CodeBlock language="groovy">
                    {`echo "Deploying to: \${params.ENVIRONMENT}"`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Mistakes ── */}
            <Section>
                <SectionTitle>⚠️ Common Mistakes</SectionTitle>
                <DataTable
                    headers={["Mistake", "Fix"]}
                    rows={[
                        ["Never cleaning workspaces", "Use cleanWs() to avoid stale file pollution."],
                        ["Keeping all builds forever", "Use a 'Build Discarder' to rotate old logs."],
                        ["Hardcoding paths", "Always use the $WORKSPACE environment variable."],
                        ["Using Workspace for long-term storage", "Use archiveArtifacts for files you need to keep."],
                    ]}
                />
            </Section>

            <SummaryCard
                title="🚀 Lesson Summary"
                items={[
                    "Jobs are definitions; Builds are executions; Workspaces are temporary workshops.",
                    "Builds are stored in $JENKINS_HOME/jobs/<name>/builds/.",
                    "Workspaces are ephemeral and live on the agent.",
                    "Artifacts persist beyond the workspace cleanup.",
                    "Build parameters make your 'recipes' reusable and dynamic."
                ]}
            />

            <Section className="mt-12 bg-indigo-50 p-8 rounded-3xl border border-indigo-100 text-center">
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Next Topic</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Freestyle Projects</h3>
                <P className="mb-0">Getting hands-on with the UI to build your first simple automation.</P>
            </Section>
        </div>
    );
}
