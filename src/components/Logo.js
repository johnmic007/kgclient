import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import logoImage from '../assets/micro-logo.png'; // Import the logo image

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();

  return (
    <Box sx={{ width: 220, borderRadius: 2, backgroundColor: 'white', ...sx }}>
      <img
        src={logoImage}
        alt="Logo"
        style={{
          width: '100%',
          height: '100%',
          padding: 15,
          objectFit: 'cover',
          margin: 'auto' // Add margin around the image
        }}
      />
    </Box>
  );
}
