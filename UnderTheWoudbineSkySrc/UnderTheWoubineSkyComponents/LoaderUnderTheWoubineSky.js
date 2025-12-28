import React from 'react';
import { ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

const LoaderUnderTheWoubineSky = () => {
  const loaderHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <style>
      html, body {
        padding: 0;
        margin: 0;
        overflow: hidden;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      body {
        perspective: 100px;
      }

      .loader-container {
        position: relative;
        width: 50vmin;
        height: 50vmin;
      }

      .trunk,
      .trunk div {
        background: #EA2118;
        will-change: transform;
        width: 25vmin;
        height: 2.5vmin;
        position: absolute;
        margin-left: -2.5vmin;
        animation-name: rot;
        animation-duration: 2.26562s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform-origin: 1.25vmin 1.25vmin;
        animation-timing-function: ease-in-out;
      }

      .trunk.trunk,
      .trunk div.trunk {
        bottom: 0;
        left: 50%;
        animation-name: rot-root;
        animation-duration: 2.46428s;
      }

      .trunk >div,
      .trunk div >div {
        top: 0;
        left: 25vmin;
        animation-duration: calc((inherit / 2));
      }

      .trunk >div:nth-child(2),
      .trunk div >div:nth-child(2) {
        animation-name: rot-inv;
        animation-duration: 1.777351213486541s;
      }

      @keyframes rot {
        from { transform: rotate(15deg) scale(0.72); }
        to { transform: rotate(45deg) scale(0.72); }
      }

      @keyframes rot-inv {
        from { transform: rotate(-45deg) scale(0.72); }
        to { transform: rotate(-15deg) scale(0.72); }
      }

      @keyframes rot-root {
        from { transform: rotate(-95deg); }
        to { transform: rotate(-85deg); }
      }
    </style>
  </head>
  <body>
    <div class="loader-container">
      <div class="trunk trunk">
        <div>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
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
      />
    </ImageBackground>
  );
};

export default LoaderUnderTheWoubineSky;
