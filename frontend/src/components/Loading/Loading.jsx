import React from 'react'
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <CircularProgress />
        </Box>
  )
}

export default Loading
