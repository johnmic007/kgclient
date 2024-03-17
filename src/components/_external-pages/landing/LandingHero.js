import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Button, Box, Container, Typography, Stack } from '@material-ui/core';
import { varFadeInUp, varFadeInRight, varWrapEnter } from '../../animate';
import { PATH_DASHBOARD } from '../../../routes/paths'; // Import PATH_DASHBOARD
import banner from '../../../assets/banner.png';

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#29166f', // Set background color to blue
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => {
  console.log(theme); // Check if theme is being passed correctly
  return {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '140%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: '40%',
      height: '56vh'
    },
    [theme.breakpoints.up('md')]: {
      right: '8%',
      width: '30%',
      height: '48vh'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      display: 'none'
    }
  };
});

const ImageStack = ({ images, size }) => (
  <Stack
    direction="row"
    spacing={2} // Set spacing to add extra gap between images
    justifyContent={{ xs: 'center', md: 'flex-start' }}
    marginTop={{ xs: 0, md: 2 }}
  >
    {images.map((image, index) => (
      <Box
        key={index}
        sx={{
          width: size,
          height: size,
          padding: 1,
          borderRadius: 8,
          overflow: 'hidden', // Ensure the image is contained within the box
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      >
        <motion.img variants={varFadeInRight} src={image.src} style={{ width: '100%', height: '100%' }} />
      </Box>
    ))}
  </Stack>
);

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroImgStyle alt="hero" src={banner} variants={varFadeInUp} />
        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h2" sx={{ color: 'common.white' }}>
                Be That Super Friend
                <Typography variant="h2"> Help Them Launch Their Career. </Typography>
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography style={{ fontSize: 18 }} sx={{ color: 'common.white', marginY: 4 }}>
                Found our courses helpful and think your <br />
                friend(s) might as well? Refer KGiSL Microcollege to your friends to win exciting rewards.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight} style={{ marginTop: '24px', marginBottom: '24px' }}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
                sx={{
                  backgroundColor: '#ffba00', // Set button color to yellow
                  color: '#000000',
                  '&:hover': {
                    opacity: 0.8 // Reduce opacity on hover
                  }
                }}
              >
                Start to refer
              </Button>
            </motion.div>
            <ImageStack
              images={[
                { src: '/static/home/smartwatch.png' },
                { src: '/static/home/ipad.png' },
                { src: '/static/home/rupee.png' },
                { src: '/static/home/giftbox.png' }
              ]}
              size="50px"
            />
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
