import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';   
import {useNavigate} from 'react-router-dom';
function GoogleBooks(){
    
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
            
            })
            .catch(err => console.log(err))
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField  
                            onChange={handleChange} 
                            name='authorFirstName' label='Author firstname' 
                            variant='outlined' 
                            value={formData.authorFirstName}   
                            color='secondary'
                 
 
                    />
                    <TextField  
                            onChange ={handleChange} 
                            name='authorLastName' 
                            label='author lastName' 
                            variant ='outlined' 
                            value={formData.authorLastName} 
                            color= 'secondary'
                    
                    />
                    <Button variant='contained' 
                            label='submit' 
    
                            type='submit'
                            >Add books</Button>
        </form>
    )
}
export default GoogleBooks;