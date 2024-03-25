import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { useTheme, styled, alpha, Box, Card, Stack, Divider, Typography, Button, Container, Grid } from '@material-ui/core';

const LICENSES = ['Refer 1 friend', 'Refer 3 friends', 'Refer 5 or more'];

const PLANS = [
  {
    license: LICENSES[0],
    commons: ['Simple as it gets. Bring a friend into any of our courses, and earn a cash prize of ₹2,000'],
    options: [],
    icons: ['static/home/rupee.png']
  },
  {
    license: LICENSES[1],
    commons: ['Go big! Complete 3 successful referrals, you can win a Smartwatch worth ₹8000.'],
    options: [],
    icons: ['static/home/smartwatch.png']
  },
  {
    license: LICENSES[2],
    commons: ['Go bigger! Refer 5 or more friends successfully and win a Lenovo Tab or Smartphone worth ₹15000!'],
    options: [],
    icons: ['static/home/ipad.png']
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

PlanCard.propTypes = {
  plan: PropTypes.shape({
    license: PropTypes.string,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  indexp: PropTypes.number.isRequired
};

function PlanCard({ plan, indexp }) {
  const theme = useTheme();
  const { license, commons, options, icons } = plan;

  const isLight = theme.palette.mode === 'light';

  return (
    <Card
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: 'linear-gradient(to right top, #051937, #002253, #002a70, #04318d, #2436aa)',
        boxShadow: (theme) => `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.12)}`
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" sx={{ mb: 2, color: 'text.disabled', display: 'block' }}>
            REFERRAL
          </Typography>
          <Typography variant="h4" sx={{ color: 'white' }}>{license}</Typography>
        </div>

        <Stack direction="row" spacing={1}>
          {icons.map((icon, index) => (
            <Box key={index} component="img" src={icon} sx={{ width: 60, height: 60 }} />
          ))}
        </Stack>

        <Stack spacing={2.5}>
          {commons.map((option, index) => (
            <Stack key={index} spacing={1.5} direction="row" alignItems="center">
              <Box component={Icon} sx={{ color: 'primary.main', width: 20, height: 20 }} />
              <Typography style={{ fontSize: 18, color: 'white' }}>{option}</Typography>
            </Stack>
          ))}
        </Stack>
        {indexp ===2 ? '' : <br />}
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={2.5} alignItems="flex-end">
          {options.map((option, index) => (
            <Stack spacing={1.5} direction="row" alignItems="center" key={index}>
              <Box
                component={Icon}
                icon={checkmarkFill}
                sx={{
                  width: 20,
                  height: 20,
                  color: 'primary.main',
                }}
              />
              <Typography variant="h5" sx={{ color: 'white' }}>{option}</Typography>
            </Stack>
          ))}
          <Button
  size="large"
  target="_blank"
  href="http://referral.microcollege.in/app"
  sx={{ backgroundColor: 'white', color: '#29166F', borderColor: 'white', '&:hover': { backgroundColor: 'white', opacity: 0.7 } }}
>
  Refer Now
</Button>


        </Stack>
      </Stack>
    </Card>
  );
}

export default function LandingPricingPlans() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Referral Plans
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {PLANS.map((plan, indexp) => (
            <Grid key={plan.license} item xs={12} md={4}>
              <PlanCard plan={plan} indexp={indexp } />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
