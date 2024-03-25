import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { BASE_URL } from '../../utils/axios';

const LeadDetails = ({ lead, selectedStatus, handleStatusChange, handleChangeStatus }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10); // Placeholder value for limit
  const [page] = useState(1); // Placeholder value for page

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/user/getUs`, { userId: lead.byWhom });
        console.log(response);
        setUser(response.data.name);
        setData(response.data);
        setEnrolled(response.data.user.courseEnrolled);
        setTotalPages(Math.ceil(response.data.totalReferrals / limit));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [lead.byWhom, page]); 

  return (
    <TableRow>
      <TableCell colSpan={5}>
        <Card style={{ width: '90%', margin: '0 auto' }}>
          <CardContent>
            <div style={{ marginBottom: '10px' }}>Referred by: {user}</div>
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
};

export default LeadDetails;
