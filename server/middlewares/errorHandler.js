function errorHandler(err, req, res, next) {
    // console.log(err);
    if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({message: err.errors[0].message})
    } else if (err.name === "SequelizeValidationError") {
        let error = []
        err.errors.forEach(element => {
            error.push(element.message)
        });
        res.status(400).json({message: error})
    } else if (err.name === "invalidToken") {
        res.status(401).json({message: err.message})
    } else if (err.name === "notAuthorized") {
        res.status(401).json({message: err.message})
    } else if (err.name === "notFound") {
        res.status(404).json({message: err.message})
    } else if (err.name === "badRequest") {
        res.status(400).json({message: err.message})
    } else {
        res.status(500).json(err)
    }
}

module.exports = errorHandler