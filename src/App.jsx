import Button from 'react-bootstrap/Button';
import './App.css'
import Form from 'react-bootstrap/Form';
import { Fragment, useState } from 'react';
import { nanoid } from 'nanoid';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import IconButton from './components/IconButton';
import Fuse from 'fuse.js';


const shops = ["BİM", "A101", "ŞOK", "MİGROS", "MEDİAMARKT"];

const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat", "Fırın"];

const categoriesObj = categories.map((categories, index) => ({
  id: index,
  name: categories,
}));

const TableRow = styled.tr`
text-decoration : ${(props) => props.isBought === true ? "line-through" : "unset"}
`;


function App() {

  const [products, setProducts] = useState([]);

  const [productName, setProductsName] = useState("");
  const [productShop, setProductsShop] = useState("");
  const [productCategory, setProductsCategory] = useState("");

  const [filteredName, setFilteredName] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const handleAddProduct = () => {

    const product = {
      id: nanoid(),
      name: productName,
      category: productCategory,
      shop: productShop,
    };
    setProducts([...products, product]);
  };

  const filteredProducts = products.filter((product) => {
    let result = true;

    const fuse = new Fuse(products, {
      keys: ["name"],
    });
    const res = fuse.search(filteredName);

    if (filteredName !== `` && !res.find(r => r.item.id === product.id)) {
      result = false;
    }

    // Status
    if (filteredStatus !== 'reset' && product.isBought === true && filteredStatus !== true ||
      product.isBought === undefined && filteredStatus === true
    ) {
      result = false;
    }

    // Shop

    if (filteredShopId !== "" && product.shop !== filteredShopId) {
      result = false;
    }

    // Category

    if (filteredCategoryId !== "" && product.category !== filteredCategoryId) {
      result = false;
    }

    return result;
  });

  return (
    <Fragment>
      <div className='d-flex align-items-end' >
        <Form className='d-flex align-items-end'>
          <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
            <Form.Label>Ürün</Form.Label>
            <Form.Control
              value={productName}
              onChange={(e) => {
                setProductsName(e.target.value);
              }}
              type="text" placeholder="Ürün adını giriniz" />
          </Form.Group>
          <Form.Select style={{
            maxWidth: "125px"
          }}
            aria-label="markt"
            value={productShop}
            onChange={(e) => {
              setProductsShop(e.target.value);
            }}
          >
            <option>Market</option>
            {shopsObj.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{
              maxWidth: "125px"
            }}
            aria-label="ürün"
            value={productCategory}
            onChange={(e) => {
              setProductsCategory(e.target.value);
            }}
          >
            <option>Ürünler</option>
            {categoriesObj.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form>
        <Button variant="outline-primary" onClick={handleAddProduct}>Ekle</Button>
      </div >
      <Form className='d-flex align-items-end'>
        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
          <Form.Label>Filtrelenen Ürün</Form.Label>
          <Form.Control
            value={filteredName}
            onChange={(e) => {
              setFilteredName(e.target.value);
            }}
            type="text" placeholder="Ürün adını giriniz" />
        </Form.Group>
        <Form.Select style={{
          maxWidth: "125px"
        }}
          aria-label="markt"
          value={filteredShopId}
          onChange={(e) => {
            setFilteredShopId(e.target.value);
          }}
        >
          <option value={""}>Filtrelenen Market</option>
          {shopsObj.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          style={{
            maxWidth: "125px"
          }}
          aria-label="ürün"
          value={filteredCategoryId}
          onChange={(e) => {
            setFilteredCategoryId(e.target.value);
          }}
        >
          <option value={""}>Filtrelenen Kategori</option>
          {categoriesObj.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
        <Form.Group onChange={(e) => {
          setFilteredStatus(e.target.value);
        }}>
          <Form.Check
            inline
            value={'reset'}
            label="Sıfırla"
            name="group1"
            type={"radio"}
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            value={true}
            label="Alınan"
            name="group1"
            type={"radio"}
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            value={false}
            label="Alınmayan"
            name="group1"
            type={"radio"}
            id={`inline-radio-3`}
          />
        </Form.Group>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Adı</th>
            <th>Market</th>
            <th>Kategori</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product =>
          (
            <TableRow
              isBought={product.isBought}
              onClick={() => {
                const updatedProducts = products.map(oldProduct => {
                  if (oldProduct.id === product.id) {
                    return { ...oldProduct, isBought: true }
                  } else {
                    return oldProduct;
                  }
                });
                if (updatedProducts.every((uP => Boolean(uP.isBought)))) {
                  alert("Alışveriş Tamamlandı!!!");
                }
                setProducts(updatedProducts);
              }}
              key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{shopsObj.find(shopObj =>
                shopObj.id == product.shop).name}</td>
              <td>{categoriesObj.find(categoryObj =>
                categoryObj.id == product.category).name}</td>
              <IconButton
                handleClick={() => {
                  setProducts(products.filter(filterProduct =>
                    filterProduct.id !== product.id))
                }}
              />
            </TableRow>))}
        </tbody>
      </Table>
    </Fragment >
  );
}

export default App;