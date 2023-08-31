import { types } from "../../../src/auth/types/types"

describe('tests in "types.js"', () => { 

    test('should return these types', () => { 

        expect(types).toEqual({
            login: '[Auth] Login',
            logout:'[Auth] Logout',
        });

     })
 })