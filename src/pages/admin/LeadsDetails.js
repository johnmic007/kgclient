import React from 'react';
import {
  TableRow,
  TableCell,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';

const LeadDetails = ({ lead, selectedStatus, handleStatusChange, handleChangeStatus }) => (
  <TableRow>
    <TableCell colSpan={5}>
      <Card style={{ width: '90%', margin: '0 auto' }}>
        <CardContent>
          <div style={{ marginBottom: '10px' }}>Referred by: {lead.byWhom}</div>
          <div style={{ marginBottom: '10px' }}>Referred Date: {new Date(lead.date).toLocaleDateString()}</div>
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              style={{ minWidth: 600 }} // Set the width of the Select component
            >
              <MenuItem value="received">Received</MenuItem>
              <MenuItem value="converted">Converted</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="failure">Failure</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleChangeStatus}>
            Change Status
          </Button>
        </CardContent>
      </Card>
    </TableCell>
  </TableRow>
);

export default LeadDetails;
