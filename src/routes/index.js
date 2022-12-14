import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./../pages/home";
import Category from "./../pages/category";
import Layout from "../layout";
import Product from "../pages/product";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="category" element={<Category />}>
            <Route path=":collectionAlias/:collectionGuid" element={<Category />} />
          </Route>
          <Route path="product/:productName/:productGuid" element={<Product />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default RoutesComponent;
