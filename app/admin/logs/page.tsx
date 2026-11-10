import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import ProcessLogsView from "@/components/views/ProcessLogsView";
export default function LogsPage() { return <AuthenticatedPage permission="process.logs.read"><ProcessLogsView /></AuthenticatedPage>; }
