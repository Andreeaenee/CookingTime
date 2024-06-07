import React, { useEffect, useState, useContext } from 'react';
import Wrapper from '../components/Wrapper';
import {
  fetchRecipesByCategory,
  fetchRecipesByIngredients,
  fetchRecipesData,
  fetchCategories
} from '../api/getRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { Grid, Container, Typography } from '@mui/material';


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
              <RecipeCard recipe={recipe} />
              </Grid>
          ))}
        </Grid>
    </Wrapper>
  );
};

export default RecipesPage;
