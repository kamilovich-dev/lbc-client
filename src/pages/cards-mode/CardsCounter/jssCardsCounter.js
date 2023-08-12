import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
    },
    counter: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#2E3856'
    },
    name: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#282E3E'
    }
})

export default useStyles;