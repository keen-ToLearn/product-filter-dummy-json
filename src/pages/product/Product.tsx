import { useNavigate } from 'react-router';

export const Product = () => {
    const navigate = useNavigate();

    return (
        <section>
            <h1>Product</h1>
            <button onClick={() => navigate('/product')}>Back</button>
        </section>
    )
}