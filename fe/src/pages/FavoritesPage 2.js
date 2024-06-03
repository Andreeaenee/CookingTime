import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';
import {
  fetchFavoriteRecipesByCategory,
  fetchFavoriteRecipesByIngredients,
  fetchFavoriteRecipesByUser,
} from '../api/getRecipes';

const FavoritesPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const userId = 2; // Replace with the actual user ID

  useEffect(() => {
    fetchFavoriteRecipesByUser(userId)
      .then((response) => {
        setData(response);
        setFilteredData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    //   fetchRecipeDetails(id)
    //   .then((response) => {
    //     setData(response);
    //     setIsFavorite(response.isFavorite); // Assuming the API response includes an isFavorite field
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
    
  }, [userId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
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
        fetchFavoriteRecipesByCategory(id, userId)
          .then((response) => {
            setFilteredData(response);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
      case 'ingredient':
        fetchFavoriteRecipesByIngredients(id, userId)
          .then((response) => {
            const filteredRecipes = response.filter((recipe) =>
              data.some((item) => item.id === recipe.id)
            );
            setFilteredData(filteredRecipes);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
      default:
        fetchFavoriteRecipesByUser(userId)
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


  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <SearchBar onSearch={handleSearch} />
          <div style={{ marginLeft: '10px' }}>
            <FilterButton onFilterClick={handleFilter} />
          </div>
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {filteredData.length > 0 ? (
          filteredData.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </Wrapper>
  );
};

export default FavoritesPage;
