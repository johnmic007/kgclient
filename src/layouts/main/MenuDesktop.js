import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Link, Stack } from '@material-ui/core';

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  return null;
}

MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

function MenuDesktopItem({ item, pathname, isHome, isOpen, isOffset, onOpen, onClose }) {
  return null;
}
