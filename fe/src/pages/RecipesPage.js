import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import {
  fetchRecipesByCategory,
  fetchRecipesByIngredients,
  fetchRecipesData,
} from '../api/getRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';

const RecipesPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <Wrapper>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          marginBottom: 2,
        }}
      >
        <div
          sx={{
            display: 'flex',

            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex' }}>
            <SearchBar onSearch={handleSearch} />
            <div style={{ marginLeft: '10px' }}>
              <FilterButton onFilterClick={handleFilter} />
            </div>
          </div>
        </div>
        <div
          sx={{
            width: '100%',
            maxWidth: 600,
            marginTop: 2,
          }}
        >
          {filteredData.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default RecipesPage;
