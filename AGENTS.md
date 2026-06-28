
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
