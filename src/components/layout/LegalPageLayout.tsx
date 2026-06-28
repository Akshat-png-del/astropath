import { PageShell } from "./PageShell";
import { TrustNotice } from "@/components/trust/TrustNotice";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { breadcrumbJsonLd } from "@/lib/structured-data";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { name: string; url: string }[];
  children: React.ReactNode;
}

export function LegalPageLayout({ title, subtitle, breadcrumb, children }: LegalPageLayoutProps) {
  const crumbs = breadcrumb ?? [
    { name: "Home", url: "/" },
    { name: title, url: "#" },
  ];

  const breadcrumbItems = crumbs.map((c) => ({
    label: c.name,
    href: c.url === "#" ? undefined : c.url,
  }));

  return (
    <>
      {breadcrumb && breadcrumb.length > 0 && (
        <JsonLdScript data={breadcrumbJsonLd(crumbs.filter((c) => c.url !== "#"))} />
      )}
      <PageShell
        width="sm"
        breadcrumbs={breadcrumbItems}
        title={title}
        subtitle={subtitle}
        stack={false}
      >
        <TrustNotice className="mb-10" compact />
        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-8 sm:space-y-10 text-sm text-silver-dim/80 leading-relaxed">
          {children}
        </div>
      </PageShell>
    </>
  );
}
