import { Box, Button, Typography } from '@material-ui/core';
import { MotionInView, varFadeIn, varFadeInDown, varFadeInUp } from '../../animate';

const ContactSection = () => (
  <MotionInView variants={varFadeIn}>
    <Box sx={{ p: 5, mt: 10, mb:10, textAlign: 'center' }}>
      <MotionInView variants={varFadeInDown}>
        <Typography variant="h2">Still have questions?</Typography>
      </MotionInView>

      {/* <MotionInView variants={varFadeInDown}>
        <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
          Please describe your case to receive the most accurate advice.
        </Typography>
      </MotionInView> */}

      <MotionInView variants={varFadeInUp}>
      <Button
              variant="contained"
              sx={{
                mt: 6, 
                mb: 5,
                bgcolor: 'rgb(255, 186, 0)',
                color: 'text.primary',
                height: 45,
                '&:hover': {
                  opacity: 0.8,
                  bgcolor: 'rgb(255, 186, 0)',
                },
              }}
            >
          Contact us
        </Button>
      </MotionInView>
    </Box>
  </MotionInView>
);

export default ContactSection;
