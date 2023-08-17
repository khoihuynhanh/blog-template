# 1. Create Project
```
npx create-react-app .
```

# 2. Install `Prettier & ESlint`
```
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
```

# 3. Add script in `package.json `
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint --ext ts,tsx src/",
    "lint:fix": "eslint --fix --ext ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
  },
```

# 4. Create `.editorconfig` in root
```
[*]
indent_size = 2
indent_style = space
```

# 5. Create file `.eslintrc` in root
```
{
  "extends": ["react-app", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "always",
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 2,
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": true
      }
    ]
  }
}
```

# 6. Install `tailwindcss`
```
npm i -D tailwindcss postcss autoprefixer
```

# 7. Create config tailwind
```
npx tailwindcss init -p
```

# 8. Open file `tailwind.config.js` in root
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# 9. Open file `src/index.css`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# 10. plugin for sorting classes for tailwindcss
```
npm i -D prettier-plugin-tailwindcss
```

# 11. Install redux toolkit
```
npm i react-redux @reduxjs/toolkit
```

# 12. Terminal
```
npm lint:fix
```
