import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({ type, text, id }) => (
  <ReactTooltip className="tooltip" id={id} type={type} place="top" effect="solid" delayShow={300}>
    {text}
  </ReactTooltip>
);

export default Tooltip;
