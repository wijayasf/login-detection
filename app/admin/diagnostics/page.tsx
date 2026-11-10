import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import DiagnosticsView from "@/components/views/DiagnosticsView";
export default function DiagnosticsPage() { return <AuthenticatedPage permission="diagnostics.read"><DiagnosticsView /></AuthenticatedPage>; }
