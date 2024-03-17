import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import chevronRightFill from '@iconify/icons-eva/chevron-right-fill';
// material
import { useTheme, styled, alpha } from '@material-ui/core/styles';
import { Box, Grid, Card, Link, Stack, Button, Divider, Container, Typography } from '@material-ui/core';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import Faqs from '../../../pages/Faqs';

// ----------------------------------------------------------------------

const LICENSES = ['Refer 1 friend', 'Refer 3 friend', 'Extended'];

const PLANS = [
  {
    license: LICENSES[0],
    commons: ['Win a 2000 simple as it gets Bring your friend into our course and earn 300'],
    options: [],
    icons: ['static/home/rupee.png', 'static/home/giftbox.png']
  },
  {
    license: LICENSES[1],
    commons: ['Go big complete three sucessfull referrals and you can win a smartphone or a Lenovo Tab'],
    options: [],
    icons: ['static/home/smartwatch.png', 'static/home/ipad.png']
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  cardIndex: PropTypes.number,
  plan: PropTypes.shape({
    license: PropTypes.any,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string)
  })
};

function PlanCard({ plan, cardIndex }) {
  const theme = useTheme();
  const { license, commons, options, icons } = plan;

  const isLight = theme.palette.mode === 'light';

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.12)}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`
        })
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" sx={{ mb: 2, color: 'text.disabled', display: 'block' }}>
            REFERRAL
          </Typography>
          <Typography variant="h4">{license}</Typography>
        </div>

        {cardIndex === 0 ? (
          <Box component="img" src={icons[0]} sx={{ width: 40, height: 40 }} />
        ) : (
          <Stack direction="row" spacing={1}>
            {icons.map((icon) => (
              <Box key={icon} component="img" src={icon} sx={{ width: 40, height: 40 }} />
            ))}
          </Stack>
        )}

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Box component={Icon} sx={{ color: 'primary.main', width: 20, height: 20 }} />
              <Typography style={{ fontSize: 18 }}>{option}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          {options.map((option, optionIndex) => {
            const disabledLine =
              (cardIndex === 0 && optionIndex === 1) ||
              (cardIndex === 0 && optionIndex === 2) ||
              (cardIndex === 0 && optionIndex === 3) ||
              (cardIndex === 1 && optionIndex === 3);

            return (
              <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                sx={{
                  ...(disabledLine && { color: 'text.disabled' })
                }}
                key={option}
              >
                <Box
                  component={Icon}
                  icon={checkmarkFill}
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'primary.main',
                    ...(disabledLine && { color: 'text.disabled' })
                  }}
                />
                <Typography variant="h2">{option}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          {/* <Link
            color="text.secondary"
            underline="always"
            target="_blank"
            href="https://material-ui.com/store/license/#i-standard-license"
            sx={{
              typography: 'body2',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Learn more <Icon icon={chevronRightFill} width={20} height={20} />
          </Link> */}
        </Stack>

        <Button
          size="large"
          fullWidth
          variant={cardIndex === 1 ? 'contained' : 'outlined'}
          target="_blank"
          href="https://material-ui.com/store/items/minimal-dashboard/"
        >
          Refer Now
        </Button>
      </Stack>
    </Card>
  );
}

export default function LandingPricingPlans() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          {/* <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
              pricing plans
            </Typography>
          </MotionInView> */}
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Referral Plans
            </Typography>
          </MotionInView>
          {/* <MotionInView variants={varFadeInDown}>
            <Typography
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary')
              }}
            >
              Choose the perfect plan for your needs. Always flexible to grow
            </Typography>
          </MotionInView> */}
        </Box>

        <Grid container spacing={5}>
          {PLANS.map((plan, index) => (
            <Grid key={plan.license} item xs={12} md={6}>
              <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
                <PlanCard plan={plan} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
        <Faqs />

        <MotionInView variants={varFadeIn}>
          <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
            <MotionInView variants={varFadeInDown}>
              <Typography variant="h3">Still have questions?</Typography>
            </MotionInView>

            <MotionInView variants={varFadeInDown}>
              <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                Please describe your case to receive the most accurate advice.
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <Button
                size="large"
                variant="contained"
                href="mailto:support@minimals.cc?subject=[Feedback] from Customer"
              >
                Contact us
              </Button>
            </MotionInView>
          </Box>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
