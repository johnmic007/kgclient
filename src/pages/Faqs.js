// material
import { styled } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../components/_external-pages/faqs';
import { LandingAdvertisement } from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function Faqs() {
  return (
    <RootStyle title="KGISl">
      {/* <FaqsHero /> */}

      <Container sx={{ mt: 5, mb: 10 }}>
        {/* <FaqsCategory /> */}

        <Grid container spacing={1}>
          <Grid item xs={24} md={0}>
            <Typography variant="h2" sx={{ mb: 15 }} style={{display: 'flex', justifyContent: 'center'}}>
              Frequently asked questions
            </Typography>
            <FaqsList />
          </Grid>
          {/* <Grid item xs={6} md={6}>
            <FaqsForm />
          </Grid> */}
        </Grid>
      </Container>
    </RootStyle>
  );
}
