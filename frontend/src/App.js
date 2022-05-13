import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import Register from './components/Register';
import Profile from './components/Profile';
import Homepage from './components/Homepage';
import Book from './components/Book';
import WriteReview from './components/WriteReview';
import AddBook from './components/AddBook';
import NotFound from './components/NotFound';
import GoogleBooks from './components/GoogleBooks';
import UpdateReview from './components/UpdateReview';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element ={<Register />} />
          <Route exact path='/book/:bookId' element={<Book />} />
          <Route exact path='/review/:bookId' element={<WriteReview />} />
          <Route exact path='/review/:bookId/update/:reviewId' element={<UpdateReview />} />
          <Route exact path='/review/:bookId/delete/:reviewId' element={<UpdateReview />} />
          <Route exact path='/addbook' element={<AddBook />} />
          <Route exact path='/googleApi' element={<GoogleBooks />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
