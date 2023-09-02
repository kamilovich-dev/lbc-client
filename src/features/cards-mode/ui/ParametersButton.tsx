import Button from '@mui/material/Button';

interface IProps {
    handleClick: () => void
}

const ParametersButton = ( {handleClick} : IProps  ) => {

    return (
        <>
            <Button variant='outlined' onClick={handleClick} size='small' sx={{fontSize: '14px'}}>
                Параметры
            </Button>
        </>
    )
}

export {  ParametersButton }