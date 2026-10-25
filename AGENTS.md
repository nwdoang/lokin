# AGENTS.md

## Code Style and Rules

### Architecture
feature-based architecture (core & feature)
- `core/` provides an infrastructure foundation, global utilities, and application setups that remain unchanged based on business logic.
- `feature/` isolating all business logic, state, APIs, and UI components that are specific to a single domain or a particular application function.

### Code Principle

#### Clean Code
- Meaning full name
- Single Responsibility Principle (SRP)
- Small Function
- Don't Repeat Yourself (DRY)
- Keep It Simple, Stupid (KISS)
- You Aren't Gonna Need It (YAGNI)
- Law of Demeter
- Minimal Comments & Self-Documenting Code
- Consistent Formatting

#### Timeless Function
- Purity & Determinism
- Composition Over Monolithic Blocks
- Open-Closed Principle via Injection
- Fail-Fast Boundary Guards
- Configuration Objects over Long Lists
- Immutability First
- Strict Single Responsibility

## Project Rules
- Strictly use the exact package versions and exports specified in package.json. Do not invent non-existent library methods.
- Enable strict type checking. No usage of the 'any' type unless explicitly required by an external untyped legacy dependency.

## Code Changes

Before modifying creating, deleting, or renmaing any file:
1. analyze the requested change.
2. Explain what files need to be changed.
3. Explain the proposed implementation
4. Ask the user for confirmation
5. Do not modify any file until the user explicitly approves

Reading and analyzing files does not require confirmation.
After receiving confirmation, implement only the approved changes
