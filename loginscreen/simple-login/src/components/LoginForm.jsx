import React from "react";

const LoginForm = (props) => {
   return (
      <div className="form-group">
         {props.children}
         <input
            className={props.checkError ? "input--error" : "input"}
            type={
               props.formType === "name"
                  ? "text"
                  : props.pwShown
                  ? "text"
                  : "password"
            }
            name={props.formType}
            id={props.formType}
            onChange={(e) => {
               props.setDetails((prev) => {
                  const updatedDetails = {
                     ...prev,

                     password: e.target.value, // Have to fix here to depend on props.formType
                  };
                  return updatedDetails;
               });
               props.setIsError(false);
            }}
            onFocus={() => props.setIsPwFocused(true)}
            onBlur={() => props.setIsPwFocused(false)}
            ref={props?.refInput}
            value={props.details.formType}
         />
         {props.children}
         <label
            className={props.details.formType ? "Active" : ""}
            htmlFor={props.formType}
         >
            {props.formType === "name"
               ? `user${[props.formType]}`
               : props.formType}
         </label>
      </div>
   );
};

export default LoginForm;
