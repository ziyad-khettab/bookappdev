import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import BookCard from './BookCard';

function Profile(){
    const styles = {
        page : {
            backgroundColor : '#B3D6CD',   
            height : '100%',
            backgroundImage: 'url(/images/bg.jpg)',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : 'center',
            backgroundSize : 'cover',

        },
      
        /*  'linear-gradient(to right, #B3D6CD, #BEEBFA)' */
        container : {
            backgroundColor : '#FBF4FF',
            maxWidth : '550px',
            maxHeight : '400px',
            margin : '70px auto ',
            borderRadius : '200px',
            padding : '40px 20px',
            display : 'flex',
            flexDirection : 'column',
            textAlign : 'center',
            justifyContent : 'space-between',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',          
        },
         avatar : {
            backgroundImage : 'linear-gradient(to right, #9B00FA, #FF63F9)',
            width: '100px', 
            height : '100px', 
            fontSize : '60px', 
            textAlign : 'center', 
            margin : '0px auto 20px auto',
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
    const [myBooks, setMyBooks] = useState(null);
    const [booksExist, setBooksExist] = useState(false);
    const [bookCards, setBookCards] = useState(null);
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [avatar, setAvatar ] = useState('');
    useEffect( ()=>{

        if(!user){
            navigate('/login')
        }
      setAvatar(user.username ? user.username.charAt(0) : 'H');
      const items = JSON.parse(localStorage.getItem('user'));
            const token = items.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
      axios.get(`/api/v1/books/readbooks`, config)

        .then(res => {
            if(res.data.read.length > 0){
                setBooksExist(true); 
                setMyBooks(res.data.read); 
            }
        })
        .catch(err => {
            console.error(err);
            setMyBooks(null);
            setBooksExist(false);
        });
        if(booksExist){
            setBookCards(prevState =>{
                return myBooks.map(book => {
                    let linkString = `/book/${book._id}`;
                    return  <Link to={linkString}  style={styles.link}><BookCard key={book._id} book={book}/></Link>
                });
            })
        }

    }, [user, navigate, booksExist, myBooks])    
    return (
            <div style = {styles.page}>
                <Navbar />  
                {
                    !user ? 'Loading...' : 
                    <Card style={styles.container}>
                    <CardContent sx={{margin : '0px', padding : '0px'}} > 
                        <Avatar sx={styles.avatar} aria-label="username">
                                {avatar}
                        </Avatar>
                        <Box>
                            <Typography variant='h4'>    
                                Welcome Back
                            </Typography>
                            <Typography variant='h4' sx={{ lineHeight: '2' }}>    
                                {user.firstname} {user.lastname }
                            </Typography>
                            <Typography variant='h6' sx={{ lineHeight: '2' }}>    
                                Username : {user.username}
                            </Typography>
                            <Typography variant='h6' sx={{ lineHeight: '2' }}>    
                                Email : {user.email}
                            </Typography>
                        </Box>
                    </CardContent>   
                    </Card> 
                    
                }
                <Typography variant='h2' sx={{ lineHeight: '2', margin : '20px auto', width : '500px', textAlign : 'center', color : '#fff' }}>    
                        Finished books
                </Typography>
                {
                    booksExist ? 
                    <div style={styles.bookGrid}>
                        {bookCards}
                    </div>
                    : 
                    <Typography variant='h4' sx={{  lineHeight: '2', margin : '0px auto' , textAlign : 'center',     paddingBottom : '40px', width : '300px', color : '#fff' }}>    
                        No Books Found
                    </Typography>
                }
        </div>    
    )
}
export default Profile