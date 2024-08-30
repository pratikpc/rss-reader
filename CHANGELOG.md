## v2.0.0 (2024-08-30)

### BREAKING CHANGE

- Had to make changes to the forat for tool/forge/forge.config to the newer format of plugin syntax which was a brwaking change on Electron end. Relates to https://stackoverflow.com/a/74222266/1691072
- Fixes errors related to https://github.com/electron/forge/issues/3065. These errors were triggered in the CI
- Electron Make now works. It failed on GitHub CI. As a result Electron is back to being a dev dependency thus satisfiying https://github.com/electron-userland/electron-builder/issues/7191 instead of a dev dependency.
- ESLint warning no longer triggered due to eslint-squirrel-startup
- Project dependencies have been updated. No outward breaking changes within the codebase
- Remove enableRemoteModule flag from main/createWindow
- App/ExtractFeed/Fetch/Headers sets Origin as * now thus allowing or at least requesting for access of all origins

### Feat

- **main/UpsertKeyValue**: add
- **App/ExtractFeed/Fetch/Headers/Origin**: add origin all header to fetch request

### Fix

- **Reat-Components/Call-Back-Events/Typings**: add
- **AddFeedDialog/FormDialog/Return-Value/Fragment**: remove unused unscoped fragment
- **package.json/electron/dev-dependencies-to-dependencies**: move
- **main/eslint/electron-squirrel-startup**: global requires warning disable
- **main/createWindow**: remove enable remote module

### Refactor

- **App/newFeedAdded/url=>urls**: rename

## v1.1.0 (2021-09-03)

### Feat

- add support for modifying URLs after addition

## v1.0.0 (2021-08-28)
