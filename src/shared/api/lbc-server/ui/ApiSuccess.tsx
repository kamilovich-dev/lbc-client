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
            <Snackbar open={showSnackbar} autoHideDuration={duration} onClose={() => setShowSnackbar(false)}>
                <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    <div>
                        Запрос прошел успешно! <br/>
                        {message} {status}
                    </div>
                </Alert>
            </Snackbar>
        </>
    )
}

export { ApiSuccess }



