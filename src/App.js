import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// Componente da categoria dos produtos
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
} // Fim

// Componente Dos produtos de cada linha
function ProductRow({ product }) {
  const name = product.stocked ? <span style={{ color: 'green'}}>{product.name}</span>  :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

const preco = product.stocked ? <span style={{ color: 'green'}}>{product.price}</span>  :
<span style={{ color: 'red' }}>
  {product.price}
</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{preco}</td>
    </tr>
  );
} // Fim


function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Componente da barra de pesquisa
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input className='pesquisar' type="text" value={filterText} placeholder="Pesquisar..."   
        onChange={(e) => onFilterTextChange(e.target.value)}/> <br/>
      <br/>
      <label >
        <input className='tamanho' checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} type="checkbox" />
         {' '}
       Mostrar apenas produtos no Estock 

      </label>
      
    </form>
  );
} // Fim

// Constante Produtos
const PRODUCTS = [
  {category: "Bolas", price: "2000 KZ", stocked: true, name: "Micassa"},
  {category: "Bolas", price: "4904 KZ", stocked: true, name: "Jabulane"},
  {category: "Bolas", price: "1253 KZ", stocked: false, name: "Bola 4"},
  {category: "Bolas", price: "12532 KZ", stocked: false, name: "Bola de Vidro"},
  {category: "Chuteiras", price: "1426 KZ", stocked: true, name: "Adidas"},
  {category: "Chuteiras", price: "8765 KZ", stocked: false, name: "Nike"},
  {category: "Chuteiras", price: "1421236 KZ", stocked: true, name: "FC Benfica"},
  {category: "Chuteiras", price: "876225 KZ", stocked: false, name: "FC Barcelona"},
  {category: "Chuteiras", price: "5432 KZ", stocked: true, name: "Puma"}
];


// Componente da tabela completa
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div> 
      <div className='principal'>
      <SearchBar filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly}/></div>
        
      <div className='principal'>
      <ProductTable products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
      </div>
      </div>
  );
}

function App() {
  
  return (
    <>
    <h1>Tabela de Produtos<hr/></h1>
    <FilterableProductTable products={PRODUCTS} />
    </>
  );
  
}

export default App;
