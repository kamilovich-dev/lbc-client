import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react'

interface IProps {
    message: string | undefined,
    status: number | undefined
    duration: number
}

function ApiSuccess( { message, status, duration } : IProps ) {
    const [showSnackbar, setShowSnackbar] = useState(true)

    return (
        <>
            <Snackbar open={showSnackbar} autoHideDuration={duration} onClose={() => setShowSnackbar(false)}
                anchorOrigin={ {vertical: 'top', horizontal: 'center'} }>
                <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    <div>
                        {message}
                    </div>
                </Alert>
            </Snackbar>
        </>
    )
}

export { ApiSuccess }



