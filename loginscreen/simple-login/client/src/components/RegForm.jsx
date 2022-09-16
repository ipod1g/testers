import React from "react";

const Regform = (props) => {
   return (
      <div className="form-group">
         <input
            className="input"
            type={
               props.formType === "usernameReg"
                  ? "text"
                  : props.pwShown
                  ? "text"
                  : "password"
            }
            name={props.formType}
            id={props.formType}
            onChange={(e) => props.setDetails(e.target.value)}
            onBlur={() => props.setIsPwFocused?.(false)}
            onFocus={() => {
               props.setIsPwFocused?.(true);
            }}
            ref={props?.refInput}
            value={props.details}
         />
         <label
            className={props.details ? "Active" : ""}
            htmlFor={props.formType}
         >
            {props.formType.replace("Reg", "")}
         </label>
      </div>
   );
};

export default Regform;
