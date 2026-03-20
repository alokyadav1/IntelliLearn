import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList, NumberedList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard, StepList,
    InlineCode,
} from "@/components/TopicContent";

export default function InstallingJenkins() {
    return (
        <div className="space-y-10">
            {/* ── Mental Model ── */}
            <Section>
                <SectionTitle>Mental Model First</SectionTitle>
                <Callout title="Three ways to install. One right answer.">
                    <BulletList items={[
                        <span><Bold>Docker</Bold> → Local dev, quick demo, CI for small teams.</span>,
                        <span><Bold>WAR file</Bold> → You already have Java + a servlet container, want minimal setup.</span>,
                        <span><Bold>Linux package (apt/yum)</Bold> → Production server, need systemd, auto-start on reboot.</span>
                    ]} />
                </Callout>
                <P className="mt-4 italic">
                    Pick <Bold>one</Bold> method and get Jenkins running. Don't try all three at once.
                </P>
            </Section>

            <Divider />

            {/* ── Pre-flight Checklist ── */}
            <Section>
                <SectionTitle>Pre-flight Checklist</SectionTitle>
                <P>Before installing, verify these on your target machine:</P>
                <CodeBlock language="bash" label="Verification Commands">
                    {`# Java 17 or 21 required (Jenkins LTS as of 2.440+)
java -version
# Expected: openjdk version "17.x.x" or "21.x.x"

# Check available RAM — Jenkins needs min 256MB, recommended 1GB+
free -h          # Linux

# Check port 8080 is free
sudo lsof -i :8080`}
                </CodeBlock>
                <Callout variant="warning">
                    <Bold>Requirement Update:</Bold> Jenkins LTS requires <Bold>Java 17 or 21</Bold>. Java 11 support was dropped in Jenkins 2.463+.
                </Callout>
            </Section>

            <Divider />

            {/* ── Method 1: Docker ── */}
            <Section>
                <SectionTitle>Method 1 — Docker (Recommended)</SectionTitle>
                <P>Best for local development, learning, and quick demos.</P>

                <SubTitle>Phase 1 — Basic Run (No Persistence)</SubTitle>
                <CodeBlock language="bash">
                    {`docker run -p 8080:8080 -p 50000:50000 \\
  jenkins/jenkins:lts`}
                </CodeBlock>
                <P className="text-xs text-slate-500 dark:text-slate-400">
                    <InlineCode>8080</InlineCode> = web UI. <InlineCode>50000</InlineCode> = agent connections (JNLP).
                </P>

                <SubTitle className="mt-8">Phase 2 — Persistent Setup (The Real Way)</SubTitle>
                <StepList
                    steps={[
                        {
                            title: "Create Volume",
                            description: <CodeBlock language="bash" className="mt-2">docker volume create jenkins-data</CodeBlock>
                        },
                        {
                            title: "Run with Volume",
                            description: <CodeBlock language="bash" className="mt-2 text-xs">
                                {`docker run -d \\
  --name jenkins \\
  -p 8080:8080 \\
  -p 50000:50000 \\
  -v jenkins-data:/var/jenkins_home \\
  jenkins/jenkins:lts`}
                            </CodeBlock>
                        },
                        {
                            title: "Get Admin Password",
                            description: <CodeBlock language="bash" className="mt-2">docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</CodeBlock>
                        },
                    ]}
                />

                <DataTable
                    headers={["Flag", "Purpose"]}
                    rows={[
                        ["-d", "Run in background (detached)"],
                        ["--name", "Assign a unique name for easy reference"],
                        ["-v", "Map a host volume to persist Jenkins data"],
                    ]}
                />

                <SubTitle className="mt-8">Phase 3 — Docker Compose (Pro Setup)</SubTitle>
                <CodeBlock language="yaml" label="docker-compose.yml">
                    {`version: '3.8'

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    restart: unless-stopped
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false

volumes:
  jenkins_home:`}
                </CodeBlock>
                <Callout variant="tip">
                    Mounting <InlineCode>/var/run/docker.sock</InlineCode> allows Jenkins to spin up Docker agents from inside its own container.
                </Callout>
            </Section>

            <Divider />

            {/* ── Method 2: WAR File ── */}
            <Section>
                <SectionTitle>Method 2 — WAR File</SectionTitle>
                <P>Best for manual testing or environments where you already have Java running.</P>

                <StepList
                    steps={[
                        {
                            title: "Download",
                            description: <CodeBlock language="bash" className="mt-2">wget https://get.jenkins.io/war-stable/latest/jenkins.war</CodeBlock>
                        },
                        {
                            title: "Run",
                            description: <CodeBlock language="bash" className="mt-2">java -jar jenkins.war --httpPort=9090</CodeBlock>
                        },
                        {
                            title: "Background (Optional)",
                            description: <CodeBlock language="bash" className="mt-2">nohup java -jar jenkins.war &</CodeBlock>
                        },
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Method 3: Linux Package ── */}
            <Section>
                <SectionTitle>Method 3 — Linux Package (Production)</SectionTitle>
                <P>The production standard. Managed by <Bold>systemd</Bold> for auto-start on reboot.</P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 transition-colors">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">DEB</span>
                            Ubuntu / Debian
                        </h4>
                        <CodeBlock language="bash" className="text-xs">
                            {`sudo apt update
sudo apt install openjdk-21-jre
# Add repo & key
sudo apt install jenkins
sudo systemctl enable jenkins`}
                        </CodeBlock>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 transition-colors">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">RPM</span>
                            RHEL / CentOS
                        </h4>
                        <CodeBlock language="bash" className="text-xs">
                            {`sudo dnf install java-21-openjdk
# Add repo & key
sudo dnf install jenkins
sudo systemctl enable jenkins`}
                        </CodeBlock>
                    </div>
                </div>

                <SubTitle>Key File Locations</SubTitle>
                <DataTable
                    headers={["Location", "Description"]}
                    rows={[
                        ["/var/lib/jenkins/", "JENKINS_HOME (brain)"],
                        ["/var/log/jenkins/", "System log files"],
                        ["/etc/default/jenkins", "JVM configurations (Port, Heap)"],
                        ["/usr/share/java/jenkins.war", "The actual binary file"],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Post-Install ── */}
            <Section>
                <SectionTitle>🔐 Post-Install Setup</SectionTitle>
                <P>Once Jenkins loads at <InlineCode>http://localhost:8080</InlineCode>:</P>
                <StepList
                    steps={[
                        { title: "Unlock Jenkins", description: "Paste the initialAdminPassword found in the logs." },
                        { title: "Suggested Plugins", description: "Click 'Install Suggested Plugins' to get core functionality." },
                        { title: "Admin User", description: "Create your primary developer account — don't use 'admin'." },
                        { title: "Set Jenkins URL", description: "Go to Manage Jenkins → System to set the public URL." },
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Comparison ── */}
            <Section>
                <SectionTitle>Installation Comparison</SectionTitle>
                <DataTable
                    headers={["Feature", "Docker", "WAR", "Linux Pkg"]}
                    rows={[
                        ["Setup Time", "Very Fast (~5m)", "Instant (~3m)", "Standard (~10m)"],
                        ["Persistence", "Volume required", "Manual", "Built-in (Automatic)"],
                        ["Auto-start", "Native (--restart)", "Manual script", "Native (systemd)"],
                        ["Best for", "Learning / Local", "Quick testing", "Production nodes"],
                    ]}
                />
            </Section>

            {/* ── Exposing Jenkins ── */}
            <Section>
                <SectionTitle>🌐 Exposing Jenkins (Reverse Proxy)</SectionTitle>
                <P>In production, you should never expose port 8080 directly. Use <Bold>NGINX</Bold> as a reverse proxy to handle SSL and standard port 80/443 mapping.</P>
                <CodeBlock language="nginx" label="/etc/nginx/sites-available/jenkins">
                    {`server {
    listen 80;
    server_name jenkins.yourdomain.com;

    location / {
        proxy_pass          http://127.0.0.1:8080;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto $scheme;
    }
}`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Hands-On Lab ── */}
            <Section>
                <SectionTitle>💻 Hands-On Lab</SectionTitle>
                <SubTitle>Full Docker Install + First Pipeline (45 min)</SubTitle>
                <NumberedList items={[
                    <span>Create a volume: <InlineCode>docker volume create jenkins-data</InlineCode></span>,
                    <span>Run Jenkins with Docker-in-Docker support:
                        <CodeBlock language="bash" className="mt-2 text-xs">
                            {`docker run -d --name jenkins \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins-data:/var/jenkins_home \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  jenkins/jenkins:lts`}
                        </CodeBlock>
                    </span>,
                    "Complete the setup wizard at http://localhost:8080.",
                    "Create a new 'Pipeline' job named 'Verification-Build'.",
                    <span>Paste this Jenkinsfile and run it:
                        <CodeBlock language="groovy" className="mt-2">
                            {`pipeline {
  agent any
  stages {
    stage('Verify') {
      steps {
        sh 'java -version'
        echo "Running on: \${env.NODE_NAME}"
      }
    }
  }
}`}
                        </CodeBlock>
                    </span>
                ]} />
            </Section>

            <Divider />

            {/* ── Mistakes ── */}
            <Section>
                <SectionTitle>⚠️ Common Installation Mistakes</SectionTitle>
                <DataTable
                    headers={["Mistake", "Fix"]}
                    rows={[
                        ["Java 11 with new LTS", "Upgrade to Java 17 or 21."],
                        ["Forgetting -v in Docker", "Data lost on container stop — always use volumes!"],
                        ["No Jenkins URL set", "Go to Manage Jenkins → System to fix webhook breaks."],
                        ["Using built-in node in prod", "Disable executors on Controller; use Agents."],
                        ["Port 50000 closed", "Agents won't be able to connect via JNLP."],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Check Your Understanding ── */}
            <Section>
                <SectionTitle>✅ Check Your Understanding</SectionTitle>
                <BulletList items={[
                    "What Java version does Jenkins LTS require today?",
                    "Why must you always use -v jenkins-data:/var/jenkins_home in Docker?",
                    "What is port 50000 used for?",
                    "Where is initialAdminPassword stored in each install method?",
                    "What is $JENKINS_HOME and why does it matter?"
                ]} />
            </Section>

            <SummaryCard
                title="🚀 Installation Checkpoint"
                items={[
                    "Java 17 or 21 is non-negotiable for modern Jenkins LTS.",
                    "Always use persistent volumes in Docker; containers are temporary.",
                    "Port 8080 is the UI; Port 50000 is for Agent scaling.",
                    "Production servers should use the Linux Package + Nginx Reverse Proxy.",
                    "Manage Jenkins -> System is where you fix many post-install issues."
                ]}
            />

            <Section className="mt-12 bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 text-center transition-colors">
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest mb-2">Next Topic</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Jenkins UI & Dashboard Overview</h3>
                <P className="mb-0">Navigate builds, agents, plugins, and core system configurations.</P>
            </Section>
        </div>
    );
}
