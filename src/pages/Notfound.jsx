import { Link, useNavigate } from 'react-router-dom';

function Notfound() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className="not-found min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>
            <p className='mb-4'>Your requested page was not found.</p>
            <button onClick={handleGoBack} className="btn btn-primary">Back</button>
        </div>
    );
}

export default Notfound;