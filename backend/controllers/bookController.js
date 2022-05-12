const Book = require('../models/books');
const User = require('../models/users');
const mongoose = require('mongoose');

const getAllBooks = async (req, res) =>{
    try{
        const books = await Book.find({});
        if(books)
            res.status(200).json({books});
        else{
            res.status(404).json({msg : "no books"})
        }
    }
    catch(error){
        res.status(500).json({msg : 'Server error'})
    }
}
const getBook = async (req, res) =>{
    try{
        const book = await Book.findById(req.params.bookId);
        if(book){
            res.status(200).json({book});
        }
        else{
            res.status(404).json({msg : 'book not found'});
        }
    }   
    catch(error){
        res.status(500).json({msg : 'Server error'});
    }
}
const getBookByTitle = async (req, res) =>{
    try{
        const books = await Book.find({title: {$regex: '.*' + req.params.title + '.*', $options:'i'}});
        if(books && books.length !== 0){
            res.status(200).json({books});
        }
        else{
            res.status(404).json({msg : 'book not found'});
        }
    }
    catch(error){
        res.status(500).json({msg : 'Server error'});
    }
}
const addBook = async (req, res) =>{
    try{
        let book;
        const { isbn, title, nbPages, summary, authors, publicationYear} = req.body;
        if(!isbn || !title || !nbPages || !summary || !publicationYear || authors === []){
            return res.status(400).json({msg : 'please enter all the info'});
        }
        else{
            const bookExist = await Book.findOne({isbn : req.body.isbn});
            if(bookExist) {
                return res.status(400).json({msg : 'isbn code is already used'});
            }
            else{
                    book = await Book.create({
                        isbn : isbn,
                        title : title,
                        nbPages : nbPages,
                        summary : summary,
                        authors : authors,
                        publicationYear : publicationYear
                    })
            }
            if(book){
                return res.status(201).json({book});
            }
            else{
                return res.status(400).json({msg : 'insert error'});
            }
        }
        
    }
    catch(error){
        res.status(500).json({msg : 'Server error'})
    }
}
const addBookByAuthor = async (req, res) =>{
    try{
        let book;
        const { isbn, title, nbPages, summary, authors, publicationYear, photo} = req.body;
        if(!isbn || !title ){
            return res.status(400).json({msg : 'please enter all the info'});
        }
        else{
            const bookExist = await Book.findOne({isbn : req.body.isbn});
            if(bookExist) {
                return res.status(400).json({msg : 'isbn code is already used'});
            }
            else{
                    book = await Book.create({
                        isbn : isbn,
                        title : title,
                        nbPages : nbPages,
                        summary : summary,
                        authors : authors,
                        publicationYear : publicationYear,
                        photo : photo,
                    })
            }
            if(book){
                return res.status(201).json({book});
            }
            else{
                return res.status(400).json({msg : 'insert error'});
            }
        }
        
    }
    catch(error){
        res.status(500).json({msg : error.message})
    }
}

const updateBook = async (req, res) =>{
    try{
        const { isbn, title, nbPages, summary, authors} = req.body;
        const book = await Book.findByIdAndUpdate(req.params.bookId, {                       
                        title : title,
                        nbPages : nbPages,
                        summary : summary,
                        authors : authors
                    }, { new : true});
        if(book){
            return res.status(201).json({book});
        }
        res.status(400).json({msg : "Failed to update"});
    }
    catch(error){
        res.status(500).json({msg : error.message});
    }
}
const deleteBook = async (req, res) =>{
    try{
        const book = await Book.findByIdAndRemove(req.params.bookId);
        if(book){
            return res.status(200).json({book});
        }
        res.status(400).json({msg : 'failed to delete'});
    }
    catch(error){   
        res.status(500).json({msg : error.message})
    }
}

const getAllReviews = async (req, res) =>{
    try{
        const reviews = await Book.findById(req.params.bookId).select('reviews -_id');
        if(reviews){
            return res.status(200).json(reviews);
        }
        return res.status(400).json({msg : "reviews not found"})
    }
    catch(error){
        res.status(500).json({msg : error.message})
    }
}
const getReview = async (req, res) =>{
    try{
        if( !req.params.bookId || !req.params.reviewId){
            return res.status(400).json({msg : "Please enter all the information"});
        }
        const review = await Book.findOne({id : req.params.BookId, 'reviews._id' : req.params.reviewId}, {'reviews.$' : 1});
        if(review){
            return res.status(200).json(review);
        }
        return res.status(400).json({msg : 'review not found'});
    }
    catch(error){
        res.status(500).json({msg : error.message});
    }
}
const addReview = async (req, res) =>{
    try{
        if(!req.user.id || !req.body.text){
            return res.status(400).json({msg : "Please enter the text"});
        }
        const newReview = {
            reviewerId : req.user.id,
            reviewerName : req.user.username,
            text : req.body.text
        }
        const review = await Book.findByIdAndUpdate(req.params.bookId, {$addToSet : { reviews : newReview}});
        if(review){
            return res.status(201).json({review});
        }
        return res.status(400).json({msg : 'Failed to add review'});
    }
    catch(error){
        res.status(500).json({msg : error.message});
    }
}
const updateReview = async (req, res) =>{
    try{
        if(!req.user.id || !req.body.text || !req.params.bookId || !req.params.reviewId){
            return res.status(400).json({msg : "Please enter all the information"});
        }
        const isReviewer = await Book.findOne({id : req.params.BookId, 'reviews._id' :  req.params.reviewId, 'reviews.reviewerId' : req.user.id}, {'reviews.$' : 1});
        if(!isReviewer){
            return res.status(400).json({msg : "Not authorized"});
        }
        const updatedBook = await Book.updateOne(
            {id : req.params.bookId, "reviews._id" : req.params.reviewId},
            { $set : { "reviews.$.text" : req.body.text}}
            );
        if(!updatedBook){
            return res.status(404).json({msg : "Failed to update"});
        } 
        res.json({updatedBook});
    }
    catch(error){
        res.status(500).json({msg : error.message})
    }
}
const deleteReview = async (req, res) =>{
    try{
        if(!req.user.id || !req.params.bookId || !req.params.reviewId){
            return res.status(400).json({msg : "Please enter all the information"});
        }

        const review = {
            _id : req.params.reviewId
        }
        const updatedBook = await Book.findOneAndUpdate({_id : req.params.bookId ,  'reviews.reviewerId' : req.user.id },{
            $pull : { reviews : review}
        });
        if(!updatedBook){
            return res.status(404).json({msg : "Failed to update"});
        } 
        return res.status(200).json({updatedBook});
    }
    catch(error){
        res.status(500).json({msg : error.message})
    }
}
const VoteReview = async (req, res) =>{
    try{
        if(!req.user.id || !req.body.text || !req.params.bookId || !req.params.reviewId){
            return res.status(400).json({msg : "Please enter all the information"});
        }
        const voted = await Book.findOne({id : req.params.BookId, reviews : { $elemMatch : {id : req.params.reviewId, upVotedBy : { $in :[req.user.id]}}}});
        if(!voted){
            let voterAdded = await Book.findOneAndUpdate({id : req.params.bookId},
                {
                    $addToSet : {
                        'reviews.$[review].$[upVotedBy]' : req.user.id
                    }
                },{
                    arrayFilters : [{ 'review.id' : req.params.reviewId}], new : true
                });
            let upvoteCounted =  await Book.findOneAndUpdate({id : req.params.bookId},
                {
                    $inc : {
                        'reviews.$[review].upVotes' : 1
                    }
                },{
                    arrayFilters : [{ 'review.id' : req.params.reviewId}], new : true
                });
            return res.status(201).json({msg : "Upvoted successfully"});
        }
        let voterRemoved = await Book.findOneAndUpdate({id : req.params.bookId},
            {
                $pull : {
                    'reviews.$[review].$[upVotedBy]' : req.user.id
                }
            },{
                arrayFilters : [{ 'review.id' : req.params.reviewId}], new : true
            });
        let upvoteRemoved =  await Book.findOneAndUpdate({id : req.params.bookId},
            {
                $inc : {
                    'reviews.$[review].upVotes' : -1
                }
            },{
                arrayFilters : [{ 'review.id' : req.params.reviewId}], new : true
            });
        return res.status(201).json({msg : "Upvoted successfully"});
    }
    catch(error){
        res.status(500).josn({msg : error.message})
    }
}
const markAsRead = async (req, res) =>{
    try{
        if(!req.user.id || !req.params.bookId){
            return res.status(400).json({msg : "Please enter all the information"});
        }
        const read = await Book.findOne({_id : req.params.bookId, 'readBy.readById' : req.user.id});
        const reader = {
            readById : req.user.id
        }
        if(!read){
            let readerAdded = await Book.findOneAndUpdate({ _id : req.params.bookId},
                {
                    $addToSet : {
                        readBy : reader
                    }
                },{
                   new : true
                });
                
            let readerCounted =  await Book.findOneAndUpdate({_id : req.params.bookId},
                {
                    $inc : {
                        nbReads : 1
                    }
                },{
                    new : true
                });
            return res.status(201).json({msg : "marked as read successfully"});
        }
        let readerRemoved = await Book.findOneAndUpdate({_id : req.params.bookId},
            {
                $pull : {
                    readBy : reader
                }
            },{
                 new : true
            });
        let nbReadRemoved =  await Book.findOneAndUpdate({_id : req.params.bookId},
            {
                $inc : {
                    nbReads : -1
                }
            },{
                new : true
            });
        return res.status(201).json({msg : "removed from read successfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg : error.message})
    }
}
const hasRead = async (req, res) =>{
    try{
        if(req.user &&  req.user.id && req.params.bookId){ 

            const read = await Book.findOne({_id : req.params.bookId,  readBy : {$elemMatch : {readById : req.user.id}}});
            if(read){
                return res.status(200).json({read : true})
            }
            else{
                return res.status(200).json({read : false});
            }
        }
        return res.status(200).json({read : false})
    }
    catch(error){
        res.status(500).json({msg : error.message})
    }
}
module.exports = {
    getAllBooks,
    getBook,
    getBookByTitle,
    addBook,
    addBookByAuthor,
    updateBook,
    deleteBook,
    getAllReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview,
    VoteReview,
    markAsRead,
    hasRead,
    
}