import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import Navbar from './Navbar';
import Review from './Review';
import Button from '@mui/material/Button';
import { useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

function Book(){
    const styles = {
        container : {
            backgroundImage: 'url("/images/bookBAckground1.webp")',
            backgroundColor: '#cccccc',
            height: '100%',     
            backgroundPosition: 'center',
            backgroundSize: '',

        },
        book : {
            display : 'flex',
            flexWrap : 'wrap',
            minHeight : '400px',
            maxWidth : '900px',
            justifyContent : 'space-around',
            alignItems : 'center',
            margin : '40px auto',
            padding : '0px 30px',
            borderRadius : '10px',
            boxShadow: '5px 5px #576161',
            backgroundImage: 'linear-gradient(to right, #28D6AC, #8F09CE)'
        },

        bookPhoto : {
            maxWidth : '300px',
            backgroundColor : 'yellow',
            height : '400px',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '30px',
            margin : '0 auto'
        },
        bookInfo : {
            margin : '30px',
            backgroundColor : '#F3FFFF',
            width : '500px',
            display : 'flex',
            flexDirection : 'column',
            padding : '20px',
            borderRadius : '30px',
            wordWrap : 'break-word'
            
        },
        bookTitle : {
            textAlign : 'center',  
            marginBottom : '50px',
            color : '#781B7A'
        },
        isbn : {

        },
        authors : {

        },
        reviews : {
            paddingBottom : '30px',
  
        },
        avis : {
            textAlign : 'center',
            padding: '20px',
            color : 'white',
            backgroundColor : '#7B50E1',
            borderRadius : '50px',
            width : '200px',
            margin : '50px auto 0px auto'
        },
        submitBtn :{
            width : '200px',
            margin : '20px auto',
            padding : '10px',
            fontSize : '15px',
            borderRadius : '50px',
        },
        link : {
            color : 'white',
            textDecoration : 'none'
        }
    }
    const [book, setBook] = useState(null)
    const [read, setRead] = useState(false);
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    let { bookId } = useParams();
    useEffect(()=>{
        axios.get(`/api/v1/books/${bookId}`)
            .then(res => {
                setBook(res.data.book);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
        if(user){
            const items = JSON.parse(localStorage.getItem('user'));
        const token = items.token;
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        axios.get(`/api/v1/books/${bookId}/hasread`, config)
            .then(res => {
            setRead(res.data.read);   
            })
            .catch(err =>{ 
                console.error(err)});
        }
    }, [user, navigate,bookId, book])
    let reviews;
    if(!isLoading ){
        reviews = book.reviews.map(review => 
            {
                return <Review key={review._id} data={review}/>
            });
    }
    function handleRead(){
        if(!user){
            navigate('/login')
        }
        else{
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items.token;
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      
        axios.get(`/api/v1/books/${bookId}/read`, config)
            .then(res => {
            if(res.data.msg === "marked as read successfully"){
                setRead(true);
                toast('Marked as read')
                
            }
            else if(res.data.msg === "removed from read successfully"){
                setRead(false);
                toast("Removed from read books")
            }
            })
            .catch(err => console.error(err))
        }
    }
    return (
        <div style = {styles.container}>
            <Navbar />
            {!isLoading && <>
                <div  style={styles.book} >
                    <img style={styles.bookPhoto}src={book.photo} alt="" />
                <div style={styles.bookInfo} className='bookInfo'>
                    <Typography variant='h2' style={styles.bookTitle}>{book.title}</Typography>
                    <Typography variant='h6' style={styles.isbn}>ISBN : {book.isbn}</Typography>
                    <Typography variant='h6' style={styles.authors} >Auteur : {book.authors[0].author}</Typography>
                    <Typography variant='h6'>Nombre de pages : {book.nbPages}</Typography>
                    {book.publicationYear && 
                        <Typography variant='h6'>Date de publication : {book.publicationYear}</Typography>}
                    <Typography variant='h6'>Description : </Typography>
                    <Typography variant='body1' style={styles.summary}>{book.summary}</Typography>
                    <Button variant='contained' 
                            label='Ajouter' 
                            fullWidth
                            style={styles.submitBtn}
                            ><Link to={'/review/'+book._id} style={styles.link}>Partager mon avis</Link></Button>
                    
                    <Button variant='contained' 
                            label='markAsRead' 
                            fullWidth
                            onClick={handleRead}
                            style={styles.submitBtn}
                            >{read === true ? 'Remove  read' : 'Mark as read'}</Button>
                </div>
            </div>
            <div style={styles.reviews} >
            <Typography variant='h2' style={styles.avis}>Avis</Typography>
                {reviews}
            </div> </> }
        </div>
    )
}
export default Book;