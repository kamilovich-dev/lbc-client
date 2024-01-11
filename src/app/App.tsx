import './App.css'
import compose from 'compose-function'

import { AppRouter } from 'app/router/AppRouter'
import { withAuth } from './providers'
import { withOverlayScrollbar } from './providers'

const App = () => {
    return <AppRouter/>
}

export default compose(
    withOverlayScrollbar,
    withAuth,
    App
)
