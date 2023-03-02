import React, { useEffect, useState } from "react";
import Switch from "react-switch";

function SwitchPage({ handleChange, viewstatus, title }) {
  const [togglePage, setTogglePage] = useState(viewstatus === 0 ? false : true);
  useEffect(() => {
    setTogglePage(viewstatus === 0 ? false : true);
  }, [viewstatus]);
  const [viewDetails, setViewDetails] = useState(viewstatus && viewstatus);
  const handleOnChange = (checked) => {
    setTogglePage(!togglePage);
    let switchData = {
      target: {
        name: title,
        value: checked ? 1 : 0,
        detail: viewDetails,
      },
    };

    handleChange(switchData);
  };
  useEffect(() => {
    setViewDetails(viewstatus && viewstatus.viewDetails);
  }, [viewstatus]);
  return (
    <div>
      <Switch onChange={handleOnChange} checked={togglePage} />
    </div>
  );
}

export default SwitchPage;
