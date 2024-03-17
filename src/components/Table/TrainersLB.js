import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const TrainersLB = () => {
  // Sample data for demonstration
  const leaderboardData = [
    { rank: 1, name: 'John Doe' },
    { rank: 2, name: 'Jane Smith' },
    { rank: 3, name: 'Alice Johnson' },
    { rank: 4, name: 'Bob Johnson' },
    { rank: 5, name: 'Sarah Johnson' }
  ];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.rank}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainersLB;
