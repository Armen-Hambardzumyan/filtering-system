import {Item, Picker, RangeSlider} from "@adobe/react-spectrum";
import {useState, useEffect, useCallback} from "react";
import useDebounce from "../hooks/useDebounce.js";
import IconFilter from "@spectrum-icons/workflow/Filter";

const filterNames = ['category', 'brand', 'rating'];

const Filters = ({ setProducts, allProducts }) => {
  const [priceRange, setPriceRange] = useState({ start: 0, end: 0 });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [rating, setRating] = useState('All');
  const debouncedPriceRange = useDebounce(priceRange, 1000)

  const [filterToggle, setFilterToggle] = useState(false);

  useEffect(() => {
    if (allProducts.length > 0) {
      const prices = allProducts.map((product) => product.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setPriceRange({ start: minPrice, end: maxPrice });
    }
  }, [allProducts]);

  const handleRangeChange = (newValue) => {
    setPriceRange(newValue);
  };

  const getOptions = (name) => {
    if (name === 'rating') {
      return ['All', '1', '2', '3', '4', '5'].reduce((acc, item) => [...acc, {id: item}], [])
    }
    return [...new Set(['All', ...allProducts.map((product) => product[name])])]
      .reduce((acc, product) => [...acc, {id: product}], [])
  };

  const filterProducts = useCallback(() => {
    if (allProducts.length > 0 && debouncedPriceRange.end !== 0) {
      const filteredProducts = allProducts.filter((product) => {
        return (
          product.price >= debouncedPriceRange.start &&
          product.price <= debouncedPriceRange.end &&
          (category === 'All' || product.category === category) &&
          (brand === 'All' || product.brand === brand) &&
          (rating === 'All' || +product.rating >= +rating)
        );
      });
      setProducts(filteredProducts);
    }
  }, [debouncedPriceRange.start, debouncedPriceRange.end, category, brand, rating, allProducts, setProducts]);

  useEffect(() => {
    filterProducts()
  }, [debouncedPriceRange.start, debouncedPriceRange.end, category, brand, rating, filterProducts]);

  const filterHandlers = {
    category:setCategory,
    brand: setBrand,
    rating: setRating
  };

  const filterKeys = {
    category,
    brand,
    rating
  };

  return (
    <div>
      <button
        className="sm:hidden text-white border border-cyan-500 p-2 rounded-lg mb-4"
        onClick={() => setFilterToggle(!filterToggle)}
      >
        <IconFilter size="S"/>
      </button>
      <div className={`${filterToggle ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} sm:opacity-100 sm:max-h-screen transition-all duration-700 ease-in-out sm:block`}>
        <div className="flex flex-col md:flex-row justify-between gap-6 px-4 py-6 border border-cyan-500 rounded-lg">
          <RangeSlider
            width={"size-full"}
            label="Price Range"
            formatOptions={{style: 'currency', currency: 'USD'}}
            minValue={minPrice}
            maxValue={maxPrice}
            value={priceRange}
            onChange={handleRangeChange}
          />

          {filterNames.map((name, index) => (
            <Picker
              data-testid={name}
              width="100%"
              key={index}
              label={name.charAt(0).toUpperCase() + name.slice(1)}
              items={getOptions(name)}
              onSelectionChange={filterHandlers[name]}
              selectedKey={filterKeys[name]}
            >
              {(item) => <Item>{item.id}</Item>}
            </Picker>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
