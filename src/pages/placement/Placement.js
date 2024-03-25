import React, { useState } from 'react';
import { Button, Card, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import './placement.css';
import Page from '../../components/Page';
import {
  BookingTotal,
  BookingCheckIn,
  BookingCheckOut,
  BookingRoomAvailable,
  BookingReservationStats,
  BookingDetails,
  BookingCheckInWidgets,
  BookingBookedRoom
} from '../../components/_dashboard/general-booking';
import useSettings from '../../hooks/useSettings';
import { AnalyticsCurrentVisits, AnalyticsWebsiteVisits } from '../../components/_dashboard/general-analytics';
import StudentsPlaced from '../../components/_dashboard/general-booking/StudentsPlaced';
import StudentTable from '../../components/_dashboard/general-booking/StudentsTable';
import TopCompanies from '../../components/Table/TopCompanies';
import { EcommerceSalesOverview } from '../../components/_dashboard/general-ecommerce';

const Placement = () => {
  const { themeStretch } = useSettings();

  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [viewMore, setViewMore] = useState(false);

  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleChangeDomain = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleViewMore = () => {
    setViewMore(!viewMore);
  };
  const handleBranch = () => {
    setSelectedDomain('');
  };

  const CATEGORY_OPTION = ['Coimbatore', 'Chennai', 'Bangalore'];
  const DOMAIN_OPTION = ['SP', 'DM', 'IMS'];

  return (
    <div>
      <Button>Back</Button>
      <div className="crumbs">
        {selectedBranch && <Button onClick={handleBranch}>{selectedBranch}</Button>}
        {!selectedBranch && (
          <FormControl sx={{ width: 300, marginBottom: 2 }}>
            <InputLabel>Overall Report</InputLabel>
            <Select value={selectedBranch} onChange={handleChange}>
              {CATEGORY_OPTION.map((classify) => (
                <MenuItem key={classify} value={classify}>
                  {classify}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {selectedDomain && <div>{selectedDomain} Report</div>}
        {selectedBranch && !selectedDomain && (
          <FormControl sx={{ width: 300, marginBottom: 2 }}>
            <InputLabel>Overall Report</InputLabel>
            <Select value={selectedDomain} onChange={handleChangeDomain}>
              {DOMAIN_OPTION.map((classify) => (
                <MenuItem key={classify} value={classify}>
                  {classify}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      {!viewMore && (
        <Page title="General: Banking | KGISL">
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <BookingTotal />
              </Grid>
              <Grid item xs={12} md={4}>
                <BookingCheckIn />
              </Grid>
              <Grid item xs={12} md={4}>
                <BookingCheckOut />
              </Grid>
              <Grid item xs={12} md={4}>
                <BookingRoomAvailable />
              </Grid>
              <Grid item xs={12} md={8}>
                <BookingCheckInWidgets />
              </Grid>
              <Grid item xs={8} md={4}>
                <AnalyticsCurrentVisits />
              </Grid>
              <Grid item xs={12} md={8}>
                {/* <BookingBookedRoom /> */}
                <EcommerceSalesOverview />
              </Grid>
              <Grid item xs={12} md={12}>
                <BookingReservationStats />
              </Grid>
              <Grid item xs={12} md={12}>
                <StudentTable />
              </Grid>
              <Grid item xs={12} md={12}>
                <TopCompanies />
              </Grid>
            </Grid>
          </Container>
        </Page>
      )}
    </div>
  );
};

export default Placement;
