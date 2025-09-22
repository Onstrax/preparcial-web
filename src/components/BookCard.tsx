"use client";
import { Book } from "./AuthorContext";
import Image from "next/image";

export interface BookCard {
  book: Book;
  className?: string;
}

export default function BookCard({
  book,
  className,
}: BookCard) {
  return (
    <div className={className}>
        <div className="block focus:outline-none h-90 focus-visible:ring-2 focus-visible:ring-black/60 rounded-xl">
          <div className="relative border-black-50 border-2 overflow-y-auto h-full w-full rounded-xl p-2 border border-black/15 bg-white shadow-[0_2px_0_rgba(0,0,0,0.25)] hover:shadow-[0_3px_0_rgba(0,0,0,0.28)]">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Image src={book.image} alt={book.name} width={ 50 } height={ 50 } className="w-25 h-35 object-fit rounded-xl mx-auto" />
                <h3 className="mb-2 font-extrabold tracking-tight text-sm leading-6 text-black text-center">
                  {book.name}
                </h3>
                <p className="text-[13px] leading-5 text-black text-center m-2">
                  <span className="font-semibold">isbn: {book.isbn}</span>
                </p>
                <p className="text-[13px] leading-5 text-black text-center m-2">
                  <span className="font-semibold">Fecha de publicación: {book.publishingDate}</span>
                </p>
                <p className="text-[13px] leading-5 text-black text-center m-2">
                  <span className="font-semibold">Editorial: {book.editorial.name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
