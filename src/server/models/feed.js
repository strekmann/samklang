import mongoose from 'mongoose';

const ActionSchema = new mongoose.Schema({
    // type and object_id is needed to reference real object
    object_type: { type: String },
    object_id: { type: mongoose.scheme.ObjectId, required: true },

    // optional related_id for some actions
    related_type: { type: String },
    related_id: { type: mongoose.schema.ObjectId },

    // when there are different actions that for the same objects
    // create / delete
    action: { type: String, required: true },

    // for feed snippets
    text: { type: String },
    image: { type: String },
    url: { type: String }, // external url
});

module.exports = {
    Action: mongoose.model('Action', ActionSchema),
};
