// DashboardSidebar.js

import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Link, Stack, Drawer, Tooltip, Typography, CardActionArea } from '@material-ui/core';
import { PATH_DASHBOARD } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';
import Logo from '../../components/Logo';
import MyAvatar from '../../components/MyAvatar';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import { AuthContext } from '../../contexts/JWTContext';
import { updateSidebarConfig } from '../../redux/slices/config'; // Updated import path

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isCollapse, setCollapse] = useState(false);
  const [collapseClick, setCollapseClick] = useState(false);
  const [collapseHover, setCollapseHover] = useState(false);
  const [data, setData] = useState([]);

  const sidebarConfig = useSelector((state) => state.sidebarConfig.sidebarConfig);

  const getIcon = (name) => (
    <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
  );

  const ICONS = {
    blog: getIcon('ic_blog'),
    cart: getIcon('ic_cart'),
    chat: getIcon('ic_chat'),
    mail: getIcon('ic_mail'),
    user: getIcon('ic_user'),
    kanban: getIcon('ic_kanban'),
    banking: getIcon('ic_banking'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
    booking: getIcon('ic_booking')
  };

  useEffect(() => {
    const config = [];

    if (user.role === 'user') {
      config.push({
        subheader: 'general',
        items: [
          {
            title: 'My Referrals',
            path: PATH_DASHBOARD.general.myReferals,
            icon: ICONS.dashboard
          },
          { title: 'Add Referrals', path: PATH_DASHBOARD.general.addReferals, icon: ICONS.booking }
        ]
      });
    } else {
      config.push({
        subheader: 'general',
        items: [
          { title: 'Referals', path: PATH_DASHBOARD.general.leads, icon: ICONS.booking },
          { title: 'All Users', path: PATH_DASHBOARD.general.allUsers, icon: ICONS.booking }
        ]
      });
    }

    // setSidebarConfig(config);
    setData(config);
    dispatch(updateSidebarConfig(config));
  }, [user, ICONS, dispatch]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggleCollapse = () => {
    setCollapse(!isCollapse);
    setCollapseClick(true);
  };

  const handleHoverEnter = () => {
    setCollapseHover(true);
  };

  const handleHoverLeave = () => {
    setCollapseHover(false);
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && (
              <Tooltip title="Mini Menu">
                <CardActionArea
                  onClick={handleToggleCollapse}
                  sx={{
                    width: 18,
                    height: 18,
                    display: 'flex',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    alignItems: 'center',
                    color: 'text.primary',
                    justifyContent: 'center',
                    border: 'solid 1px currentColor',
                    ...(collapseClick && {
                      borderWidth: 2
                    })
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'currentColor',
                      transition: (theme) => theme.transitions.create('all'),
                      ...(collapseClick && {
                        width: 0,
                        height: 0
                      })
                    }}
                  />
                </CardActionArea>
              </Tooltip>
            )}
          </MHidden>
        </Stack>

        {isCollapse ? (
          <MyAvatar sx={{ mx: 'auto', mb: 2 }} />
        ) : (
            <AccountStyle>
              <MyAvatar />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.role}
                </Typography>
              </Box>
            </AccountStyle>
        )}
      </Stack>
      <NavSection navConfig={data} isShow={!isCollapse} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={handleHoverEnter}
          onMouseLeave={handleHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

export default DashboardSidebar;
