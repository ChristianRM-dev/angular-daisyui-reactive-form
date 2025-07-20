/**
 * Tailwind CSS configuration file
 * Includes DaisyUI plugin setup and theming configuration
 */
module.exports = {
  // Files to scan for class names (PurgeCSS in production)
  content: [
    "./src/**/*.{html,ts}", // All HTML and TypeScript files in src directory
  ],

  // Plugins to extend Tailwind functionality
  plugins: [
    require("daisyui") // Adds DaisyUI component library
  ],

  // DaisyUI specific configuration
  daisyui: {
    /**
     * Theme configuration
     * - Uses built-in light and dark themes
     * - Can be extended with custom themes
     * @see https://daisyui.com/docs/themes/
     */
    themes: ["light", "dark"],

    /**
     * Other available DaisyUI configuration options:
     * - darkTheme: "dark" (default dark theme name)
     * - base: true (injects base styles)
     * - styled: true (injects component styles)
     * - utils: true (injects utility classes)
     * - prefix: "" (class name prefix)
     * - logs: true (show daisyUI logs in console)
     */
  },

  /**
   * Additional Tailwind configuration can be added here:
   * - theme: {} (extend/override default theme)
   * - variants: {} (control which variants are generated)
   * - corePlugins: {} (disable core plugins)
   * @see https://tailwindcss.com/docs/configuration
   */
}
