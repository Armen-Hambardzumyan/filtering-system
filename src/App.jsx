import {useEffect, useState} from 'react'
import Filters from "./components/Filters.jsx";
import ProductsList from "./components/ProductsList.jsx";
import useApi from "./hooks/useApi.js";
import {defaultTheme, ProgressCircle, Provider} from "@adobe/react-spectrum";

const App = () => {
  const [products, setProducts] = useState(null)
  const { data, loading, error } = useApi(
    {
      url: './api/products.json',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'GET'
    }
  );

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data])

  return (
    <Provider theme={defaultTheme}>
      <div className="container mx-auto p-4">
        {error && <p className="text-center text-lg mt-5 text-stone-500">{error}</p>}
        {loading &&
          <ProgressCircle position="fixed" top="50%" left="50%" size="XL" transform="translate(-50%, -50%)" aria-label="Loading…" isIndeterminate />
        }
        {!error && !loading && products &&
          <>
            <Filters setProducts={setProducts} allProducts={data}/>
            <ProductsList products={products}/>
          </>
        }
      </div>
    </Provider>
  )
}

export default App
