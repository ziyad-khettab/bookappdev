import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';


export default function BookCard(props) {
    const [isLoading, setIsLoading] = useState(true);
    const styles = {
        summary : {
            maxHeight : "200px" , 
            overflow: "hidden", 
            display: 'inline-block' ,
        },
        imageContainer : {
        
            width : '280px',
            height : '450px',    
            backgroundImage: `url(${props.book.photo})`,
            backgroundRepeat : 'no-repeat',
            backgroundPosition : 'center',
            backgroundSize : 'cover',
        },
    }

    useEffect(()=>{
        if(props && props.book){
            setIsLoading(false);
        }
    }, [props, isLoading])
    return (<>
        { !isLoading && 
            <Card sx={{ maxWidth: 280, maxHeight : '800px' , borderRadius:'30px' , margin : '30px'}}>
                <div style={styles.imageContainer}></div>
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{textAlign : 'center',marginBottom : '25px', marginTop : '15px'}} component="div">
                        {props.book.title}
                    </Typography>
                    <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                        Author : {props.book.authors[0].author}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        {props.book.nbPages} pages
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        lus : {props.book.nbReads} fois
                    </Typography>
                </CardContent>
                
        </Card>}</>
  );
}