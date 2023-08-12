import React from 'react';
import { createUseStyles } from 'react-jss';
import Avatar from '@mui/material/Avatar';
import avatar from 'routes/profile/img/avatar.png';

const useStyles = createUseStyles({

  })

export default function Profile() {
    const jss = useStyles();
    return(
        <>
            <Avatar
                alt="User's avatar"
                src={avatar}
                sx={{ width: 50, height: 50}}
            />
        </>
    )
}