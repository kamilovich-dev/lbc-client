import { useOverlayScrollbars  } from 'overlayscrollbars-react';
import { useEffect } from 'react';

import 'overlayscrollbars/overlayscrollbars.css';

interface IProps {
    children: JSX.Element
}

const OverlayScrollbarProvider = ( { children }: IProps ) => {
    const [initBodyOverlayScrollbars, getBodyOverlayScrollbarsInstance] = useOverlayScrollbars({
        options: {
            scrollbars: {
                theme: 'os-theme-dark'
            },
        },
        defer: true,
    });

    useEffect(() => {
        initBodyOverlayScrollbars({
            target: document.body,
            cancel: {
                body: false,
            },
        });
    }, [])

    return  (
        <div>
            {children}
        </div>
    )
}

export { OverlayScrollbarProvider }