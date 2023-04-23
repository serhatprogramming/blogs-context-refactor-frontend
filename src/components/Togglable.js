import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const toggleVisible = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
