import React from 'react';
import { Box } from '@mui/material';

const SavolImg = ({ imgUrl }) => {
  if (!imgUrl) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      my={4}
    >
      <Box
        component="img"
        src={`https://${imgUrl}`}
        alt="Savol rasmi"
        sx={{
          maxWidth: '650px',
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
          objectFit: 'contain',
        }}
      />
      
    </Box>
  );
};

export default SavolImg;
