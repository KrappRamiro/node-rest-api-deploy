const zod = require("zod");

const movieSchema = zod.object({
    title: zod.string({
        invalid_type_error: "Movie title must be a string",
        required_error: "Movie title is required",
    }),
    year: zod.number().int().min(1900).max(2030),
    director: zod.string(),
    duration: zod.number().min(0),
    rate: zod.number().min(0).max(10).default(5),
    poster: zod.string().url({
        message: "Poster url must be a valid url",
    }),
    genre: zod
        .enum(
            [
                "Action",
                "Adventure",
                "Comedy",
                "Crime",
                "Drama",
                "Fantasy",
                "Horror",
                "Thriller",
                "Sci-Fi",
            ],
            {
                required_error: "Movie genre is required",
                invalid_type_error:
                    "Movie genre must be a list of the following valid genres: Action, Adventure, Comedy, Drama, Fantasy, Horror, Thriller, Sci-Fi",
            }
        )
        .array(),
});

function validateMovie(input) {
    return movieSchema.safeParse(input);
}

function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input); // .partial() makes all the properties optional
}

module.exports = {
    validateMovie,
    validatePartialMovie,
};
