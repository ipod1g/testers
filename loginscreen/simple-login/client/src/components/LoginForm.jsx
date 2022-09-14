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

   return (
      <div className="form-group">
         <input
            className={props.isError ? "input--error" : "input"}
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
            onBlur={() => props.setIsPwFocused(false)}
            onFocus={() => {
               props.setIsPwFocused(true);
               props.setIsError(false);
            }}
            ref={props?.refInput}
            value={props.details}
         />
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
