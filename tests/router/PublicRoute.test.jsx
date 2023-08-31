import { render, screen } from '@testing-library/react';
import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Tests in <Public Route/>', () => { 

    test('should show children if it is not authenticated', () => { 


        const contextValue = {
            logged: false,
        };

        render( 
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>

            </AuthContext.Provider>);

        expect(screen.getByText('Ruta pública')).toBeTruthy();


        });


    test('should Navigate if authenticated', () => {

        const contextValue = {
            logged: true,
            user:{id:'ABC' , name: 'Strider'}
        };

        render( 
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={  <PublicRoute>
                        <h1>Ruta pública</h1>
                    </PublicRoute>}/>
                        <Route path='marvel' element={<h1>Página Marvel</h1>}/>
                    </Routes>
                  
                </MemoryRouter>
            </AuthContext.Provider>);

            expect(screen.getByText('Página Marvel')).toBeTruthy();

     });    
 });