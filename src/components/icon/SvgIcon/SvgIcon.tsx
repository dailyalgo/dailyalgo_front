import { memo } from "react";
import ReactSvg from "react-inlinesvg";
import classNames from "classnames/bind";

import { ICONS, SvgIconType } from "./constants";

import style from "./SvgIcon.module.scss";

const cx = classNames.bind(style);

type Props = {
  iconName: SvgIconType;
  className?: string;
  width?: number;
  height?: number;
  size?: number;
  title?: string;
  fill?: boolean;
};

const PATH = "/assets/svg";
const FOLDER = "svg-icon";

// eslint-disable-next-line prefer-arrow-callback
const SvgIcon = memo(function SvgIcon({
  iconName,
  className,
  size,
  width,
  height,
  title,
  fill,
}: Props) {
  if (iconName !== null) {
    return fill ? (
      <span className={cx("icon-wrap", className)}>
        <ReactSvg src={`${PATH}/${FOLDER}/${ICONS[iconName]}.svg`} width="100%" height="100%" />
        {title && <span className="a11y">{title}</span>}
      </span>
    ) : (
      <span
        className={cx("icon-wrap", className)}
        style={
          {
            "--svg-icon-height": `${size || height}px`,
            "--svg-icon-width": `${size || width}px`,
          } as React.CSSProperties
        }
      >
        <ReactSvg
          src={`${PATH}/${FOLDER}/${ICONS[iconName]}.svg`}
          width={size || width}
          height={size || height}
        />
        {title && <span className="a11y">{title}</span>}
      </span>
    );
  }
  return null;
});

export { SvgIcon };
