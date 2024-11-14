import { render } from '@testing-library/react';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import ProductList from '../components/ProductsList';
import { describe, it, expect } from 'vitest';
import mockProducts from "./mockData.js";

describe('Rendering of components', () => {
  it('renders ProductList component correctly', () => {
    const { container } = render(
      <Provider theme={defaultTheme}>
        <ProductList products={mockProducts} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
