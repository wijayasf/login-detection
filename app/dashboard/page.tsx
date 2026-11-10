import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import DashboardView from "@/components/views/DashboardView";
export default function DashboardPage() { return <AuthenticatedPage permission="reports.read"><DashboardView /></AuthenticatedPage>; }
