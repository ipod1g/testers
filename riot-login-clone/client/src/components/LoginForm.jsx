import React from "react";

const LoginForm = (props) => {
   const changeHandler = (e) => {
      props.setDetails(e.target.value);
      props.setIsError(false);
   };

   const focusHandler = () => {
      props.setIsPwFocused?.(true);
   };

   const handleKeyDown = (e) => {
      if (e.key === " ") {
         e.preventDefault();
      }
   };

   return (
      <div className="form-group">
         <input
            className={props.isError ? "input--error" : "input"}
            type={
               props.formType === "username"
                  ? "text"
                  : props.pwShown
                  ? "text"
                  : "password"
            }
            name={props.formType}
            id={props.formType}
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
            onBlur={() => props.setIsPwFocused?.(false)}
            onFocus={focusHandler}
            ref={props?.refInput}
            value={props.details}
            autoComplete="off"
         />
         <label
            className={props.details ? "Active" : ""}
            htmlFor={props.formType}
         >
            {props.formType}
         </label>
      </div>
   );
};

export default LoginForm;
