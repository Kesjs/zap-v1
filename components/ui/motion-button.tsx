"use client";

import { FC } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface MotionButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  classes?: string;
  variant?: "primary" | "secondary";
}

export const MotionButton: FC<MotionButtonProps> = ({
  label,
  href,
  onClick,
  classes,
}) => {
  const content = (
    <div
      className={cn(
        "group relative inline-flex items-center justify-start h-14 w-64 cursor-pointer rounded-full p-1 outline-none",
        "border border-white/20 bg-black/80 backdrop-blur-md transition-all duration-300 hover:border-white/40",
        "shadow-[0_4px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]",
        classes
      )}
      onClick={onClick}
    >
      {/* Cercle blanc qui s'expand sur toute la largeur au hover */}
      <span
        className="circle bg-white m-0 block h-12 w-12 overflow-hidden rounded-full duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      {/* Icône flèche noire glissant vers la droite */}
      <div className="icon absolute top-1/2 left-4 -translate-y-1/2 duration-500 ease-out group-hover:translate-x-1.5 z-10">
        <ArrowRight className="text-black size-5 stroke-[2.5]" />
      </div>

      {/* Libellé texte blanc qui devient noir quand le cercle blanc le recouvre */}
      <span className="button-text text-white group-hover:text-black font-medium absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 text-center text-[15px] tracking-tight whitespace-nowrap duration-500 ease-out z-10 select-none">
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block no-underline">
        {content}
      </Link>
    );
  }

  return content;
};

export default MotionButton;
