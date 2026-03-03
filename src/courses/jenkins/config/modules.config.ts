// ─────────────────────────────────────────────────────────────────────────────
// Jenkins — Modules Config
// All Jenkins course modules and topics, structured analogously to
// ai-agents/config/prerequisites.config.ts
// ─────────────────────────────────────────────────────────────────────────────

import type { CourseModule, CourseTopic } from "@/types/platform.types";

export { type TopicCategory } from "@/types/platform.types";

export const jenkinsModules: CourseModule[] = [
  {
    id: "section-a",
    title: "SECTION A — Jenkins Fundamentals",
    topics: [
      { id: "what-is-jenkins", title: "What is Jenkins & Why CI/CD", category: "Mandatory" },
      { id: "jenkins-architecture", title: "Jenkins Architecture (Controller & Agents)", category: "Mandatory" },
      { id: "installing-jenkins", title: "Installing Jenkins (Docker, WAR, Linux)", category: "Mandatory" },
      { id: "jenkins-ui-overview", title: "Jenkins UI & Dashboard Overview", category: "Mandatory" },
      { id: "jobs-and-builds", title: "Jobs, Builds & Workspaces", category: "Mandatory" },
      { id: "freestyle-projects", title: "Freestyle Projects", category: "Mandatory" },
      { id: "build-triggers", title: "Build Triggers (Webhooks, Polling, Cron)", category: "Mandatory" },
      { id: "build-artifacts", title: "Build Artifacts & Archiving", category: "Mandatory" },

      { id: "jenkins-history", title: "Jenkins vs Other CI Tools (GitHub Actions, GitLab CI)", category: "Good to Know" },
      { id: "jenkins-lts-vs-weekly", title: "Jenkins LTS vs Weekly Release Channels", category: "Good to Know" },
    ],
  },
  {
    id: "section-b",
    title: "SECTION B — Pipelines",
    topics: [
      { id: "pipeline-overview", title: "Pipeline Overview & Types", category: "Mandatory" },
      { id: "declarative-pipeline", title: "Declarative Pipeline Syntax", category: "Mandatory" },
      { id: "scripted-pipeline", title: "Scripted Pipeline (Groovy DSL)", category: "Mandatory" },
      { id: "jenkinsfile", title: "Jenkinsfile — Writing & Committing to SCM", category: "Mandatory" },
      { id: "stages-steps-agents", title: "Stages, Steps & Agent Directives", category: "Mandatory" },
      { id: "environment-variables", title: "Environment Variables & Credentials", category: "Mandatory" },
      { id: "parallel-stages", title: "Parallel Stages", category: "Mandatory" },
      { id: "pipeline-post-actions", title: "Post Actions (always, success, failure)", category: "Mandatory" },

      { id: "when-conditionals", title: "When Conditionals & Branch Filtering", category: "Good to Know" },
      { id: "shared-libraries", title: "Shared Libraries (vars/, src/)", category: "Good to Know" },
      { id: "matrix-builds", title: "Matrix Builds", category: "Good to Know" },

      { id: "pipeline-unit-testing", title: "Pipeline Unit Testing (JenkinsPipelineUnit)", category: "Optional" },
    ],
  },
  {
    id: "section-c",
    title: "SECTION C — Agents & Distributed Builds",
    topics: [
      { id: "controller-vs-agent", title: "Controller vs Agent Architecture", category: "Mandatory" },
      { id: "adding-agents", title: "Adding Agents (SSH, JNLP, Docker)", category: "Mandatory" },
      { id: "labels-and-node", title: "Labels & Node Selection", category: "Mandatory" },
      { id: "docker-agents", title: "Docker Agents & Dynamic Agent Provisioning", category: "Mandatory" },

      { id: "kubernetes-agents", title: "Kubernetes Plugin (Pod Templates)", category: "Good to Know" },
      { id: "cloud-agents", title: "Cloud Agents (AWS EC2, GCE)", category: "Good to Know" },
      { id: "agent-security", title: "Agent Security & Sandboxing", category: "Good to Know" },
    ],
  },
  {
    id: "section-d",
    title: "SECTION D — Plugins & Ecosystem",
    topics: [
      { id: "plugin-manager", title: "Plugin Manager (Install, Update, Manage)", category: "Mandatory" },
      { id: "git-plugin", title: "Git Plugin & SCM Integration", category: "Mandatory" },
      { id: "credentials-plugin", title: "Credentials Plugin (Secrets Management)", category: "Mandatory" },
      { id: "pipeline-plugin", title: "Pipeline Plugin Suite", category: "Mandatory" },
      { id: "blue-ocean", title: "Blue Ocean UI", category: "Mandatory" },

      { id: "sonarqube-integration", title: "SonarQube Integration", category: "Good to Know" },
      { id: "slack-notifications", title: "Slack & Email Notifications", category: "Good to Know" },
      { id: "junit-test-reporting", title: "JUnit Test Result Reporting", category: "Good to Know" },
      { id: "artifactory-nexus", title: "Artifactory & Nexus Integration", category: "Good to Know" },
      { id: "code-coverage", title: "Code Coverage Publishing", category: "Good to Know" },

      { id: "custom-plugin-development", title: "Custom Plugin Development Basics", category: "Optional" },
    ],
  },
  {
    id: "section-e",
    title: "SECTION E — Security & Access Control",
    topics: [
      { id: "jenkins-security-realm", title: "Security Realm & Authorization Strategies", category: "Mandatory" },
      { id: "role-based-access", title: "Role-Based Access Control (RBAC)", category: "Mandatory" },
      { id: "secret-management", title: "Secret Management Best Practices", category: "Mandatory" },
      { id: "script-approval", title: "Script Security & Script Approval", category: "Mandatory" },

      { id: "csrf-protection", title: "CSRF Protection", category: "Good to Know" },
      { id: "jenkins-behind-proxy", title: "Running Jenkins Behind a Reverse Proxy", category: "Good to Know" },
      { id: "audit-logging", title: "Audit Logging & Compliance", category: "Good to Know" },
    ],
  },
  {
    id: "section-f",
    title: "SECTION F — Advanced Patterns & Production",
    topics: [
      { id: "jenkins-as-code", title: "Jenkins as Code (JCasC — Configuration as Code)", category: "Mandatory" },
      { id: "job-dsl", title: "Job DSL Plugin (Programmatic Job Creation)", category: "Mandatory" },
      { id: "multibranch-pipeline", title: "Multibranch Pipeline & Branch Discovery", category: "Mandatory" },
      { id: "github-organization", title: "GitHub Organization Folders", category: "Mandatory" },

      { id: "pipeline-performance", title: "Pipeline Performance Optimization", category: "Good to Know" },
      { id: "jenkins-ha", title: "Jenkins High Availability & Backup", category: "Good to Know" },
      { id: "jenkins-metrics", title: "Monitoring Jenkins (Prometheus, Grafana)", category: "Good to Know" },
      { id: "jenkins-upgrades", title: "Upgrade Strategies & Migration", category: "Good to Know" },

      { id: "jenkins-gitops", title: "Jenkins with GitOps (ArgoCD Integration)", category: "Optional" },
    ],
  },
];

export function getJenkinsTopic(id: string): { module: CourseModule; topic: CourseTopic } | null {
  for (const mod of jenkinsModules) {
    const topic = mod.topics.find((t) => t.id === id);
    if (topic) return { module: mod, topic };
  }
  return null;
}
