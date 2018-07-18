import {
    SET_CURRENT_ADMIN_VIEW
} from './constants';

const initialState = {
    currentAdminView: "accountsList"
};

export default function accounts(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_ADMIN_VIEW: {
            return Object.assign({}, state, {
                currentAdminView: action.view,
                accountToEdit: action.accountToEdit
            });
        }

        default:
            return state;
    }
}
