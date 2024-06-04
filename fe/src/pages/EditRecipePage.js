import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { fetchRecipesData, fetchRecipesCategory, fetchRecipesIngredients, updateRecipeData } from '../api/getRecipes';
import Wrapper from '../components/Wrapper';

const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    categoryId: '',
    ingredients: [],
    steps: '', // Initially set to an empty string
    categoryName: '', // Category name
  });
  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await fetchRecipesData();
        const selectedRecipe = recipes.find((recipe) => recipe.id === Number(id));
        setRecipe({
          ...selectedRecipe,
          steps: selectedRecipe.steps // Set the steps value from the selected recipe
        });
        console.log('Selected Recipe:', selectedRecipe); // Add this line to check the value of selectedRecipe
        const categories = await fetchRecipesCategory();
        console.log('Categories:', categories); // Add this line to check the value of categories
        setCategories(categories);
  
        const ingredients = await fetchRecipesIngredients();
        const selectedRecipeIngredients = selectedRecipe.ingredients.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.quantity
        }));
        setIngredientsList(ingredients);
        setRecipe(prevState => ({ ...prevState, ingredients: selectedRecipeIngredients }));
  
        // Retrieve and set category name
        const categoryName = getCategoryName(selectedRecipe.category_id, categories);
        console.log('Category Id:', selectedRecipe.categoryId); // Add this line to check the value of categoryName
        console.log('Category Name:', categoryName); // Add this line to check the value of categoryName
        setRecipe(prevState => ({ ...prevState, categoryName }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);
  

  const getCategoryName = (categoryId, categories) => {
    console.log('Category ID:', categoryId);
    console.log('Categories:', categories);
    
    const category = categories.find(cat => cat.category_id === categoryId);
    console.log('Category:', category);
    
    return category ? category.title : 'Unknown Category';
  };

  
  

  const handleTitleChange = (e) => {
    setRecipe({ ...recipe, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setRecipe({ ...recipe, description: e.target.value });
  };

  const handleIngredientChange = (index, key, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][key] = value;
    console.log('Updated Ingredients:', updatedIngredients); // Add this line to check the value of updatedIngredients
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { id: '', quantity: '' }] });
  };

  const handleStepsChange = (e) => {
    setRecipe({ ...recipe, steps: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setRecipe({ ...recipe, categoryId: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await updateRecipeData(recipe);
      console.log('Changes saved:', recipe);
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Edit Recipe
          </Typography>
          <form onSubmit={handleSaveChanges}>
            <TextField
              label="Title"
              fullWidth
              value={recipe.title}
              onChange={handleTitleChange}
              required
              margin="normal"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={recipe.description}
              onChange={handleDescriptionChange}
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>{recipe.categoryName ? recipe.categoryName : 'Category'}</InputLabel>
              <Select
                value={recipe.categoryId}
                onChange={handleCategoryChange}
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
            <Box mt={2}>
              <Typography variant="h5" gutterBottom>
                Ingredients
              </Typography>
              {recipe.ingredients.map((ingredient, index) => (
                <Box key={index} display="flex" mt={2}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{ingredient.name || 'Ingredient'}</InputLabel>
                    <Select
                      value={ingredient.id}
                      onChange={(e) => handleIngredientChange(index, 'id', e.target.value)}
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
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                  />
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddIngredient}
              style={{ marginTop: '20px' }}
            >
              Add Ingredient
            </Button>
            <TextField
              label="Steps"
              fullWidth
              multiline
              rows={4}
              value={recipe.steps}
              onChange={handleStepsChange}
              required
              margin="normal"
              style={{ marginTop: '20px' }}
            />
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
        </Paper>
      </Container>
    </Wrapper>
  );
};

export default EditRecipePage;
