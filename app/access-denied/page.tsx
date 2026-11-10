import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import AccessDenied from "@/components/views/AccessDenied";

export default function AccessDeniedPage() {
  return <AuthenticatedPage permission="monitor.read"><AccessDenied /></AuthenticatedPage>;
}
