"use client";

import { useAuthorContext } from "@/components/AuthorContext";
import AuthorCard from "./AuthorCard";
import Link from "next/link";

export default function HomePage() {
  const { authors, setAuthorSelection } = useAuthorContext();

  return (
    <div className="flex-1 bg-green-50 px-4 py-8 flex flex-col">
      <section className="mx-auto w-full max-w-screen-xl min-h-full p-4 md:p-6 bg-white-500">
        <h1 className="mb-3 text-center text-2xl font-bold text-black">
          Autores
        </h1>
        <Link
          href="/crearAutor"
          className="w-[25%] cursor-pointer py-3 rounded-lg font-bold text-white bg-green-500 transition duration-300 mb-4 mx-auto block text-center">
          Añadir un autor
        </Link>
        {authors.length === 0 ? (
          <p className="text-center text-sm text-black/60">
            No hay autores disponibles
          </p>
        ) : (
          <div className="mx-auto grid max-w-screen-lg max-h-screen-lg gap-3 sm:grid-cols-1 lg:grid-cols-5">
            {authors.map((a) => (
              <AuthorCard
                key={a.id}
                autor={a}
                href={`/detalleAutor`}
                onClick={() => setAuthorSelection(a.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
