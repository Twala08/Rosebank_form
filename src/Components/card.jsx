import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
//card
import Rose from '../Images/Rosey.svg'


 function MediaCard() {
  return (
    <Card sx={{ width: '50%', margin: 'auto' ,marginTop: '80px' }}>
      <CardMedia
        sx={{ height: 300,  }}
        image={Rose}
        title="Rosebank IMG"
      />
    </Card>
  );
}
export default MediaCard;