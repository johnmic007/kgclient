import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, List, Drawer, Link, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@material-ui/core';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import menuConfig from './MenuConfig';

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: ITEM_SIZE,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary
}));

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  onOpen: PropTypes.func
};

function MenuMobileItem({ item, isOpen, isActive, onOpen }) {
  return null;
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool
};

export default function MenuMobile({ isOffset, isHome }) {
  return null;
}
