import mongoose from "mongoose";
import shortid from "shortid";
import bcrypt from "bcrypt";

var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true, "default": shortid.generate},
    password: {type: String, required: true},
    email: {type: String, lowercase: true, required: true}
});

UserSchema.pre("save", function(next){
    var user = this;
    if (!user.isModified("password")){ return next(); }
    if (user.password.length < 4){ return next(new Error("Password must be at least 4 characters long")); }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err){ return next(err); }

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err){ return next(err); }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.authenticate = function(candidate, next){
    bcrypt.compare(candidate, this.password, function(err, ok){
        next(err, ok);
    });
};

export const User = mongoose.model('User', UserSchema);
