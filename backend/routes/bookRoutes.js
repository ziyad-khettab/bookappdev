const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {auth} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/isAdminMiddleware');

router.route('/')
    .get(bookController.getAllBooks)
    .post(auth, isAdmin, bookController.addBook);

router.route('/:bookId')
    .get(bookController.getBook)
    .put(auth, isAdmin, bookController.updateBook)
    .delete(auth, isAdmin, bookController.deleteBook);

router.route('/addbyauthor').post(bookController.addBookByAuthor)
    
router.route('/:bookId/hasread').get(auth, bookController.hasRead)

router.route('/find/:title').get(bookController.getBookByTitle);
   
router.route('/:bookId/reviews')
    .get(bookController.getAllReviews)
    .post(auth, bookController.addReview)

router.route('/:bookId/reviews/:reviewId')
    .get(bookController.getReview)
    .put(auth, bookController.updateReview)
    .delete(auth, bookController.deleteReview)



router.route('/:bookId/read').get(auth, bookController.markAsRead);

module.exports = router;