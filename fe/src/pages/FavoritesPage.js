import React, { useContext, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { fetchFavoriteRecipesDetails } from '../api/getRecipes';

const FavoritesPage = () => {
  const { userId } = useContext(AuthContext); // Access userId from AuthContext

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; // Guard clause to prevent fetching if userId is not available
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
        ) : data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </Wrapper>
  );
};

export default FavoritesPage;