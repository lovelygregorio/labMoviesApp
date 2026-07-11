import React from "react";
import Grid from "@mui/material/Grid";
import Movie from "../movieCard";
import { BaseMovieListProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({
  movies,
  action,
}) => {
  const movieCards = movies.map((movie) => (
    <Grid
      key={movie.id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      <Movie
        movie={movie}
        action={action}
      />
    </Grid>
  ));

  return <>{movieCards}</>;
};

export default MovieList;