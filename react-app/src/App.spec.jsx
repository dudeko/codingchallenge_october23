import App from "./App";
import { cleanup, render } from '@testing-library/react';

describe('Jest', () => {

    afterEach(cleanup);

    it('testing jest', () => {
        render(<App />)
        expect(1).toBe(1);
    });
});

