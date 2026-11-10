import { Permission, Role, accessState } from "@/domain/rbac";

export type SettingsSection = "objects" | "display" | "tuning" | "advanced";

export const SETTINGS_SECTION_PERMISSION: Record<SettingsSection, Permission> = {
  objects: "detect.objects.update",
  display: "display.settings.update",
  tuning: "detection.tuning.update",
  advanced: "advanced.settings.update",
};

export function settingsAccess(role: Role, section: SettingsSection) {
  return accessState(role, SETTINGS_SECTION_PERMISSION[section]);
}
