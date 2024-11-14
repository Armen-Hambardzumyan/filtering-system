import { render } from '@testing-library/react';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import App from '../App';
import { describe, it, expect } from 'vitest';

describe('Rendering of components', () => {
  it('renders App component correctly', () => {
    const { container } = render(
      <Provider theme={defaultTheme}>
        <App />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
