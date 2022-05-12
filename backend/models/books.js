const User = require('./users');
const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    author : {
        type : String,
        required : [true, 'Please enter the author name'],
        trim : true
    }
});

const ratedBySchema = mongoose.Schema({
    ratedById : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User',
    }
});
const readBySchema = mongoose.Schema({
    readById : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User',
    }
})

const upvotedBySchema = mongoose.Schema({
    upvotedById : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User',    
    }
})
const reviewSchema = mongoose.Schema({
    reviewerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
    },
    reviewerName : {
        type : String,
        required : [true, 'Enter the reviewer username'],
        trim : true,
    },
    text : {
        type : String,
        required : [true, 'Enter the review'],
        trim : true,
    },
    upVotes : {
        type : Number,
        default : 0
    },
    upvotedBy : [upvotedBySchema]
})

const bookSchema = mongoose.Schema({
    isbn : {
        type : String,
        required : [true, 'please enter the book ISBN'],
        trim : true,
    },
    title : {
        type : String,
        required : [true, 'please enter the book title'],
        trim : true,
    },
    nbPages : {
        type : Number,
        required : [true, 'Please enter the number of pages'],
    },
    summary : {
        type : String,
        default : "No Description available ",
        trim : true,
    },
    photo:
    {
        type : String,
        default : "/images/bookPlaceholder.jfif",
    },
    nbReads : {
        type : Number,
        default : 0,
    },
    readBy : {
        type : [readBySchema],
        default : []
    },
    rating :{
        type : Number,
        default : 0,
    },
    ratedBy : {
        type : [ratedBySchema],
        default : []
    },
    authors : {
        type : [authorSchema],
        default : [],
    },
    reviews : {
        type : [reviewSchema],
        default : [],
    },
    publicationYear : {
        type : String,
        required : [true, "Please enter the summary of the book"],
    } 
}, {
    timestamps : true
});

module.exports = mongoose.model("Book", bookSchema);