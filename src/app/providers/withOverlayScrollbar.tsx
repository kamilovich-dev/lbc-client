import { useOverlayScrollbars  } from 'overlayscrollbars-react';
import { useEffect } from 'react';

import 'overlayscrollbars/overlayscrollbars.css';

export const withOverlayScrollbar = ( component: JSX.Element) => {
    useEffect(() => {
        initBodyOverlayScrollbars({
            target: document.body,
            cancel: {
                body: false,
            },
        });
    }, [])

    const [initBodyOverlayScrollbars, getBodyOverlayScrollbarsInstance] = useOverlayScrollbars({
        options: {
            scrollbars: {
                theme: 'os-theme-dark'
            },
        },
        defer: true,
    });

    return <>{component}</>
}
