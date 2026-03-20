import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, SummaryCard, TerminalOutput, CodeBlock, ImageBlock
} from "@/components/TopicContent";

export default function Ec2CpuCredits() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>⚡ CPU Credits — EC2 T Family (Burstable Instances)</SectionTitle>
                <P>
                    Traditional EC2 instances provide fixed CPU resources, while <Bold>burstable performance instances</Bold> provide a baseline level of CPU utilization with the ability to burst above it. This allows you to pay for baseline CPU and only burst when needed, resulting in significantly lower compute costs.
                </P>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center transition-colors">
                        <div className="text-3xl mb-2">🔋</div>
                        <Bold className="text-emerald-900 dark:text-emerald-400 block mb-1">Charging</Bold>
                        <P className="text-xs text-emerald-700 dark:text-emerald-400/80 mb-0">Idle / Low CPU usage builds up your credit balance.</P>
                    </div>
                    <div className="p-6 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 text-center transition-colors">
                        <div className="text-3xl mb-2">🪫</div>
                        <Bold className="text-orange-900 dark:text-orange-400 block mb-1">Draining</Bold>
                        <P className="text-xs text-orange-700 dark:text-orange-400/80 mb-0">High CPU spikes consume your earned credits.</P>
                    </div>
                    <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 text-center transition-colors">
                        <div className="text-3xl mb-2">⚠️</div>
                        <Bold className="text-red-900 dark:text-red-400 block mb-1">Empty</Bold>
                        <P className="text-xs text-red-700 dark:text-red-400/80 mb-0">Balance hits 0, and you're throttled to the baseline.</P>
                    </div>
                </div>

                <Callout variant="definition" title="What Is a CPU Credit?">
                    <P className="mb-0">
                        A CPU credit providing the performance of a <Bold>full CPU core for one minute</Bold>. 
                        <br />
                        <InlineCode>1 credit = 1 vCPU @ 100% for 1 min</InlineCode> = <InlineCode>1 vCPU @ 50% for 2 mins</InlineCode>.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📊 Credit Rates by Instance Size</SectionTitle>
                <P>Every burstable instance earns credits continuously. The rate and maximum balance depend on the instance size.</P>

                <DataTable 
                    headers={["Instance", "vCPUs", "Baseline CPU", "Credits Earned/hr", "Max Credit Balance"]}
                    rows={[
                        ["t3.nano", "2", "5%", "6", "144"],
                        ["t3.micro", "2", "10%", "12", "288"],
                        ["t3.small", "2", "20%", "24", "576"],
                        ["t3.medium", "2", "20%", "24", "576"],
                        ["t3.large", "2", "30%", "36", "864"]
                    ]}
                />

                <Callout variant="info" className="mt-6">
                    <P className="mb-0 text-sm">
                        For a <Bold>t3.micro</Bold> with 288 max credits: if you run at 100% CPU usage across both vCPUs, you will last <Bold>144 minutes</Bold> before your credits are completely exhausted.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 The Credit Lifecycle — Visualised</SectionTitle>
                <P>
                    Instances accumulate CPU credits when idle and spend them when active. If your balance hits zero in standard mode, you're capped.
                </P>

                <ImageBlock 
                    src="/images/courses/aws/ec2/ec2-credit-lifecycle.png" 
                    alt="EC2 CPU Credit Lifecycle"
                    caption="The flow of earning, spending, and exhausting CPU credits"
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚙️ Standard Mode vs Unlimited Mode</SectionTitle>
                <P>T instances operate in two modes. Choosing the wrong one can either throttle your app or surprise you with a bill.</P>

                <ImageBlock 
                    src="/images/courses/aws/ec2/ec2-credit-modes.png" 
                    alt="EC2 Credit Modes Comparison"
                    caption="Standard mode throttles performance while Unlimited mode bills for surplus usage"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors">
                        <Bold className="text-slate-900 dark:text-white block mb-2 underline decoration-indigo-500 underline-offset-4">Standard Mode</Bold>
                        <BulletList items={[
                            "CPU is throttled to baseline when balance is 0.",
                            "No chance of extra billing.",
                            "Best for internal apps or non-critical tasks."
                        ]} />
                    </div>
                    <div className="p-5 border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/30 rounded-xl shadow-sm transition-colors">
                        <Bold className="text-indigo-700 dark:text-indigo-400 block mb-2 underline decoration-indigo-500 underline-offset-4">Unlimited Mode</Bold>
                        <BulletList items={[
                            "Instance can always burst beyond baseline.",
                            "Surplus credits are billed at a flat rate.",
                            "Default for T3 and T4g instances.",
                            "Ensures availability during long spikes."
                        ]} />
                    </div>
                </div>

                <Callout variant="warning">
                    <P className="mb-0 text-sm">
                        In <Bold>unlimited mode</Bold>, if your 24-hour average CPU utilization exceeds the baseline, you are billed for the additional usage at a flat rate per vCPU-hour.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Monitor & Configure</SectionTitle>
                <P>Use the AWS CLI to manage your instance's credit specification or verify its status.</P>

                <TerminalOutput label="AWS CLI — Credit Management">
{`# 1. Check current credit mode
aws ec2 describe-instance-credit-specifications \\
  --instance-id i-1234567890abcdef0

# 2. Switch to unlimited mode
aws ec2 modify-instance-credit-specification \\
  --instance-credit-specification \\
  "InstanceId=i-1234567890abcdef0,CpuCredits=unlimited"`}
                </TerminalOutput>

                <SubTitle>CloudWatch Metrics to Watch</SubTitle>
                <BulletList items={[
                    <>
                        <Bold>CPUCreditBalance:</Bold> How many credits you have left in the bank. Set an alarm when balance &lt; 20.
                    </>,
                    <>
                        <Bold>CPUCreditUsage:</Bold> How many credits you spent in the last period.
                    </>,
                    <>
                        <Bold>CPUSurplusCreditBalance:</Bold> Credits spent beyond your earned balance (Unlimited mode only).
                    </>
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Mastering CPU Credits</SectionTitle>
                <Accordion 
                    items={[
                        {
                            question: "1. Your t3.micro API is slow under moderate load but has no errors. Why?",
                            answer: "Most likely CPU credit exhaustion. The instance has depleted its balance and is now hard-capped at the 10% baseline performance. If load is consistently high, graduate to an 'M' or 'C' family instance."
                        },
                        {
                            question: "2. A t3.micro idles overnight at 0% CPU for 8 hours. How many credits does it have?",
                            answer: "A t3.micro earns 12 credits/hr. 8 hours x 12 = 96 credits earned. This gives you 96 minutes of full single-vCPU burst capacity for the morning traffic."
                        },
                        {
                            question: "3. What is the billing risk of running a heavy batch job on T3 Unlimited?",
                            answer: "If sustained usage exceeds the baseline over 24 hours, you'll be billed surplus charges. For high-CPU batch jobs, a fixed-performance instance (m or c) is often cheaper and safer."
                        },
                        {
                            question: "4. What happens to credits when you stop a t3.micro vs a t2.micro?",
                            answer: "T2 Standard: credits are lost immediately on stop. T3 Standard: the credit balance persists for seven days after the instance stops. This makes T3 much friendlier for development environments that are stopped nightly."
                        }
                    ]}
                />

                <SummaryCard 
                    items={[
                      <>Burstable T family uses <Bold>CPU Credits</Bold> to handle traffic spikes cost-effectively.</>,
                      <>1 Credit = <Bold>1 vCPU @ 100% for 1 minute</Bold>.</>,
                      <>Use <Bold>Unlimited Mode</Bold> to prevent throttling, but watch for surplus charges.</>,
                      <><Bold>T3 credits persist for 7 days</Bold> after stopping, unlike T2 which resets immediately.</>
                    ]}
                />
            </Section>
        </div>
    );
}
