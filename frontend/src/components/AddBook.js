import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import InputAdornment from '@mui/material/InputAdornment'; 
import axios from 'axios';

function AddBook(){
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user || !user.isAdmin){
            navigate('/login')
        }
    }, [user, navigate])
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
            padding : '40px 0px 50px 0px',
        },
        submitBtn :{
            marginTop : '20px',
            padding : '10px',
            fontSize : '20px',
            borderRadius : '50px'
        },
        link : {
            color : 'white',
            textDecoration : 'none',
            fontSize : '14px'
        }
    }
    const [formData, setFormData] = useState({
        isbn : "",
        title : "",
        author : "",
        nbPages : "",
        summary : "",
        publicationYear : ""

    }); 
;
    function handleChange(event){
        setFormData(prevState =>{
         return {
             ...prevState,
             [event.target.name] : event.target.value
         }   
        })
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const bookData = {
            isbn : formData.isbn,
            title : formData.title,
            authors : [{author : formData.author}],
            nbPages : formData.nbPages,
            summary : formData.summary,
            publicationYear : formData.publicationYear,
        };  
        try{
            const items = JSON.parse(localStorage.getItem('user'));
            const token = items.token
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            await axios.post('/api/v1/books', bookData, config)
            toast("Book added succesfully");
            setFormData({
                isbn : "",
                title : "",
                author : "",
                nbPages : "",
                summary : "",
                publicationYear : ""
        
            })
        }   
        catch(error){
            console.log(error.response.data.msg);
        }
    }
    return (
        <div style = {styles.page}>
            <Navbar />  
            <div style={styles.container}>
                <Typography 
                        style={styles.title}
                        >Ajouter un livre</Typography>
                <form style = {styles.form} onSubmit={handleSubmit}>
                    <TextField fullWidth 
                            name='isbn' 
                            label='Code ISBN' 
                            variant='outlined' 
                            color='secondary'
                            required
                            value={formData.isbn}
                            onChange={handleChange}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                 
                                </InputAdornment>
                            ),
                            }}     
                    />
                    <TextField fullWidth 
                            name='title' 
                            label='Titre' 
                            variant='outlined' 
                            color='secondary'
                            required
                            value={formData.title}
                            onChange={handleChange}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">

                                </InputAdornment>
                            ),
                            }}     
                    />
                    <TextField fullWidth 
                            name='author' 
                            label='Auteur' 
                            variant ='outlined' 
                            color= 'secondary'
                            required
                            value={formData.author}
                            onChange={handleChange}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
               
                                </InputAdornment>
                            ),
                            }}
                    />
                    <TextField fullWidth
                            name='nbPages' 
                            label='Nombre de pages' 
                            type='number'
                            variant ='outlined' 
                            color= 'secondary'
                            required
                            value={formData.nbPages}
                            onChange={handleChange}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                    
                                </InputAdornment>
                            ),
                            }}
                    />
                    <TextField fullWidth 
                        name='summary' 
                        label='Description' 
                        variant ='outlined' 
                        color= 'secondary'
                        required
                        multiline
                        rows={5}
                        value={formData.summary}
                        onChange={handleChange}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">

                            </InputAdornment>
                        ),
                        }}
                    />
                    <TextField fullWidth
                            name='publicationYear' 
                            label='Date de publication' 
                            variant ='outlined' 
                            color= 'secondary'
                            required
                            value={formData.publicationYear}
                            onChange={handleChange}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                    
                                </InputAdornment>
                            ),
                            }}
                    />
                    <Button variant='contained' 
                            label='Ajouter' 
                            fullWidth
                            style={styles.submitBtn}
                            type='submit'
                            >Ajouter</Button>

                </form>
                <Button size="small" variant="contained" color="primary" sx = {styles.submitBtn}>
                    <Link to={'/googleApi'} style={styles.link}>
                        Add through google books API
                    </Link>
                </Button>
            </div>               
        </div>
    )
}
export default AddBook;