import {render} from '@testing-library/react';
import {defaultTheme, Provider} from '@adobe/react-spectrum';
import Filters from '../components/Filters';
import { describe, it, expect } from 'vitest';

describe('Rendering of components', () => {
  it('renders Filters component correctly', () => {
    const { container } = render(
      <Provider theme={defaultTheme}>
        <Filters setProducts={() => {}} allProducts={[]} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});