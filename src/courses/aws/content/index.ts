import WhatIsCloudComputing from "./what-is-cloud-computing";
import IaaSvsPaaSvsSaaS from "./iaas-paas-saas";
import PublicPrivateHybridCloud from "./public-private-hybrid";
import AwsFundamentalsOverview from "./aws-fundamentals";
import AwsGlobalInfrastructure from "./global-infrastructure";
import SharedResponsibilityModel from "./shared-responsibility";
import WellArchitectedFramework from "./well-architected";
import IamOverview from "./iam-overview";
import IdentityBasedPolicies from "./iam-policies-identity";
import ResourceBasedPolicies from "./iam-policies-resource";

const contentRegistry: Record<string, React.ComponentType> = {
  "what-is-cloud-computing": WhatIsCloudComputing,
  "iaas-paas-saas": IaaSvsPaaSvsSaaS,
  "public-private-hybrid": PublicPrivateHybridCloud,
  "aws-fundamentals": AwsFundamentalsOverview,
  "aws-global-infrastructure": AwsGlobalInfrastructure,
  "shared-responsibility-model": SharedResponsibilityModel,
  "well-architected-framework": WellArchitectedFramework,
  "iam-overview": IamOverview,
  "iam-policies-identity": IdentityBasedPolicies,
  "iam-policies-resource": ResourceBasedPolicies,
};

export default contentRegistry;
