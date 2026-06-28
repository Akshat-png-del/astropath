"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { TAROT_EDUCATION } from "@/lib/tarot/spread-catalog";
import { BTN_CHIP } from "@/lib/ui/button-classes";

export function TarotEducationTips() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-silver/10 bg-silver/5 p-4 sm:p-5">
      <p className="text-[10px] tracking-[0.25em] uppercase text-silver-faint mb-3 text-center">
        New to tarot?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {TAROT_EDUCATION.map((item) => (
          <div key={item.id} className="relative">
            <button
              type="button"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className={BTN_CHIP}
              aria-expanded={openId === item.id}
            >
              <HelpCircle className="w-3 h-3 shrink-0" />
              {item.question}
            </button>
            {openId === item.id && (
              <div className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 w-64 sm:w-72 rounded-xl border border-silver/20 bg-[#0a0a0a]/95 backdrop-blur-xl p-3 text-left shadow-xl">
                <p className="text-xs text-silver-dim/85 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
