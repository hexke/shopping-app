import { forwardRef } from 'react';

const Nutrition = forwardRef((props, ref) => (
    <div className="flex items-center w-max border-b">
        <label htmlFor={`${props.name}`} className="block text-sm w-32">
            {props.name}
            :
        </label>
        <input type="text" id={`${props.name}`} ref={ref} className="border-b-2 border-cyan-500 ml-1 text-sm w-12 text-center" />
    </div>
));

export default Nutrition;
