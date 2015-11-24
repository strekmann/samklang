import mongoose from "mongoose";
import shortid from "shortid";
import bcrypt from "bcrypt";

var User;

var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true, "default": shortid.generate},
    password: {type: String, required: true},
    email: {type: String, lowercase: true, required: true},
    email_verified: {type: Boolean, default: false},
});

UserSchema.pre("save", (next) => {
    var user = this;
    if (!user.isModified("password")) { return next(); }
    if (user.password.length < 4) {
        return next(new Error("Password must be at least 4 characters long"));
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.authenticate = (candidate, next) => {
    bcrypt.compare(candidate, this.password, (err, ok) => {
        next(err, ok);
    });
};

User = mongoose.model('User', UserSchema);

export {User};
