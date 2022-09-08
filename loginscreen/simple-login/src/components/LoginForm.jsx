import React from "react";

const LoginForm = (props) => {
   const handleChange = (e) => {
      if (props.formType === "name") {
         props.setDetails((prev) => {
            const updatedDetails = {
               ...prev,

               name: e.target.value,
            };

            return updatedDetails;
         });
      } else if (props.formType === "password") {
         props.setDetails((prev) => {
            const updatedDetails = {
               ...prev,

               password: e.target.value,
            };

            return updatedDetails;
         });
      }
      props.setIsError(false);
   };

   const focusBack = () => {
      props.setIsPwFocused(true);
   };

   return (
      <div className="form-group">
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
            onChange={handleChange}
            onFocus={props.formType === "password" ? focusBack : null}
            ref={props?.refInput}
            value={props.details}
         />
         {props.children}
         <label
            className={props.details ? "Active" : ""}
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
