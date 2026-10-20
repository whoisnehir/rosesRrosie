import { Link } from 'react-router-dom';
import PlaceholderPage from '../components/PlaceholderPage';

const NotFoundPage = () => (
    <PlaceholderPage title="Page not found">
        This page does not exist.{' '}
        <Link to="/" className="underline hover:text-accent">
            Back to the home page
        </Link>
        .
    </PlaceholderPage>
);

export default NotFoundPage;
