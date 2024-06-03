import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ShoppingListCard = ({ list }) => {
  const ingredientsList = JSON.parse(list.ingredients);

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
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
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
    </Card>
  );
};

export default ShoppingListCard;
