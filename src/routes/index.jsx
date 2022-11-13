import { Routes, Route } from "@solidjs/router";
import Home from "./../pages/home";
import Category from "../pages/category";
import Layout from "../layout";
import Product from "../pages/product";

const RoutesComponent = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/category" component={Category} />
          <Route path="/category/:collectionAlias/:collectionGuid" component={Category} />
          <Route path="/product/:productName/:productGuid" component={Product} />
        </Routes>
      </Layout>
  )
  // return (
  //   <BrowserRouter>
  //     <Layout>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="category" element={<Category />}>
  //           <Route path=":collectionAlias/:collectionGuid" element={<Category />} />
  //         </Route>
  //         <Route path="product/:productName/:productGuid" element={<Product />} />
  //       </Routes>
  //     </Layout>
  //   </BrowserRouter>
  // );
}

export default RoutesComponent;
