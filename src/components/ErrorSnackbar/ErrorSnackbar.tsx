import React, { SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../store-reducers/store';
import { useAppSelector } from '../../utils/hook';
import { actionsApp } from '../../store-reducers/app-reducer';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useAppSelector(state => state.app.error)

    console.log('errror', error)

    const dispatch = useDispatch();

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(actionsApp.errorMessage(''))
    };

    return (
        <Snackbar open={error !== ''} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
}
