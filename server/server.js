const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

// API security middleware
app.use(cors());

// JSON parser middleware
app.use(express.json());

// Get all movies
app.get("/api/v1/movies", async (req, res) => {
    const movieStats = await db.query("select * from movies left join (select movie_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id;");
    res.status(200).json({
        status: "success",
        results: movieStats.rows.length,
        data: {
            movie: movieStats.rows,
        },
    });
});

// Get a single movie
app.get("/api/v1/movies/:id", async (req, res) => {
    const movie = await db.query("select * from movies left join (select movie_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id where id = $1",
        [req.params.id]);

    const reviews = await db.query("select * from reviews where movie_id = $1", [req.params.id]);

    res.status(200).json({
        status: "success",
        data: {
            movie: movie.rows[0],
            reviews: reviews.rows
        },
    });
});

// Add a movie to the list
app.post("/api/v1/movies", async (req, res) => {
    const results = await db.query(
        "insert into movies (name, genre, shaun_rating) values ($1, $2, $3) returning *",
        [req.body.name, req.body.genre, req.body.shaun_rating]);
    res.status(201).json({
        status: "success",
        data: {
            movie: results.rows[0],
        }
    })
});

// Update movie details in the list
app.put("/api/v1/movies/:id", async (req, res) => {
    const results = await db.query(
        "update movies set name = $1, genre = $2, shaun_rating = $3 where id = $4 returning *",
        [req.body.name, req.body.genre, req.body.shaun_rating, req.params.id]);
    res.status(200).json({
        status: "success",
        data: {
            movie: results.rows[0],
        },
    });
});

// Remove an entry
app.delete("/api/v1/movies/:id", async (req, res) => {
    const result = await db.query("delete from movies where id = $1", [req.params.id]);
    res.status(204).json({
        status: "success",
    });
});

// Add a review to a movie entry
app.post("/api/v1/movies/:id/addReview", async (req, res) => {
    const addComment = await db.query("insert into reviews (movie_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]);
    res.status(201).json({
        status: 'success',
        data: {
            review: addComment.rows[0]
        }
    });
});

// Port listener
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is up on port: " + port);
});