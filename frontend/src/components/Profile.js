import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function Profile(){
    const styles = {
        page : {
            backgroundColor : '#B3D6CD',   
            height : '100vh',
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
         }
    }
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [avatar, setAvatar ] = useState('');
    useEffect( ()=>{
        if(!user){
            navigate('/login')
        }
      setAvatar(user.username ? user.username.charAt(0) : 'H');
    }, [user, navigate])    
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
            
        </div>    
    )
}
export default Profile