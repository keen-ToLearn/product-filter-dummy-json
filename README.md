# Setup Instructions:

- Ensure Node v22 LTS or above is installed. [Download here](https://nodejs.org/en/download)
- Project has used Node v24 LTS
- Clone the Git Repository ```git clone https://github.com/keen-ToLearn/product-filter-dummy-json.git```
- Perform ```npm install```
- Use command ```npm run dev``` to run application in Development mode

# Assumptions Made:

## Search
- A search Query may not necessarily correspond with selected Categories
- Reset all filters if a search is done

## Brand and Price
- Brand and Price Filter will apply only on loaded data
- For Filters like Price and Brand, the API should allow some Parameter else for true filtering complete data would have to be fetched
- In a real-world application, fetching millions of product records would cause the application to fail

## Other
- Any Filter if applied should disable the paginated calls for Products

# Architectural Decisions:

- Debounce search Query to prevent data fetch on every key stroke
- Used ```select``` Request Parameter to fetch data limited to requirement on the page
- When no Filter is applied, data is fetched for non-active, accessible pages in advance. For example, if we click on Page 4, then since Page 6 button becomes accessible, fetch Product data for Page 6 in advance
- Segregated folders for layout / controller components and presentational components for scalability
- Ensured generic utilities are accessible throughout application to prevent duplication

# Improvements:

- Lazy load Product Detail components
- Filter input query to prevent SQL Injection attacks
- Setup cdn such that images are cached on client browser with timeout - Currently images have Cache control set to no-store
- Setup Prettier to auto apply spacing, semi-colon, single quotes and such rules
- Replace Pagination by Infinite scroll
- Add Accessibility as per recommendations from Lighthouse report like Button accessible names and more
- Add Responsive CSS for Tablet and Mobile layouts
- Write Unit tests
- Move config like API base URI to a config file
- Add more Typescript configs for added type safety
- Default Category and Brand Sets could be made Singleton
- Move constants to a separate folder in source folder
- Allow decimals in Price Filter fields
- Avoid types file for components which are known to not require many types

# Learnings:

- When performing functional updates of states like Map and Set, return a new object instead of mutating and returning the existing one

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
