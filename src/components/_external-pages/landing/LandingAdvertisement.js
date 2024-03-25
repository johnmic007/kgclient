import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  width: '68%',
  height: '140px',
  margin: 'auto',
  overflow: 'hidden',
  padding: '20px 40px',
  paddingBottom: theme.spacing(10),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundImage: 'linear-gradient(to right top, #051937, #002253, #002a70, #04318d, #2436aa)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#1c1055',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    width: '60%',
    height: '140px',
    padding: '20px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Adjusted for small screens
    height: '140px',
    padding: '20px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
}));

// ----------------------------------------------------------------------

export default function LandingAdvertisement() {
  return (
    <Container maxWidth="lg">
      <ContentStyle>
        <Box sx={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' , width: '100%', height: '100%'}}>
          <Typography variant="h3" sx={{ color: 'common.white', margin: 'auto' }}>
            Refer More Friends, Get More Rewards, Repeat!
          </Typography>
        </Box>
      </ContentStyle>
    </Container>
  );
}
