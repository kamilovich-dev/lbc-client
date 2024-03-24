import { useOverlayScrollbars  } from 'overlayscrollbars-react';
import { useMobile } from 'shared/mobile/useMobile';
import { useEffect } from 'react';

import 'overlayscrollbars/overlayscrollbars.css';

export const withOverlayScrollbar = ( component: JSX.Element) => {
    const isMobile = useMobile()

    useEffect(() => {
        if (!isMobile) {
            initBodyOverlayScrollbars({
                target: document.body,
                cancel: {
                    body: false,
                },
            });
        }
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
