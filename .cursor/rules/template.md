# Next.js Project - Cursor Rules

## Metadata
- **Author:** Your Team Name
- **Version:** 1.0
- **Last Updated:** [Current Date]
- **Cursor Version:** [Compatible Cursor Version]

## Overview
This Next.js project uses TypeScript and TailwindCSS. These rules help maintain consistent development standards across the codebase.

## General Settings

```yaml
# General editor behavior and preferences
settings:
  theme: "dark" # or "light", "system"
  tabSize: 2
  insertSpaces: true
  formatOnSave: true
  formatOnPaste: false
  trimTrailingWhitespace: true
  trimFinalNewlines: true
  insertFinalNewline: true
  wordWrap: "off" # or "on", "wordWrapColumn", "bounded"
  rulers: [80, 120]
```

## AI Assistant Configuration

```yaml
aiAssistant:
  # General AI behavior
  enabled: true
  autoSuggest: true
  autoComplete: true
  model: "default" # or specify a particular model
```

## Custom Prompts

### Default System Prompt

```
You are an AI assistant integrated into the Cursor code editor, helping with Next.js development.
Your primary role is to assist with TypeScript and React code within the Next.js framework.

Always prioritize:
- Readability over brevity
- Standard library solutions over third-party packages when appropriate
- Consistent style with existing codebase
- Security best practices
```

### Language-Specific Prompts

#### JavaScript/TypeScript

```
When working with JavaScript/TypeScript code in this project:
- Use ES6+ features appropriately
- Prefer const over let, and avoid var
- Use TypeScript types consistently and explicitly
- Follow the project's module import/export conventions
- For async operations, prefer async/await over raw promises
- Use error handling with try/catch for async code

The project uses the following libraries/frameworks:
- Next.js 15.2.3
- React 19.0.0
- TailwindCSS 4.x

For testing, we use Jest and React Testing Library.
```

## Language-Specific Rules

### JavaScript/TypeScript

```yaml
javascript:
  semiColons: true
  quotes: "single"
  trailingComma: "es5"
  bracketSpacing: true
  arrowParens: "always"
  maxLineLength: 100
  preferConst: true
  noExplicitAny: true
  
typescript:
  strict: true
  noImplicitAny: true
  strictNullChecks: true
  strictFunctionTypes: true
  noImplicitThis: true
  alwaysStrict: true
```

## File-Specific Rules

```yaml
fileRules:
  # Rules for specific file types
  "*.md":
    trimTrailingWhitespace: false
    wordWrap: "on"
  
  # Rules for specific directories
  "app/components/**/*.tsx":
    tabSize: 2
    
  # Rules for generated files
  "generated/**/*":
    formatter: "none"
    linter: "none"
    
  # Rules for configuration files
  "package.json":
    tabSize: 2
    jsonSort: true
    
  # Rules for test files
  "**/*.test.ts":
    noImplicitAny: false
```

## Code Generation Rules

```yaml
codeGeneration:
  # Rules for AI-generated code
  commentStyle: "jsdoc" # or "block", "inline", "none"
  includeTypes: true
  includeTesting: true
  testFramework: "jest"
  refactorExplanations: true
  
  # Patterns to apply to generated code
  patterns:
    errorHandling: "try-catch" # or "return-error", "throw", etc.
    asyncPattern: "async-await" # or "promises", "callbacks"
    loggingStyle: "structured" # or "console", "custom"
    
  # Templates for common structures
  templates:
    component: |
      // Component template with project-specific patterns
      import React from 'react';
      
      interface ComponentNameProps {
        // Props definition
      }
      
      export const ComponentName: React.FC<ComponentNameProps> = (props) => {
        return (
          <div>
            {/* Component content */}
          </div>
        );
      };
```

## Auto-Formatting Rules

```yaml
formatting:
  onSave: true
  onPaste: false
  languages:
    javascript: "prettier"
    typescript: "prettier"
  ignoreFiles: [
    "node_modules/**",
    "build/**",
    "dist/**",
    ".next/**"
  ]
```

## Linting Rules

```yaml
linting:
  enabled: true
  realtime: true
  languages:
    javascript: "eslint"
    typescript: "eslint"
  ignoredRules:
    eslint:
      - "no-console"
      - "no-unused-vars"
  ignoreFiles: [
    "node_modules/**",
    "build/**",
    "dist/**",
    ".next/**"
  ]
```

## Project-Specific Abbreviations & Snippets

```yaml
abbreviations:
  "clog": "console.log({{}})"
  "rfc": "import React from 'react';\n\ninterface {{}}Props {\n  \n}\n\nexport const {{}}: React.FC<{{}}Props> = (props) => {\n  return (\n    <div>\n      \n    </div>\n  );\n};"
  "apiget": "const response = await fetch('{{}}')\nconst data = await response.json()\n"
```

## Git Integration Rules

```yaml
git:
  autofetch: true
  automergeOnPull: false
```

## Performance Rules

```yaml
performance:
  debounceDelay: 300 # ms
  maxFileSize: 5 # MB
  disableForLargeFiles: true
  watchExclude: [
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/.git/**"
  ]
```

## Examples

### Example: Handling API Requests

When working with API requests in this project, follow this pattern:

```javascript
// Example of preferred API request pattern
import { apiClient } from '@/utils/api';

async function fetchUserData(userId) {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return {
      data: null,
      error: {
        message: error.message || 'Failed to fetch user data',
        status: error.response?.status || 500
      }
    };
  }
}
```

### Example: Component Structure

React components should follow this structure:

```typescript
// imports grouped by external, internal, and types
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { Loader } from '@/components/ui';
import { useUserData } from '@/hooks';
import { formatDate } from '@/utils';

import type { User } from '@/types';

// Props interface with descriptive names
interface UserProfileProps {
  initialData?: User;
  showDetails: boolean;
}

// Component using functional style
export const UserProfile: React.FC<UserProfileProps> = ({ 
  initialData, 
  showDetails = true 
}) => {
  // State definitions
  const [user, setUser] = useState<User | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  
  // Rest of component implementation
  // ...
};
```

## References

- [Cursor Documentation](https://cursor.sh/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 