import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';
// material
import { makeStyles, createStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
//
import Logo from './Logo';

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles((theme) =>
  createStyles({
    '@global': {
      '#nprogress': {
        pointerEvents: 'none',
        '& .bar': {
          top: 0,
          left: 0,
          height: 2,
          width: '100%',
          position: 'fixed',
          zIndex: theme.zIndex?.snackbar,
          backgroundColor: theme.palette?.primary.main,
          boxShadow: `0 0 2px ${theme.palette?.primary.main}`
        }
      }
    }
  })
);

function ProgressBar() {
  nprogressStyle();

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return null;
}

export default function LoadingScreen({ ...other }) {
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...other}>
      <ProgressBar />

      <Logo sx={{ width: 64, height: 64 }} />
    </Box>
  );
}
