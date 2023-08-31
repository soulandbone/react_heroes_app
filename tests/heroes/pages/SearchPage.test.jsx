import { fireEvent, render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));





describe('Tests in <SearchPage/>', () => { 

    beforeEach( ()=> jest.clearAllMocks()  );


    test('should be shown correctly with by default values', () => { 

       const{container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

        //screen.debug();


     });



     test('should show Batman and the input with the value of the queryString', () => { 

        const{container} = render(
             <MemoryRouter initialEntries={['/search?q=batman']}>
                 <SearchPage/>
             </MemoryRouter>
         );
         

         const input = screen.getByRole('textbox');
         expect(input.value).toBe('batman');

         const img = screen.getByRole('img');
         expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

         const alert = screen.getByLabelText('alert-danger');
         expect(alert.style.display).toBe('none');
 
 
      });

      test('should show an error if the hero is not found (batman123) ', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
         expect(alert.style.display).toBe('');

      });


      test('should call navigate to the new screen', () => {

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText',value:'superman'}});

        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');


       });


})
