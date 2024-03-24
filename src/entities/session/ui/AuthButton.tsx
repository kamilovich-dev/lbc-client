import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { SessionStore, SessionStoreContext } from 'entities/session';
import { useContext, useState } from 'react';
import { routePaths } from 'shared/config';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function BasicModal() {


  return (
    <div>

    </div>
  );
}


const AuthButton = observer(() => {
    const sessionStore: SessionStore | null = useContext(SessionStoreContext);
    const navigate = useNavigate();

    if (!sessionStore) return

    const handleLogout = async () => {
        await sessionStore.logout()
        navigate(routePaths.LOGIN)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {sessionStore.session.isAuth ?
             <button
                className='bg-red-700 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-red-800 active:bg-red-900'
                onClick={handleOpen}>
                Выйти
            </button> :
            <button
                className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'
                onClick={() => navigate(routePaths.LOGIN)}>
                Авторизация
            </button>
            }
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='rounded-md p-2 h-32 w-80 bg-white flex flex-col items-center justify-center absolute top-0 left-0 bottom-0 right-0 m-auto'>
                        <div className='text-center mb-4'>Вы уверены, что хотите выйти?</div>
                        <div className='flex items-center gap-4'>
                            <button onClick={handleLogout} className='bg-white border-gray-400 border-[1px] rounded-lg p-2 w-32 text-center text-gray-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-white'>Да</button>
                            <button onClick={handleClose} className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'>Нет</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>

    );
});

export { AuthButton };