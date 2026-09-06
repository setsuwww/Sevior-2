import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FormLinkProps {
    href: string;
    link: string;
}

export function FormLink({ href, link }: FormLinkProps) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
            <ArrowLeft className="h-4 w-4" />
            Back To {link}
        </Link>
    )
}
