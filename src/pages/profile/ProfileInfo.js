import React from 'react';
import { createUseStyles } from 'react-jss';
import Avatar from '@mui/material/Avatar';
import avatar from 'routes/common/img/avatar.png';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        padding: '10px',
    },
    item: {
        padding: '5px',
    },
    nick: {
        padding: '5px',
    },
    name: {
        padding: '5px',
    }
})

export default function ProfileInfo() {
    const jss = useStyles();

    return(
        <div className={jss.wrapper}>
            <div className={jss.item}>
                <Avatar
                    alt="User's avatar"
                    src={avatar}
                    sx={{ width: 100, height: 100}}
                />
            </div>
            <div className={jss.item}>
                <div className={jss.nick}>
                    Daniyar 1997
                </div>
                <div className={jss.name}>
                    Данияр Салихов
                </div>
            </div>
        </div>
    )
}