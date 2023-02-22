//This is a component for Error which accepts a props msg to display a message

import React from "react";

export default function Error({ msg }) {
  return (
    <div>
      <div className="alert alert-danger text-center" role="alert">
        {msg}
      </div>
    </div>
  );
}