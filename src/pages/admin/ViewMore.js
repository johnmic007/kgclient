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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Collapse // Import Collapse from Material-UI
} from '@material-ui/core';
import { useParams } from 'react-router';
import LeadDetails from './LeadsDetails'; // Import LeadDetails component

const ViewMore = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [page, setPage] = useState(1); // Initialize page state
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const limit = 5; // Set the limit per page

  const [lead, setLead] = useState(null); // Define lead state
  const [selectedStatus, setSelectedStatus] = useState(''); // Define selectedStatus state
  const [open, setOpen] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:5000/user/getmyreferal', { userId, page, limit });
        setUser(response.data.referrals);
        setTotalPages(Math.ceil(response.data.totalReferrals / limit)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId, page]); // Include page and userId in the dependency array

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
    window.location.href = 'http://localhost:3000/dashboard/allusers';
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeStatus = () => {
    // Your logic for updating lead status here
    console.log('Changing status...');
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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1); // Generate array of page numbers

  return (
    <Card sx={{ p: 3, minWidth: 300, margin: '60px' }}>
      <CardContent>
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
  );
};

export default ViewMore;
