"use client";

import { useAuthorContext } from "@/components/AuthorContext";
import Image from "next/image";
import BookCard from "@/components/BookCard";
import PrizeCard from "@/components/PrizeCard";
import Link from "next/link";

export default function DetalleAutorPage() {
  const { authorSelection } = useAuthorContext();

  if (!authorSelection) {
    return <p>No se ha seleccionado ningún autor</p>;
  }

  return (
    <div className="p-4 bg-green-50 w-full min-h-screen h-full flex flex-col items-center">
      <div className="p-4 w-200">
        <Image
          src={authorSelection.image}
          alt={authorSelection.name}
          width={150}
          height={450}
          className="w-40 h-55 object-cover rounded-xl mx-auto"
          aria-label={`Imagen del autor ${authorSelection.name}`}
        />
        <h1
          className="text-2xl font-bold text-black text-center"
          aria-label="Nombre del autor">
          {authorSelection.name}
        </h1>
        <h3
          className="text-l font-bold text-black text-center mb-4"
          aria-label="Fecha de nacimiento del autor">
          Fecha de nacimiento: {authorSelection.birthDate}
        </h3>
        <p
          className="text-sm text-black text-left items-between center-center mb-2"
          aria-label="Descripción del autor">
          {authorSelection.description}
        </p>
        <h3 className="text-sm font-bold text-black text-left items-between center-center mb-2">
          Libros publicados: {authorSelection.books.length}
        </h3>
        {authorSelection.books.length === 0 ? (
          <p className="text-center text-sm text-black/60">
            No hay libros disponibles
          </p>
        ) : (
          <div
            className="mx-auto grid max-w-screen-lg max-h-screen-lg gap-3 sm:grid-cols-1 lg:grid-cols-4 overflow-y-auto"
            aria-label="Lista de libros publicados"
            role="list">
            {authorSelection.books.map((b) => (
              <BookCard key={b.id} book={b} className="" />
            ))}
          </div>
        )}
        <h3 className="text-sm font-bold text-black text-left items-between center-center mt-4">
          Premios recibidos: {authorSelection.prizes.length}
        </h3>
        {authorSelection.prizes.length === 0 ? (
          <p className="text-center text-sm text-black/60">
            No hay premios disponibles
          </p>
        ) : (
          <div
            className="mx-auto grid max-w-screen-lg max-h-screen-lg gap-3 sm:grid-cols-1 lg:grid-cols-4 overflow-y-auto"
            aria-label="Lista de premios recibidos"
            role="list">
            {authorSelection.prizes.map((p) => (
              <PrizeCard key={p.id} prize={p} className="" />
            ))}
          </div>
        )}
      </div>
      <Link href={"/"} className="w-100" aria-labelledby="home">
        <button
          id="home"
          className="w-full cursor-pointer py-3 rounded-lg font-bold text-white bg-blue-500 transition duration-300"
          aria-labelledby="home">
          Volver a inicio
        </button>
      </Link>
    </div>
  );
}
