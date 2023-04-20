const sharedStyles = 'group w-max p-1 px-3 rounded-md transition-colors';

function Button(props) {
    const {
        inverted, children, type, classes, ...rest
    } = props;

    const btnClasses = inverted
        ? `${classes || ''} ${sharedStyles} bg-transparent border-fuchsia-500 border text-fuchsia-500 hover:text-white hover:bg-fuchsia-700 hover:border-fuchsia-700`
        : `${classes || ''} ${sharedStyles} text-white bg-fuchsia-500 hover:bg-fuchsia-700`;

    return (
        /* eslint-disable react/button-has-type */
        <button {...rest} type={type || 'button'} className={btnClasses}>
            {children}
        </button>
        /* eslint-enable react/button-has-type */
    );
}

export default Button;
