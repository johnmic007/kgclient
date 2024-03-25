import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Select, MenuItem, Button } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/axios';

const UserP = () => {
  const { leadId } = useParams();

  console.log(leadId);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit=4;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/user/getUserById`, { userId:leadId });
        console.log(response)
        setUser(response.data.referrals);
        setData(response.data);
        setEnrolled(response.data.user.courseEnrolled);
        setTotalPages(Math.ceil(response.data.totalReferrals / limit));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [leadId, page]); 

  const handleStatusChange = (event) => {
    setEnrolled(event.target.value === 'Yes');
  };

  const handleEdit = () => {
    // Handle edit logic
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {leadId}</p>
      <Card>
        <Grid container spacing={2} m={5}>
          <Grid item xs={12} sm={6}>
            {data && (
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  User Information
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
                  <strong>Name:</strong> {data.friendName}
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
                  <strong>Email:</strong> {data.email}
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
                  <strong>Suggested course:</strong> {data.courseSuggestion}
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
                  <strong>status:</strong> {data.status}
                </Typography>
                <Typography variant="body3" gutterBottom style={{ fontSize: '1.3rem' }}>
                  <strong>phone Number :</strong> {data.phoneNumber}
                </Typography>
              </CardContent>
            )}
          </Grid>
          {/* <Grid item xs={12} mt={5} sm={6}>
            {data && (
              <CardContent>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
                  <strong>Course Enrolled:</strong>{' '}
                  <Select
                    value={enrolled ? 'Yes' : 'No'}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </Typography>

                
              </CardContent>
            )}
          </Grid> */}
        </Grid>
      </Card>
    </div>
  );
};

export default UserP;
