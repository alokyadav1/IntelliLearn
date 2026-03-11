import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, SummaryCard,
    InlineCode, StepList, Diagram, Accordion
} from "@/components/TopicContent";

export default function AwsGlobalInfrastructure() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 The 3-Layer Mental Model</SectionTitle>
                <P>
                    AWS global infrastructure is built around three key components: Regions, Availability Zones, and Edge Locations — purposefully distributed to provide high availability, fault tolerance, and low latency globally.
                </P>
                <Diagram label="The City Grid Analogy">
                    <div className="flex flex-col md:flex-row gap-6 justify-around items-center">
                        <div className="text-center group cursor-default">
                            <div className="text-4xl mb-2 transition-transform group-hover:scale-110">🌎</div>
                            <div className="font-bold text-slate-900">Region</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">A City (Mumbai)</div>
                        </div>
                        <div className="text-slate-300 text-2xl hidden md:block">→</div>
                        <div className="text-center group cursor-default">
                            <div className="text-4xl mb-2 transition-transform group-hover:scale-110">🏢</div>
                            <div className="font-bold text-slate-900">Availability Zone</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">A Neighborhood</div>
                        </div>
                        <div className="text-slate-300 text-2xl hidden md:block">→</div>
                        <div className="text-center group cursor-default">
                            <div className="text-4xl mb-2 transition-transform group-hover:scale-110">📡</div>
                            <div className="font-bold text-slate-900">Edge Location</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">A Post Office</div>
                        </div>
                    </div>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🌎 Layer 1 — Regions</SectionTitle>
                <P>
                    An AWS Region is a physical location around the world where AWS clusters data centers. Each AWS Region consists of a minimum of three isolated, physically separate AZs within a geographic area.
                </P>
                <SubTitle>How to pick a Region?</SubTitle>
                <DataTable
                    headers={["Factor", "Question to ask"]}
                    rows={[
                        [<Bold>Latency</Bold>, "Where are my users? Pick the closest region."],
                        [<Bold>Compliance</Bold>, "Does data need to stay in a country? (e.g. GDPR → EU)"],
                        [<Bold>Service Availability</Bold>, "Is the AWS service I need available here?"],
                        [<Bold>Cost</Bold>, "Same service costs differ by region (us-east-1 is usually cheapest)."],
                    ]}
                />
                <Callout variant="info" title="Common Regions">
                    <BulletList items={[
                        <span><InlineCode>us-east-1</InlineCode> (N. Virginia) — Most services launch here first.</span>,
                        <span><InlineCode>ap-south-1</InlineCode> (Mumbai) — Relevant for Indian developers.</span>,
                        <span><InlineCode>eu-west-1</InlineCode> (Ireland) — Major hub for Europe.</span>
                    ]} />
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🏢 Layer 2 — Availability Zones (AZs)</SectionTitle>
                <P>
                    An Availability Zone is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region. All AZs in a Region are interconnected with high-bandwidth, low-latency networking.
                </P>
                <Callout variant="warning">
                    <P className="mb-0">
                        A common misconception is that a single AZ = a single data center. In reality, an AZ is often <Bold>three to five data centers</Bold> linked together.
                    </P>
                </Callout>
                <SubTitle>The Power of Multi-AZ</SubTitle>
                <BulletList items={[
                    <span><Bold>❌ Single AZ:</Bold> All infrastructure in AZ-1a → AZ-1a goes down → Application is dead.</span>,
                    <span><Bold>✅ Multi AZ:</Bold> Infrastructure spread across 1a + 1b + 1c → One fails → others serve traffic seamlessly.</span>
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📡 Layer 3 — Edge Locations</SectionTitle>
                <P>
                    Edge Locations are cache points deployed in major cities. They are not used to deploy servers like EC2, but are used by <Bold>CloudFront</Bold> and <Bold>Route 53</Bold> to serve data closer to users.
                </P>
                <Diagram label="Real-World Data Flow">
                    <div className="space-y-4 font-mono text-sm text-slate-700">
                        <div className="flex items-center gap-4">
                            <span className="w-24 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded text-center">S3 Bucket</span>
                            <span>→ Mumbai Region (Origin)</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded text-center">User</span>
                            <span>→ Hits Nearest Edge (Delhi PoP)</span>
                        </div>
                        <div className="flex items-center gap-4 pl-8 border-l-2 border-slate-100 ml-12 py-2 text-indigo-600 font-bold">
                            <span>Response in ~5ms (instead of ~50ms)</span>
                        </div>
                    </div>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔵 Bonus: The Extended Infrastructure</SectionTitle>
                <DataTable
                    headers={["Component", "What it does"]}
                    rows={[
                        [<Bold>Local Zones</Bold>, "AWS compute closer to specific cities (e.g. Delhi) for <10ms latency."],
                        [<Bold>Wavelength Zones</Bold>, "Deploys AWS to the edge of 5G telecom networks for mobile apps."],
                        [<Bold>Outposts</Bold>, "Brings native AWS services to your own on-premises data center."],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On: Solidify the Concepts</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Infrastructure Map",
                            description: "Visit the official AWS Global Infrastructure map and find your nearest region."
                        },
                        {
                            title: "AZ Verification",
                            description: "Go to EC2 console → Launch Instance → Network Settings. Look at the subnet dropdown to see your specific AZs."
                        },
                        {
                            title: "CDN Setup",
                            description: "Connect a CloudFront distribution to an S3 bucket and observe how it delivers content via 700+ edge locations."
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📊 Infrastructure Comparison</SectionTitle>
                <DataTable
                    headers={["Feature", "Region", "AZ", "Edge Location"]}
                    rows={[
                        ["Definition", "Geographic area", "Data center cluster", "Cache/CDN point"],
                        ["Count", "39 globally", "3+ per region", "700+ globally"],
                        ["Use Case", "Deploying apps", "High availability", "Content delivery"],
                        ["Failure Scope", "Entire region", "Single AZ", "No app hosting"],
                    ]}
                />
            </Section>

            <Section>
                <SectionTitle>✅ Knowledge Check</SectionTitle>
                <Accordion
                    items={[
                        {
                            question: "You're building an app for Indian users. Which region do you pick and why?",
                            answer: "ap-south-1 (Mumbai) — it's the closest AWS region to India, ensuring lowest latency and meeting potential data residency laws."
                        },
                        {
                            question: "Your EC2 instance in AZ-1a crashes. How does using multiple AZs protect you?",
                            answer: "By spreading instances across multiple AZs, a load balancer can automatically route traffic to the healthy ones if one AZ fails. Your app stays online."
                        },
                        {
                            question: "What's the difference between an AZ and an Edge Location?",
                            answer: "AZs are for deploying infrastructure (EC2, RDS). Edge Locations are for delivering cached content (CloudFront, Route 53) closer to users."
                        },
                        {
                            question: "A user in London is accessing your S3-hosted website in India. How does CloudFront help?",
                            answer: "The request hits a London Edge PoP. If cached, content is served in ~5ms. If not, CloudFront fetches it from S3 once and caches it for future London users."
                        }
                    ]}
                />
            </Section>

            <SummaryCard
                items={[
                    "Regions are independent geographic areas containing AZs.",
                    "AZs are physically isolated data centers within a Region.",
                    "Edge Locations are global cache points for low-latency delivery.",
                    "Always design for High Availability by using at least two AZs.",
                ]}
            />
        </div>
    );
}
