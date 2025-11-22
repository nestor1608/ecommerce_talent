import './Input.css';

export const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    ...props
}) => {
    return (
        <div className="input-group">
            {label && (
                <label htmlFor={name} className="input-label">
                    {label} {required && <span className="required">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`input ${error ? 'input-error' : ''}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
