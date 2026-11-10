import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import UserManagementView from "@/components/views/UserManagementView";
export default function UsersPage() { return <AuthenticatedPage permission="users.read"><UserManagementView /></AuthenticatedPage>; }
