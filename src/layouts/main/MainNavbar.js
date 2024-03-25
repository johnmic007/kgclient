import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Button, AppBar, Toolbar, Container, Typography } from '@material-ui/core';
import useOffSetTop from '../../hooks/useOffSetTop';
import { MHidden } from '../../components/@material-extend';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { PATH_AUTH } from '../../routes/paths';
import LogoTwo from '../../components/LogoTwo';
import Logo from '../../components/Logo'; 

const APP_BAR_MOBILE = 84;
const APP_BAR_DESKTOP = 120;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {isOffset ? <Logo /> : <LogoTwo />}

          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>

          {/* <RouterLink to='https://kgmreferral.blomma.in/app/login' style={{ textDecoration: 'none' }}> */}
            <Button
            href="http://referral.microcollege.in/app" target="_blank"  

              variant="contained"
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
              Sign In
            </Button>
          {/* </RouterLink> */}

          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
