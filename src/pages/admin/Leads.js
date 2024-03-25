import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  TablePagination,
  TableFooter,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import LeadDetails from './LeadsDetails';
import { BASE_URL } from '../../utils/axios';

const Leads = () => {
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [leadsData, setLeadsData] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/getAllReferals`,
          { page: page + 1, limit: 5 } // Include page and limit in the request body
        );
        console.log(response);
        setLeadsData(response.data.referrals);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  const handleButtonClick = (leadId) => {
    setSelectedLeadId((prevLeadId) => (prevLeadId === leadId ? null : leadId));
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received':
        return '#4CAF50'; // Green
      case 'converted':
        return '#F44336'; // Red
      case 'success':
        return '#FFC107'; // Yellow
      default:
        return '#000000'; // Black (default)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" component="h2" gutterBottom>
          Referrals
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadsData.map((lead) => (
                <React.Fragment key={lead._id}>
                  <TableRow>
                    <TableCell>
                      <a href={`/dashboard/user/profile/${lead._id}`}>{lead.friendName}</a>
                    </TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: 'inline-block',
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: getStatusColor(lead.status),
                          marginRight: 8
                        }}
                      />
                      {lead.status}
                    </TableCell>
                    <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleButtonClick(lead._id)}>
                        {selectedLeadId === lead._id ? 'Hide Details' : 'Show Details'}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {selectedLeadId === lead._id && (
                    <Modal
                      open={isModalOpen}
                      onClose={handleModalClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Fade in={isModalOpen}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: 20 }}>
                          <LeadDetails
                            lead={lead}
                            selectedStatus={selectedStatus}
                            setSelectedStatus={setSelectedStatus}
                          />
                        </div>
                      </Fade>
                    </Modal>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={3}
                  count={totalPages * 5}
                  rowsPerPage={5}
                  page={page}
                  onChangePage={handleChangePage}
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                  labelRowsPerPage=""
                  ActionsComponent={(props) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button onClick={handlePrevPage} disabled={page === 0}>
                        Prev
                      </Button>
                      {Array.from(Array(totalPages).keys()).map((pageNum) => (
                        <Button key={pageNum} onClick={() => setPage(pageNum)} disabled={pageNum === page}>
                          {pageNum + 1}
                        </Button>
                      ))}
                      <Button onClick={handleNextPage} disabled={page === totalPages - 1}>
                        Next
                      </Button>
                    </div>
                  )}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Leads;
