"use client";

import { useState, useEffect, use } from "react";
import { useAuthorContext } from "@/components/AuthorContext";
import Link from "next/link";

export default function Formulario() {
  const { updateAuthor, authorSelection } = useAuthorContext();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid =
      name.trim() !== "" &&
      birthDate.trim() !== "" &&
      description.trim() !== "" &&
      image.trim() !== "";
    setIsValid(valid);
  }, [name, birthDate, description, image]);

  useEffect(() => {
    setName(authorSelection!.name);
    setBirthDate(authorSelection!.birthDate);
    setDescription(authorSelection!.description);
    setImage(authorSelection!.image);
  }, [authorSelection]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateAuthor({
      id: authorSelection!.id,
      name: name,
      birthDate: birthDate,
      description: description,
      image: image,
      books: authorSelection!.books,
      prizes: authorSelection!.prizes,
    });
    alert("Autor editado con éxito");
  }

  return (
    <div className="flex items-center justify-center py-8 h-screen bg-green-50 px-4 py-8 flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="p-9 bg-white rounded-xl shadow-xl w-full max-w-sm border border-gray-200 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Editando un autor
        </h2>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-gray-700 font-medium mb-1">
            Nombre del autor
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa el nombre del autor"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthDate"
            className="block text-gray-700 font-medium mb-1">
            Fecha de nacimiento del autor
          </label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            placeholder="Ingresa la fecha de nacimiento del autor"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1">
            Descripción del autor
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Ingresa la descripción del autor"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imagen"
            className="block text-gray-700 font-medium mb-1">
            Imagen del autor
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Ingresa la URL de la imagen del autor"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 ${
              !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}>
            Guardar
          </button>
        </div>
      </form>
      <Link href={"/"} className="w-100">
        <button className="w-full cursor-pointer py-3 rounded-lg font-bold text-white bg-blue-500 transition duration-300">
          Volver a inicio
        </button>
      </Link>
    </div>
  );
}
