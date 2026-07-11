import React, { useCallback, useState } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  myReviews: Record<number, Review>;
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  myReviews: {},
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const [myReviews, setMyReviews] = useState<
    Record<number, Review>
  >({});

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }

      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback(
    (movie: BaseMovieProps) => {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((movieId) => movieId !== movie.id)
      );
    },
    []
  );

  const addReview = useCallback(
    (movie: BaseMovieProps, review: Review) => {
      console.log("Adding review:", review);

      setMyReviews((prevReviews) => ({
        ...prevReviews,
        [movie.id]: review,
      }));
    },
    []
  );

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        myReviews,
        addToFavourites,
        removeFromFavourites,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;