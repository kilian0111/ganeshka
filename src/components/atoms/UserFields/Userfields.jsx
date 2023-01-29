import React from 'react';
import { Typography } from '@mui/material';

const Userfield = ( props ) => {

    const { user, field } = props;
    return (
        <div style={{display: 'flex', flexDirection:"row-reverse", justifyContent:"start"}}>
            <h3>
                {user[field]}
            </h3>
        </div>
    );
};

export default Userfield;
