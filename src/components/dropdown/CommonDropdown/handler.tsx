import { useState } from "react";

const useDropDown = (initialValue: string) => {
  const [selectedOption, setSelectedOption] = useState<string>(initialValue);
  const [showOptions, setShowOptions] = useState(false);

  const handleLabelClick = (id: string) => {
    setSelectedOption(id);
    setShowOptions(false);
  };

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  return {
    selectedOption,
    showOptions,
    handleLabelClick,
    toggleShowOptions,
    setShowOptions,
  };
};

export { useDropDown };
