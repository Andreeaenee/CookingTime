import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { fetchRecipeDetails, deleteRecipe, addToFavorites, removeFromFavorites } from '../api/getRecipes';
import { getShoppingLists, updateShoppingList } from '../api/getShoppingLists';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RecipeDetails = () => {
  const [data, setData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, notify } = useContext(AuthContext);
  const { userId } = useContext(AuthContext); 
  console.log('userId:', userId);

  useEffect(() => {
    fetchRecipeDetails(id)
      .then((response) => {
        setData(response);
        setIsFavorite(response.isFavorite); // Assuming the API response includes an isFavorite field
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    getShoppingLists()
      .then((response) => {
        setShoppingList(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      notify();
      return;
    }
    setIsFavorite(!isFavorite);
    try {
      if (!isFavorite) {
        const response = await addToFavorites(id,userId);
        console.log('Recipe added to favorites:', response);
      } else {
        const response = await removeFromFavorites(id);
        console.log('Recipe removed from favorites:', response);
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  const handleDelete = async () => {
    if (!isAuthenticated) {
      notify();
      return;
    }
    try {
      await deleteRecipe(id);
      navigate('/recipes');
    } catch (error) {
      alert(`Error deleting the recipe: ${error.message}`);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddToShoppingList = (listId) => {
    if (!isAuthenticated) {
      notify();
      return;
    }
    const sendData = {
      ingredients: JSON.stringify(data.ingredients),
    };
    updateShoppingList(sendData, listId, true);
    handleMenuClose();
  };

  //const imageUrl = data.image_id ? `../../../src/uploads/${data.image_id}.jpeg` : 'default-image-url.jpg';

  
  console.log('imageUrl:', imageUrl);
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
        <Box my={4} sx={{ marginRight: '100px', marginLeft: '50px' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              {data.title || 'Recipe Title'}
            </Typography>
            {isAuthenticated && (
              <Box>
                <IconButton onClick={handleFavoriteToggle}>
                  {isFavorite ? (
                    <Favorite sx={{ color: '#f880b8', fontSize: '2.5rem' }} />
                  ) : (
                    <FavoriteBorder sx={{ color: '#f880b8', fontSize: '2.5rem' }} />
                  )}
                </IconButton>
                <IconButton component={Link} to={`/edit-recipe/${id}`}>
                  <EditIcon sx={{ color: '#f880b8', fontSize: '2.5rem' }} />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{ color: '#f44336', fontSize: '2.5rem' }} />
                </IconButton>
              </Box>
            )}
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="body1"
                component="p"
                paragraph
                sx={{ color: '#555', lineHeight: '1.6' }}
              >
                {data.description || 'Recipe description goes here.'}
              </Typography>
              <Box
                component="img"
                src={data.imageUrl || 'default-image-url.jpg'}
                alt={data.title || 'Recipe Image'}
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  height: 'auto',
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
                  {data.ingredients && data.ingredients.map((ingredient, index) => (
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
                {isAuthenticated && (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleMenuOpen}
                      sx={{
                        marginTop: '16px',
                        backgroundColor: '#8361F7',
                        '&:hover': { backgroundColor: '#303f9f' },
                        fontWeight: 'bold',
                        padding: '10px 20px',
                      }}
                    >
                      Add to shopping list
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {shoppingList.map((list) => (
                        <MenuItem
                          key={list.id}
                          onClick={() => handleAddToShoppingList(list.id)}
                        >
                          {list.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                )}
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
                {data.steps && data.steps.split(/(?<!\d\.\d\.)\s(?=\d+\.\s)/).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default RecipeDetails;