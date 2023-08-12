import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    '@global': {
        body: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    wrapper: {
        backgroundColor: '#ACF4B5',
        width: '200px',
        height: '200px',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    '@keyframes interestingAnimation1': {
        '100%': {
            backgroundColor: 'red',
        }
    },
    '@keyframes interestingAnimation2': {
        '0%': {
            opacity: 1
          },
        '100%': {
            opacity: 0
        }
    },
    animated: {
        animation: '2s ease-in-out $interestingAnimation1 forwards',
    },

});

export default useStyles;