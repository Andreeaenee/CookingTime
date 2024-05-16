import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {
  fetchRecipesCategory,
  fetchRecipesIngredients,
} from '../api/getRecipes';
import './style.css';
import { capitalize } from '@mui/material';

const FilterButton = ({ onFilterClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuCategoryAnchorEl, setSubMenuCategoryAnchorEl] = useState(null);
  const [subMenuIngredientsAnchorEl, setSubMenuIngredientsAnchorEl] =
    useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [choosedoption, setChoosedOption] = useState('');

  useEffect(() => {
    fetchRecipesCategory()
      .then((response) => {
        setFilteredData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    fetchRecipesIngredients()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClick = (event) => {
    event.currentTarget.innerText === 'Category'
      ? setSubMenuCategoryAnchorEl(event.currentTarget)
      : setSubMenuIngredientsAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubMenuCategoryAnchorEl(null);
    setSubMenuIngredientsAnchorEl(null);
  };

  const handleSubMenuOptionClick = (event, filter) => {
    if (event && event.currentTarget) {
      const itemId = event.currentTarget.getAttribute('id');
      setChoosedOption(event.currentTarget.innerText);
      onFilterClick(itemId, filter);
      handleSubMenuClose();
    }
  };

  const handleClearFilter = () => {
    setChoosedOption('');
    onFilterClick(null, null);
    handleSubMenuClose();
    // Additional logic to clear filters
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterClick}
          sx={{
            bgcolor: '#8361F7',
            color: 'white',
            borderRadius: '7px',
            height: '40px',
            py: '8px',
            px: '20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              bgcolor: '#303f9f',
            },
          }}
        >
          <span style={{ textTransform: 'capitalize' }}>
            {choosedoption ? choosedoption : 'Filter'}
          </span>
        </Button>

        {choosedoption && (
          <IconButton
            onClick={handleClearFilter}
            size="small"
            sx={{ marginLeft: '10px' }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            marginTop: '8px',
            minWidth: '120px',
            borderRadius: '8px',
          },
        }}
      >
        <MenuItem
          sx={{
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
          onClick={handleSubMenuClick}
        >
          Category
        </MenuItem>
        <MenuItem
          sx={{
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
          onClick={handleSubMenuClick}
        >
          Ingredient
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={subMenuCategoryAnchorEl}
        open={Boolean(subMenuCategoryAnchorEl)}
        onClose={handleSubMenuClose}
        className="custom-menu-style"
      >
        {filteredData.map((cat) => (
          <MenuItem
            onClick={(event) => handleSubMenuOptionClick(event, 'category')}
            key={cat.category_id}
            id={cat.category_id}
          >
            {cat.title}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={subMenuIngredientsAnchorEl}
        open={Boolean(subMenuIngredientsAnchorEl)}
        onClose={handleSubMenuClose}
        className="custom-menu-style"
      >
        {data.map((ing) => (
          <MenuItem
            onClick={(event) => handleSubMenuOptionClick(event, 'ingredient')}
            key={ing.id}
            id={ing.id}
          >
            {ing.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterButton;
