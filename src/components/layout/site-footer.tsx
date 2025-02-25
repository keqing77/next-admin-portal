import { Icons } from "../shared/icons";
import { cn } from "@/lib/utils";
import Link from "@/components/link/link";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="border-t py-4">
        <div className="container mx-auto flex max-w-screen-2xl items-center justify-between px-4 sm:px-8 lg:px-24">
          <p className="text-left text-sm text-muted-foreground">
            Built By
            <Link
              href={"#"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {" NoOne"}
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={"#"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              <Icons.gitHub className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
