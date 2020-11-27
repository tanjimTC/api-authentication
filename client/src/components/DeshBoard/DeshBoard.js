import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
const DeshBoard = (props) => {
  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname); // result: '/secondpage'
    // console.log(location.search); // result: '?query=abc'
    // console.log(location.state.detail); // result: 'some_value'
  }, [location]);
  return (
    <div>
      <h1>welcome to DeshBoard</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};

export default connect(mapStateToProps, null)(DeshBoard);
