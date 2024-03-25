import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import { useParams } from 'react-router';
import { BASE_URL } from '../../utils/axios';

const ViewMore = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const { userId } = useParams();
  const [page, setPage] = useState(1); // Initialize page state
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const limit = 5; // Set the limit per page
  const [enrolled, setEnrolled] = useState(false); // Initialize courseEnrolled state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/user/getmyreferal`, { userId, page, limit });
        setUser(response.data.referrals);
        setData(response.data.user);
        setEnrolled(response.data.user.courseEnrolled);
        setTotalPages(Math.ceil(response.data.totalReferrals / limit)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId, page]); 

  useEffect(() => {
    const changeStatus = async () => {
      try {
        await axios.post(`${BASE_URL}/user/editstatus`, { courseEnrolled: enrolled, userId: data._id });
        console.log('Course enrollment status updated successfully');
      } catch (error) {
        console.error('Error updating course enrollment status:', error);
      }
    };

    changeStatus();
  }, [enrolled, data]); // Include enrolled and data in the dependency array

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleClose = () => {
    window.location.href = `${BASE_URL}/dashboard/allusers`;
  };

  const handleStatusChange = (event) => {
    setEnrolled(event.target.value === 'Yes');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received':
        return '#FFC107'; // Green
      case 'converted':
        return '#F44336'; // Red
      case 'success':
        return '#4CAF50'; // Yellow
      default:
        return '#000000'; // Black (default)
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(data)

  const handleEdit = ()=>{}

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1); // Generate array of page numbers

  return (
    <>
<Card>
<Grid container spacing={2} m={5}>
  <Grid item xs={12} sm={6}>
    {data && (
        <CardContent>
          <Typography variant="h3" gutterBottom >
            User Information
          </Typography>
          <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
            <strong>Name:</strong> {data.name}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
            <strong>Email:</strong> {data.email}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
            <strong>Batch:</strong> {data.batch}
          </Typography>

        </CardContent>
    )}
  </Grid>
  <Grid item xs={12} mt={5} sm={6}>
    {data && (
        <CardContent>
        <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
            <strong>Course:</strong> {data.course}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ fontSize: '1.3rem' }}>
          <Typography variant="body3" gutterBottom style={{ fontSize: '1.3rem' }}>
  <strong>Course Enrolled</strong> {data.courseEnrolled ? "Yes" : "No"}
</Typography>

          </Typography>
          <Typography variant="body3" gutterBottom style={{ fontSize: '1.3rem' }}>
            <strong>Number of Referrals:</strong> {data.numberOfReferrals}
          </Typography><br />
        </CardContent>
    )}
  </Grid>
</Grid>
</Card>
  

      <Card sx={{ p: 3, minWidth: 300, margin: '60px' }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
          </Grid> */}
            <Grid item xs={12} sm={6}>
              {/* Add styling and layout for the second column here */}
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Course Suggestion</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((userData) => (
                  <TableRow key={userData._id}>
                    <TableCell>{userData.id}</TableCell>
                    <TableCell>{userData.friendName}</TableCell>
                    <TableCell>{userData.email}</TableCell>
                    <TableCell>{userData.courseSuggestion}</TableCell>
                    <TableCell>{userData.phoneNumber}</TableCell>
                    <TableCell style={{ color: getStatusColor(userData.status) }}>{userData.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Button disabled={page === 1} onClick={handlePrevPage}>
              Previous
            </Button>
            {pageNumbers.map((pageNumber) => (
              <Button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
                {pageNumber}
              </Button>
            ))}
            <Button disabled={page === totalPages} onClick={handleNextPage}>
              Next
            </Button>
          </div>
          <Button onClick={handleClose}>Close</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewMore;
