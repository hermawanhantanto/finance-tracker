
# Agents Development Guidelines

## Context-7 MCP Documentation Requirement

**ALWAYS** use the context-7 MCP to get the latest documentation BEFORE:
- Installing any new library
- Using any library in your code
- Updating library versions
- Making architecture decisions involving libraries

### How to Use Context-7 MCP

1. **List available tools** first to discover what's available
2. **Read tool schemas** to understand parameters
3. **Use resolve-library-id** to get library identifiers
4. **Use query-docs** to fetch the latest documentation

### Workflow Example

```
[Use context-7 MCP tools to get documentation]
→ [Analyze the documentation]
→ [Make informed decisions about library usage]
→ [Proceed with implementation]
```

### Why This Matters

- Ensures you have the most up-to-date information
- Prevents using deprecated APIs
- Helps you understand best practices
- Avoids security vulnerabilities
- Saves time by preventing mistakes from outdated docs

## Clean Code Requirement

**ALWAYS** write code that follows clean code principles:
- Prefer simple, minimalist solutions over unnecessary complexity
- Keep code readable, easy to understand, and well structured
- Keep functions small and focused on a single responsibility
- Follow the DRY principle and avoid duplicated logic
- Write code that is maintainable, efficient, scalable, and secure
- Follow production-grade best practices for implementation and architecture

### Clean Code Expectations

Before finalizing any implementation, make sure the code:
1. Solves the problem with the simplest reasonable design
2. Uses clear naming and straightforward control flow
3. Avoids over-engineering, premature abstraction, and deep nesting
4. Separates responsibilities so each function or module has one clear purpose
5. Reuses existing utilities and patterns instead of duplicating behavior
6. Is ready for long-term maintenance in a production application

## Documentation Requirement

- Add concise JSDoc comments to every function you create or modify
- Keep JSDoc focused on purpose, key parameters, and return values when helpful
- Do not add noisy or redundant comments that only restate obvious code
