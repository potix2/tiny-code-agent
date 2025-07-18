# tiny-code-agent PRD (Product Requirements Document)

## Overview

tiny-code-agent is an experimental CLI tool designed to understand the basic structure of AI coding agents.
It prioritizes clear and understandable implementation concepts for learning code assistance mechanisms.

## MVP Requirements

### Purpose
- Understanding basic AI agent architecture
- Learning task execution mechanisms through tool usage
- Simple and comprehensible implementation

### Core Features
The agent executes user tasks using the following tools:

1. **read_file**: File reading tool
   - Reads a single file within the current directory
   - Retrieves content by specifying file path

2. **apply_patch**: Patch application tool
   - Applies modifications in diff format
   - Rewrites entire file content

### Agent Behavior Specification

#### Basic Flow
1. User inputs a task
2. Agent executes task using tools
3. Task completes or error occurs
4. Waits for next user input

#### Agent Loop
- Agent autonomously decides tool usage
- Maximum attempts: 20 (prevents infinite loops)
- On error, adds error context and continues

#### Termination Conditions
- Agent determines task completion
- Reaches maximum attempt limit
- User interruption (Ctrl+C)

### Technical Specifications

#### Technology Stack

##### Core Technologies
- **Language**: TypeScript
- **Runtime**: Node.js 20+
- **Programming Style**: Functional style (no classes, interfaces for types)

##### Libraries & Tools
- **CLI Framework**: Commander.js
- **CLI Input**: prompts (lightweight interactive prompts)
- **AI Provider**: Anthropic Claude API (official SDK)
- **Tool Implementation**: Function Calling format
- **Error Handling**: neverthrow (Result type pattern)
- **File System**: fs/promises + neverthrow wrapper
- **Diff/Patch**: diff-match-patch
- **Logging**: Custom lightweight logger

##### Development Tools
- **Build Tool**: tsup
- **Test Framework**: Vitest
- **Code Formatter**: Biome
- **Development Runner**: tsx
- **Package Manager**: pnpm

#### Directory Structure
```
tiny-code-agent/
src/
   index.ts          # CLI entry point
   agent/            # Agent related
      agent.ts      # Main agent loop
      tools.ts      # Tool definitions
   providers/        # AI providers
      claude.ts     # Claude API integration
   utils/            # Utilities
      logger.ts     # Logging functionality
   .tiny-code/           # Runtime generated
      agent.log         # Execution logs
tests/                # Test code
```

#### Configuration Management
- API Key: Environment variable `ANTHROPIC_API_KEY`
- Other settings: Configuration file support in future

### Implementation Plan

#### Phase 1: Basic Implementation (MVP)
1. Basic CLI structure
2. Claude API integration (Function Calling)
3. Tool implementation (read_file, apply_patch)
4. Agent loop
5. Logging functionality

#### Phase 2: Post-MVP Priority Implementation
1. Pre-execution confirmation prompt
2. More detailed error handling
3. Configuration file support
4. Improved test coverage

### Success Metrics
- Simple and understandable code structure
- Successful basic tasks (file reading � modification)
- Clear operational visibility through log output

### Usage Example

```bash
$ tiny-code
> Replace all console.log with logger.info in example.js

[Agent execution started]
- read_file: Loaded example.js
- apply_patch: Applied 3 replacements
- Task completed

> Enter another task...
```

---

*This document will be continuously updated.*
