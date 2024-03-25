import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, IconButton, Collapse, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import MiniCard from '../../components/_dashboard/students-life-cycle/MiniCard';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';

const data = {
  mode_wise: [
    {
      id: 1,
      name: 'online',
      domain: [
        {
          id: 1,
          name: 'software programming',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        },
        {
          id: 2,
          name: 'Digital marketing',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        }
      ]
    },
    {
      id: 2,
      name: 'offline',
      domain: [
        {
          id: 1,
          name: 'software programming',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        },
        {
          id: 2,
          name: 'Digital marketing',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        }
      ]
    }
  ],
  branch_wise: [
    {
      id: 1,
      name: 'coimbatore',
      domain: [
        {
          id: 1,
          name: 'software programming',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        },
        {
          id: 2,
          name: 'Digital marketing',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        }
      ]
    },
    {
      id: 2,
      name: 'chennai',
      domain: [
        {
          id: 1,
          name: 'software programming',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        },
        {
          id: 2,
          name: 'Digital marketing',
          total_no_of_students: 200,
          total_no_of_active_students: 119,
          total_no_of_batch: 10,
          total_no_of_active_batch: 5
        }
      ]
    }
  ]
};

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(5, 0)
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  domainContainer: {
    marginBottom: theme.spacing(2)
  },
  modeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  modeTitle: {
    flexGrow: 1
  },
  modeIcon: {
    transition: 'transform 0.3s ease'
  },
  expanded: {
    transform: 'rotate(180deg)'
  }
}));

const StudentsLifeCycle = () => {
  const { themeStretch } = useSettings();
  const classes = useStyles();
  const [expandedMode, setExpandedMode] = useState(null);

  // Data object containing the total numbers
  const totalData = {
    total_no_of_students: 1000,
    total_no_of_active_students_ongoing_batches: 300,
    total_no_of_domains: 5,
    total_no_of_branch: 6,
    total_no_of_batches: 30,
    total_no_of_active_batches: 12
  };

  // Array of objects containing label and value for MiniCards
  const miniCardData = [
    { label: 'Total Students', value: totalData.total_no_of_students },
    { label: 'Active Students', value: totalData.total_no_of_active_students_ongoing_batches },
    { label: 'Total Domains', value: totalData.total_no_of_domains },
    { label: 'Total Branches', value: totalData.total_no_of_branch },
    { label: 'Total Batches', value: totalData.total_no_of_batches },
    { label: 'Active Batches', value: totalData.total_no_of_active_batches }
  ];

  const handleExpandMode = (modeId) => {
    setExpandedMode(expandedMode === modeId ? null : modeId);
  };

  return (
    <Page title="General: Banking | KGISL">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" className={classes.heading}>
          Students Life Cycle
        </Typography>
        <Grid container spacing={3}>
          {/* Map over the miniCardData array to render MiniCard components */}
          {miniCardData.map((item, index) => (
            <Grid item key={index} xs={12} md={4}>
              <MiniCard label={item.label} value={item.value.toString()} /> {/* Convert value to string */}
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container>
        <Typography variant="h4" gutterBottom>
          Mode-wise Statistics
        </Typography>
        {data.mode_wise.map((mode) => (
          <Paper key={mode.id} className={classes.paper}>
            <Button className={classes.modeHeader} onClick={() => handleExpandMode(mode.id)}>
              <Typography variant="h5" className={classes.modeTitle}>
                {mode.name}
              </Typography>
              <IconButton
                className={`${classes.modeIcon} ${expandedMode === mode.id ? classes.expanded : ''}`}
                aria-expanded={expandedMode === mode.id}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Button>
            <Collapse in={expandedMode === mode.id} timeout="auto" unmountOnExit>
              <Grid container spacing={2} className={classes.domainContainer}>
                {mode.domain.map((domain) => (
                  <Grid item xs={12} sm={6} key={domain.id}>
                    <Typography variant="subtitle1">{domain.name}</Typography>
                    <Typography>Total Students: {domain.total_no_of_students}</Typography>
                    <Typography>Active Students: {domain.total_no_of_active_students}</Typography>
                    <Typography>Total Batches: {domain.total_no_of_batch}</Typography>
                    <Typography>Active Batches: {domain.total_no_of_active_batch}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Paper>
        ))}

        <Typography variant="h4" gutterBottom>
          Branch-wise Statistics
        </Typography>
        {data.branch_wise.map((branch) => (
          <Paper key={branch.id} className={classes.paper}>
            <Typography variant="h5">{branch.name}</Typography>
            <Grid container spacing={2} className={classes.domainContainer}>
              {branch.domain.map((domain) => (
                <Grid item xs={12} sm={6} key={domain.id}>
                  <Typography variant="subtitle1">{domain.name}</Typography>
                  <Typography>Total Students: {domain.total_no_of_students}</Typography>
                  <Typography>Active Students: {domain.total_no_of_active_students}</Typography>
                  <Typography>Total Batches: {domain.total_no_of_batch}</Typography>
                  <Typography>Active Batches: {domain.total_no_of_active_batch}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
      </Container>
    </Page>
  );
};

export default StudentsLifeCycle;
