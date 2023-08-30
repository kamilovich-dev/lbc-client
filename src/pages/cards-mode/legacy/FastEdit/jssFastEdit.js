import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    fastEdit: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#EDEFF4',
        },
        '&:active': {
            backgroundColor: '#D9DDE8'
        }
    },
    fastEditModal: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        height: '500px',
        padding: '50px 20px',
        backgroundColor: 'white',
        borderRadius: '20px',
    },
    fastEditModalHeadText: {
        color: '#2E3856',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '40px'
    },
    commonInputStyle: {
        width: '100%',
        fontSize: '18px',
        display: 'block',
        color: 'black',
        borderBottom: '3px solid #2E3856',
        padding: '2px 0px',
        '&:focus': {
            borderBottom: '3px solid #FFCD1F'
        },
    },
    fastEditModalTerm: {
        composes: '$commonInputStyle',
        marginBottom: '100px',
    },
    fastEditModalDefinition: {
        composes: '$commonInputStyle',
    },
    fastEditModalButtons: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: '20px'
    },
    fastEditModalClose: {
        color: '#4255FF',
        fontSize: '14px',
        width: '100px',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#EDEFFF'
        },
    },
    fastEditModalSave: {
        fontSize: '14px',
        width: '100px',
        height: '40px',
        lineHeight: '40px',
        borderRadius: '10px',
        backgroundColor: '#4255FF',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#423ED8'
        }
    },
    invalidInput: {
        borderBottom: '3px solid red'
    }

})

export default useStyles;