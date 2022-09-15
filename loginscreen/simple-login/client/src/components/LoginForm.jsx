import React from "react";

const LoginForm = (props) => {
   const handleChange = (e) => {
      // if (props.formType === "username") {
      //    props.setDetails((prev) => {
      //       const updatedDetails = {
      //          ...prev,

      //          name: e.target.value,
      //       };

      //       return updatedDetails;
      //    });
      // } else if (props.formType === "password") {
      //    props.setDetails((prev) => {
      //       const updatedDetails = {
      //          ...prev,

      //          password: e.target.value,
      //       };

      //       return updatedDetails;
      //    });
      // }
      props.setDetails(e.target.value);
      props.setIsError(false);
   };

   const handleFocus = () => {
      props.setIsPwFocused?.(true);
      props.setIsError(false);
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
            onChange={handleChange}
            onBlur={() => props.setIsPwFocused?.(false)}
            onFocus={handleFocus}
            ref={props?.refInput}
            value={props.details}
            autoComplete="false"
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
