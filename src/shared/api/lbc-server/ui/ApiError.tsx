import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react'

interface IProps {
    message: string | undefined,
    status: number | undefined
    duration: number
}

function ApiError( { message, status, duration } : IProps ) {
    const [isApiError, setIsApiError] = useState(true)

  return (
    <>
        <Snackbar open={isApiError} autoHideDuration={duration} onClose={() => setIsApiError(false)}>
            <Alert severity="error" sx={{ width: '100%' }}>
                Ошибка при отправке запроса! <br/>
                {message}, {status}
            </Alert>
        </Snackbar>
    </>
  )
}

export { ApiError }
