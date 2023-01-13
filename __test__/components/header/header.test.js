import { render, screen } from '@testing-library/react';
import Header from '../../../components/header/header';

jest.mock("next/router", () => (
    {
        useRouter() {
            return {
                prefetch: () => null
            };
        }
    }
));

describe('Header', () => {
    it('renders a header', () => {
        render(<Header />);

        const logo = screen.getByText(/Strona główna/i);
        const listsLink = screen.getByText(/listy/i);
        const newListLink = screen.getByText(/dodaj listę/i);
        const productsLink = screen.getByText(/produkty/i);
        const newProductLink = screen.getByText(/dodaj produkt/i);
        const types = screen.getByText(/typy/i);

        expect(logo).toBeInTheDocument();
        expect(listsLink).toBeInTheDocument();
        expect(newListLink).toBeInTheDocument();
        expect(productsLink).toBeInTheDocument();
        expect(newProductLink).toBeInTheDocument();
        expect(types).toBeInTheDocument();
    });
});