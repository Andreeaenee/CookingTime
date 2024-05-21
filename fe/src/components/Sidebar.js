import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const buttons = [
  { text: 'Recipes', link: '/recipes' },
  { text: 'My Recipes', link: '/my-recipes' },
  { text: 'Favorites', link: '/favorites' },
  { text: 'Shopping List', link: '/shopping-list' },
  { text: 'Login', link: '/login' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#f5e6f7', // pale purple background
          color: '#333', // text color
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)', // subtle shadow
        },
      }}
      variant="permanent"
    >
      <div sx={{ height: 64 }} /> {/* Height of your toolbar */}
      <List sx={{ marginTop: 2 }}> {/* Add margin-top to the list */}
        {buttons.map((button) => (
          <ListItem
            key={button.text}
            button
            component={Link}
            to={button.link}
            sx={{
              backgroundColor: location.pathname.includes(button.link) ? '#d3c3e7' : 'inherit', // active button color
              '&:hover': {
                backgroundColor: '#d3c3e7', // darker pale purple on hover
              },
              marginBottom: 1, // Add margin-bottom to the list items
              borderRadius: 1, // Add slight border radius to list items
            }}
          >
            <ListItemText
              primary={button.text}
              sx={{
                fontFamily: 'Arial, sans-serif', // Set font
                color: location.pathname.includes(button.link) ? '#000' : '#333', // Active and default text color
                fontWeight: location.pathname.includes(button.link) ? 'bold' : 'normal', // Bold text for active item
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
