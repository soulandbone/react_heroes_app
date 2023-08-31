import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';
import { fireEvent, render,screen } from '@testing-library/react';



const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Tests in <Navbar/>', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Juan Carlos',
        },
        logout: jest.fn(),
    };

    beforeEach(()=> jest.clearAllMocks());

    test('should show the name of the user', () => { 

        render(
            <AuthContext.Provider value = {contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Juan Carlos')).toBeTruthy();

     });


     test('show call the logout and navigate when you click the button', () => { 

        render(
            <AuthContext.Provider value = {contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});

     });



})