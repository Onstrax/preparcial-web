"use client";
import { Prize } from "./AuthorContext";

export interface PrizeCard {
  prize: Prize;
  className?: string;
}

export default function PrizeCard({
  prize,
  className,
}: PrizeCard) {
  return (
    <div className={className}>
        <div className="block focus:outline-none h-35 focus-visible:ring-2 focus-visible:ring-black/60 rounded-xl">
          <div className="relative border-black-50 border-2 foverlow-y-auto h-full w-full rounded-xl p-2 border border-black/15 bg-white shadow-[0_2px_0_rgba(0,0,0,0.25)] hover:shadow-[0_3px_0_rgba(0,0,0,0.28)]">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="mb-2 font-extrabold tracking-tight text-xl leading-6 text-black text-center">
                  {prize.name}
                </h3>
                <p className="text-[13px] leading-5 text-black text-center m-2">
                  <span className="font-semibold">Fecha de premiación: {prize.premiationDate}</span>
                </p>
                <p className="text-[13px] leading-5 text-black text-center m-2">
                  <span className="font-semibold">Organización: {prize.organization.name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
