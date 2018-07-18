import {
    SET_CURRENT_ADMIN_VIEW
} from './constants';

export function switchAdminView(view, accountToEdit) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_ADMIN_VIEW,
            view,
            accountToEdit
        });


    };
}
