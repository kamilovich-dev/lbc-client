import './App.css'
import { AppRouterProvider } from './providers'
import { OverlayScrollbarProvider } from './providers'

const App = () => {

    return (
        <OverlayScrollbarProvider>
            <AppRouterProvider />
        </OverlayScrollbarProvider>
    )
}



export { App }