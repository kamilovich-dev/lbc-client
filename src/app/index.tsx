import './index.css'
import { AppRouterProvider } from './providers'
// import { LearnRouterProvider } from 'shared/learning/learn-router'

const App = () => {
    return (
        <AppRouterProvider />
    )
}

export { App }