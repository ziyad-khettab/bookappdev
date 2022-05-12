import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../features/auth/authSlice';
import Spinner from './Spinner';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import InputAdornment from '@mui/material/InputAdornment'; 
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
function Register(){
    const [formData, setFormData] = useState({
        firstname : "",
        lastname : "",
        username : "",
        email : "",
        password : ""
    });  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    const styles = {
        page : {
            backgroundColor : '#B3D6CD',   
            height : '100%',
            backgroundImage: 'url(/images/bg.jpg)',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : 'center',
            backgroundSize : 'cover',
            paddingBottom : '30px'
            
        },
        container : {
            backgroundColor : '#FBF4FF',
            maxWidth : '500px',
            margin : '60px auto 0 auto',
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
        inputGroup : {
            display : 'flex',
            gap : '20px'
        },
        loginBtn :{ 
            marginTop: '20px',
            padding : '10px',
            fontSize : '20px',
            borderRadius : '50px'
        }

    }
    useEffect( ()=>{
        if(isError){
            toast.error(message);
        }
        if(isSuccess || user){
            navigate('/')
        }   
        dispatch(reset()); 

    }, [user, isError, isSuccess, message, navigate, dispatch])
    
    
    function handleChange(event){
        setFormData(prevState =>{
         return {
             ...prevState,
             [event.target.name] : event.target.value
         }   
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        const userData = {
            firstname : formData.firstname,
            lastname : formData.lastname,
            username : formData.username,
            email : formData.email,
            password : formData.password
        };
        dispatch(register(userData));
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
                        >Please enter your information</Typography>
                <form style = {styles.form} className="form" onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <TextField fullWidth 
                                onChange={handleChange} 
                                name='firstname' 
                                label='First name' 
                                variant='outlined' 
                                value={formData.firstname}   
                                color='secondary'
                                required
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                    <PersonIcon />
                                    </InputAdornment>
                                ),
                                }}     
                        />
                        <TextField fullWidth 
                                onChange ={handleChange} 
                                name='lastname' 
                                label='Last Name' 
                                variant ='outlined' 
                                value={formData.lastname} 
                                color= 'secondary'
                                required
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                    <PersonIcon />
                                    </InputAdornment>
                                ),
                                }}
                        />
                    </div>
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
                            name='username' 
                            label='Username' 
                            variant ='outlined' 
                            value={formData.username} 
                            color= 'secondary'
                            required
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                <VerifiedUserIcon/>
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
                            >Sign Up</Button>
                </form>
            </div>
            
        </div>
    )
}
export default Register;


/*<form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor='firstname'>FirstName</label>
                <input type='text' name = "firstname" value={formData.firstname} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="lastname">LastName</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
            </div>
            <button type='submit'>
              Submit
            </button>
        </form>*/