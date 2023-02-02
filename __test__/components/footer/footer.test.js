import { render, screen } from '@testing-library/react';
import Footer from '../../../components/footer/footer';

describe('Footer', () => {
    it('should render footer element', () => {
        render(<Footer />);

        const footer = screen.getByText(/footer/i);

        expect(footer).toBeInTheDocument();
    });
});