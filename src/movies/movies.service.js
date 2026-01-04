const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}


async function listTheatersForMovie(movie_id) {
  return db("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movie_id, "mt.is_showing": true });
}

async function listReviewsForMovie(movie_id) {
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id":movie_id })
    .then((reviews) => {
      return reviews.map((review) => {
        return {
          review_id: review.review_id,
          content: review.content,
          score: review.score,
          created_at: review.created_at,
          updated_at: review.updated_at,
          critic_id: review.critic_id,
          movie_id: review.movie_id,
          critic: {
            critic_id: review.critic_id,
            preferred_name: review.preferred_name,
            surname: review.surname,
            organization_name: review.organization_name,
            created_at: review.created_at,
            updated_at: review.updated_at,
          },
          };
        });
    });
}

async function read(movie_id) {
  return db("movies").select("*").where({ movie_id }).first();  
}

module.exports = {
  list,
  read,
  listTheatersForMovie,
  listReviewsForMovie,
};
