import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import SettingsView from "@/components/views/SettingsView";
export default function SettingsPage() { return <AuthenticatedPage permission="display.settings.update"><SettingsView /></AuthenticatedPage>; }
