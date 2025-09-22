"use client";
import Link from "next/link";
import { Author, useAuthorContext } from "./AuthorContext";
import Image from "next/image";

export interface AuthorCard {
  autor: Author;
  href: string;
  onClick: () => void;
  className?: string;
}

export default function AuthorCard({
  autor,
  href,
  onClick,
  className,
}: AuthorCard) {
  const { setAuthorSelection, removeAuthor, toogleFavourite, favoriteAuthors } =
    useAuthorContext();
  return (
    <div className={className}>
      <div className="block focus:outline-none h-100 focus-visible:ring-2 focus-visible:ring-black/60 rounded-xl">
        <div className="relative h-full overflow-y-auto rounded-xl p-4 border border-black/15 bg-white shadow-[0_2px_0_rgba(0,0,0,0.25)] hover:shadow-[0_3px_0_rgba(0,0,0,0.28)]">
          <button
            className={`w-10 h-10 border-1 border-black/15 cursor-pointer text-black px-4 py-2 rounded-xl mb-2 absolute top-0 right-0 z-10 bg ${
              favoriteAuthors.includes(autor)
                ? "bg-red-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-green-700 cursor-pointer"
            }`}
            onClick={() => toogleFavourite(autor)}>
            ❤
          </button>
          <Link href={href} onClick={onClick}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Image
                  src={autor.image}
                  alt={autor.name}
                  width={150}
                  height={50}
                  className="w-40 h-55 object-cover rounded-xl mx-auto"
                />
                <h3 className="font-extrabold tracking-tight text-[17px] leading-6 text-black text-center">
                  {autor.name}
                </h3>
                <p className="text-[13px] leading-5 text-black text-center">
                  <span className="font-semibold">{autor.birthDate}</span>
                </p>
                <Link href={`/detalleAutor`}>
                  <button
                    className="bg-yellow-500 border-1 border-black/15 cursor-pointer text-black px-4 py-2 rounded-xl w-full mb-2"
                    onClick={() => setAuthorSelection(autor.id)}>
                    Ver
                  </button>
                </Link>
                <Link href={`/editarAutor`}>
                  <button
                    className="bg-blue-500 border-1 border-black/15 cursor-pointer text-black px-4 py-2 rounded-xl w-full mb-2"
                    onClick={() => setAuthorSelection(autor.id)}>
                    Editar
                  </button>
                </Link>
                <Link href={"/"} onClick={() => removeAuthor(autor)}>
                  <button className="bg-red-500 border-1 border-black/15 cursor-pointer text-black px-4 py-2 rounded-xl w-full">
                    Eliminar
                  </button>
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
