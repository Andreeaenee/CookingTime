import React, { useEffect, useState, useContext } from 'react'; // Step 1
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axiosFetch from '../api/Axios';
import { fetchRecipesCategory, fetchRecipesIngredients } from '../api/getRecipes';
import { AuthContext } from '../context/AuthContext'; // Step 2

const AddRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([{ id: '', quantity: '' }]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const { userId } = useContext(AuthContext); // Step 3

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchRecipesCategory();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    const fetchIngredients = async () => {
      try {
        const response = await fetchRecipesIngredients();
        setIngredientsList(response);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    if (name === "quantity") {
      newIngredients[index].quantity = value;
    } else {
      newIngredients[index].id = value; // Assign ingredient ID
    }
    setIngredients(newIngredients);
    console.log('Ingredients:', ingredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: '', quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('steps', steps);
    formData.append('categoryId', parseInt(selectedCategory)); 
    formData.append('userId', userId); // Step 4
  
    // Append the image file
    if (image) {
      formData.append('image', image);  // Key should match backend expectation
    }
  
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][id]`, ingredient.id); // Add ingredient ID
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });
  
    try {
      const response = await axiosFetch({
        method: 'POST',
        url: 'http://localhost:8080/recipes',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Recipe added successfully:', response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
 
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Add Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Steps"
            fullWidth
            multiline
            rows={4}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <MenuItem key="" value="">Select a category</MenuItem>
              {categories.map((cat) => (
                <MenuItem
                  key={cat.category_id}
                  value={cat.category_id}
                >
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {ingredients.map((ingredient, index) => (
            <Box key={index} display="flex" mt={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ingredient</InputLabel>
                <Select
                  value={ingredient.id}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                >
                  <MenuItem key="" value="">Select an ingredient</MenuItem>
                  {ingredientsList.map((ing) => (
                    <MenuItem key={ing.id} value={ing.id}>{ing.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Quantity"
                name="quantity"
                value={ingredient.quantity}
                onChange={(event) => handleIngredientChange(index, event)}
                required
                fullWidth
                margin="normal"
              />
            </Box>
          ))}
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              component="label"
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Button component={Link} to="/my-recipes" variant="outlined" color="primary">
            Go to My Recipes
            </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddRecipePage;
    
