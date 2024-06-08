// src/components/Sidebar.js
import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated, notify } = useContext(AuthContext);

  const handleLogout = () => {
    if (isAuthenticated) {
      logout(navigate);
    } else {
      notify();
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#f5e6f7',
          color: '#333',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        },
      }}
      variant="permanent"
    >
      <div sx={{ height: 64 }} />
      <List sx={{ marginTop: 2 }}>
        <ListItem
          button
          component={Link}
          to="/recipes"
          sx={{
            backgroundColor: location.pathname === '/recipes' ? '#d3c3e7' : 'inherit',
            '&:hover': { backgroundColor: '#d3c3e7' },
            marginBottom: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText
            primary="Recipes"
            sx={{
              fontFamily: 'Arial, sans-serif',
              color: location.pathname === '/recipes' ? '#000' : '#333',
              fontWeight: location.pathname === '/recipes' ? 'bold' : 'normal',
            }}
          />
        </ListItem>

        {isAuthenticated && (
          <>
            <ListItem
              button
              component={Link}
              to="/my-recipes"
              sx={{
                backgroundColor: location.pathname === '/my-recipes' ? '#d3c3e7' : 'inherit',
                '&:hover': { backgroundColor: '#d3c3e7' },
                marginBottom: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary="My Recipes"
                sx={{
                  fontFamily: 'Arial, sans-serif',
                  color: location.pathname === '/my-recipes' ? '#000' : '#333',
                  fontWeight: location.pathname === '/my-recipes' ? 'bold' : 'normal',
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/shopping-list"
              sx={{
                backgroundColor: location.pathname === '/shopping-list' ? '#d3c3e7' : 'inherit',
                '&:hover': { backgroundColor: '#d3c3e7' },
                marginBottom: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary="Shopping List"
                sx={{
                  fontFamily: 'Arial, sans-serif',
                  color: location.pathname === '/shopping-list' ? '#000' : '#333',
                  fontWeight: location.pathname === '/shopping-list' ? 'bold' : 'normal',
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/favorites"
              sx={{
                backgroundColor: location.pathname === '/favorites' ? '#d3c3e7' : 'inherit',
                '&:hover': { backgroundColor: '#d3c3e7' },
                marginBottom: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary="Favorites"
                sx={{
                  fontFamily: 'Arial, sans-serif',
                  color: location.pathname === '/favorites' ? '#000' : '#333',
                  fontWeight: location.pathname === '/favorites' ? 'bold' : 'normal',
                }}
              />
            </ListItem>
          </>
        )}

        <ListItem
          button
          onClick={isAuthenticated ? handleLogout : () => navigate('/login')}
          sx={{
            backgroundColor: isAuthenticated ? 'inherit' : 'inherit',
            '&:hover': { backgroundColor: '#d3c3e7' },
            marginBottom: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText
            primary={isAuthenticated ? 'Logout' : 'Login'}
            sx={{
              fontFamily: 'Arial, sans-serif',
              color: '#333',
              fontWeight: 'normal',
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
