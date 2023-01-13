import { render, screen } from '@testing-library/react';
import Footer from '../../../components/footer/footer';

describe('Footer', () => {
    it('renders footer', () => {
        render(<Footer />);

        const footer = screen.getByText(/footer/i);

        expect(footer).toBeInTheDocument();
    });
});