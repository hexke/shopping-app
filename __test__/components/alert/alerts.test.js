import { render, screen } from "@testing-library/react";
import { AlertContext } from "../../../components/store/alerts-context";
import Alerts from '../../../components/alert/alerts';

const Wrapper = ({ children }) => {
    const contextValue = {
        alerts: [{ id: 1, msg: "true", ok: true }, { id: 2, msg: "false", ok: false }],
        addAlert: () => { },
        removeAlert: (id) => { alerts = alerts.filter(alert => alert.id !== id) }
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider >
    );
}

describe('alerts component', () => {
    it('should render one error alert', () => {
        render(<Wrapper><Alerts /></Wrapper>);

        const errorAlert = screen.getByText(/false/i).closest("div");

        expect(errorAlert).toBeInTheDocument();
        expect(errorAlert).toHaveClass('bg-red-500');
    });

    it('should render one ok alert', () => {
        render(<Wrapper><Alerts /></Wrapper>);

        const okAlert = screen.getByText(/true/i).closest("div");

        expect(okAlert).toBeInTheDocument();
        expect(okAlert).toHaveClass('bg-green-500');
    });
});