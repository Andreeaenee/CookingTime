import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#f5f5f5',
        },
      }}
      variant="permanent"
    >
      <div sx={{ height: 64 }} /> {/* Height of your toolbar */}
      <List>
        <ListItem button component={Link} to="/recipes">
          <ListItemText primary="Recipes" />
        </ListItem>
        <ListItem button component={Link} to="/my-recipes">
          <ListItemText primary="My Recipes" />
        </ListItem>
        <ListItem button component={Link} to="/favorites">
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button component={Link} to="/shopping-list">
          <ListItemText primary="Shopping List" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
