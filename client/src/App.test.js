import { render, screen } from '@testing-library/react';
import Introduction from './components/Dashboard/Intro/Introduction';
//import App from './App';

test('renders app overview', () => {
    render(<Introduction />);
    const linkElement = screen.getByText(/app overview/i);
    expect(linkElement).toBeInTheDocument();
});
