"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import classNames from "classnames/bind";
import { SvgIcon } from "src/components/icon/SvgIcon";
import useClickOutside from "src/hooks/useClickOutside";
import { useDropDown } from "./handler";
import style from "./CommonDropdown.module.scss";

const cx = classNames.bind(style);

interface Props {
  readonly options: {
    id: string;
    label: string;
  }[];
  readonly placeholder?: string;
  readonly className?: string;
  readonly initialValue?: string;
  readonly size?: "sm" | "md" | "lg" | "full";
  changeHandler?: any;
}

const CommonDropdown = forwardRef(
  ({ options, placeholder, className, initialValue, size, changeHandler }: Props, ref) => {
    const { selectedOption, showOptions, handleLabelClick, toggleShowOptions, setShowOptions } =
      useDropDown(initialValue || "");
    const dropdownRef = useRef(null);

    useImperativeHandle(ref, () => ({
      setInitialValue: (val: string) => {
        handleLabelClick(val);
      },
    }));

    useClickOutside(dropdownRef, () => {
      setShowOptions(false);
    });

    return (
      <div className={cx("dropdown", `size-${size}`, className)} ref={dropdownRef}>
        <button type="button" className={cx("selected-option")} onClick={toggleShowOptions}>
          <span className={cx("selected-option-text")}>
            {selectedOption
              ? options.filter((option) => option.id === selectedOption)[0].label
              : placeholder}
          </span>
          <SvgIcon iconName="arrow-triangle" size={10} />
        </button>

        {showOptions && (
          <div className={cx("option-list")}>
            {options.map((option) => (
              <div key={option.id} className={cx("option")}>
                <button
                  type="button"
                  onClick={() => {
                    handleLabelClick(option.id);
                    if (changeHandler) {
                      changeHandler(option.id);
                    }
                  }}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export { CommonDropdown };
