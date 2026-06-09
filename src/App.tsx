import { Navigate, Route, Routes } from 'react-router'
import { LoaderProvider, ProductProvider } from './providers'
import { Product, ProductList } from './pages'

function App() {
  return (
    <LoaderProvider>
      <Routes>
        <Route path='product' element={<ProductProvider />}>
          <Route index element={<ProductList />} />
          <Route path=':id' element={<Product />} />
        </Route>
        <Route path='*' element={<Navigate to={'/product'} replace />} />
      </Routes>
    </LoaderProvider>
  )
}

export default App
