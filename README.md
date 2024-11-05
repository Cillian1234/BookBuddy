# Projecgt !

TO START PROJECT!!!

Check node is configured "node -v"

client> npm install, npm run dev

server> npm install, node --env-file=config.env server


============================================================================

Stuff we gotta keep standardised

Function names in pascal case. i.e. function MyFunction() not myFunction()

Use rem for font size, not px. 1rem = 16px, 0.75rem = 12px

Don't use <p> for everything, if text should be large or more important use the relevant <h#>
(Use relevant semantic tag in general)

Alt tags on images

Note: if you ever need the old value of state to help you determine the new value of state, you should pass a callback function to your state setter function instead of using state directly. This callback function will receive the old value of state as its parameter, which you can then use to determine your new value of state.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
