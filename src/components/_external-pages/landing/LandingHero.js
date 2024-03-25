import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Button, Box, Container, Typography, Stack } from '@material-ui/core';
import { varFadeInUp, varFadeInRight, varWrapEnter } from '../../animate';
// import { PATH_DASHBOARD } from '../../../routes/paths'; // Import PATH_DASHBOARD
import banner from '../../../assets/2-Refer-and-earn.png';

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundImage: 'linear-gradient(to right top, #051937, #002253, #002a70, #04318d, #2436aa)',
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
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: -65, // Move the image 30px higher
  right: 0,
  bottom: 30,
  zIndex: 8,
  width: '200%', // Increase the width to make the image bigger
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: '200%', // Increase the width for larger screens
    // height: '56vh'
  },
  [theme.breakpoints.up('md')]: {
    right: '8%',
    width: '60%',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    display: 'none'
  }
}));

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
          backgroundImage: 'linear-gradient(to right top, #051937, #002253, #002a70, #04318d, #2436aa)'
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
                Be That Super Friend - Help Them Launch Their Career.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography style={{ fontSize: 18 }} sx={{ color: 'common.white', marginY: 4 }}>
                Found our courses helpful and think your friend(s) might as well? Refer KGiSL Microcollege to your friends to win exciting rewards.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight} style={{ marginTop: '24px', marginBottom: '24px' }}>
              <Button
                href="http://referral.microcollege.in/app" target='_blank'
                size="large"
                variant="contained"
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
                sx={{
                bgcolor: 'rgb(255, 186, 0)',
                color: 'text.primary',
                height: 45,
                '&:hover': {
                  opacity: 0.8,
                  bgcolor: 'rgb(255, 186, 0)',
                },
                }}
              >
                REFER NOW
              </Button>
            </motion.div>
            {/* <ImageStack
              images={[
                { src: '/static/home/smartwatch.png' },
                { src: '/static/home/ipad.png' },
                { src: '/static/home/rupee.png' },
                { src: '/static/home/giftbox.png' }
              ]}
              size="50px"
            /> */}
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
