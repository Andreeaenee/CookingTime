import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
