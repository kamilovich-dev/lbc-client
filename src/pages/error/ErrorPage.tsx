import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './styles.module.css'

const ErrorPage = () => {

    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 401) {
        // ...
        }
        else if (error.status === 404) {
        // ...
        }

        return (
        <div id="error-page" className={styles.container}>
            <img className={styles.image} src="/static/error.jpg" alt="error-image"/>
            <h1 className={styles.headText}>Oops! {error.status}</h1>
            <p className={styles.errorText}>{error.statusText}</p>
            {error.data?.message && (
            <p>
                <i>{error.data.message}</i>
            </p>
            )}
        </div>
        );
    } else if (error instanceof Error) {
        return (
        <div id="error-page" className={styles.container}>
            <img className={styles.image} src="/static/error.jpg" alt="error-image"/>
            <h1 className={styles.headText}>Oops! Unexpected Error</h1>
            <p className={styles.errorText}>Something went wrong.</p>
            <p>
            <i>{error.message}</i>
            </p>
        </div>
        );
    } else {
        return <></>;
    }

}

export { ErrorPage }