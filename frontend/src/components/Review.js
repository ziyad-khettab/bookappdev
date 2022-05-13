import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import CardActions from '@mui/material/CardActions';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import { useParams, Link} from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios'
const styles = {
    card : {
       border : 'solid linear-gradient(to right, #28D6AC, #8F09CE) 3px',
       maxWidth: 900, margin: "30px auto" , 
       backgroundColor : "#F8F5FF", 
       borderRadius : '10px',
       boxShadow: '5px 5px #DD70DF',
    },
    cardHeader : {
        paddingBottom : '0px',
        paddingTop : '10px',
        marginLeft : '20px'
    },
    btn : {
        borderRadius : '50px'
    },
    btnPositioning :{
        marginLeft : 'auto',
        borderRadius : '50px'
    },
    link : {
        color : 'white',
        textDecoration : 'none'
    }
}

function Review(props) {

  const {user} = useSelector((state) => state.auth);
    const [avatar, setAvatar ] = useState('');
    const [isReviewer, setIsReviewer] = useState(false);
    const [isExecuted, setIsExecuted] = useState(false);
    let { bookId } = useParams();
    useEffect( ()=>{

      setAvatar(props.data.reviewerName ? props.data.reviewerName.charAt(0) : 'H');
      if(user){
      setIsReviewer(props.data.reviewerId === user._id)
      }
      
    }, [props.data.reviewerName,isReviewer]);

    function handleDelete(){
      let executed = window.confirm("Are you sure you want to delete this review ? ");
      if(executed){

        const items = JSON.parse(localStorage.getItem('user'));
            const token = items.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            let req = '/api/v1/books/'+bookId+'/reviews/'+props.data._id;
            axios.delete(req, config)
              .then(res => {
                toast("Review has been deleted")
              })
              .catch(err => console.error(err))
      }
    }
  return (
    <Card sx={styles.card} variant="elevation">
      <CardHeader style = {styles.cardHeader}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="username">
            {avatar}
          </Avatar>
        }
        titleTypographyProps={{variant:'body1' }}
        title={props.data.reviewerName}
      />
      <CardContent>
        <Typography variant="body1" style={styles.text}>
          {props.data.text}
        </Typography>
      </CardContent>

      {isReviewer ? <CardActions>
            <Button size="small" variant="contained" color="primary" sx = {styles.btnPositioning}><Link to={'/review/'+bookId+'/update/'+props.data._id} style={styles.link}>Update</Link></Button>
            <Button size="small" variant="contained" color='error' onClick={handleDelete} sx={styles.btn}>Delete</Button>
      </CardActions> : <></>}
    </Card>
  );
}
export default Review;
