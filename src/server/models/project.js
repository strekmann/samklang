import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new mongoose.Schema({
    identifier: {
        type: String,
        trim: true,
        required: true,
        validate: {
            // TODO: Change to allow for capital letters in identifier, but
            // disallow same identifier using other cased letters.
            validator: (v) => /[a-z0-9-]{5,}/.test(v),
            message: 'At least five characters: lowercased letters, numbers and hyphens allowed.',
        },
    },
    name: { type: String, trim: true, required: true },
    // TODO: Link to post or project public/private project
    // description. Maybe only public text, as posts can work for
    // updates.
    // TODO: year? from old
    // TODO: music
    // TODO: conductors
    // TODO: managers/project admins
    // TODO: other contributors/roles?
    // TODO: poster image, ref File
    start: { type: Date }, // will show up publicly after start
    end: { type: Date, required: true },
    site: { type: ObjectId, ref: 'Site', required: true },
    creator: { type: ObjectId, ref: 'User', required: true },
    created: { type: Date, default: Date.now },
});

ProjectSchema.set('toJSON', {
    versionKey: false,
    transform: (document, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});

export default mongoose.model('Project', ProjectSchema);
