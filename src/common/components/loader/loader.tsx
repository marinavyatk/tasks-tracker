import React from "react";
import s from "./loader.module.css";

const Loader = () => {
  return (
    // <main>
    <svg className="ip" viewBox="0 0 256 128" width="256px" height="90px" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1ddecb" />
          <stop offset="33%" stopColor="#fff699" />
          <stop offset="67%" stopColor="#f78200" />
          <stop offset="100%" stopColor="#bb86fc" />
        </linearGradient>
        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#bb86fc" />
          <stop offset="33%" stopColor="#b143b3" />
          <stop offset="67%" stopColor="#009cdf" />
          <stop offset="100%" stopColor="#1ddecb" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeWidth="16">
        <g className="ip__track" stroke="#ddd">
          <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
          <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
        </g>
        <g strokeDasharray="180 656">
          <path
            className={s.ip__worm1}
            stroke="url(#grad1)"
            strokeDashoffset="0"
            d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
          />
          <path
            className={s.ip__worm2}
            stroke="url(#grad2)"
            strokeDashoffset="358"
            d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
          />
        </g>
      </g>
    </svg>
    // </main>
  );
};

export default Loader;
