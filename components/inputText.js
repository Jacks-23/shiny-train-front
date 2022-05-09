import React from "react";

const InputText = ({name, placeholder, value, handleChange}) => {
    return ( 
        <>
         <input type = "text" name={name} placeholder={placeholder}
            value={value} onChange={handleChange}
            className="mt-1 px-1 py-2 bg-white border shadow-sm border-slate-300
            placeholder-slate-400 focus:outline-none focus:border-sky-500
            focus:ring-sky-500 block w-full h-7 rounded-sm sm:text-sm focus:ring-1
            placeholder:text-sm;"/>
        </>
       
     );
};
 
export default InputText;