import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loder() {
  return (
    <div className="w-full h-screen">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true} // ✅ always show during loading
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
