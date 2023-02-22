import React from "react";

export default function Success({ msg }) {
  return (
    <div>
      <div class="alert alert-success text-center" role="alert">
        {msg}
      </div>
    </div>
  );
}