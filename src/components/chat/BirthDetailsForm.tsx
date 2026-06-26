"use client";

import { useState } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { MapPin, Calendar, Clock, User } from "lucide-react";
import type { BirthDetailsForm } from "@/types";
import { BIRTH_DATE_EXAMPLE, BIRTH_FULL_EXAMPLE, BIRTH_PLACE_EXAMPLE, BIRTH_TIME_EXAMPLE } from "@/lib/ai/birth-examples";
import { APP_NAME } from "@/lib/brand";

export function BirthDetailsFormComponent({ onSubmit, isLoading }: { onSubmit: (d: BirthDetailsForm) => void; isLoading?: boolean }) {
  const [form, setForm] = useState<BirthDetailsForm>({ fullName: "", dateOfBirth: "", timeOfBirth: "", birthLocation: "" });
  const inputClass = "w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm";

  const fields = [
    { key: "fullName" as const, label: "Full Name", type: "text", icon: User, placeholder: "e.g. Priya Sharma", hint: null },
    { key: "dateOfBirth" as const, label: "Date of Birth", type: "date", icon: Calendar, placeholder: "", hint: `In chat you can type: ${BIRTH_DATE_EXAMPLE} or 12/06/2000` },
    { key: "timeOfBirth" as const, label: "Birth Time", type: "time", icon: Clock, placeholder: "", hint: `Approximate is fine — e.g. ${BIRTH_TIME_EXAMPLE}` },
    { key: "birthLocation" as const, label: "Birth Location", type: "text", icon: MapPin, placeholder: `e.g. ${BIRTH_PLACE_EXAMPLE}, India`, hint: null },
  ];

  return (
    <GlassCard glow className="p-6 max-w-md mx-auto">
      <h3 className="font-display text-lg text-white/70 mb-1">Your birth details</h3>
      <p className="text-xs text-white/25 mb-2">Example: {BIRTH_FULL_EXAMPLE}</p>
      <p className="text-[11px] text-white/20 mb-6">In chat you can paste the same format in one message — no form needed.</p>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
        {fields.map(({ key, label, type, icon: Icon, placeholder, hint }) => (
          <div key={key}>
            <label className="block text-xs text-white/30 mb-1.5 tracking-wider uppercase">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type={type} required={key !== "timeOfBirth"} value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className={inputClass} />
            </div>
            {hint && <p className="text-[10px] text-white/20 mt-1">{hint}</p>}
          </div>
        ))}
        <CosmicButton type="submit" className="w-full" disabled={isLoading || !form.fullName || !form.dateOfBirth}>
          {isLoading ? "Mapping Your Stars..." : `Reveal My ${APP_NAME}`}
        </CosmicButton>
      </form>
    </GlassCard>
  );
}
