import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button } from '@mui/material'

const ToModulesButton = () => {

    const navigate = useNavigate()

    return (
        <Button variant='outlined' onClick={ () => navigate('/modules') } size='small' sx={{fontSize: '14px'}}>
        <SvgIcon className='mr-2'>
            <FormatListBulletedIcon></FormatListBulletedIcon>
        </SvgIcon>
            К списку модулей
        </Button>
    )
}

export { ToModulesButton }


