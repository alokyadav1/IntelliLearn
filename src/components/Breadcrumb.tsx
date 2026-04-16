import Link from "next/link";

export interface BreadcrumbItem {
    name: string;
    href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="flex mb-8 items-center" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
                <li>
                    <div>
                        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">Home</span>
                            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </Link>
                    </div>
                </li>
                {items.map((item, index) => (
                    <li key={item.name} className="flex items-center">
                        <svg className="h-4 w-4 shrink-0 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="ml-2 py-1 text-sm font-medium tracking-tight text-muted-foreground hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <span className="ml-2 py-1 text-sm font-bold tracking-tight text-foreground" aria-current="page">
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
