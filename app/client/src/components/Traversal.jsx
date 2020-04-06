import React from 'react';
import Typography from '@material-ui/core/Typography';

const Traversal = ({ searchParams }) => {
  return (
    <React.Fragment>
      {searchParams.map(() => {
        <Typography paragraph></Typography>
      })}
    </React.Fragment>
  )
}

export default Traversal;