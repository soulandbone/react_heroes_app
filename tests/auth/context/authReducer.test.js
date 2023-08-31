import { authReducer } from "../../../src/auth";
import { types } from "../../../src/auth/types/types";

describe('Tests on authReducer', () => { 

    test('should return the state by default', () => { 

        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});



    });

    test('should call the login, authenticate and authenticate the user', () => { 

        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'

            }

        }

        const state = authReducer({logged: false}, action);
        expect(state).toEqual({...state,
            logged: true,
            user: action.payload
        })


    });


    test('should call logout, delete the name of the user and logged in false ', () => { 

        const state = {
            logged: true,
            user: {id: '123', name: 'Juan'}
        };
        
        const action = {
            type: types.logout,
        };

        const newState = authReducer(state, action);

        expect(newState).toEqual({logged: false});


    });



 })