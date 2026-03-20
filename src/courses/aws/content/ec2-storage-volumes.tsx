import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, DataTable, Divider, Accordion,
    InlineCode, SummaryCard, TerminalOutput, CodeBlock, StepList
} from "@/components/TopicContent";

export default function Ec2StorageVolumes() {
    return (
        <div className="space-y-10">
            <Section>
                <SectionTitle>💾 Storage / Volumes — EBS vs Instance Store</SectionTitle>
                <P>
                    When you launch an EC2 instance, you need a place to store its Operating System and application data. AWS provides two fundamentally different storage options based on whether you need <Bold>persistence</Bold> or <Bold>raw speed</Bold>.
                </P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
                        <div className="text-3xl mb-3">📂</div>
                        <Bold className="text-xl text-slate-900 dark:text-white block mb-2">Amazon EBS</Bold>
                        <P className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">The "External Hard Drive" analogy</P>
                        <P className="text-sm dark:text-slate-300 mb-0">Durable, block-level storage that persists independently of the instance's life. Plug it in, unplug it, data survives.</P>
                    </div>
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl shadow-sm transition-colors">
                        <div className="text-3xl mb-3">🚀</div>
                        <Bold className="text-xl text-emerald-900 dark:text-emerald-400 block mb-2">Instance Store</Bold>
                        <P className="text-sm text-emerald-700 dark:text-emerald-400/80 mb-4 italic">The "RAM Drive" analogy</P>
                        <P className="text-sm mb-0 text-emerald-800 dark:text-emerald-300">Physically attached NVMe or SSD disks. Blazing fast, but ephemeral—data is gone when power is off.</P>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📦 EBS — Elastic Block Store</SectionTitle>
                <P>
                    EBS is the most common storage choice. It travels over the network to your instance and is scoped to a specific <Bold>Availability Zone</Bold> (AZ).
                </P>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 transition-colors">
                        <Bold className="text-sm dark:text-slate-200 block mb-1">AZ Scoped</Bold>
                        <P className="text-xs text-slate-500 dark:text-slate-400 mb-0">The volume and instance must be in the same AZ.</P>
                    </div>
                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 transition-colors">
                        <Bold className="text-sm dark:text-slate-200 block mb-1">Network Attached</Bold>
                        <P className="text-xs text-slate-500 dark:text-slate-400 mb-0">Not inside the server; it's a virtual drive over the cable.</P>
                    </div>
                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 transition-colors">
                        <Bold className="text-sm dark:text-slate-200 block mb-1">Scalable</Bold>
                        <P className="text-xs text-slate-500 dark:text-slate-400 mb-0">You can resize volumes and change performance on the fly.</P>
                    </div>
                </div>

                <Callout variant="warning">
                    <P className="mb-0 text-sm">
                        <Bold>Important:</Bold> The <InlineCode>DeleteOnTermination</InlineCode> attribute is <Bold>True</Bold> for root volumes by default. If you terminate your instance, you lose your OS disk unless you set this to <Bold>False</Bold>.
                    </P>
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Pick the Right EBS Volume Type</SectionTitle>
                <DataTable 
                    headers={["Type", "Best For", "IOPS", "Cost"]}
                    rows={[
                        ["gp3", "Web servers, most workloads, root volumes", "3,000–16,000", "Default (Best Balance)"],
                        ["gp2", "Older legacy workloads", "Up to 16,000", "Pricey for performance"],
                        ["io2", "Databases needing consistent high IOPS", "Up to 256,000", "$$$$ (Most Durable)"],
                        ["io1", "High-performance legacy DBs", "Up to 64,000", "$$$"],
                        ["st1", "Big Data, log processing (Sequential)", "500 MB/s", "$ (HDD)"],
                        ["sc1", "Archives, cold data (Rarely accessed)", "250 MB/s", "$ (Cheapest HDD)"]
                    ]}
                />

                <SubTitle>The gp3 vs gp2 Rule</SubTitle>
                <P>
                    In <Bold>gp2</Bold>, performance (IOPS) was tied to volume size. You had to buy more GBs just to get more speed. <Bold>gp3</Bold> decouples them—you get 3,000 IOPS baseline on <Bold>any</Bold> volume size, making it cheaper and better by default.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>⚡ Instance Store — Ephemeral High-Speed</SectionTitle>
                <P>
                    Physically attached to the host hardware. Use it when you need maximum I/O and data loss is acceptable.
                </P>

                <div className="p-5 border border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 rounded-xl mb-6 transition-colors">
                    <Bold className="text-red-700 dark:text-red-400 block mb-2">❌ When NOT to use Instance Store:</Bold>
                    <BulletList items={[
                        "Never for standalone databases.",
                        "Never for persistent application data.",
                        "Never for anything you can't restore from a snapshot or S3."
                    ]} />
                </div>

                <Bold className="text-emerald-700 dark:text-emerald-400 block mb-2">✅ Best Use Cases:</Bold>
                <BulletList items={[
                    "Caches (Redis replicas, Memcached).",
                    "Temporary processing buffers.",
                    "Scratch space for big data (Hadoop, Spark).",
                    "NoSQL replicas that can sync from a primary."
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🔄 Side-by-Side Comparison</SectionTitle>
                <DataTable 
                    headers={["Feature", "Amazon EBS", "Instance Store"]}
                    rows={[
                        ["Persistence", "Survives stop/terminate", "Lost on stop/terminate/failure"],
                        ["Connection", "Network attached", "Physically attached (Local)"],
                        ["Performance", "Up to 256K IOPS (io2)", "Extremely high (NVMe/SSD)"],
                        ["Cost", "Billed separately", "Included in instance cost"],
                        ["Snapshots", "✅ Yes (stored on S3)", "❌ No"],
                        ["Resize", "✅ Yes (On the fly)", "❌ No"]
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>📸 Snapshots — Incremental Backups</SectionTitle>
                <P>Snapshots copy only the changed data blocks, saving both time and money.</P>
                
                <div className="flex flex-col md:flex-row items-center justify-around gap-4 my-8 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                    <div className="text-center">
                        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wide">Monday</div>
                        <div className="w-24 h-24 bg-indigo-500 dark:bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">10 GB</div>
                        <div className="text-[10px] mt-2 text-slate-500 dark:text-slate-400">Full Volume Copy</div>
                    </div>
                    <div className="text-slate-300 dark:text-slate-700 text-2xl">→</div>
                    <div className="text-center">
                        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wide">Tuesday</div>
                        <div className="w-16 h-16 bg-indigo-300 dark:bg-indigo-400/80 rounded-lg flex items-center justify-center text-indigo-900 dark:text-indigo-950 font-bold shadow-md">500 MB</div>
                        <div className="text-[10px] mt-3.5 text-slate-500 dark:text-slate-400">Only Changed Blocks</div>
                    </div>
                    <div className="text-slate-300 dark:text-slate-700 text-2xl">→</div>
                    <div className="text-center">
                        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wide">Wednesday</div>
                        <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-400/50 rounded-lg flex items-center justify-center text-indigo-800 dark:text-indigo-900 font-bold shadow-sm">200 MB</div>
                        <div className="text-[10px] mt-5 text-slate-500 dark:text-slate-400">Only Changed Blocks</div>
                    </div>
                </div>

                <TerminalOutput label="Snapshot CLI Patterns">
{`# 1. Create a snapshot
aws ec2 create-snapshot \\
  --volume-id vol-1234567890abcdef0 \\
  --description "daily-backup-$(date +%Y-%m-%d)"

# 2. Create a new volume (Restore/Clone)
aws ec2 create-volume \\
  --snapshot-id snap-1234567890abcdef0 \\
  --availability-zone ap-south-1a \\
  --volume-type gp3`}
                </TerminalOutput>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>🛠️ Hands-On — Attach & Format EBS</SectionTitle>
                <StepList steps={[
                    {
                        title: "Create and Attach",
                        description: (
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">First, create the EBS volume and attach it to your EC2 instance using the AWS CLI:</p>
                                <CodeBlock language="bash" code={`# 1. Create a 10GB General Purpose SSD (gp3) volume in the ap-south-1a availability zone\naws ec2 create-volume --availability-zone ap-south-1a --size 10 --volume-type gp3\n\n# 2. Attach the newly created volume to your EC2 instance assigning it the device name /dev/xvdf\naws ec2 attach-volume --volume-id vol-xxx --instance-id i-xxx --device /dev/xvdf`} />
                            </div>
                        )
                    },
                    {
                        title: "Format and Mount",
                        description: (
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">Once attached, format the raw block device with a filesystem and mount it to your operating system so it can be used:</p>
                                <CodeBlock language="bash" code={`# 1. List available block devices to verify your new volume is attached (usually /dev/xvdf or /dev/nvmeX)\nlsblk\n\n# 2. Format the volume with the ext4 filesystem (CAUTION: only run mkfs on new, empty volumes!)\nsudo mkfs -t ext4 /dev/xvdf\n\n# 3. Create a directory that will act as the mount point for your stored data\nsudo mkdir /data\n\n# 4. Block-mount the formatted volume to the directory you just created\nsudo mount /dev/xvdf /data\n\n# 5. Review disk space usage to verify the mount point was successful\ndf -h`} />
                            </div>
                        )
                    },
                    {
                        title: "Make it Persistent",
                        description: (
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">By default, standard Linux mounts are removed after a server reboot. You must configure <code>/etc/fstab</code> for it to mount automatically during startup:</p>
                                <CodeBlock language="bash" code={`# Append the mount instructions to the /etc/fstab configuration file.\n# The 'nofail' option ensures the boot process won't crash if the volume happens to be detached.\necho '/dev/xvdf /data ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab`} />
                            </div>
                        )
                    }
                ]} />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>✅ Mastering EC2 Storage</SectionTitle>
                <Accordion 
                    items={[
                        {
                            question: "1. Write-heavy database on gp2 is slow. What do you change?",
                            answer: "Migrate to io2. gp2 IOPS scale with size and cap at 16k. io2 provides consistent, provisioned IOPS up to 256k regardless of volume size, with 99.999% durability."
                        },
                        {
                            question: "2. EC2 was terminated accidentally and all data is gone. Why?",
                            answer: "The data was likely on the root volume with DeleteOnTermination: true enabled. Set this to false and detach sensitive data to its own EBS volumes."
                        },
                        {
                            question: "3. Fastest cost-effective scratch disk for a 2TB Spark job?",
                            answer: "Instance Store. It's NVMe local storage included in the instance cost. Perfect for temporary data that can be reprocessed if lost."
                        },
                        {
                            question: "4. How to clone a Production DB volume to Staging using snapshots?",
                            answer: "Take a snapshot of the Prod volume, wait for completion, then create a new volume from that snapshot in your Staging AZ and attach it to your Staging instance."
                        },
                        {
                            question: "5. gp3 vs gp2: Which is the default choice?",
                            answer: "gp3. It's cheaper (costs 20% less) and lets you provision IOPS/Throughput independently of volume size. gp2 is mostly legacy now."
                        }
                    ]}
                />

                <SummaryCard 
                    items={[
                        <span key="1">Use <Bold>EBS</Bold> for persistence and <Bold>Instance Store</Bold> for raw performance.</span>,
                        <span key="2">Always default to <Bold>gp3</Bold>—it's cheaper and more flexible than gp2.</span>,
                        <span key="3">Enable <Bold>EBS Multi-Attach</Bold> on io1/io2 if you need one drive on multiple instances.</span>,
                        <span key="4"><Bold>Snapshots</Bold> are incremental and stored in S3—use them for cross-AZ migration.</span>
                    ]}
                />
            </Section>
        </div>
    );
}
