import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { fetchRecipesCategory } from '../api/getRecipes';

const RecipeCard = ({ recipe }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchRecipesCategory()
      .then((response) => {
        setCategory(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const categoryTitle = category.find((cat) => cat.category_id === recipe.category_id)?.title;

  return (
    <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ 
        marginBottom: 2, 
        ':hover': { 
          boxShadow: 6, 
          transform: 'scale(1.02)' 
        },
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}>
        {recipe.image && (
          <CardMedia
            component="img"
            height="140"
            image={recipe.image}
            alt={recipe.title}
          />
        )}
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" sx={{ marginBottom: 1 }}>
            {recipe.description}
          </Typography>
          {categoryTitle && (
            <Typography
              variant="body2"
              component="p"
              sx={{
                backgroundColor: '#f0f0f0',
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'inline-block',
                fontWeight: 'bold',
                color: '#555',
              }}
            >
              Category: {categoryTitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
