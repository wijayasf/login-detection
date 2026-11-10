import { Suspense } from "react";
import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import CameraDetailView from "@/components/views/CameraDetailView";
export default function CameraPage() { return <AuthenticatedPage permission="camera.read"><Suspense fallback={<div className="boot-screen">Loading camera…</div>}><CameraDetailView /></Suspense></AuthenticatedPage>; }
