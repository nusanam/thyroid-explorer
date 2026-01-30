# Thyroid-Reproductive Health Connection Explorer

An interactive data visualization exploring how thyroid dysfunction cascades into reproductive health impacts.

## Why This Matters

Subclinical thyroid dysfunction affects 5-10% of reproductive-age women but is often overlooked in standard care. This visualization demonstrates:

- How thyroid markers influence reproductive hormones
- Why comprehensive testing (not just TSH) is critical
- The biological pathways from cause to effect
- Clinical scenarios from optimal to dysfunctional states

If you'd like more details, please take a look at [TechnicalDetails.md](TechnicalDetails.md)

## Features

- **Interactive Network Graph**: Explore connections between thyroid and reproductive health
- **Severity Slider**: See how impacts amplify from subclinical to overt dysfunction
- **Clinical Scenarios**: Pre-configured examples of real patient patterns
- **Guided Tour**: Step-by-step walkthrough of key pathways
- **Research-Backed**: All connections cited from peer-reviewed literature

## Technical Stack

- React + TypeScript
- D3.js for visualization
- Framer Motion for animations
- Tailwind CSS for styling

## Running Locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Research Sources

1. Poppe K, et al. "Thyroid disease and female reproduction." Clinical Endocrinology. 2007
2. Krassas GE, et al. "Thyroid function and human reproductive health." Endocrine Reviews. 2010

## Built With

Created as a portfolio project to demonstrate the intersection of data visualization, health education, and comprehensive lab testing advocacy.

### Component Structure

src/
components/
ThyroidExplorer.tsx // Main container
NetworkVisualization.tsx // The D3 graph
NodeDetail.tsx // Click to see detail panel
LinkHighlight.tsx // Hover to highlight pathway
SeveritySlider.tsx // Show subclinical → overt progression
CategoryLegend.tsx // Color key
ComparisonToggle.tsx // Hashimoto's vs non-autoimmune
ResearchCitations.tsx // Expandable references
data/
nodes.ts // Node definitions
links.ts // link definitions
scenarios.ts // Pre-defined severity scenarios
utils/
layoutCalculator.ts // Position nodes
pathfinder.ts // Find paths between nodes

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // alternative for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optional stylistic rules
      tseslint.configs.stylisticTypeChecked,

    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js

import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
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
    },
  },
]);
```
