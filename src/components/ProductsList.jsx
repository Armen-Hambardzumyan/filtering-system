import ProductCard from "./ProductCard.jsx";

const ProductsList = (props) => {
  const { products } = props

  if (!products || products.length === 0) {
    return <p className="text-center text-lg mt-5 text-stone-500">No products found</p>;
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mt-4 mb-2">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map(product =>
          <ProductCard key={product.id} product={product} />
        )}
      </div>
    </section>
  )
}

export default ProductsList