import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import logoImage from '../assets/micro new logowhite-02-01-01.png'; // Import the logo image

LogoTwo.propTypes = {
  sx: PropTypes.object
};

export default function LogoTwo({ sx }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 220,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
        [theme.breakpoints.down('sm')]: {
          width: 150,
          padding: '10px 0'
        }
      }}
    >
      <img
        src={logoImage}
        alt="Logo"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          margin: 'auto',
          padding: '4px'
        }}
      />
    </Box>
  );
}
