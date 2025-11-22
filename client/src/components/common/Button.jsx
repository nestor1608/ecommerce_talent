import './Button.css';

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    type = 'button',
    fullWidth = false,
    ...props
}) => {
    const className = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''}`;

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
