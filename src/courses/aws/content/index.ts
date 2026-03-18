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
import IamUsersGroups from "./iam-users-groups";

import IamRoles from "./iam-roles";
import IamInstanceProfiles from "./iam-instance-profiles";
import IamAssumingRoles from "./iam-assuming-roles";
import Ec2Overview from "./ec2-overview";
import Ec2InstanceTypes from "./ec2-instance-types";
import Ec2CpuCredits from "./ec2-cpu-credits";
import Ec2StorageVolumes from "./ec2-storage-volumes";

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
  "iam-users-groups": IamUsersGroups,
  "iam-roles": IamRoles,
  "iam-instance-profiles": IamInstanceProfiles,
  "iam-assuming-roles": IamAssumingRoles,
  "ec2-overview": Ec2Overview,
  "ec2-instance-types": Ec2InstanceTypes,
  "ec2-cpu-credits": Ec2CpuCredits,
  "ec2-storage-volumes": Ec2StorageVolumes,
};

export default contentRegistry;
