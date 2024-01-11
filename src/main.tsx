import ReactDOM from 'react-dom/client'
import App from './app/App';

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('there are no root div')
}

const root = ReactDOM.createRoot(rootElement)
root.render(<App/>)
