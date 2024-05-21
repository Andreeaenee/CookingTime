import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom'; 
import {
  fetchRecipesByCategoryByUser,
  fetchRecipesByIngredientsByUser,
  fetchRecipesByUser,
} from '../api/getRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';

const MyRecipesPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const userId = 2;

  useEffect(() => {
    fetchRecipesByUser(userId)
      .then((response) => {
        setData(response);
        setFilteredData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
        fetchRecipesByCategoryByUser(id, userId)
          .then((response) => {
            setFilteredData(response);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
      case 'ingredient':
        fetchRecipesByIngredientsByUser(id, userId)
          .then((response) => {
            const filteredRecipes = data.filter(recipe => 
              response.some(ingredient => recipe.ingredients.includes(ingredient))
            );
            setFilteredData(filteredRecipes);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        break;
      default:
        fetchRecipesByUser(userId)
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
        <Link
          to="/add-recipe"
          style={{
            textDecoration: 'none',
            padding: '10px 20px',
            backgroundColor: '#805ad5',
            border: 'none',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '16px',
          }}
        >
          Add Recipe
        </Link>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {filteredData.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </Wrapper>
  );
};

export default MyRecipesPage;
