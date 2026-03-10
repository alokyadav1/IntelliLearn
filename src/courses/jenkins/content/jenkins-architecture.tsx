import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard, StepList,
    Diagram, InlineCode,
} from "@/components/TopicContent";

export default function JenkinsArchitecture() {
    return (
        <div className="space-y-10">
            {/* ── Mental Model ── */}
            <Section>
                <SectionTitle>Mental Model First</SectionTitle>
                <Callout title="The Core Idea">
                    <Bold>Jenkins = one brain (Controller) + many hands (Agents).</Bold>
                    <P className="mt-2 mb-0">
                        The Controller decides <Bold>what</Bold> to run and <Bold>when</Bold>. Agents are the machines that actually <Bold>do the work</Bold>.
                    </P>
                </Callout>
                <P className="mt-4">
                    Never run your builds on the Controller. It's a traffic cop — not a worker.
                </P>
            </Section>

            <Divider />

            {/* ── The Big Picture ── */}
            <Section>
                <SectionTitle>The Big Picture</SectionTitle>
                <div className="mb-8 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Controller */}
                        <div className="w-full max-w-sm p-6 rounded-2xl bg-indigo-600 border border-indigo-400 shadow-lg text-center mb-12 relative">
                            <div className="absolute -bottom-12 left-1/2 w-px h-12 bg-indigo-400 -translate-x-1/2"></div>
                            <h3 className="text-lg font-bold mb-1 uppercase tracking-wider">Controller</h3>
                            <p className="text-indigo-100 text-xs font-medium mb-4">(The Jenkins Server)</p>
                            <ul className="text-[11px] text-indigo-50 text-left space-y-1 opacity-90 mx-auto w-fit">
                                <li>• Stores jobs & configuration</li>
                                <li>• Schedules build execution</li>
                                <li>• Serves the Web UI (:8080)</li>
                                <li>• Manages plugins & security</li>
                            </ul>
                        </div>

                        {/* Connection Line */}
                        <div className="w-full max-w-4xl h-px bg-indigo-400/30 relative mb-12">
                            <div className="absolute top-0 left-1/4 w-px h-6 bg-indigo-400/30"></div>
                            <div className="absolute top-0 left-1/2 w-px h-6 bg-indigo-400/30"></div>
                            <div className="absolute top-0 right-1/4 w-px h-6 bg-indigo-400/30"></div>
                        </div>

                        {/* Agents */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center">
                                <h4 className="text-sm font-bold text-indigo-400 mb-2">Agent: Linux</h4>
                                <p className="text-[10px] text-slate-400 leading-relaxed">Runs build steps & compiles code</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center">
                                <h4 className="text-sm font-bold text-emerald-400 mb-2">Agent: Docker</h4>
                                <p className="text-[10px] text-slate-400 leading-relaxed">Runs tests in isolated containers</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center">
                                <h4 className="text-sm font-bold text-amber-400 mb-2">Agent: macOS</h4>
                                <p className="text-[10px] text-slate-400 leading-relaxed">Builds iOS apps using Xcode</p>
                            </div>
                        </div>
                    </div>
                </div>
                <P>
                    The Controller delegates jobs to Agents based on <Bold>labels</Bold> you assign.
                </P>
            </Section>

            <Divider />

            {/* ── Controller Deep Dive ── */}
            <Section>
                <SectionTitle>Controller Deep Dive</SectionTitle>
                <P>
                    The Controller is the Jenkins process you start when you run <InlineCode>jenkins.war</InlineCode> or the primary Docker image.
                </P>
                <DataTable
                    headers={["Responsibility", "Detail"]}
                    rows={[
                        ["Job definitions", "Stores all pipeline/job config in $JENKINS_HOME"],
                        ["Build queue", "Queues incoming builds and assigns them to agents"],
                        ["UI", "Serves the web dashboard on port 8080"],
                        ["Plugins", "All plugins are installed and run on the controller"],
                        ["Credentials", "Stores secrets, API keys, SSH keys"],
                        ["Logs & history", "Archives build logs and artifacts"],
                    ]}
                />

                <SubTitle>Where it stores data</SubTitle>
                <CodeBlock label="$JENKINS_HOME Structure">
                    {`$JENKINS_HOME/                  # default: /var/jenkins_home (Docker)
├── config.xml                  # main Jenkins config
├── credentials.xml             # encrypted secrets
├── jobs/                       # all job definitions + build history
│   └── my-pipeline/
│       ├── config.xml
│       └── builds/
│           └── 42/
│               └── log         # console output for build #42
├── plugins/                    # installed plugins
└── workspace/                  # ⚠️ avoid builds here in production`}
                </CodeBlock>
                <Callout variant="warning">
                    <Bold>Rule of thumb:</Bold> Back up <InlineCode>$JENKINS_HOME</InlineCode> = back up everything.
                </Callout>
            </Section>

            <Divider />

            {/* ── Agent Deep Dive ── */}
            <Section>
                <SectionTitle>Agent Deep Dive</SectionTitle>
                <P>
                    An Agent is any machine (VM, container, bare-metal) that connects to the Controller and executes build steps.
                </P>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">🔑</span>
                            SSH Agent
                        </h4>
                        <P className="text-xs mb-4">Controller initiates connection to agent. Best for Linux.</P>
                        <Diagram className="!p-4 bg-slate-50 border-0 mb-0">
                            <p className="text-[10px] font-mono leading-tight whitespace-pre">
                                {`Controller ──SSH──▶ Agent`}
                            </p>
                        </Diagram>
                    </div>
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">📡</span>
                            Inbound Agent
                        </h4>
                        <P className="text-xs mb-4">Agent connects to Controller. Best for firewalled nodes.</P>
                        <Diagram className="!p-4 bg-slate-50 border-0 mb-0">
                            <p className="text-[10px] font-mono leading-tight whitespace-pre">
                                {`Agent ──TCP/WS──▶ Controller`}
                            </p>
                        </Diagram>
                    </div>
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">🐳</span>
                            Docker Agent
                        </h4>
                        <P className="text-xs mb-4">Ephemeral containers created per-build. Cleanest approach.</P>
                        <Diagram className="!p-4 bg-slate-50 border-0 mb-0">
                            <p className="text-[10px] font-mono leading-tight whitespace-pre">
                                {`Controller ──API──▶ Docker`}
                            </p>
                        </Diagram>
                    </div>
                </div>

                <SubTitle>Agent anatomy</SubTitle>
                <CodeBlock label="Agent Machine Layout">
                    {`Agent machine
├── Java (JRE 11+)              # required for Jenkins agent process
├── agent.jar                   # downloaded from Controller automatically
├── workspace/
│   └── my-pipeline/            # checked-out source code lives here
└── tools/                      # JDK, Maven, Node versions installed by Jenkins`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Labels ── */}
            <Section>
                <SectionTitle>Labels — Intelligent Picking</SectionTitle>
                <P>
                    Labels are tags you assign to agents. Your pipeline then requests a specific label to find the right environment.
                </P>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <P className="font-bold mb-4 opacity-50 uppercase tracking-tighter text-xs">Environment Definition</P>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-sm">
                                <Bold className="shrink-0 text-indigo-600 font-mono">SRV-01:</Bold>
                                <span className="text-slate-600 font-medium">labels: <InlineCode>linux</InlineCode>, <InlineCode>docker</InlineCode>, <InlineCode>java</InlineCode></span>
                            </li>
                            <li className="flex gap-2 text-sm">
                                <Bold className="shrink-0 text-indigo-600 font-mono">SRV-02:</Bold>
                                <span className="text-slate-600 font-medium">labels: <InlineCode>linux</InlineCode>, <InlineCode>docker</InlineCode>, <InlineCode>node</InlineCode></span>
                            </li>
                            <li className="flex gap-2 text-sm">
                                <Bold className="shrink-0 text-indigo-600 font-mono">MAC-01:</Bold>
                                <span className="text-slate-600 font-medium">labels: <InlineCode>macos</InlineCode>, <InlineCode>xcode</InlineCode></span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                        <P className="font-bold mb-4 opacity-50 uppercase tracking-tighter text-xs">Pipeline Requests</P>
                        <ul className="space-y-4">
                            <li className="text-sm">
                                <div className="text-slate-500 mb-1">Targeting Linux + Java:</div>
                                <InlineCode className="block w-full">agent {'{'} label 'docker && java' {'}'}</InlineCode>
                            </li>
                            <li className="text-sm">
                                <div className="text-slate-500 mb-1">Targeting iOS builds:</div>
                                <InlineCode className="block w-full">agent {'{'} label 'macos' {'}'}</InlineCode>
                            </li>
                        </ul>
                    </div>
                </div>
                <CodeBlock label="Jenkinsfile Example">
                    {`pipeline {
  agent { label 'docker && linux' }   // ← Controller picks a matching agent
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t myapp .'
      }
    }
  }
}`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Hands-On Labs ── */}
            <Section>
                <SectionTitle>Hands-On Labs</SectionTitle>

                <SubTitle>Lab 1 — Observe the Controller's filesystem (10 min)</SubTitle>
                <CodeBlock language="bash">
                    {`# Run Jenkins in Docker
docker run -d -p 8080:8080 --name jenkins-arch jenkins/jenkins:lts

# Shell into the container (this IS the controller)
docker exec -it jenkins-arch bash

# Explore JENKINS_HOME
ls /var/jenkins_home
ls /var/jenkins_home/jobs
cat /var/jenkins_home/config.xml | head -30`}
                </CodeBlock>
                <P><Bold>What to notice:</Bold></P>
                <BulletList items={[
                    <span><InlineCode>jobs/</InlineCode> directory is empty until you create your first job</span>,
                    <span><InlineCode>plugins/</InlineCode> has 80+ dirs — Jenkins installs suggested plugins on first run</span>,
                    <span><InlineCode>config.xml</InlineCode> is the source of truth for controller config</span>
                ]} />

                <Divider className="opacity-50" />

                <SubTitle className="mt-8">Lab 2 — Add a Docker Agent (30 min)</SubTitle>
                <Callout variant="warning">
                    <Bold>Prerequisite:</Bold> Jenkins running, Docker installed on your machine.
                </Callout>

                <P className="font-bold text-sm text-indigo-600 mb-2">Step 1 — Install Docker plugin</P>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-sm">
                    Manage Jenkins → Plugins → Available plugins → search "Docker" → Install
                </div>

                <P className="font-bold text-sm text-indigo-600 mb-2">Step 2 — Configure a Docker cloud agent</P>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-[13px] space-y-2">
                    <P className="mb-1">Manage Jenkins → Clouds → New cloud → Docker</P>
                    <BulletList className="!mb-0" items={[
                        <span>Docker Host URI: <InlineCode>unix:///var/run/docker.sock</InlineCode> (Test Connection)</span>,
                        <span>Labels: <InlineCode>docker-agent</InlineCode></span>,
                        <span>Docker Image: <InlineCode>jenkins/agent:latest</InlineCode></span>,
                        <span>Remote FS Root: <InlineCode>/home/jenkins/agent</InlineCode></span>
                    ]} />
                </div>

                <P className="font-bold text-sm text-indigo-600 mb-2">Step 3 — Create a pipeline that uses the agent</P>
                <CodeBlock language="groovy" label="Jenkinsfile">
                    {`pipeline {
  agent {
    docker {
      image 'maven:3.9-eclipse-temurin-17'
      label 'docker-agent'
    }
  }
  stages {
    stage('Check') {
      steps {
        sh 'mvn --version'
        sh 'java -version'
        sh 'echo Running on: $(hostname)'
      }
    }
  }
}`}
                </CodeBlock>
                <P className="mt-4"><Bold>What you'll see:</Bold> Jenkins pulls the Maven image, spins up a container for the build, and destroys it immediately after completion.</P>

                <Divider className="opacity-50" />

                <SubTitle className="mt-8">Lab 3 — Verify Controller vs Agent separation (10 min)</SubTitle>
                <P>Add this to your pipeline and observe output carefully:</P>
                <CodeBlock language="groovy">
                    {`pipeline {
  agent any
  stages {
    stage('Where am I?') {
      steps {
        sh '''
          echo "Hostname: $(hostname)"
          echo "Working dir: $(pwd)"
          echo "User: $(whoami)"
          echo "Java: $(java -version 2>&1)"
        '''
      }
    }
  }
}`}
                </CodeBlock>
                <P className="mt-4 italic text-sm text-slate-500">
                    Run it twice — compare the hostnames if you have multiple agents. The build runs <Bold>on the agent</Bold>, not the Controller.
                </P>
            </Section>

            <SummaryCard
                title="✅ Architecture Mastery — Checkpoint"
                items={[
                    "Jenkins uses a Master-Slave (Controller-Agent) architecture.",
                    "Controller = Management, Agents = Execution.",
                    "Labels are the 'glue' that connects jobs to the correct machines.",
                    "$JENKINS_HOME stores the brain's entire memory; back it up often.",
                    "Modern setups favor ephemeral Docker/K8s agents over static VMs."
                ]}
            />
        </div>
    );
}
