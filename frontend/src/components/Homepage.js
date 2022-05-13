import Navbar from "./Navbar";
import BookCard from "./BookCard";
import {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {toast} from 'react-toastify';

function Homepage(){
    const [books, setBooks] = useState(null);
    const [bookCards, setBookCards] = useState(null);
    const [searchString, setSearchString] = useState("");
    const [booksExist, setBooksExist] = useState(false);
    const container1 = {
        backgroundImage: 'url(/images/bookBAckground.jpg)',
        backgroundColor: '#cccccc',
        height: '100%',     
        backgroundPosition: 'center',
        
        backgroundSize: 'contain'   
    };
    const container2 = {
        backgroundImage: 'url(/images/bookBAckground.jpg)',
        backgroundColor: '#cccccc',
        height: '100vh',     
        backgroundPosition: 'center',
        backgroundRepeat:  'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    }
    const styles ={
        container : booksExist ? container1 : container2,
        header : {
            color :'white',
            textAlign : 'center'
        },
        searchBar : {
            marginTop : '100px',
            width : '700px',
            margin : '0 auto',
            background: 'transparent',
            display : 'flex',
            padding : '30px',
        },
        searchField : {
            backgroundColor : 'white',
            width : '600px',
            borderRadius : '50px 0 0 50px',
      
        },
        searchButton : {
            width : '70px',
            borderRadius : '0px 50px 50px 0',
            textTransform : 'none',
            fontSize : '20px',
        },
        searchIcon : {
            fontSize : '30px'
        },
        bookGrid : {
            marginTop : "50px",
            display : 'flex',
            flexWrap : 'wrap',
            justifyContent : 'space-around'
        },
        link : {
            textDecoration : 'none'
        }
    }
    function handleSubmit(event){
        event.preventDefault();
        axios.get(`/api/v1/books/find/${searchString}`)
        .then(res => {
            if(res.data.books.length > 0){
                setBooksExist(true)
                setBooks(res.data.books); 
            }
        })
        .catch(err => {
            console.error(err);
            setBooks(null);
            setBooksExist(false);
            toast(err.response.data.msg);
        });
    }
    useEffect(()=>{
        if(booksExist){
            setBookCards(prevState =>{
                
                return books.map(book => {
                    let linkString = `/book/${book._id}`;
                    return  <Link to={linkString}  style={styles.link}><BookCard key={book._id} book={book}/></Link>
                });
            })
        }
    },[booksExist])
    function handleChange(event){
        setSearchString(event.target.value)
    }
    return (
        <div style={styles.container}>
                <Navbar />
                {!booksExist && <Typography variant='h2' style={styles.header}>Find a book</Typography>}
                <form style={styles.searchBar} onSubmit={handleSubmit}>
                    <TextField  
                                name='bookTitle' 
                                label='Book title' 
                                variant ='filled'  
                                color= 'secondary'
                                required
                                onChange={handleChange}
                                value={searchString}
                                style={styles.searchField}
                        />
                    <Button variant='contained' 
                                label='submit' 
                                type='submit'
                                color='secondary'
                                style={styles.searchButton}
                                startIcon={<SearchIcon style={styles.searchIcon}/>}
                                >
                    </Button>
                </form>
                <div style={styles.bookGrid}>{booksExist && bookCards}</div>
                {!booksExist && <div style={{height : '60px'}}></div>}
        </div>
    )
}
export default Homepage;