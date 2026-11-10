import type { Metadata } from "next";
import "./globals.css";
import DesktopGate from "@/components/auth/DesktopGate";
import { PrototypeProvider } from "@/providers/PrototypeProvider";

export const metadata: Metadata = {
  title: "Detection Anomaly — RBAC Prototype",
  description: "Standalone interactive RBAC demonstration using local mock data only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <PrototypeProvider><DesktopGate>{children}</DesktopGate></PrototypeProvider>
      </body>
    </html>
  );
}
