import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout , reset} from '../features/auth/authSlice';
import { AppBar,Toolbar, Button} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
function Navbar(){ 
    const styles = {
        login : {
            color : 'white',
            marginRight: '20px',

        },
        register :{
            color : 'white',
            marginRight : '10px'
        },
        addBook : {
            color : 'white',
            TextDecoration : 'none',
        },
        appButton : {
            fontSize : '20px',
            color : 'white',
            marginRight : 'auto',   
            marginLeft : '30px',
            
        },
        appBar :{
            backgroundImage: 'linear-gradient(to right, #28D6AC, #8F09CE)'
        }
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state =>state.auth);
    function onLogout(){
        dispatch(logout());
        dispatch(reset());
        navigate('/')
    }
    function addBook(){
        navigate('/addbook');
    }
    function toProfile(){
        navigate('/profile')
    }
    return (
        <header>
            <AppBar sx ={styles.appBar} position='static' >
                    <Toolbar >
                        <Button sx={styles.appButton} component={Link} to={'/'} >About That Book</Button>
                        
                        {user ? 
                                (user.isAdmin ? 
                                    <>
                                        <Button sx={styles.login}  onClick={addBook}
                                        startIcon={<MenuBookIcon />}
                                        >Add book</Button> 
                                        <Button sx={styles.login}  onClick={toProfile}
                                        startIcon={<PersonIcon />}
                                        >Profile</Button> 
                                        <Button sx={styles.addBook} onClick={onLogout}
                                        startIcon={<LoginIcon />}
                                        >Logout</Button> 
                                    </>
                                    :
                                    <>
                                    <Button sx={styles.login}  onClick={toProfile}
                                        startIcon={<PersonIcon />}
                                    >Profile</Button>
                                    <Button sx={styles.login} onClick={onLogout}
                                    startIcon={<LoginIcon />}
                                    >Logout</Button> 
                                    </>
                                )
                            :        
                                <> 
                                    <Button sx={styles.login} component={Link} to={'/login'} 
                                    startIcon={<LoginIcon />}
                                    >Login</Button>
                                    <Button sx={styles.register} component={Link} to={'/register'} 
                                    startIcon={<HowToRegIcon />}
                                    >Sign Up</Button>
                                </>    
                    

                        }
                    </Toolbar>
            </AppBar>
        </header>
    )
}
export default Navbar;