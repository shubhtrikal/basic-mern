const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePost(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.author = !isEmpty(data.author) ? data.author : "";

    if(Validator.isEmpty(data.title)) {
        errors.title = "Title field is required"
    }

    if(Validator.isEmpty(data.description)) {
        errors.description = "Description field is required"
    }

    if(Validator.isEmpty(data.author)) {
        errors.author = "Author field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}