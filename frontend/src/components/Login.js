import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login, reset} from '../features/auth/authSlice';
import Spinner from './Spinner';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import InputAdornment from '@mui/material/InputAdornment'; 
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
function Login({route}){
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
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
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        if(isSuccess || user){
            navigate('/')
        }   
        dispatch(reset()); 
    }, [user, isError, isSuccess, message, navigate, dispatch])
    function handleChange(e){
        setFormData(prevState =>{
         return {
             ...prevState,
             [e.target.name] : e.target.value
         }   
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        const userData = {
            email : formData.email,
            password : formData.password
        }
        dispatch(login(userData));
    }
    if(isLoading){
        return <Spinner />
    }
    return (
        <div style = {styles.page}>
            <Navbar />  
            <div style={styles.container}>
                <Typography 
                        style={styles.title}
                        >Welcome Back</Typography>
                <form style = {styles.form} className="form" onSubmit={handleSubmit}>
                    <TextField fullWidth 
                            onChange={handleChange} 
                            name='email' label='Email' 
                            variant='outlined' 
                            value={formData.email}   
                            color='secondary'
                            required
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                <EmailIcon />
                                </InputAdornment>
                            ),
                            }}     
                    />
                    <TextField fullWidth 
                            onChange ={handleChange} 
                            name='password' 
                            label='Password' 
                            variant ='outlined' 
                            value={formData.password} 
                            color= 'secondary'
                            required
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                            }}
                    />
                    <Button variant='contained' 
                            label='submit' 
                            fullWidth
                            style={styles.loginBtn}
                            type='submit'
                            >Login</Button>
                </form>
            </div>
            
        </div>
    )
}
export default Login;