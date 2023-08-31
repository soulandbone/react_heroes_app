import { render,screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';


describe('Tests in <AppRouter/>', () => { 

test('should show the login if its not authenticated', () => { 

    const contextValue = {
        logged:false,
    }

    render(
        <MemoryRouter initialEntries={['/marvel']}>
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>

        </MemoryRouter>


    );

    expect(screen.getAllByText('Login').length).toBe(2);

    screen.debug();


 });

 test('should show the Marvel Component if its authenticated', () => { 

    const contextValue = {
        logged:true,
        user:{
            id: 'ABC',
            name: 'Juan Carlos'
        }
    }

    render(
        <MemoryRouter initialEntries={['/login']}>
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>

        </MemoryRouter>


    );


        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);


  })

 })