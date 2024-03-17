// SidebarConfig.js

import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PATH_DASHBOARD } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';
import { AuthContext } from '../../contexts/JWTContext';
import { updateSidebarConfig } from '../../redux/slices/config'; // Updated import path

const SidebarConfig = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [sidebarConfig, setSidebarConfig] = useState([]);

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
          { title: 'Leads', path: PATH_DASHBOARD.general.leads, icon: ICONS.booking },
          { title: 'All Users', path: PATH_DASHBOARD.general.allUsers, icon: ICONS.booking }
        ]
      });
    }

    console.log('SidebarConfig:', config); // Log the sidebarConfig array

    setSidebarConfig(config);
    dispatch(updateSidebarConfig(config)); // Dispatch the sidebar configuration to Redux
    console.log(config);
  }, [user, ICONS, dispatch]);

  // Add more sidebar configurations for other sections if needed

  return sidebarConfig;
};

export default SidebarConfig;
