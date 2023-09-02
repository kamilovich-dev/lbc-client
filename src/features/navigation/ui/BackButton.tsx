import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'


const BackButton = (  ) => {

    const navigate = useNavigate()

    return (
        <Button variant='outlined' onClick={ () => navigate(-1) } style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%'}}>
            <SvgIcon sx={{width: '20px', height: '20px'}}>
                <CloseIcon/>
            </SvgIcon>
        </Button>
    )
}

export { BackButton }