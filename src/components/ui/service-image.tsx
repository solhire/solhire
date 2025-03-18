"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServiceImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "custom";
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

export function ServiceImage({
  src,
  alt,
  className,
  aspectRatio = "video",
  width,
  height,
  fill = true,
  priority = false,
}: ServiceImageProps) {
  const [isError, setIsError] = useState(false);

  const aspectRatioClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    custom: "",
  };

  return (
    <div 
      className={cn(
        "overflow-hidden bg-background-dark relative",
        aspectRatio !== "custom" && aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Gradient overlay for image only */}
      {src && !isError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      )}
      
      {!src || isError ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-purple-400 font-medium animate-pulse text-shadow-purple">
            Service image not available
          </p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={() => setIsError(true)}
          priority={priority}
        />
      )}
    </div>
  );
} 