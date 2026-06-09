import { Navigate, Route, Routes } from 'react-router'
import { AppProvider, LoaderProvider, ProductProvider } from './providers'
import { Product, ProductList } from './pages'

function App() {
  return (
    <AppProvider>
      <LoaderProvider>
        <Routes>
          <Route path='product' element={<ProductProvider />}>
            <Route index element={<ProductList />} />
            <Route path=':id' element={<Product />} />
          </Route>
          <Route path='*' element={<Navigate to={'/product'} replace />} />
        </Routes>
      </LoaderProvider>
    </AppProvider>
  )
}

export default App
