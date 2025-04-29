"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ShieldX } from "lucide-react";

interface NoAccessProps {
  title?: string;
  description?: string;
  contactEmail?: string;
  showContactButton?: boolean;
}

export function NoAccess({
  title = "Access Denied",
  description = "You don't have permission to access this page. Please contact your administrator if you believe this is an error.",
  contactEmail = "support@example.com",
  showContactButton = true,
}: NoAccessProps) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-lg border-red-200 dark:border-red-900/30 shadow-lg">
        <CardContent className="pt-6 pb-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="rounded-full bg-red-50 dark:bg-red-900/20 p-4">
              <ShieldX
                className="h-12 w-12 text-red-500 dark:text-red-400"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-muted-foreground max-w-md">{description}</p>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-2">
              {showContactButton && (
                <Button
                  onClick={() =>
                    (window.location.href = `mailto:${contactEmail}?subject=Access Request&body=I need access to this page.`)
                  }
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Request Access
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              If you believe this is an error, please contact your system
              administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
