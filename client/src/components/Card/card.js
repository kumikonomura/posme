import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

export default function ItemCardList(props) {
  const classes = useStyles();

  useEffect(() => {
    props.handleGetTabs({});
  }, []);

  return props.items.map(item => (
    <Card id={item._id} className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={item._id}
          height="140"
          image={item.img}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* { insert succulent name here} */}
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography />
        <Typography>
          {/* { insert succulent price and quantity here } */}
          {item.price}
          {item.inventory}
        </Typography>
      </CardActions>
    </Card>
  ));
}
