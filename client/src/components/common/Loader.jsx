import './Loader.css';

export const Loader = ({ size = 'medium' }) => {
    return (
        <div className="loader-container">
            <div className={`loader loader-${size}`}></div>
        </div>
    );
};
