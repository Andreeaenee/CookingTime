import React, { useEffect, useState, useContext } from 'react';
import Wrapper from '../components/Wrapper';
import {
  fetchRecipesByCategory,
  fetchRecipesByIngredients,
  fetchRecipesData,
  addToFavorites,
} from '../api/getRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';
import { Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const RecipesPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { isAuthenticated, notify } = useContext(AuthContext); // Use context for authentication

  useEffect(() => {
    fetchRecipesData()
      .then((response) => {
        setData(response);
        setFilteredData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (query) => {
    if (query.length >= 3) {
      const filteredRecipes = data.filter((recipe) =>
        recipe.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredData(filteredRecipes);
    } else {
      setFilteredData(data);
    }
  };

  const handleFilter = (id, filter) => {
    switch (filter) {
      case 'category':
        fetchRecipesByCategory(id)
          .then((response) => {
            setFilteredData(response);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
      case 'ingredient':
        fetchRecipesByIngredients(id)
          .then((response) => {
            setFilteredData(response);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
      default:
        fetchRecipesData()
          .then((response) => {
            setData(response);
            setFilteredData(response);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
    }
  };

  const handleAddToFavorites = (recipeId) => {
    if (!isAuthenticated) {
      notify();
      return;
    }
    addToFavorites(recipeId)
      .then(() => {
        // Handle successful addition to favorites
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
      });
  };

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <div style={{ marginLeft: '10px' }}>
          <FilterButton onFilterClick={handleFilter} />
        </div>
      </div>
      <Grid container spacing={4}>
        {filteredData.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              onAddToFavorites={() => handleAddToFavorites(recipe.id)}
              onEdit={() => console.log(`Edit recipe ${recipe.id}`)} // Placeholder for edit functionality
              onDelete={() => console.log(`Delete recipe ${recipe.id}`)} // Placeholder for delete functionality
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default RecipesPage;
