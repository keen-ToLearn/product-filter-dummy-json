import { useNavigate } from 'react-router'

export const ProductList = () => {
    const navigate = useNavigate();

    return (
        <section>
            <h1>Product List</h1>
            <button onClick={() => navigate('/product/12')}>To Product</button>
        </section>
    )
}