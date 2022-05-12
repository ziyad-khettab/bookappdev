import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
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
    }
}

function Review(props) {

    const [avatar, setAvatar ] = useState('');
    useEffect( ()=>{
      setAvatar(props.data.reviewerName ? props.data.reviewerName.charAt(0) : 'H');
    }, [props.data.reviewerName])
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
    </Card>
  );
}
export default Review;
