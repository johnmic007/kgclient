import React from 'react';
import { Card, Typography, Box } from '@material-ui/core'; // Import Box component for centering
import './style.css';
import TrainersLB from '../../components/Table/TrainersLB';

const TrainersLeaderBoard = () => {
  // Define the data object
  const data = {
    title: 'Sample Blog Post',
    author: 'John Doe',
    createdAt: '2022-02-20T12:00:00Z'
  };

  return (
    <Card sx={{ width: '60%', margin: '0 auto' }}>
      {/* Use Box component for centering */}
      <Box textAlign="center" sx={{ margin: '20px 0' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Trainers Leaders Board
        </Typography>
      </Box>
      <TrainersLB />
    </Card>
  );
};

export default TrainersLeaderBoard;
