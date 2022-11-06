const Joke = require("./../models/joke.model")


module.exports.testApi = (req, res) => {
    res.json({Status: "ok"})
}

/* Get All */
module.exports.allJokes = (req, res) => {
    Joke.find()
    .then(jokes => res.json(jokes))
    .catch(err => res.json(err))
}

/* Get One */
module.exports.oneJoke = (req, res) => {
    const idFromParams = req.params.id
    Joke.findOne({_id: idFromParams})
        .then(oneJoke => res.json({ joke: oneJoke}))
        .catch(err => res.json(err));
    }

/* Create */
module.exports.createJoke = (req, res) => {
    const newJoke = req.body
    Joke.create(newJoke)
        .then(joke => res.json(joke))
        .catch(err => res.json(err))
}

/* Update */
module.exports.updateJoke = (req, res) => {
    const idFromParams = req.params.id;
    Joke.findOneAndUpdate(
        {_id: idFromParams},
        req.body,
        {new: true, runValidators: true }
    )
        .then(updatedJoke=> res.json({Joke: updatedJoke}))
        .catch(err => res.json({message: "Something went wrong ", error: err}))
}

/* Delete */
module.exports.deleteJoke = (req, res) => {
    Joke.deleteOne({_id: req.params.id})
        .then(result => res.json({result : result}))
        .catch(err => res.json({message: "Something went wrong", error: err}))
}

/*Random */
module.exports.randJoke = (req, res) => {
    Joke.count().exec(function (err, count){
        var random = Math.floor(Math.random() * count)

        Joke.findOne().skip(random)
            .then(result => res.json({randomJoke : result}))
            .catch(err => res.json({message: "Something went wrong", error: err}))
    })
}