import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function handleClick(event) {
  event.preventDefault();
}

export default function ProductPath({ pathList }) {
  const [path, setPath] = useState(pathList);
  useEffect(() => {
    setPath(pathList);
  }, [pathList]);
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {path.map((data, index) => (
          <Typography color="text.primary" key={index}>
            {" "}
            {data}
          </Typography>
        ))}
      </Breadcrumbs>
    </div>
  );
}
