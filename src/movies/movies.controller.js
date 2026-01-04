const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const { movieId } = request.params;
  const foundMovie = await service.read(movieId);
  if (foundMovie) {
    response.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: `Movie not found: ${movieId}`,
  });
}

async function read(request, response) {
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  const { is_showing } = request.query;
  const data = await service.list(is_showing);
  response.json({ data });
}

async function movieTheaters(request, response) {
  const { movie_id } = response.locals.movie;
  const data = await service.listTheatersForMovie(movie_id);
  response.json({ data }); 
} 

async function movieReviews(request, response) {
  const {movie_id } = response.locals.movie;
  const data = await service.listReviewsForMovie(movie_id);
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieTheaters)],
  movieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieReviews)],
};
