import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react'

interface IProps {
    message: string | undefined,
    status: number | undefined
    duration: number
}

function ApiError( { message, status, duration } : IProps ) {
    const [showSnackbar, setShowSnackbar] = useState(true)

    return (
        <>
            <Snackbar open={showSnackbar} autoHideDuration={duration} onClose={() => setShowSnackbar(false)}>
                <Alert onClose={() => setShowSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    <div>
                        {message} {status}
                    </div>
                </Alert>
            </Snackbar>
        </>
    )
}

export { ApiError }



