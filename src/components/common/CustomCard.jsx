import React from "react";
import PropTypes from "prop-types";
import "./CustomCard.css"

const CommonBox = ({ height, children }) => {
  const style = {
    height: height, // 동적으로 전달된 높이
  };

  return <div style={style} className="custom-card">{children}</div>;
};

CommonBox.propTypes = {
  height: PropTypes.string.isRequired, // 높이를 필수로 받음
  children: PropTypes.node, // 자식 요소를 받음
};

export default CommonBox;