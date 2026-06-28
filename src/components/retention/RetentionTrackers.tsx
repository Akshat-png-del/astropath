"use client";

import { useEffect, useRef } from "react";
import { useRetention } from "@/hooks/useRetention";

interface GuideReadTrackerProps {
  slug: string;
  topics?: string[];
}

export function GuideReadTracker({ slug, topics }: GuideReadTrackerProps) {
  const { recordGuide } = useRetention();
  const recordedSlug = useRef<string | null>(null);
  const topicsRef = useRef(topics);

  topicsRef.current = topics;

  useEffect(() => {
    if (recordedSlug.current === slug) return;
    recordedSlug.current = slug;
    recordGuide(slug, topicsRef.current ?? []);
  }, [slug, recordGuide]);

  return null;
}

interface ZodiacVisitTrackerProps {
  slug: string;
}

export function ZodiacVisitTracker({ slug }: ZodiacVisitTrackerProps) {
  const { recordZodiacVisit } = useRetention();
  const recordedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (recordedSlug.current === slug) return;
    recordedSlug.current = slug;
    recordZodiacVisit(slug);
  }, [slug, recordZodiacVisit]);

  return null;
}
