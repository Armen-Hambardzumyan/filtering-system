import IconStar from "@spectrum-icons/workflow/Star";

const ProductCard = ({product}) => {
  return (
    <div className="shadow-md rounded-lg border border-cyan-500 p-3">
      <img src={product.imageUrl} alt={product.name} className="rounded-t-lg w-full h-auto aspect-[3/2] object-cover"/>
      <div className="bg-cyan-950 text-stone-300 p-3 rounded-b-lg">
        <h2 className="text-lg mb-2 font-semibold">{product.name}</h2>
        <div className="flex flex-row flex-wrap gap-y-1">
          <p className="basis-1/2">Category: {product.category}</p>
          <p className="basis-1/2 font-semibold flex justify-end items-center gap-x-1">
            <IconStar size="XS" color="notice"/>
            <span className="text-yellow-500">{product.rating}</span>
          </p>
          <p className="basis-1/2">Brand: {product.brand}</p>
          <p className="basis-1/2 text-right">Price: <span
            className="font-semibold text-emerald-300">${product.price}</span></p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard