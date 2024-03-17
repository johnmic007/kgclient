import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Menu,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const MOCK_BOOKINGS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  avatar: mockData.image.avatar(index),
  checkIn: mockData.time(index),
  checkOut: mockData.time(index),
  phoneNumber: mockData.phoneNumber(index),
  status: (index === 1 && 'pending') || (index === 3 && 'un_paid') || 'paid',
  roomType: (index === 1 && 'double') || (index === 3 && 'king') || 'single'
}));

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
  onPrint: PropTypes.func,
  onShare: PropTypes.func
};

function MoreMenuButton({ onDownload, onPrint, onShare, onDelete }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onDownload}>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem onClick={onPrint}>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem onClick={onShare}>
          <Icon icon={shareFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function BookingDetails() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const data = [
    {
      id: 1,
      'BATCH NUMBER': 'RP-1',
      'BATCH COMPLETION DATE': '02-05-2022',
      'TOTAL STUDENTS ENROLLED': 17,
      'Not Response/Interested': null,
      'Students ready for the Placement': 17,
      'KGM Placed': 10,
      'Self Placed': 7,
      'KGM + Self Placed': 17,
      'YET TO BE PLACED': 0
    },
    {
      id: 2,
      'BATCH NUMBER': 'RP-2',
      'BATCH COMPLETION DATE': '11-07-2022',
      'TOTAL STUDENTS ENROLLED': 4,
      'Not Response/Interested': 1,
      'Students ready for the Placement': 3,
      'KGM Placed': 1,
      'Self Placed': 2,
      'KGM + Self Placed': 3,
      'YET TO BE PLACED': 0
    },
    {
      id: 3,
      'BATCH NUMBER': 'RP-3',
      'BATCH COMPLETION DATE': '26-07-2022',
      'TOTAL STUDENTS ENROLLED': 9,
      'Not Response/Interested': null,
      'Students ready for the Placement': 9,
      'KGM Placed': 6,
      'Self Placed': 3,
      'KGM + Self Placed': 9,
      'YET TO BE PLACED': 0
    },
    {
      id: 4,
      'BATCH NUMBER': 'RP-4',
      'BATCH COMPLETION DATE': '29-08-2022',
      'TOTAL STUDENTS ENROLLED': 16,
      'Not Response/Interested': 3,
      'Students ready for the Placement': 13,
      'KGM Placed': 5,
      'Self Placed': 8,
      'KGM + Self Placed': 13,
      'YET TO BE PLACED': 0
    },
    {
      id: 5,
      'BATCH NUMBER': 'RP-5',
      'BATCH COMPLETION DATE': '27-09-2022',
      'TOTAL STUDENTS ENROLLED': 16,
      'Not Response/Interested': 1,
      'Students ready for the Placement': 15,
      'KGM Placed': 2,
      'Self Placed': 13,
      'KGM + Self Placed': 15,
      'YET TO BE PLACED': 0
    },
    {
      id: 6,
      'BATCH NUMBER': 'RP-6',
      'BATCH COMPLETION DATE': '19-10-2022',
      'TOTAL STUDENTS ENROLLED': 17,
      'Not Response/Interested': 3,
      'Students ready for the Placement': 14,
      'KGM Placed': 11,
      'Self Placed': 3,
      'KGM + Self Placed': 14,
      'YET TO BE PLACED': 0
    },
    {
      id: 7,
      'BATCH NUMBER': 'RP-7',
      'BATCH COMPLETION DATE': '11-11-2022',
      'TOTAL STUDENTS ENROLLED': 14,
      'Not Response/Interested': 4,
      'Students ready for the Placement': 10,
      'KGM Placed': 7,
      'Self Placed': 3,
      'KGM + Self Placed': 10,
      'YET TO BE PLACED': 0
    },
    {
      id: 8,
      'BATCH NUMBER': 'RP-8',
      'BATCH COMPLETION DATE': '13-12-2022',
      'TOTAL STUDENTS ENROLLED': 20,
      'Not Response/Interested': 7,
      'Students ready for the Placement': 13,
      'KGM Placed': 11,
      'Self Placed': 2,
      'KGM + Self Placed': 13,
      'YET TO BE PLACED': 0
    },
    {
      id: 9,
      'BATCH NUMBER': 'RP-9',
      'BATCH COMPLETION DATE': '12-01-2023',
      'TOTAL STUDENTS ENROLLED': 11,
      'Not Response/Interested': 4,
      'Students ready for the Placement': 7,
      'KGM Placed': 5,
      'Self Placed': 2,
      'KGM + Self Placed': 7,
      'YET TO BE PLACED': 0
    },
    {
      id: 10,
      'BATCH NUMBER': 'RP-10',
      'BATCH COMPLETION DATE': '07-02-2023',
      'TOTAL STUDENTS ENROLLED': 9,
      'Not Response/Interested': 3,
      'Students ready for the Placement': 6,
      'KGM Placed': 5,
      'Self Placed': 1,
      'KGM + Self Placed': 6,
      'YET TO BE PLACED': 0
    },
    {
      id: 11,
      'BATCH NUMBER': 'RP-11',
      'BATCH COMPLETION DATE': '27-02-2023',
      'TOTAL STUDENTS ENROLLED': 8,
      'Not Response/Interested': 4,
      'Students ready for the Placement': 4,
      'KGM Placed': 3,
      'Self Placed': 1,
      'KGM + Self Placed': 4,
      'YET TO BE PLACED': 0
    },
    {
      id: 12,
      'BATCH NUMBER': 'RP-12',
      'BATCH COMPLETION DATE': '12-04-2023',
      'TOTAL STUDENTS ENROLLED': 23,
      'Not Response/Interested': 6,
      'Students ready for the Placement': 17,
      'KGM Placed': 14,
      'Self Placed': 3,
      'KGM + Self Placed': 17,
      'YET TO BE PLACED': 0
    },
    {
      id: 13,
      'BATCH NUMBER': 'RP-13',
      'BATCH COMPLETION DATE': '12-05-2023',
      'TOTAL STUDENTS ENROLLED': 17,
      'Not Response/Interested': 3,
      'Students ready for the Placement': 14,
      'KGM Placed': 8,
      'Self Placed': 6,
      'KGM + Self Placed': 14,
      'YET TO BE PLACED': 0
    },
    {
      id: 14,
      'BATCH NUMBER': 'RP-14',
      'BATCH COMPLETION DATE': '15-07-2023',
      'TOTAL STUDENTS ENROLLED': 12,
      'Not Response/Interested': 8,
      'Students ready for the Placement': 4,
      'KGM Placed': 3,
      'Self Placed': 1,
      'KGM + Self Placed': 4,
      'YET TO BE PLACED': 0
    },
    {
      id: 15,
      'BATCH NUMBER': 'RP-15',
      'BATCH COMPLETION DATE': '30-07-2023',
      'TOTAL STUDENTS ENROLLED': 22,
      'Not Response/Interested': 6,
      'Students ready for the Placement': 16,
      'KGM Placed': 11,
      'Self Placed': 5,
      'KGM + Self Placed': 16,
      'YET TO BE PLACED': 0
    },
    {
      id: 16,
      'BATCH NUMBER': 'RP-16',
      'BATCH COMPLETION DATE': '19-08-2023',
      'TOTAL STUDENTS ENROLLED': 18,
      'Not Response/Interested': 8,
      'Students ready for the Placement': 10,
      'KGM Placed': 6,
      'Self Placed': 4,
      'KGM + Self Placed': 10,
      'YET TO BE PLACED': 0
    },
    {
      id: 17,
      'BATCH NUMBER': 'RP-17',
      'BATCH COMPLETION DATE': '30-09-2023',
      'TOTAL STUDENTS ENROLLED': 38,
      'Not Response/Interested': 13,
      'Students ready for the Placement': 25,
      'KGM Placed': 14,
      'Self Placed': 5,
      'KGM + Self Placed': 19,
      'YET TO BE PLACED': 6
    },
    {
      id: 18,
      'BATCH NUMBER': 'RP-18',
      'BATCH COMPLETION DATE': '20-11-2023',
      'TOTAL STUDENTS ENROLLED': 36,
      'Not Response/Interested': 15,
      'Students ready for the Placement': 21,
      'KGM Placed': 11,
      'Self Placed': 7,
      'KGM + Self Placed': 18,
      'YET TO BE PLACED': 3
    },
    {
      id: 19,
      'BATCH NUMBER': 'RP-19',
      'BATCH COMPLETION DATE': '31-12-2023',
      'TOTAL STUDENTS ENROLLED': 65,
      'Not Response/Interested': 18,
      'Students ready for the Placement': 47,
      'KGM Placed': 5,
      'Self Placed': 6,
      'KGM + Self Placed': 11,
      'YET TO BE PLACED': 36
    }
  ];
  const keys = Object.keys(data[0]);

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  return (
    <>
      <Card>
        <CardHeader title="Placement Report" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {keys.map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {keys.map((key, cellIndex) => (
                      <TableCell key={cellIndex}>{row[key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
