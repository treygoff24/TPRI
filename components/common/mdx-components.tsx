import Link from "next/link";
import { PropsWithChildren } from "react";

export function Citation({ id }: { id: string }) {
  return (
    <sup className="text-xs text-text-muted" data-citation={id}>
      <Link href={`#${id}`}>[{id}]</Link>
    </sup>
  );
}

export function Callout({ children }: PropsWithChildren) {
  return (
    <div className="border-l-4 border-primary bg-primary-light/60 p-4 text-sm text-text-secondary">
      {children}
    </div>
  );
}

export const mdxComponents = {
  Citation,
  Callout,
};
