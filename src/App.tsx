import { Navigate, Route, Routes } from 'react-router'
import { ProductProvider } from './providers'
import { Product, ProductList } from './pages'

function App() {
  return (
    <Routes>
      <Route path='product' element={<ProductProvider />}>
        <Route index element={<ProductList />} />
        <Route path=':id' element={<Product />} />
      </Route>
      <Route path='*' element={<Navigate to={'/product'} replace />} />
    </Routes>
  )
}

export default App
