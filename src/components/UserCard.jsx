import React from 'react';
import {Card, CardContent, Typography, Avatar, Button } from '@mui/material';


function UserCard({ user, onSelect, isSelected }) {
  return (
    <Card variant="outlined" sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2, p: 2 }}>
      <Avatar src={user.avatar} alt={user.first_name} sx={{ width: 56, height: 56, mr: 2 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="div">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Domain: {user.domain}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Gender: {user.gender}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Available: {user.available ? 'Yes' : 'No'}
        </Typography>
        <Button
          variant={isSelected ? "contained" : "outlined"}
          color="primary"
          onClick={() => onSelect(user)}
          disabled={!user.available}
        >
          {isSelected ? "Remove from Team" : "Add to Team"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserCard;
