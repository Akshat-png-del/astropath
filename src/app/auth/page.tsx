"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  return (
    <PageTransition>
      <div className="flex flex-col min-h-dvh">
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 max-w-md mx-auto w-full">
          <Link
            href="/"
            className="flex items-center gap-2 text-silver-faint hover:text-silver-muted/90 text-sm mb-8 self-start max-w-md w-full"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <AuthForm />
          {loading && (
            <p className="text-[10px] text-silver-faint/90 mt-4 tracking-widest uppercase" role="status">
              Checking session…
            </p>
          )}
        </main>
        <SiteFooter compact />
      </div>
    </PageTransition>
  );
}
