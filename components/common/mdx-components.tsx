import Link from "next/link";
import { PropsWithChildren } from "react";

export function Citation({ id }: { id: string }) {
  return (
    <sup className="text-xs text-muted-foreground" data-citation={id}>
      <Link href={`#${id}`}>[{id}]</Link>
    </sup>
  );
}

export function Callout({ children }: PropsWithChildren) {
  return <div className="border-l-4 border-primary bg-muted/40 p-4 text-sm">{children}</div>;
}

export const mdxComponents = {
  Citation,
  Callout,
};
