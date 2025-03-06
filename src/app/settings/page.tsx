import SettingsForm from "./settings-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">System Settings</h1>
        <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
                This is a demo page for showing UI layout. All user data are simulated
                and the functions have not been implemented yet.
            </AlertDescription>
        </Alert>
        <SettingsForm />
    </div>
  );
}
