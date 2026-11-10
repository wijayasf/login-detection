import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import MonitoringView from "@/components/views/MonitoringView";
export default function MonitoringPage() { return <AuthenticatedPage permission="monitor.read"><MonitoringView /></AuthenticatedPage>; }
