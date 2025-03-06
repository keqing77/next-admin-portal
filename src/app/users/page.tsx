import { Users } from "./users";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Access Control</h1>
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is a demo page for showing UI layout. All user data are simulated
          and the functions have not been implemented yet.
        </AlertDescription>
      </Alert>

      <Users />
    </div>
  );
}
