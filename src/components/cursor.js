import React, { useState, useEffect } from "react";
// import { gsap } from "gsap";


const Cursor = ({ MousePosition }) => {
  let cursor;
  useEffect(() => {
  }, []);
  useEffect(() => {
    var mouseX = MousePosition.left;
    var mouseY = MousePosition.top;
    // console.log(mouseX, mouseY)
    cursor.left = mouseX;
    // gsap.to(cursor, {
    //   duration: 0.3,
    //   left: mouseX - 12,
    //   top: mouseY - 12,
    // });
  }, [MousePosition]);

  return (
    <div>
      <div className="circle"></div>
    </div>
  );
};
export default Cursor;
