export type CameraState = "running" | "stopped" | "failed";

export type MockCamera = {
  id: string;
  name: string;
  location: string;
  mode: "CCTV" | "DEMO";
  enabled: boolean;
  state: CameraState;
  alerts: number;
  lastSeen: string;
};

export const INITIAL_CAMERAS: MockCamera[] = [
  { id: "CCTV-GATE-01", name: "Gate Utama", location: "Pintu masuk utara", mode: "CCTV", enabled: true, state: "running", alerts: 2, lastSeen: "3 detik lalu" },
  { id: "CCTV-YARD-02", name: "Loading Yard", location: "Area bongkar muat", mode: "CCTV", enabled: true, state: "running", alerts: 0, lastSeen: "5 detik lalu" },
  { id: "CCTV-PARK-03", name: "Parkir Timur", location: "Jalur kendaraan", mode: "CCTV", enabled: false, state: "stopped", alerts: 1, lastSeen: "12 menit lalu" },
  { id: "DEMO-CROWD-01", name: "Crowd Crossing Demo", location: "Local mock video", mode: "DEMO", enabled: true, state: "stopped", alerts: 3, lastSeen: "Stored demo" },
];

export const DETECTIONS = [
  { id: "EV-2401", time: "14:32:18", camera: "Gate Utama", type: "Crowd gathering", severity: "High", duration: "18s" },
  { id: "EV-2402", time: "14:18:06", camera: "Loading Yard", type: "Restricted zone", severity: "Medium", duration: "7s" },
  { id: "EV-2403", time: "13:55:41", camera: "Parkir Timur", type: "Vehicle stopped", severity: "Low", duration: "32s" },
  { id: "EV-2404", time: "13:42:11", camera: "Gate Utama", type: "Crowd running", severity: "High", duration: "11s" },
];

export const PROCESS_LOGS = [
  { time: "14:35:02", source: "analysis/CCTV-GATE-01", level: "INFO", message: "Frame processing cadence stable at simulated 8 FPS." },
  { time: "14:34:48", source: "policy", level: "INFO", message: "Prototype policy evaluation completed for mock action." },
  { time: "14:31:20", source: "analysis/CCTV-YARD-02", level: "WARN", message: "Mock frame delay exceeded local demonstration threshold." },
  { time: "14:29:10", source: "session", level: "INFO", message: "No real provider or backend session is connected." },
];

export const INITIAL_USERS = [
  { id: "usr-sa", name: "Alya Pradana", email: "alya.admin@example.test", role: "SUPER_ADMIN" as const, active: true, method: "Entra" },
  { id: "usr-m", name: "Bima Santoso", email: "bima.maintainer@example.test", role: "MAINTAINER" as const, active: true, method: "Google" },
  { id: "usr-o", name: "Citra Lestari", email: "citra.operator@example.test", role: "OPERATOR" as const, active: true, method: "Password demo" },
  { id: "usr-s", name: "Damar Wicaksono", email: "damar.supervisor@example.test", role: "SUPERVISOR" as const, active: true, method: "Hybrid" },
];
