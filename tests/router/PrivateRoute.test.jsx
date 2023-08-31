import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Tests in Private Route', () => { 


    test('should show children if it is authenticated', () => { 


        Storage.prototype.setItem = jest.fn();


        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name:'Juan Carlos'

            }
        };

        render( 
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            

            </AuthContext.Provider>);

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalled();


        });

})