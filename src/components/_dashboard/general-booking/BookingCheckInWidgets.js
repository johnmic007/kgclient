import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';
import { Card, Typography, Stack, Divider, useMediaQuery } from '@material-ui/core';
import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 106, height: 106 };

const BookingCheckInWidgets = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const modeWise = [
    {
      id: 1,
      name: 'online',
      total_students: 100,
      placed_students: 60
    },
    {
      id: 2,
      name: 'offline',
      total_students: 100,
      placed_students: 30
    }
  ];

  const chartOptions = {
    ...BaseOptionChart(),
    chart: { sparkline: { enabled: true }, toolbar: { show: false } }, // Remove toolbar
    grid: {
      padding: {
        top: -9,
        bottom: -9
      }
    },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter(value) {
          return `Placed: ${fNumber(value)}`;
        }
      }
    }
  };

  return (
    <Card sx={{ paddingBottom: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'column' }}
        divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
      >
        {modeWise.map((mode) => (
          <Stack
            key={mode.id}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{ width: 1, py: 5 }}
          >
            <ReactApexChart type="radialBar" series={[mode.placed_students]} options={chartOptions} {...CHART_SIZE} />
            <div>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fNumber(mode.total_students)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                Total {mode.name.charAt(0).toUpperCase() + mode.name.slice(1)} Batch Students
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default BookingCheckInWidgets;
