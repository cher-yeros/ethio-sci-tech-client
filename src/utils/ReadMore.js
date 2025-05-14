import React, { useState } from "react";
import { Button } from "react-bootstrap";

function ReadMore({ text, length, title }) {
  const [showLess, setShowLess] = useState(true);

  const trimmedText = () => {
    const indexOfSpace = text.indexOf(" ", length);
    return text.length > length ? text.substring(0, indexOfSpace) + "..." : "";
  };

  return (
    text.length !== 0 && (
      <>
        {title} : {" " + (showLess ? trimmedText() : text)}
        <Button
          size="sm"
          variant="link"
          onClick={(e) => setShowLess(!showLess)}
        >
          {showLess ? "read more" : "read less"}
        </Button>
      </>
    )
  );
}

export default ReadMore;
