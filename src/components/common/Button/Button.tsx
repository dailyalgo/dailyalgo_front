/* eslint-disable react/prop-types */
const Button = ({ ...props }) => {
  // console.log("props", props);
  const { bgColor, label } = props;
  return (
    <div>
      <button style={{ backgroundColor: bgColor }} type="button">
        {label}
      </button>
    </div>
  );
};

export default Button;
