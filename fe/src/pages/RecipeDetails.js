import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { fetchRecipeDetails } from '../api/getRecipes';
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FoodPhoto from '../assets/photos/Photo.jpeg';

const RecipeDetails = () => {
  const [data, setData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchRecipeDetails(id)
      .then((response) => {
        setData(response);
        setIsFavorite(response.isFavorite); // Assuming the API response includes an isFavorite field
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    console.log('Data', data);
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Wrapper>
      <Container
        maxWidth="80%"
        sx={{
          padding: '20px',
          backgroundColor: '#f9f9f9',
          marginRight: '30px',
        }}
      >
        <Box my={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              {data.title || 'Pasta with tomato'}
            </Typography>
            <IconButton onClick={handleFavoriteToggle}>
              {isFavorite ? (
                <Favorite sx={{ color: '#f880b8', fontSize: '2.5rem' }} />
              ) : (
                <FavoriteBorder sx={{ color: '#f880b8', fontSize: '2.5rem' }} />
              )}
            </IconButton>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="body1"
                component="p"
                paragraph
                sx={{ color: '#555', lineHeight: '1.6' }}
              >
                {data.description ||
                  'A light and refreshing pasta dish featuring fresh tomatoes, perfect for those hot summer days.'}
              </Typography>
              <Box
                component="img"
                src={FoodPhoto}
                alt="Pasta with tomato"
                sx={{
                  width: '50%',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  height: '450px',
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box my={2}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  Ingredients
                </Typography>
                <List>
                  {data.ingredients &&
                    data.ingredients.map((ingredient, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 0',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            marginRight: '8px',
                          }}
                        >
                          {ingredient.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#555' }}>
                          {ingredient.quantity}
                        </Typography>
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: '20px' }} />
          <Box my={2}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              How to make
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ color: '#555', lineHeight: '1.6' }}
            >
              <ol>
                {data.steps &&
                  data.steps
                    .split('\n')
                    .map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default RecipeDetails;
