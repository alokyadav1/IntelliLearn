import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, SummaryCard, ImageBlock
} from "@/components/TopicContent";

export default function Ec2InstanceTypes() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>🧠 Decoding the Naming Convention</SectionTitle>
                <P>
                    Every EC2 instance name has three key parts: the series (family), the generation, and the size. Understanding this allows you to know exactly what you're renting before looking at the specs.
                </P>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 bg-slate-50 rounded-2xl border border-slate-200 mt-6">
                    <div className="text-center p-4">
                        <div className="text-4xl font-bold text-indigo-600 mb-1 italic">m</div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Instance Family</div>
                        <div className="text-sm text-slate-600 mt-1">(General Purpose)</div>
                    </div>
                    <div className="text-2xl font-light text-slate-300 hidden md:block">.</div>
                    <div className="text-center p-4">
                        <div className="text-4xl font-bold text-emerald-600 mb-1 italic">5</div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Generation</div>
                        <div className="text-sm text-slate-600 mt-1">(5th Generation)</div>
                    </div>
                    <div className="text-2xl font-light text-slate-300 hidden md:block">.</div>
                    <div className="text-center p-4">
                        <div className="text-4xl font-bold text-orange-600 mb-1 italic">large</div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Size</div>
                        <div className="text-sm text-slate-600 mt-1">(Moderate Resources)</div>
                    </div>
                </div>

                <Callout variant="info" className="mt-6">
                    <P className="mb-0">
                        <Bold>m5.large</Bold> means general-purpose family, 5th generation hardware, with a moderate resource allocation.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🗂️ Instance Families</SectionTitle>
                <P>
                    EC2 instances are grouped into families based on what they're optimized for. The family letter tells you the primary purpose of the instance at a glance.
                </P>

                <ImageBlock 
                    src="/images/courses/aws/ec2/ec2-families.png" 
                    alt="EC2 Instance Families Comparison"
                    caption="The core instance families and their optimization focus"
                />

                <DataTable 
                    headers={["Family", "Purpose", "Common Letters", "Ideal For"]}
                    rows={[
                        ["General Purpose", "Balanced CPU, Memory, Network", "m, t", "Web servers, small databases, dev environments"],
                        ["Compute Optimized", "High CPU, lower RAM", "c", "Batch processing, media encoding, high-performance web servers"],
                        ["Memory Optimized", "High RAM, moderate CPU", "r, x, z", "In-memory caches (Redis), high-performance databases"],
                        ["Storage Optimized", "Heavy disk read/write / Throughput", "i, d, h", "Data warehouses, Hadoop, NoSQL databases"],
                        ["Accelerated", "GPU / Hardware acceleration", "p, g, f", "Machine Learning, 3D graphics, Video encoding"]
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📐 Size Progression — How Sizing Works</SectionTitle>
                <P>
                    As the size increases, you get more CPU power, memory, and network performance. In most modern families, each step up roughly <Bold>doubles</Bold> the resources and the cost.
                </P>

                <div className="overflow-x-auto pb-4">
                  <div className="flex items-center gap-2 min-w-max mb-6 mt-4">
                    {["nano", "micro", "small", "medium", "large", "xlarge", "2xlarge", "4xlarge", "8xlarge", "16xlarge", "32xlarge"].map((size, index) => (
                      <div key={size} className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${index < 3 ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                          {size}
                        </div>
                        {index !== 10 && <div className="w-4 h-px bg-slate-200 mx-1" />}
                      </div>
                    ))}
                  </div>
                </div>

                <SubTitle>Real-world Pricing Model: m6i family</SubTitle>
                <P>Note how the resources and price follow a predictable linear doubling pattern.</P>
                
                <DataTable 
                    headers={["Size", "vCPU", "RAM", "Approx. On-demand Price/hr"]}
                    rows={[
                        ["m6i.large", "2", "8 GB", "~$0.096"],
                        ["m6i.xlarge", "4", "16 GB", "~$0.192"],
                        ["m6i.2xlarge", "8", "32 GB", "~$0.384"],
                        ["m6i.4xlarge", "16", "64 GB", "~$0.768"]
                    ]}
                />

                <Callout variant="tip" className="mt-6">
                    <P className="mb-0">
                        This predictable doubling means there's <Bold>no cost penalty</Bold> for horizontal scaling. Running eight <InlineCode>xlarge</InlineCode> instances costs exactly the same as one <InlineCode>8xlarge</InlineCode> instance.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔤 Capability Suffixes Decoded</SectionTitle>
                <P>
                    Sometimes you'll see letters following the generation number (e.g., <InlineCode>c7gn</InlineCode>). These signal additional hardware capabilities or processor types.
                </P>

                <DataTable 
                    headers={["Suffix", "Meaning", "Example"]}
                    rows={[
                        ["d", "Local NVMe SSD storage (Instance Store)", "m6id.xlarge"],
                        ["g", "Graviton processor (ARM-based, cheaper)", "c7g.large"],
                        ["n", "Enhanced networking (Higher bandwidth)", "c6gn.xlarge"],
                        ["e", "Extra capacity (RAM or storage)", "r6ie.xlarge"],
                        ["z", "High frequency CPU", "m5zn.2xlarge"],
                        ["metal", "Bare metal (No hypervisor overhead)", "m6i.metal"]
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🎯 Choosing the Right Instance</SectionTitle>
                <P>Choosing an instance is a process of elimination based on your bottleneck.</P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-5 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors">
                        <Bold className="text-indigo-600 block mb-2">1. Identify the Bottleneck</Bold>
                        <BulletList items={[
                            "Balanced CPU/RAM → General Purpose (m, t)",
                            "CPU Intensive → Compute Optimized (c)",
                            "RAM Intensive → Memory Optimized (r, x)",
                            "Disk I/O Intensive → Storage Optimized (i, d)",
                            "GPU / AI Training → Accelerated (p, g)"
                        ]} />
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors">
                        <Bold className="text-emerald-600 block mb-2">2. Refine Based on Traffic</Bold>
                        <BulletList items={[
                            "Spiky/Unpredictable → t family (burstable)",
                            "Steady/Predictable → m or c (fixed)",
                            "Cost-sensitive/Linux → Graviton (g suffix)",
                            "Extreme Network → n suffix"
                        ]} />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Mastering Instance Types</SectionTitle>
                <Accordion 
                    items={[
                        {
                            question: "1. Decode this instance type: r6g.2xlarge",
                            answer: "r = memory optimized family, 6 = 6th generation hardware, g = Graviton (ARM) processor, 2xlarge = 8 vCPUs and 64 GB RAM. Ideal for in-memory databases or real-time analytics that want lower cost via Graviton."
                        },
                        {
                            question: "2. Your Node.js API has unpredictable traffic. Which family do you start with?",
                            answer: "Start with the t family (e.g. t3.medium). The t family is burstable — it accumulates CPU credits when idle and spends them during traffic spikes. This is perfect for workloads that don't need sustained high CPU."
                        },
                        {
                            question: "3. Which family is best for a Redis in-memory cache?",
                            answer: "Memory Optimized (r family) — e.g. r6i.xlarge. Redis stores everything in RAM, so the bottleneck is memory. The r family gives you more RAM per dollar than general purpose instances."
                        },
                        {
                            question: "4. What's the cost difference between one m6i.4xlarge and four m6i.xlarge instances?",
                            answer: "The raw compute cost is identical. However, four smaller instances are better for high availability (spread across AZs) and fault tolerance. In production, prefer horizontal scaling over one giant instance."
                        },
                        {
                            question: "5. A colleague says 'just pick the latest generation — it's always better.' Are they right?",
                            answer: "Mostly yes. Newer hardware usually delivers better price-performance. However, check regional availability (some regions lag on new releases) and consider Graviton (g suffix) which often beats Intel in value."
                        }
                    ]}
                />

                <SummaryCard 
                    items={[
                        <>Identify your <Bold>bottleneck</Bold> (CPU, RAM, or Disk) to pick the family.</>,
                        <>Use <Bold>Graviton (g)</Bold> whenever possible for ~20% better price-performance.</>,
                        <>Resources and price <Bold>double</Bold> with each size step — scaling horizontally costs the same in compute.</>,
                        <>Scale <Bold>horizontally</Bold> (multiple small) instead of vertically (one giant) for better reliability.</>
                    ]}
                />
            </Section>
        </div>
    );
}
