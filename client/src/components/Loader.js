// In this component use RingLoader form react-spinners to display a loader 

import React, { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  return (
    <div className="text-center" >
      <div className="sweet-loading  " style={{ marginTop: '200px', marginLeft: '720px' }}>
        <RingLoader color={'#256395'} loading={true} css='' size={80} />
      </div>
    </div>
  );
}

export default Loader;