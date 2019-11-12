import Vue from "vue";

const requireComponent = require.context(
  // Look for files in the current directory
  ".",
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /[\w-]+\.vue$/
);

// For each matching file name...
export default requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  // Get the PascalCase version of the component name
  const componentName = fileName
    .replace(/^\.\//, "")
    // Remove the file extension from the end
    .replace(/\.\w+$/, "");

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
