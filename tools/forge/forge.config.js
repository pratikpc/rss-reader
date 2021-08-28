// Forge Configuration
const path = require('path');

const rootDir = process.cwd();

module.exports = {
  // Packager Config
  packagerConfig: {
    // Create asar archive for main, renderer process files
    asar: true,
    // Set executable name
    executableName: 'pc-rss-reader',
    // Set application copyright
    appCopyright: 'Copyright (C) 2021 Chowdhury, Pratik',
  },
  // Forge Publishers
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'pratikpc',
          name: 'rss-reader',
        },
      },
    },
  ],
  // Forge Makers
  makers: [
    {
      // Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installing
      // Windows applications and is therefore the most user friendly you can get.
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'pc-rss-reader',
      },
    },
    {
      // The Zip target builds basic .zip files containing your packaged application.
      // There are no platform specific dependencies for using this maker and it will run on any platform.
      name: '@electron-forge/maker-zip',
    },
    {
      // The deb target builds .deb packages, which are the standard package format for Debian-based
      // Linux distributions such as Ubuntu.
      name: '@electron-forge/maker-deb',
      config: {},
    },
    // {
    //   name: '@electron-forge/maker-appx',
    //   config: {},
    // },
    {
      // The RPM target builds .rpm files, which is the standard package format for
      // RedHat-based Linux distributions such as Fedora.
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    // {
    //   name: '@electron-forge/maker-snap',
    //   config: {},
    // },
  ],
  // Forge Plugins
  plugins: [
    [
      // The Webpack plugin allows you to use standard Webpack tooling to compile both your main process code
      // and your renderer process code, with built in support for Hot Module Reloading in the renderer
      // process and support for multiple renderers.
      '@electron-forge/plugin-webpack',
      {
        // Ports
        port: 3000, // Webpack Dev Server port
        loggerPort: 9000, // Logger port
        // Main process webpack configuration
        mainConfig: path.join(rootDir, 'tools/webpack/webpack.main.js'),
        // Renderer process webpack configuration
        devContentSecurityPolicy:
          "default-src 'self' *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; media-src *",
        renderer: {
          // Configuration file path
          config: path.join(rootDir, 'tools/webpack/webpack.renderer.js'),
          // Entrypoints of the application
          entryPoints: [
            {
              // React Hot Module Replacement (HMR)
              rhmr: 'react-hot-loader/patch',
              // HTML index file template
              html: path.join(rootDir, 'src/index.html'),
              // Renderer
              js: path.join(rootDir, 'src/renderer.tsx'),
              // Main Window
              name: 'main_window',
              // Preload
              preload: {
                js: path.join(rootDir, 'src/preload.tsx'),
              },
            },
          ],
        },
      },
    ],
  ],
};
