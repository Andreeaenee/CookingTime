import React, { useEffect, useState, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const MyRecipesPage = () => {
  const { userId } = useContext(AuthContext); // Access userId from AuthContext

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Print the user ID to the console
  console.log('Current user ID:', userId);

  useEffect(() => {
    if (userId) {
      fetchRecipesByUser(userId)
        .then((response) => {
          setData(response);
          setFilteredData(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching recipes.');
          setLoading(false);
        });
    }
  }, [userId]);

  console.log('Fetching recipes for user ID:', userId);

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
    setLoading(true);
    switch (filter) {
      case 'category':
        fetchRecipesByCategoryByUser(id, userId)
          .then((response) => {
            if (response.message) {
              setFilteredData([]); // No recipes found
              setError(response.message);
            } else {
              setFilteredData(response);
              setError(null);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setError('Error fetching recipes.');
            setLoading(false);
          });
        break;
      case 'ingredient':
        fetchRecipesByIngredientsByUser(id, userId)
          .then((response) => {
            const filteredRecipes = response.filter(recipe =>
              data.some(dataRecipe => dataRecipe.id === recipe.id)
            );
            if (filteredRecipes.length === 0) {
              setFilteredData([]); // No recipes found
              setError('No recipes found for the given ingredient.');
            } else {
              setFilteredData(filteredRecipes);
              setError(null);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setError('Error fetching recipes.');
            setLoading(false);
          });
        break;
      default:
        fetchRecipesByUser(userId)
          .then((response) => {
            setData(response);
            setFilteredData(response);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setError('Error fetching recipes.');
            setLoading(false);
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
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div style={{ width: '100%', maxWidth: '600px' }}>
          {filteredData.length === 0 ? (
            <div>No recipes found for the given category and user ID.</div>
          ) : (
            filteredData.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default MyRecipesPage;