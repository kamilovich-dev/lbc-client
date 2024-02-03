import Alert from '@mui/material/Alert';
import { BackButton } from "features/navigation"

export const CardsNotFound = () => {
    return (
        <div className="flex gap-4 w-3/5 ml-auto mr-auto p-4">
            <div className='flex-auto'>
                <Alert severity="info" sx={{ width: '100%' }}>
                    Карточки не найдены!
                </Alert>
            </div>
            <div>
                <BackButton/>
            </div>
        </div>)

}