const mongoose = require("mongoose");

const postModel =  mongoose.Schema({
    VerifiedByAdmin: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["event", "gallery", "feed"],
    },

    relatedDate: Date,
    
    imagesUrl: {
        type: [String],
        default: [],
    },
    caption: String,
    createdBy: {
        tyoe: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    tagUsers: [
        {
            tyoe: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],

    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("posts", postModel);
module.exports = Post;
