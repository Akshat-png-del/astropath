"use client";

import Image from "next/image";
import { getZodiacImage } from "@/lib/astrology/zodiac-images";
import { cn } from "@/lib/utils";

interface ZodiacSignImageProps {
  sign: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function ZodiacSignImage({ sign, size = 28, className, priority }: ZodiacSignImageProps) {
  return (
    <Image
      src={getZodiacImage(sign)}
      alt={`${sign} zodiac sign`}
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]", className)}
    />
  );
}
