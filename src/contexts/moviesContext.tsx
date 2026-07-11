import React, { useCallback, useState } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  mustWatch: number[];
  myReviews: Record<number, Review>;

  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addToMustWatch: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  mustWatch: [],
  myReviews: {},

  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  addReview: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((previousFavourites) => {
      if (previousFavourites.includes(movie.id)) {
        return previousFavourites;
      }

      return [...previousFavourites, movie.id];
    });
  }, []);

  const removeFromFavourites = useCallback(
    (movie: BaseMovieProps) => {
      setFavourites((previousFavourites) =>
        previousFavourites.filter(
          (movieId) => movieId !== movie.id
        )
      );
    },
    []
  );

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((previousMustWatch) => {
      if (previousMustWatch.includes(movie.id)) {
        return previousMustWatch;
      }

      const updatedMustWatch = [
        ...previousMustWatch,
        movie.id,
      ];

      console.log("Must watch movie IDs:", updatedMustWatch);

      return updatedMustWatch;
    });
  }, []);

  const addReview = useCallback(
    (movie: BaseMovieProps, review: Review) => {
      setMyReviews((previousReviews) => ({
        ...previousReviews,
        [movie.id]: review,
      }));
    },
    []
  );

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        mustWatch,
        myReviews,
        addToFavourites,
        removeFromFavourites,
        addToMustWatch,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;