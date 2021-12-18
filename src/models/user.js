const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        name: String
    }
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
})

module.exports = mongoose.model('User', userSchema);
