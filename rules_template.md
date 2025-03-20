# [Project Name] - Cursor Rules

## Metadata
- **Author:** [Your Name]
- **Version:** [Version Number]
- **Last Updated:** [Date]
- **Cursor Version:** [Compatible Cursor Version]

## Overview
[Brief description of the project and how these rules help with development]

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
  temperature: 0.7 # 0.0 to 1.0, lower for more deterministic output
  contextWindow: 10000 # number of tokens
  
  # Confidence thresholds
  minConfidence: 0.6 # Minimum confidence for suggestions
  
  # Rate limiting to prevent excessive suggestions
  suggestionRateLimit:
    enabled: true
    maxSuggestionsPerMinute: 20
```

## Custom Prompts

### Default System Prompt

```
You are an AI assistant integrated into the Cursor code editor, helping with [PROJECT_DESCRIPTION].
Your primary role is to [DEFINE_ASSISTANT_ROLE].
When suggesting code, follow these project-specific conventions:
[LIST_CONVENTIONS]

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
- Use TypeScript types consistently with pattern [DESCRIBE_PATTERN]
- Follow the project's module import/export conventions
- For async operations, prefer async/await over raw promises
- Use error handling with try/catch for async code

The project uses the following libraries/frameworks:
[LIST_LIBRARIES_WITH_VERSIONS]

For testing, we use [TESTING_FRAMEWORK].
```

#### Python

```
When working with Python code in this project:
- Target Python version: [VERSION]
- Follow PEP 8 style guidelines with these exceptions: [EXCEPTIONS]
- Use type hints according to [PATTERN]
- Use docstrings in [STYLE] format
- Prefer list/dict comprehensions for simple transformations
- For dependencies, use only those listed in requirements.txt

The project uses these key libraries:
[LIST_LIBRARIES_WITH_VERSIONS]

For testing, we use [TESTING_FRAMEWORK].
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

### Python

```yaml
python:
  lineLength: 88
  usePep8: true
  indentSize: 4
  useSpaces: true
  linter: "flake8"
  formatter: "black"
  typeChecking: true
  sortImports: true
```

### Other Languages

[Add similar rule blocks for other languages used in your project]

## File-Specific Rules

```yaml
fileRules:
  # Rules for specific file types
  "*.md":
    trimTrailingWhitespace: false
    wordWrap: "on"
  
  # Rules for specific directories
  "src/components/**/*.tsx":
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
  testFramework: "jest" # or "mocha", "pytest", etc.
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
      
      interface {{ComponentName}}Props {
        // Props definition
      }
      
      export const {{ComponentName}}: React.FC<{{ComponentName}}Props> = (props) => {
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
    python: "black"
    go: "gofmt"
    rust: "rustfmt"
  ignoreFiles: [
    "node_modules/**",
    "build/**",
    "dist/**"
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
    python: "flake8"
  ignoredRules:
    eslint:
      - "no-console"
      - "no-unused-vars"
    flake8:
      - "E501"
  ignoreFiles: [
    "node_modules/**",
    "build/**",
    "dist/**"
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
  branchNaming:
    pattern: "{{type}}/{{scope}}/{{description}}"
    types: ["feature", "bugfix", "hotfix", "chore", "docs"]
  commitMessageTemplate: "{{type}}({{scope}}): {{message}}"
```

## Performance Rules

```yaml
performance:
  debounceDelay: 300 # ms
  maxFileSize: 5 # MB
  disableForLargeFiles: true
  watchExclude: [
    "**/node_modules/**",
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
import { useParams } from 'react-router-dom';

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

## Customization Guidelines

To customize these rules for your project:

1. Copy this template to your project root as `.cursor-rules.md`
2. Modify the settings to match your project's needs
3. Remove sections that don't apply to your project
4. Add additional sections as needed
5. Reference language-specific style guides where appropriate

## References

- [Cursor Documentation](https://cursor.sh/docs)
- [Project Style Guide](link-to-your-style-guide)
- [Team Coding Standards](link-to-standards-doc)
