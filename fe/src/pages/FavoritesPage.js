import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import RecipeCard from '../components/RecipeCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';
import { fetchFavoriteRecipesDetails, fetchFavoriteRecipesByCategory, fetchFavoriteRecipesByIngredients } from '../api/getRecipes';

const FavoritesPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = 2; // Replace with the actual user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesDetails = await fetchFavoriteRecipesDetails(userId);
        setData(recipesDetails);
        setFilteredData(recipesDetails);
      } catch (error) {
        console.error('Error fetching favorite recipes details:', error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      const filteredRecipes = data.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filteredRecipes);
    } else {
      setFilteredData(data);
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
