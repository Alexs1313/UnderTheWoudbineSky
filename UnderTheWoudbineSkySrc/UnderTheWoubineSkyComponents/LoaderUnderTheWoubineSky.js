import React from 'react';
import { ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

const LoaderUnderTheWoubineSky = () => {
  const loaderHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .loader {
        --fill-color: #E11712;
        --shine-color: rgba(225, 23, 18, 0.22);
        color: var(--fill-color);
        width: 120px;
        height: 160px;
        position: relative;
        filter: drop-shadow(0 0 10px var(--shine-color));
      }

      .loader svg {
        position: absolute;
        width: 100px;
        height: 100px;
        left: 10px;
        top: 0;
      }

      .loader #pegtopone {
        animation: flowe-one 1s linear infinite;
      }

      .loader #pegtoptwo {
        opacity: 0;
        transform: scale(0) translateY(-200px) translateX(-100px);
        animation: flowe-two 1s linear infinite;
        animation-delay: 0.3s;
      }

      .loader #pegtopthree {
        opacity: 0;
        transform: scale(0) translateY(-200px) translateX(100px);
        animation: flowe-three 1s linear infinite;
        animation-delay: 0.6s;
      }

      .loader svg g path:first-child {
        fill: var(--fill-color);
      }

      @keyframes flowe-one {
        0% { transform: scale(0.5) translateY(-200px); opacity: 0; }
        25% { transform: scale(0.75) translateY(-100px); opacity: 1; }
        50% { transform: scale(1) translateY(0px); opacity: 1; }
        75% { transform: scale(0.5) translateY(50px); opacity: 1; }
        100% { transform: scale(0) translateY(100px); opacity: 0; }
      }

      @keyframes flowe-two {
        0% { transform: scale(0.5) rotate(-10deg) translateY(-200px) translateX(-100px); opacity: 0; }
        25% { transform: scale(1) rotate(-5deg) translateY(-100px) translateX(-50px); opacity: 1; }
        50% { transform: scale(1) rotate(0deg) translateY(0px) translateX(-25px); opacity: 1; }
        75% { transform: scale(0.5) rotate(5deg) translateY(50px) translateX(0px); opacity: 1; }
        100% { transform: scale(0) rotate(10deg) translateY(100px) translateX(25px); opacity: 0; }
      }

      @keyframes flowe-three {
        0% { transform: scale(0.5) rotate(10deg) translateY(-200px) translateX(100px); opacity: 0; }
        25% { transform: scale(1) rotate(5deg) translateY(-100px) translateX(50px); opacity: 1; }
        50% { transform: scale(1) rotate(0deg) translateY(0px) translateX(25px); opacity: 1; }
        75% { transform: scale(0.5) rotate(-5deg) translateY(50px) translateX(0px); opacity: 1; }
        100% { transform: scale(0) rotate(-10deg) translateY(100px) translateX(-25px); opacity: 0; }
      }
    </style>
  </head>
  <body>
    <div class="loader">
      <svg id="pegtopone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <filter id="shine1"><feGaussianBlur stdDeviation="3" /></filter>
          <mask id="mask1">
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
          </mask>
          <radialGradient id="g11" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="black" stop-opacity="0.3" />
            <stop offset="50%" stop-color="black" stop-opacity="0.1" />
            <stop offset="100%" stop-color="black" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="g12" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="white" stop-opacity="0.3" />
            <stop offset="50%" stop-color="white" stop-opacity="0.1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="g13" cx="85" cy="50" fx="85" fy="50" xlink:href="#g12" />
          <radialGradient id="g14" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlink:href="#g13" />
          <linearGradient id="g15" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="black" stop-opacity="0.2" />
            <stop offset="40%" stop-color="black" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g>
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g11)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine1)" mask="url(#mask1)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g12)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g13)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g14)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g15)" />
        </g>
      </svg>

      <svg id="pegtoptwo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <filter id="shine2"><feGaussianBlur stdDeviation="3" /></filter>
          <mask id="mask2">
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
          </mask>
          <radialGradient id="g21" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="black" stop-opacity="0.3" />
            <stop offset="50%" stop-color="black" stop-opacity="0.1" />
            <stop offset="100%" stop-color="black" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="g22" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="white" stop-opacity="0.3" />
            <stop offset="50%" stop-color="white" stop-opacity="0.1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="g23" cx="85" cy="50" fx="85" fy="50" xlink:href="#g22" />
          <radialGradient id="g24" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlink:href="#g23" />
          <linearGradient id="g25" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="black" stop-opacity="0.2" />
            <stop offset="40%" stop-color="black" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g>
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g21)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine2)" mask="url(#mask2)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g22)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g23)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g24)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g25)" />
        </g>
      </svg>

      <svg id="pegtopthree" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <filter id="shine3"><feGaussianBlur stdDeviation="3" /></filter>
          <mask id="mask3">
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
          </mask>
          <radialGradient id="g31" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="black" stop-opacity="0.3" />
            <stop offset="50%" stop-color="black" stop-opacity="0.1" />
            <stop offset="100%" stop-color="black" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="g32" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="white" stop-opacity="0.3" />
            <stop offset="50%" stop-color="white" stop-opacity="0.1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="g33" cx="85" cy="50" fx="85" fy="50" xlink:href="#g32" />
          <radialGradient id="g34" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlink:href="#g33" />
          <linearGradient id="g35" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="black" stop-opacity="0.2" />
            <stop offset="40%" stop-color="black" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g>
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g31)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine3)" mask="url(#mask3)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g32)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g33)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g34)" />
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#g35)" />
        </g>
      </svg>
    </div>
  </body>
  </html>
  `;

  return (
    <ImageBackground
      source={require('../../assets/images/woudbineonbg.png')}
      style={{
        flex: 1,
      }}
    >
      <WebView
        originWhitelist={['*']}
        source={{ html: loaderHtml }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

export default LoaderUnderTheWoubineSky;
