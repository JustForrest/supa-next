# Next.js/Supabase Full Stack - Cursor Rules

## Metadata
- **Author:** [Your Name]
- **Version:** [Version Number]
- **Last Updated:** [Date]
- **Cursor Version:** [Compatible Cursor Version]

## Overview
This project is a Next.js/Supabase full stack web application. These rules help maintain code quality, consistency, and development efficiency within the Cursor editor.

## General Settings

```yaml
# General editor behavior and preferences
settings:
  theme: "dark"
  tabSize: 2
  insertSpaces: true
  formatOnSave: true
  trimTrailingWhitespace: true
  trimFinalNewlines: true
  insertFinalNewline: true
  wordWrap: "off"
  rulers: [80, 120]
```

## AI Assistant Configuration

```yaml
aiAssistant:
  # General AI behavior
  enabled: true
  autoSuggest: true
  autoComplete: true
  model: "default"
  temperature: 0.5 # Lower temperature for more consistent code
  contextWindow: 10000
  
  # Confidence thresholds
  minConfidence: 0.7 # Higher confidence for suggestions
  
  # Rate limiting to prevent excessive suggestions
  suggestionRateLimit:
    enabled: true
    maxSuggestionsPerMinute: 20
```

## Custom Prompts

### Default System Prompt

```
You are an AI assistant integrated into the Cursor code editor, helping with a Next.js/Supabase full stack application.
Your primary role is to assist in writing clean, performant, and type-safe code that follows modern web development best practices.
When suggesting code, follow these project-specific conventions:
- Use App Router patterns and conventions
- Implement strong TypeScript typing
- Follow React best practices with functional components and hooks
- Maintain clear separation of concerns between UI, data fetching, and business logic
- Use Supabase SDK effectively and securely

Always prioritize:
- Code readability and maintainability
- TypeScript type safety (avoid any types)
- Performance optimization techniques specific to Next.js
- Security best practices, especially for Supabase auth and data operations
- Consistency with existing codebase patterns
```

### Language-Specific Prompts

#### Next.js/React

```
When working with Next.js code in this project:
- Use the App Router architecture with the app/ directory structure
- Leverage React Server Components when appropriate
- Implement client components with 'use client' directive only when necessary
- Use Next.js built-in data fetching methods appropriately (fetch with proper caching)
- Follow recommended patterns for layouts, loading states, and error boundaries
- Implement proper metadata handling for SEO
- Optimize images with next/image
- Use Next.js routing features correctly (Link, useRouter, usePathname)
- Implement proper route handlers for API endpoints

????
- Use ES6+ features appropriately
- Prefer const over let, and avoid var
- Use TypeScript types consistently with pattern [DESCRIBE_PATTERN]
- Follow the project's module import/export conventions
- For async operations, prefer async/await over raw promises
- Use error handling with try/catch for async code

For state management, prefer:
- React hooks for local state (useState, useReducer)
- Context API for shared state when appropriate
- Server state with proper caching and revalidation strategies

For styling, use:
- CSS Modules or TailwindCSS consistently
- Mobile-first responsive design principles
```

For testing...

#### TypeScript

```
When working with TypeScript in this project:
- Use strict TypeScript configuration settings
- Define explicit return types for functions, especially for complex operations
- Create dedicated type/interface files for shared types
- Use generics appropriately for reusable components and functions
- Prefer interfaces for object shapes that will be extended
- Prefer type for unions, intersections, and mapped types
- Avoid using 'any' or non-null assertions (!) wherever possible
- Use discriminated unions for complex state management
- Leverage TypeScript utility types (Partial, Pick, Omit, etc.)
- Implement proper error handling with typed errors
- Define proper types for API responses from Supabase
```

#### Supabase Integration

```
When working with Supabase in this project:
- Use the official Supabase client with proper typing
- Implement proper authentication flows with typed user sessions
- Create type-safe database queries with proper error handling
- Use Row Level Security (RLS) policies for data protection
- Structure database access through dedicated service functions
- Implement optimistic UI updates with proper error handling
- Use proper data caching and invalidation strategies
- Structure the database schema to minimize redundant data
- Leverage Supabase real-time features appropriately
- Ensure proper security for file storage operations
```

## Language-Specific Rules

### TypeScript/JavaScript

```yaml
typescript:
  strict: true
  noImplicitAny: true
  strictNullChecks: true
  strictFunctionTypes: true
  noImplicitThis: true
  alwaysStrict: true
  noUncheckedIndexedAccess: true
  exactOptionalPropertyTypes: true
  
javascript:
  semiColons: true
  quotes: "single"
  trailingComma: "es5"
  bracketSpacing: true
  arrowParens: "always"
  maxLineLength: 100
  preferConst: true
```

### CSS/SCSS

```yaml
css:
  linter: "stylelint"
  formatter: "prettier"
  useRem: true
  mobileFirst: true
```

## File-Specific Rules

```yaml
fileRules:
  # Next.js specific rules
  "app/**/*.tsx":
    enforceReactServerComponents: true
    
  "app/**/*page.tsx":
    enforceMetadata: true
    
  "app/**/*layout.tsx":
    enforceLayoutStructure: true
    
  "app/api/**/*.ts":
    enforceProperErrorHandling: true
    
  # Component rules
  "components/**/*.tsx":
    enforcePropsInterface: true
    enforceExportNamed: true
    
  # Supabase related files
  "lib/supabase/**/*.ts":
    enforceTypedQueries: true
    enforceErrorHandling: true
    
  # Configuration files
  "*.config.ts":
    tabSize: 2
    
  # Test files
  "**/*.test.ts":
    useDescribeStructure: true
```

## Code Generation Rules

```yaml
codeGeneration:
  commentStyle: "jsdoc"
  includeTypes: true
  includeTesting: true
  testFramework: "vitest"
  refactorExplanations: true
  
  patterns:
    errorHandling: "try-catch"
    asyncPattern: "async-await"
    loggingStyle: "structured"
    
  templates:
    nextjsPage: |
      // Next.js page template with proper structure
      import { Metadata } from 'next';
      
      export const metadata: Metadata = {
        title: '{{PageTitle}}',
        description: '{{PageDescription}}',
      };
      
      export default function {{PageName}}Page() {
        return (
          <main className="{{mainClassName}}">
            <h1>{{PageTitle}}</h1>
          </main>
        );
      }
    
    reactComponent: |
      'use client';
      
      import { useState } from 'react';
      
      interface {{ComponentName}}Props {
        // Props definition
      }
      
      export function {{ComponentName}}({ }: {{ComponentName}}Props) {
        return (
          <div>
            {/* Component content */}
          </div>
        );
      }
    
    supabaseQuery: |
      import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
      import type { Database } from '@/types/supabase';
      
      export async function fetch{{ResourceName}}(id: string) {
        const supabase = createClientComponentClient<Database>();
        
        try {
          const { data, error } = await supabase
            .from('{{tableName}}')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;
          
          return { data, error: null };
        } catch (error) {
          console.error('Error fetching {{resourceName}}:', error);
          return { data: null, error };
        }
      }
```

## Auto-Formatting Rules

```yaml
formatting:
  onSave: true
  languages:
    javascript: "prettier"
    typescript: "prettier"
    css: "prettier"
    scss: "prettier"
    json: "prettier"
  ignoreFiles: [
    "node_modules/**",
    ".next/**",
    "out/**"
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
  strictness: "high"
  customRules:
    - "no-unused-vars"
    - "react-hooks/rules-of-hooks"
    - "react-hooks/exhaustive-deps"
    - "@typescript-eslint/no-explicit-any"
    - "@typescript-eslint/explicit-function-return-type"
  ignoreFiles: [
    "node_modules/**",
    ".next/**",
    "out/**"
  ]
```

## Project-Specific Abbreviations & Snippets

```yaml
abbreviations:
  "npage": "export default function {{}}Page() {\n  return (\n    <main>\n      <h1>{{}}</h1>\n    </main>\n  );\n}"
  "napi": "import { NextResponse } from 'next/server';\n\nexport async function {{}}(req: Request) {\n  try {\n    \n    return NextResponse.json({ success: true });\n  } catch (error) {\n    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });\n  }\n}"
  "usc": "'use client';\n\n"
  "sbq": "const { data, error } = await supabase\n  .from('{{}}')\n  .select('*')\n"
```

## Git Integration Rules

```yaml
git:
  autofetch: true
  branchNaming:
    pattern: "{{type}}/{{description}}"
    types: ["feature", "fix", "chore", "docs", "refactor"]
  commitMessageTemplate: "{{type}}: {{message}}"
```

## Performance Rules

```yaml
performance:
  debounceDelay: 300
  maxFileSize: 5
  disableForLargeFiles: true
  watchExclude: [
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/.git/**"
  ]
```

## Examples

### Example: Next.js Page with Data Fetching

```typescript
// Example of a well-structured Next.js page with data fetching
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import PostContent from '@/components/PostContent';
import PostComments from '@/components/PostComments';
import LoadingUI from '@/components/LoadingUI';
import { getPostById } from '@/lib/posts';

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ 
  params 
}: PostPageProps): Promise<Metadata> {
  const post = await getPostById(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.id);
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="container mx-auto py-8">
      <PostContent post={post} />
      
      <Suspense fallback={<LoadingUI />}>
        <PostComments postId={params.id} />
      </Suspense>
    </main>
  );
}
```

### Example: Supabase Data Service

```typescript
// Example of a well-structured Supabase data service
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import type { Post, PostWithAuthor } from '@/types';

export async function getPosts(): Promise<{ data: Post[] | null; error: Error | null }> {
  const supabase = createClientComponentClient<Database>();
  
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred')
    };
  }
}

export async function getPostWithAuthor(
  postId: string
): Promise<{ data: PostWithAuthor | null; error: Error | null }> {
  const supabase = createClientComponentClient<Database>();
  
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        authors:author_id(id, name, avatar_url)
      `)
      .eq('id', postId)
      .single();
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred')
    };
  }
}
```

### Example: React Client Component with State

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Button from '@/components/ui/Button';
import { type User } from '@/types';

interface ProfileFormProps {
  initialUser: User;
}

export function ProfileForm({ initialUser }: ProfileFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: user.full_name,
          username: user.username,
          bio: user.bio,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={user.username}
          onChange={handleChange}
          className="block w-full rounded-md border p-2"
          required
        />
      </div>
      
      {/* Additional form fields */}
      
      <Button type="submit" isLoading={isLoading}>
        Save Changes
      </Button>
    </form>
  );
}
```

## Customization Guidelines

To further customize these rules for your project:

1. Update the settings to match your project's specific Next.js/Supabase implementation
2. Add additional file patterns and rules specific to your project structure
3. Refine the TypeScript rules to match your team's preferences
4. Enhance the Supabase integration templates for your specific database schema
5. Add project-specific code examples that demonstrate preferred patterns

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
