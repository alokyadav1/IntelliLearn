// ─────────────────────────────────────────────────────────────────────────────
// AWS — Modules Config
// All AWS course modules and topics structured to follow the devops roadmap.
// ─────────────────────────────────────────────────────────────────────────────

import type { CourseModule, CourseTopic } from "@/types/platform.types";

export { type TopicCategory } from "@/types/platform.types";

export const awsModules: CourseModule[] = [
  {
    id: "section-1-fundamentals",
    title: "1. Cloud Fundamentals",
    topics: [
      { id: "what-is-cloud-computing", title: "What is Cloud Computing", category: "Mandatory" },
      { id: "iaas-paas-saas", title: "IaaS vs PaaS vs SaaS", category: "Mandatory" },
      { id: "public-private-hybrid", title: "Public vs Private vs Hybrid Cloud", category: "Mandatory" },
      { id: "aws-fundamentals", title: "AWS Fundamentals Overview", category: "Mandatory" },
      { id: "aws-global-infrastructure", title: "AWS Global Infrastructure", category: "Mandatory" },
      { id: "shared-responsibility-model", title: "Shared Responsibility Model", category: "Mandatory" },
      { id: "well-architected-framework", title: "Well Architected Framework", category: "Mandatory" },
    ],
  },
  {
    id: "section-2-identity",
    title: "2. Identity & Security (IAM)",
    topics: [
      { id: "iam-overview", title: "IAM Overview", category: "Mandatory" },
      { id: "iam-policies-identity", title: "Identity-based Policies", category: "Mandatory" },
      { id: "iam-policies-resource", title: "Resource-based Policies", category: "Mandatory" },
      { id: "iam-users-groups", title: "Users & User Groups", category: "Mandatory" },
      { id: "iam-roles", title: "IAM Roles Overview", category: "Mandatory" },
      { id: "iam-instance-profiles", title: "Instance Profiles", category: "Mandatory" },
      { id: "iam-assuming-roles", title: "Assuming Roles", category: "Good to Know" },
    ],
  },
  {
    id: "section-3-compute",
    title: "3. Compute (EC2)",
    topics: [
      { id: "ec2-overview", title: "EC2 Overview", category: "Mandatory" },
      { id: "ec2-instance-types", title: "Instance Types", category: "Mandatory" },
      { id: "ec2-cpu-credits", title: "CPU Credits", category: "Good to Know" },
      { id: "ec2-storage-volumes", title: "Storage / Volumes (EBS/Instance Store)", category: "Mandatory" },
      { id: "ec2-keypairs", title: "Key Pairs", category: "Mandatory" },
      { id: "ec2-elastic-ip", title: "Elastic IP", category: "Mandatory" },
      { id: "ec2-user-data", title: "User Data Scripts", category: "Mandatory" },
      { id: "ec2-purchasing-options", title: "Purchasing Options", category: "Good to Know" },
    ],
  },
  {
    id: "section-4-networking",
    title: "4. Networking (VPC)",
    topics: [
      { id: "vpc-overview", title: "VPC Overview", category: "Mandatory" },
      { id: "vpc-cidr-blocks", title: "CIDR Blocks", category: "Mandatory" },
      { id: "vpc-subnets", title: "Public & Private Subnets", category: "Mandatory" },
      { id: "vpc-route-tables", title: "Route Tables", category: "Mandatory" },
      { id: "vpc-security-groups", title: "Security Groups & NACLs", category: "Mandatory" },
      { id: "vpc-internet-gateway", title: "Internet Gateway", category: "Mandatory" },
      { id: "vpc-nat-gateway", title: "NAT Gateway", category: "Mandatory" },
    ],
  },
  {
    id: "section-5-storage",
    title: "5. Storage (S3)",
    topics: [
      { id: "s3-buckets-objects", title: "Buckets & Objects", category: "Mandatory" },
      { id: "s3-lifecycle", title: "Bucket / Object Lifecycle", category: "Mandatory" },
      { id: "s3-storage-types", title: "Storage Types (Standard, IA, Glacier)", category: "Mandatory" },
    ],
  },
  {
    id: "section-6-scaling",
    title: "6. Scaling & Load Distribution",
    topics: [
      { id: "autoscaling-amis", title: "AMIs (Amazon Machine Images)", category: "Mandatory" },
      { id: "autoscaling-launch-templates", title: "Launch Templates", category: "Mandatory" },
      { id: "autoscaling-groups", title: "Auto Scaling Groups", category: "Mandatory" },
      { id: "autoscaling-policies", title: "Scaling Policies", category: "Mandatory" },
      { id: "elastic-load-balancers", title: "Elastic Load Balancers (ALB, NLB, GLB)", category: "Mandatory" },
    ],
  },
  {
    id: "section-7-monitoring",
    title: "7. Monitoring & Observability",
    topics: [
      { id: "cloudwatch-metrics", title: "CloudWatch Metrics", category: "Mandatory" },
      { id: "cloudwatch-events", title: "CloudWatch Events (EventBridge)", category: "Mandatory" },
      { id: "cloudwatch-logs", title: "CloudWatch Logs", category: "Mandatory" },
    ],
  },
  {
    id: "section-8-dns",
    title: "8. DNS (Route53)",
    topics: [
      { id: "route53-hosted-zones", title: "Hosted Zones", category: "Mandatory" },
      { id: "route53-routing-policies", title: "Routing Policies", category: "Mandatory" },
      { id: "route53-health-checks", title: "Health Checks", category: "Mandatory" },
    ],
  },
  {
    id: "section-9-email",
    title: "9. Email Service (SES)",
    topics: [
      { id: "ses-sandbox", title: "Sandbox / Sending Limits", category: "Good to Know" },
      { id: "ses-identity", title: "Identity Verification", category: "Good to Know" },
      { id: "ses-dkim", title: "DKIM Setup", category: "Good to Know" },
      { id: "ses-feedback", title: "Feedback Handling", category: "Optional" },
      { id: "ses-configuration", title: "Configuration Sets", category: "Optional" },
      { id: "ses-reputation", title: "Sender Reputation", category: "Good to Know" },
      { id: "ses-dedicated-ip", title: "Dedicated IP", category: "Optional" },
    ],
  },
  {
    id: "section-10-databases",
    title: "10. Databases",
    topics: [
      { id: "rds-instances", title: "RDS DB Instances", category: "Mandatory" },
      { id: "rds-storage", title: "RDS Storage (General Purpose, Provisioned IOPS, Magnetic)", category: "Mandatory" },
      { id: "rds-backup", title: "RDS Backup / Restore", category: "Mandatory" },
      { id: "dynamodb-tables", title: "DynamoDB Tables / Items / Attributes", category: "Mandatory" },
      { id: "dynamodb-keys", title: "Primary Keys / Secondary Indexes", category: "Mandatory" },
      { id: "dynamodb-modeling", title: "Data Modeling", category: "Mandatory" },
      { id: "dynamodb-streams", title: "Streams", category: "Good to Know" },
      { id: "dynamodb-capacity", title: "Capacity Settings", category: "Mandatory" },
      { id: "dynamodb-limits", title: "Limits", category: "Good to Know" },
      { id: "dynamodb-backup", title: "Backup / Restore", category: "Good to Know" },
      { id: "dynamodb-local", title: "DynamoDB Local", category: "Optional" },
    ],
  },
  {
    id: "section-11-caching",
    title: "11. Caching (ElastiCache)",
    topics: [
      { id: "elasticache-quotas", title: "ElastiCache Quotas", category: "Good to Know" },
    ],
  },
  {
    id: "section-12-cdn",
    title: "12. CDN (CloudFront)",
    topics: [
      { id: "cloudfront-distributions", title: "Distributions", category: "Mandatory" },
      { id: "cloudfront-policies", title: "Policies", category: "Mandatory" },
      { id: "cloudfront-invalidations", title: "Invalidations", category: "Mandatory" },
    ],
  },
  {
    id: "section-13-containers",
    title: "13. Containers",
    topics: [
      { id: "ecr-overview", title: "ECR (Elastic Container Registry)", category: "Mandatory" },
      { id: "ecs-clusters", title: "ECS Clusters", category: "Mandatory" },
      { id: "ecs-tasks", title: "ECS Tasks", category: "Mandatory" },
      { id: "ecs-services", title: "ECS Services", category: "Mandatory" },
      { id: "ecs-launch", title: "ECS Launch Config / Autoscaling", category: "Mandatory" },
      { id: "ecs-fargate", title: "ECS Fargate", category: "Mandatory" },
      { id: "eks-overview", title: "EKS (Elastic Kubernetes Service)", category: "Optional" },
    ],
  },
  {
    id: "section-14-serverless",
    title: "14. Serverless (Lambda)",
    topics: [
      { id: "lambda-operations", title: "Creating / Invoking Functions", category: "Mandatory" },
      { id: "lambda-layers", title: "Lambda Layers", category: "Good to Know" },
      { id: "lambda-runtimes", title: "Custom Runtimes", category: "Good to Know" },
      { id: "lambda-versioning", title: "Versioning / Aliases", category: "Mandatory" },
      { id: "lambda-eventbridge", title: "EventBridge / Scheduled Execution", category: "Mandatory" },
      { id: "lambda-limits", title: "Cold Start & Limitations", category: "Mandatory" },
      { id: "api-gateway", title: "API Gateway", category: "Mandatory" },
      { id: "lambda-at-edge", title: "Lambda@Edge", category: "Optional" },
    ],
  },
];

export function getAwsTopic(id: string): { module: CourseModule; topic: CourseTopic } | null {
  for (const mod of awsModules) {
    const topic = mod.topics.find((t) => t.id === id);
    if (topic) return { module: mod, topic };
  }
  return null;
}
