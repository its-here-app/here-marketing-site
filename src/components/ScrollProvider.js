import React, { useEffect, useRef, useState } from 'react';


const ScrollProvider = ({
  Context,
  children,
}) => {
  return (
    <Context.Provider>
      {children}
    </Context.Provider>

  )

}

export default ScrollProvider;