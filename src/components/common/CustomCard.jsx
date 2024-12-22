import React from "react";
import PropTypes from "prop-types";
import "./CustomCard.css"

const CustomCard = ({ 
  height, 
  children, 
  padding = "5%",
  margin = "3%",
  justifyContent = "center",
  alignItems = "center",
}) => {
  const style = {
    height: height, // 동적으로 전달된 높이
    padding: padding,
    margin: margin,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };

  return <div style={style} className="custom-card">{children}</div>;
};

CustomCard.propTypes = {
  height: PropTypes.string.isRequired, // 높이를 필수로 받음
  children: PropTypes.node, // 자식 요소를 받음
};

export default CustomCard;