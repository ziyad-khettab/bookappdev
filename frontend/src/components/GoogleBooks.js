import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';   
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import {toast} from 'react-toastify';
function GoogleBooks(){
    const styles = {
        page : {
            backgroundColor : '#B3D6CD',   
            height : '100vh',
            backgroundImage: 'url(/images/bg.jpg)',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : 'center',
            backgroundSize : 'cover'
            
        },
        /*  'linear-gradient(to right, #B3D6CD, #BEEBFA)' */
        container : {
            backgroundColor : '#FBF4FF',
            maxWidth : '500px',
            margin : '60px auto',
            borderRadius : '10px',
            padding : '30px 30px 10px 30px',
            display : 'flex',
            flexDirection : 'column',
            textAlign : 'center',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        },
        title : {
            fontSize : '25px'
        },
        form :{
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            gap : '30px',
            padding : '50px 0px',
        },
        loginBtn :{
            marginTop : '20px',
            padding : '10px',
            fontSize : '20px',
            borderRadius : '50px'
        }
    }
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user || !user.isAdmin){
            navigate('/login')
        }
    }, [user, navigate])
    const [formData, setFormData] = useState({
        authorFirstName : '',
        authorLastName : ''
    });
    function handleChange(event){
        setFormData(prevState =>{
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }
  
    
 
    function addBook(bookData){
        axios.post('/api/v1/books/addbyauthor', bookData)
        .then(res =>{
            
        })
        .catch(err => console.log(err))
    }
    function handleSubmit(event){   
        event.preventDefault();
        console.log(formData.authorFirstName, formData.authorLastName);
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${formData.authorFirstName} ${formData.authorLastName}"&maxResults=40&key=AIzaSyAbKSkr39sFYjD14zbWeYu1tO6KgVyGch0`)
            .then(res => {
         
                let books = res.data.items;
                books.map(book => {
                    let defaultPhoto = "/images/bookPlaceholder.jfif" ;
                    let imageExists = false;
                    if(book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail){
                        imageExists = true;
                    }
                    let isbn = Array.isArray( book.volumeInfo.industryIdentifiers) ? book.volumeInfo.industryIdentifiers[0].identifier :  book.volumeInfo.industryIdentifiers.identifier;
                    let authorString = Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors[0] :  book.volumeInfo.authors;
                    let numPages =  book.volumeInfo.pageCount ?  book.volumeInfo.pageCount : 0;
                    let desc = book.volumeInfo.description ? book.volumeInfo.description : "No description available";
                    let publishDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Unknown";
                    let bookData = {
                        isbn : isbn,
                        title : book.volumeInfo.title,
                        authors : [{ author : authorString}],
                        nbPages : numPages,
                        summary : desc,
                        publicationYear : publishDate,
                        photo : `${imageExists ? book.volumeInfo.imageLinks.thumbnail : defaultPhoto}`
                    }  
                    addBook(bookData);
                    
                    
                    return bookData;
                })
                toast("Books added succesfully");
                setFormData({
                    authorFirstName : "",
                    authorLastName : "",
                })
            })
            .catch(err => {
                toast("Books added succesfully");
                console.log(err)}
                );
            
    }
    return (
        <div style = {styles.page}>
            <Navbar />  
            <div style={styles.container}>
                <Typography 
                        style={styles.title}
                        >Add books by author</Typography>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <TextField  
                                    onChange={handleChange} 
                                    name='authorFirstName' label='Author firstname' 
                                    variant='outlined' 
                                    value={formData.authorFirstName}   
                                    color='secondary'
                                    fullWidth
        
                            />
                            <TextField  
                                    onChange ={handleChange} 
                                    name='authorLastName' 
                                    label='author lastname' 
                                    variant ='outlined' 
                                    value={formData.authorLastName} 
                                    color= 'secondary'
                                    fullWidth
                            />
                            <Button variant='contained' 
                                    label='submit' 
                                    
                                    type='submit'
                                    >Add books</Button>
                </form>
                </div>
            
            </div>
    )
}
export default GoogleBooks;