import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: '100000',
    },
}));

export default useStyles;