import { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { DropdownIndicator } = components;

const CaretDownIcon = () => {
   return <FontAwesomeIcon icon="caret-down" />;
};

const CaretUpIcon = () => {
   return <FontAwesomeIcon icon="caret-up" />;
};

export const CustomDropdownIndicator = (props) => {
   const {
      selectProps: { menuIsOpen },
   } = props;
   return (
      <DropdownIndicator {...props}>
         {menuIsOpen ? <CaretUpIcon /> : <CaretDownIcon />}
      </DropdownIndicator>
   );
};
