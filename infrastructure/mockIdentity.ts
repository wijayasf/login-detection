import { Role } from "@/domain/rbac";

export type LoginMethod = "MICROSOFT_ENTRA" | "GOOGLE" | "HYBRID" | "EMAIL_PASSWORD";
export type AccountStatus = "ACTIVE" | "INACTIVE";

export type DemoAccount = {
  id: string;
  displayName: string;
  email: string;
  role: Role;
  status: AccountStatus;
  method: LoginMethod;
  methodLabel: string;
};

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  { id: "usr-sa", displayName: "Alya Pradana", email: "alya.admin@example.test", role: "SUPER_ADMIN", status: "ACTIVE", method: "MICROSOFT_ENTRA", methodLabel: "Microsoft Entra ID — simulated" },
  { id: "usr-m", displayName: "Bima Santoso", email: "bima.maintainer@example.test", role: "MAINTAINER", status: "ACTIVE", method: "GOOGLE", methodLabel: "Google — simulated" },
  { id: "usr-o", displayName: "Citra Lestari", email: "citra.operator@example.test", role: "OPERATOR", status: "ACTIVE", method: "EMAIL_PASSWORD", methodLabel: "Email/Password — fictitious" },
  { id: "usr-s", displayName: "Damar Wicaksono", email: "damar.supervisor@example.test", role: "SUPERVISOR", status: "ACTIVE", method: "HYBRID", methodLabel: "Microsoft + Google — simulated" },
  { id: "usr-inactive", displayName: "Eka Inactive", email: "eka.inactive@example.test", role: "OPERATOR", status: "INACTIVE", method: "EMAIL_PASSWORD", methodLabel: "Email/Password — inactive demo" },
] as const;

export function accountById(id: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((account) => account.id === id);
}
