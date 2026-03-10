import WhatIsJenkins from "./what-is-jenkins";
import JenkinsArchitecture from "./jenkins-architecture";
import InstallingJenkins from "./installing-jenkins";
import JenkinsUIOverview from "./jenkins-ui-overview";
import JobsAndBuilds from "./jobs-and-builds";

const contentRegistry: Record<string, React.ComponentType> = {
    "what-is-jenkins": WhatIsJenkins,
    "jenkins-architecture": JenkinsArchitecture,
    "installing-jenkins": InstallingJenkins,
    "jenkins-ui-overview": JenkinsUIOverview,
    "jobs-and-builds": JobsAndBuilds,
};

export default contentRegistry;
