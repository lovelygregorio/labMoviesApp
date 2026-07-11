import React, {
  useContext,
  useState,
  ChangeEvent,
} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { MoviesContext } from "../../contexts/moviesContext";
import {
  BaseMovieProps,
  Review,
} from "../../types/interfaces";
import styles from "./styles";
import ratings from "./ratingCategories";

const ReviewForm: React.FC<BaseMovieProps> = (movie) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Review>({
    defaultValues: {
      author: "",
      content: "",
      agree: false,
      rating: 3,
      movieId: movie.id,
    },
  });

  const navigate = useNavigate();
  const { addReview } = useContext(MoviesContext);

  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);

  const handleRatingChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setRating(Number(event.target.value));
  };

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  const onSubmit: SubmitHandler<Review> = (review) => {
    const submittedReview: Review = {
      ...review,
      movieId: movie.id,
      rating,
    };

    addReview(movie, submittedReview);
    setOpen(true);
  };

  const handleReset = () => {
    reset({
      author: "",
      content: "",
      agree: false,
      rating: 3,
      movieId: movie.id,
    });

    setRating(3);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </Alert>
      </Snackbar>

      <form
        style={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="author"
          control={control}
          rules={{
            required: "Name is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              id="author"
              label="Author's name"
              error={Boolean(errors.author)}
              helperText={errors.author?.message}
              autoFocus
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: {
              value: 10,
              message: "Review is too short",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Review text"
              id="review"
              multiline
              minRows={10}
              error={Boolean(errors.content)}
              helperText={errors.content?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="select-rating"
              select
              variant="outlined"
              label="Rating Select"
              value={rating}
              onChange={(event) => {
                field.onChange(Number(event.target.value));
                handleRatingChange(event);
              }}
              helperText="Don't forget your rating"
            >
              {ratings.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>

          <Button
            type="button"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;