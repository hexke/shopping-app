const sharedStyles = "group w-max p-1 px-3 rounded-md transition-colors";

const Button = (props) => {

    const btnClasses = props.inverted ?
        `${props.classes ? props.classes : ""} ${sharedStyles} bg-transparent border-fuchsia-500 border text-fuchsia-500 hover:text-white hover:bg-fuchsia-700 hover:border-fuchsia-700` :
        `${props.classes ? props.classes : ""} ${sharedStyles} text-white bg-fuchsia-500 hover:bg-fuchsia-700`;

    return (
        <button {...props} className={btnClasses}>
            {props.children}
        </button>
    );
}

export default Button;