import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import InputAdornment from '@mui/material/InputAdornment'; 
import { useParams} from 'react-router-dom'
import axios from 'axios'
function WriteReview(){
    const styles = {
        page : {
            backgroundColor : '#B3D6CD',   
            height : '100vh',
            backgroundImage: 'url(/images/bg.jpg)',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : 'center',
            backgroundSize : 'cover'
            
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
        }
    }
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    });
    let { bookId } = useParams();
    const [text, setText] = useState('');
    function handleChange(event){
        setText(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const items = JSON.parse(localStorage.getItem('user'));
            const token = items.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            let req = '/api/v1/books/'+bookId+'/reviews';
            await axios.post(req, {text}, config);
            toast("Review added succesfully");
            navigate('/book/'+bookId)
        }   
        catch(error){
            toast(error.response.data.msg);
        }
    }
       


    return (
        <div style = {styles.page}>
            <Navbar />  
            <div style={styles.container}>
                <Typography 
                        style={styles.title}
                        >Partager votre avis</Typography>
                <form style = {styles.form} onSubmit={handleSubmit}>
                    <TextField fullWidth 
                            name='reviewText' 
                            label='Write review' 
                            variant='outlined' 
                            color='secondary'
                            required
                            multiline
                            rows={6}
                            value={text}
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
            </div>
                       
        </div>
    )
}
export default WriteReview;