import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { deleteShoppingList, updateShoppingList } from '../api/getShoppingLists';

const ShoppingListCard = ({ list }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedList, setEditedList] = useState({ ...list });
  const open = Boolean(anchorEl);
  const ingredientsList = JSON.parse(list.ingredients);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    handleMenuClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedList((prevList) => ({
      ...prevList,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...JSON.parse(editedList.ingredients)];
    newIngredients[index][name] = value;
    setEditedList((prevList) => ({
      ...prevList,
      ingredients: JSON.stringify(newIngredients),
    }));
  };

  const handleAddIngredient = () => {
    const newIngredients = [...JSON.parse(editedList.ingredients), { name: '', quantity: '' }];
    setEditedList((prevList) => ({
      ...prevList,
      ingredients: JSON.stringify(newIngredients),
    }));
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = [...JSON.parse(editedList.ingredients)];
    newIngredients.splice(index, 1);
    setEditedList((prevList) => ({
      ...prevList,
      ingredients: JSON.stringify(newIngredients),
    }));
  };

  const handleFormSubmit = () => {
    const sendData = {
      ingredients: editedList.ingredients,
    };
    updateShoppingList(sendData, editedList.id, false);
    handleEditClose();
    window.location.reload();
  };

  const handleDeleteShoppingList = async () => {
    await deleteShoppingList(list.id);
    window.location.reload();
  }

  return (
    <Card
      sx={{
        margin: '1rem',
        backgroundColor: '#fdefef',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold', color: '#d32f2f' }}
          >
            {list.name}
          </Typography>
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '15ch',
              },
            }}
          >
            <MenuItem onClick={handleEditOpen} sx={{ color: '#5b5b5b' }}>
              <EditIcon sx={{ marginRight: '10px' }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteShoppingList} sx={{ color: '#5b5b5b' }}>
              <DeleteIcon sx={{ marginRight: '10px' }} />
              Delete
            </MenuItem>
          </Menu>
        </div>
        <List sx={{ padding: 0 }}>
          {ingredientsList &&
            ingredientsList.map((ingredient, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  {ingredient.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {ingredient.quantity}
                </Typography>
              </ListItem>
            ))}
        </List>
      </CardContent>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Shopping List</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="List Name"
            type="text"
            fullWidth
            name="name"
            value={editedList.name}
            onChange={handleInputChange}
          />
          {JSON.parse(editedList.ingredients)?.map((ingredient, index) => (
            <div key={index} style={{ display: 'flex', marginTop: '10px' }}>
              <TextField
                margin="dense"
                label="Ingredient Name"
                type="text"
                fullWidth
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                style={{ marginRight: '10px' }}
              />
              <TextField
                margin="dense"
                label="Quantity"
                type="text"
                fullWidth
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                style={{ marginRight: '10px' }}
              />
              <IconButton onClick={() => handleDeleteIngredient(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button
            onClick={handleAddIngredient}
            color="primary"
            startIcon={<AddIcon />}
            sx={{ marginTop: '10px' }}
          >
            Add Ingredient
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ShoppingListCard;
