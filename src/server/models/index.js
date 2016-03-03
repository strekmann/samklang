import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    is_active: { type: Boolean, default: true },
    is_admin: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
});

UserSchema.pre('save', function generatePassword(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    if (user.password.length < 8) {
        return next(new Error('Password must be at least 8 characters long'));
    }

    return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }

        return bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }

            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.authenticate = function authenticateUser(candidate, next) {
    bcrypt.compare(candidate, this.password, (err, ok) => {
        next(err, ok);
    });
};

UserSchema.set('toObject', {
    versionKey: false,
    transform: (document, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});

UserSchema.set('toJSON', {
    versionKey: false,
    transform: (document, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
    },
});

const SiteSchema = new mongoose.Schema({
    identifier: { // part of URL
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            // TODO: Change to allow for capital letters in identifier, but
            // disallow same identifier using other cased letters.
            validator: (v) => /[a-z0-9-]{5,}/.test(v),
            message: 'At least five characters: lowercased letters, numbers and hyphens allowed.',
        },
    },
    name: { type: String, required: true, unique: true },
    admins: [{ type: String, ref: 'User', index: true }],
});

SiteSchema.set('toJSON', {
    versionKey: false,
    transform: (document, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Site: mongoose.model('Site', SiteSchema),
};
