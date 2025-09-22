"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

export interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
  prizes: Prize[];
}

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: Editorial;
}

export interface Editorial {
  id: number;
  name: string;
}

export interface Prize {
  id: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
}

export interface Organization {
  id: number;
  name: string;
  tipo: string;
}

interface AuthorContextType {
  nextAuthorId: number;
  setNextAuthorId: (id: number) => void;

  authors: Author[];
  setAuthors: (authors: Author[]) => void;

  favoriteAuthors: Author[];
  setFavoriteAuthors: (authors: Author[]) => void;
  toogleFavourite: (author: Author) => void;

  authorSelection: Author | null;
  setAuthorSelection: (selectionId: number | null) => void;
  clearAuthorSelection: () => void;

  addAuthor: (author: Author) => void;
  removeAuthor: (author: Author) => void;
  updateAuthor: (author: Author) => void;

  nextBookId: number;
  setNextBookId: (id: number) => void;

  addBookToAuthor: (author: Author, book: Book) => void;
  removeBookFromAuthor: (author: Author, book: Book) => void;
  updateBookForAuthor: (author: Author, book: Book) => void;

  nextPrizeId: number;
  setNextPrizeId: (id: number) => void;

  addPrizeToAuthor: (author: Author, prize: Prize) => void;
  removePrizeFromAuthor: (author: Author, prize: Prize) => void;
  updatePrizeForAuthor: (author: Author, prize: Prize) => void;

  nextEditorialId: number;
  setNextEditorialId: (id: number) => void;

  nextOrganizationId: number;
  setNextOrganizationId: (id: number) => void;
}
const AuthorContext = createContext<AuthorContextType | null>(null);

export const useAuthorContext = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error("useAuthorContext must be used within a AuthorProvider");
  }
  return context;
};

export function AuthorProvider({ children }: { children: React.ReactNode }) {
  // Author list
  const [authors, setAuthors] = useState<Author[]>([]);
  const [favoriteAuthors, setFavoriteAuthors] = useState<Author[]>([]);

  // States
  const [nextAuthorId, setNextAuthorId] = useState(-1);
  const [nextBookId, setNextBookId] = useState(-1);
  const [nextPrizeId, setNextPrizeId] = useState(-1);
  const [nextEditorialId, setNextEditorialId] = useState(-1);
  const [nextOrganizationId, setNextOrganizationId] = useState(-1);

  // Fetching data
  function useAuthorsFetch(url: string) {
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAuthors(data))
        .catch((err) => console.error("Error fetching authors:", err));
    }, [url]);
  }
  useAuthorsFetch("http://127.0.0.1:8080/api/authors");

  // Getting the latest id for each entity based on the highest id in the list
  const fetched = useRef(false);
  useEffect(() => {
    if (authors.length > 0 && !fetched.current) {
      const maxAuthorId = Math.max(0, ...authors.map((a) => a.id));
      setNextAuthorId(maxAuthorId + 1);

      const allBooks = authors.flatMap((a) => a.books);
      if (allBooks.length > 0) {
        const maxBookId = Math.max(0, ...allBooks.map((b) => b.id));
        setNextBookId(maxBookId + 1);
      }

      const allPrizes = authors.flatMap((a) => a.prizes);
      if (allPrizes.length > 0) {
        const maxPrizeId = Math.max(0, ...allPrizes.map((p) => p.id));
        setNextPrizeId(maxPrizeId + 1);
      }

      const allEditorials = allBooks.map((b) => b.editorial);
      if (allEditorials.length > 0) {
        const maxEditorialId = Math.max(0, ...allEditorials.map((e) => e.id));
        setNextEditorialId(maxEditorialId + 1);
      }

      const allOrganizations = allPrizes.map((p) => p.organization);
      if (allOrganizations.length > 0) {
        const maxOrganizationId = Math.max(
          0,
          ...allOrganizations.map((o) => o.id)
        );
        setNextOrganizationId(maxOrganizationId + 1);
      }

      fetched.current = true;
    }
  }, [authors]);

  // Author selection
  const [authorSelection, setAuthorSelectionState] = useState<Author | null>(
    null
  );
  const setAuthorSelection = (id: number | null) => {
    if (id === null) {
      setAuthorSelectionState(null);
    } else {
      const found = authors.find((author) => author.id === id) || null;
      setAuthorSelectionState(found);
    }
  };
  const clearAuthorSelection = () => {
    setAuthorSelectionState(null);
  };

  const toogleFavourite = (author: Author) => {
    const newFavoriteAuthors = favoriteAuthors.includes(author)
      ? favoriteAuthors.filter((a) => a.id !== author.id)
      : [...favoriteAuthors, author];
    setFavoriteAuthors(newFavoriteAuthors);
  };

  // Helper functions to add/remove/update entities
  const addAuthor = (author: Author) => {
    setAuthors((prevAuthors) => [...prevAuthors, author]);
    setNextAuthorId((prevId) => prevId + 1);
  };

  const removeAuthor = (author: Author) => {
    setAuthors((prevAuthors) =>
      prevAuthors.filter((prevAuthor) => prevAuthor.id !== author.id)
    );
    setFavoriteAuthors((prevAuthors) =>
      prevAuthors.filter((prevAuthor) => prevAuthor.id !== author.id)
    );
    clearAuthorSelection();
  };

  const updateAuthor = (author: Author) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id ? author : prevAuthor
      )
    );
    setAuthorSelection(author.id);
  };

  const addBookToAuthor = (author: Author, book: Book) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id
          ? { ...prevAuthor, books: [...prevAuthor.books, book] }
          : prevAuthor
      )
    );
    setNextBookId((prevId) => prevId + 1);
  };

  const removeBookFromAuthor = (author: Author, book: Book) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id
          ? {
              ...prevAuthor,
              books: prevAuthor.books.filter(
                (prevBook) => prevBook.id !== book.id
              ),
            }
          : prevAuthor
      )
    );
  };

  const updateBookForAuthor = (author: Author, book: Book) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id
          ? {
              ...prevAuthor,
              books: prevAuthor.books.map((prevBook) =>
                prevBook.id === book.id ? book : prevBook
              ),
            }
          : prevAuthor
      )
    );
  };

  const addPrizeToAuthor = (author: Author, prize: Prize) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id
          ? { ...prevAuthor, prizes: [...prevAuthor.prizes, prize] }
          : prevAuthor
      )
    );
    setNextPrizeId((prevId) => prevId + 1);
  };

  const removePrizeFromAuthor = (author: Author, prize: Prize) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id
          ? {
              ...prevAuthor,
              prizes: prevAuthor.prizes.filter(
                (prevPrize) => prevPrize.id !== prize.id
              ),
            }
          : prevAuthor
      )
    );
  };

  const updatePrizeForAuthor = (author: Author, prize: Prize) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((prevAuthor) =>
        prevAuthor.id === author.id
          ? {
              ...prevAuthor,
              prizes: prevAuthor.prizes.map((prevPrize) =>
                prevPrize.id === prize.id ? prize : prevPrize
              ),
            }
          : prevAuthor
      )
    );
  };

  return (
    <AuthorContext.Provider
      value={{
        nextAuthorId,
        setNextAuthorId,

        authors,
        setAuthors,
        authorSelection,
        setAuthorSelection,
        clearAuthorSelection,

        addAuthor,
        removeAuthor,
        updateAuthor,

        favoriteAuthors,
        setFavoriteAuthors,
        toogleFavourite,

        nextBookId,
        setNextBookId,

        addBookToAuthor,
        removeBookFromAuthor,
        updateBookForAuthor,

        nextPrizeId,
        setNextPrizeId,

        addPrizeToAuthor,
        removePrizeFromAuthor,
        updatePrizeForAuthor,

        nextEditorialId,
        setNextEditorialId,

        nextOrganizationId,
        setNextOrganizationId,
      }}>
      {children}
    </AuthorContext.Provider>
  );
}
