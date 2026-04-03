# Contributing to React Kiosk Keyboard

Thank you for your interest in contributing to React Kiosk Keyboard! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- pnpm (preferred package manager)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/lorenzoceglia/react-kiosk-keyboard.git
   cd react-kiosk-keyboard
   ```

3. **Add upstream remote** (to sync with main repo):

   ```bash
   git remote add upstream https://github.com/lorenzoceglia/react-kiosk-keyboard.git
   ```

4. **Install dependencies**:

   ```bash
   pnpm install
   ```

5. **Install Husky git hooks**:
   ```bash
   npx husky install
   ```

### Project Structure

```
react-kiosk-keyboard/
├── src/
│   ├── components/       # React components (Keyboard, icons)
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Keyboard layout definitions
│   ├── themes/           # Theme definitions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── index.ts          # Main entry point
│   └── index.css         # Styles
├── dist/                 # Build output (generated)
├── package.json
├── tsconfig.json
├── biome.json           # Code formatting & linting config
└── rollup.config.mjs    # Bundle configuration
```

## Development Workflow

### Create a Feature Branch

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Use descriptive branch names:

- `feature/add-new-layout` - New features
- `fix/keyboard-layout-bug` - Bug fixes
- `docs/update-readme` - Documentation updates

### Make Your Changes

1. Edit files as needed
2. TypeScript types are checked automatically
3. Code is formatted and linted on commit (via Husky hooks)

### Available Commands

```bash
# Development
pnpm dev                 # Watch mode - rebuilds on changes
pnpm build              # Build the library

# Code Quality
pnpm type-check         # Check TypeScript types
pnpm lint               # Lint and format code with Biome
pnpm format             # Format code with Biome
pnpm check              # Run all checks (lint + format)
```

### Code Style

This project uses **Biome** for code formatting and linting:

- **Formatter**: Automatic code formatting (runs on commit)
- **Linter**: ESLint-compatible rules

Before committing, code is automatically formatted. Make sure your changes follow the project style.

**Manual formatting:**

```bash
pnpm check              # Check and auto-fix issues
pnpm format             # Format code
pnpm lint               # Run linter
```

### Git Hooks

Husky enforces quality checks automatically:

- **Pre-commit**: Runs `pnpm lint` - formats and lints your staged changes
- **Pre-push**: Runs `pnpm build` - ensures the build succeeds

If a hook fails, fix the issues and try again:

```bash
# After fixing issues
git add .
git commit -m "Your message"
git push
```

To skip hooks (not recommended):

```bash
git commit --no-verify
git push --no-verify
```

## Commit Guidelines

Write clear, descriptive commit messages:

```
feat: add new keyboard layout
fix: resolve keyboard focus issue
docs: update README with examples
style: improve button styling
refactor: optimize keyboard rendering
chore: update dependencies
```

Conventional commits are encouraged for better changelog generation.

## Testing Your Changes

### Build Locally

```bash
pnpm build
```

This generates output in the `dist/` folder.

### Test in a Project

To test changes before publishing:

1. **Build the library**:

   ```bash
   pnpm build
   ```

2. **Link locally** (in your test project):

   ```bash
   npm link ../path/to/react-kiosk-keyboard
   # or with pnpm
   pnpm link ../path/to/react-kiosk-keyboard
   ```

3. **Test your changes** in the test project
4. **Unlink** when done:
   ```bash
   npm unlink
   # or with pnpm
   pnpm unlink
   ```

## Submitting Changes

### Before Creating a Pull Request

1. **Sync with upstream**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks locally**:

   ```bash
   pnpm type-check
   pnpm check
   pnpm build
   ```

3. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Create a Pull Request

1. Go to the [main repository](https://github.com/lorenzoceglia/react-kiosk-keyboard)
2. Click **"New Pull Request"**
3. Select your fork and branch
4. Fill in the PR title and description:
   - What does this PR do?
   - Why is this change needed?
   - Any related issues?

**PR Template Example:**

```markdown
## Description

Brief description of changes

## Related Issues

Fixes #123

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code style/refactor

## Testing

How to test these changes

## Screenshots (if applicable)

Include any relevant UI changes
```

### PR Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Ensure all checks pass
- Once approved, your PR will be merged

## Adding New Features

### Adding a New Keyboard Layout

1. Create layout definition in `src/layouts/index.ts`
2. Add to the `KEYBOARD_LAYOUTS` export
3. Update `KeyboardLayout` type if needed
4. Add documentation in README.md
5. Test in the dev environment

### Adding a New Theme

1. Create theme object in `src/themes/index.ts`
2. Add to the `PRESET_THEMES` export
3. Include theme colors and documentation
4. Add example in README.md

### Adding a New Component

1. Create in `src/components/`
2. Add TypeScript types in `src/types/`
3. Export from `src/index.ts`
4. Add usage documentation

## Reporting Issues

Found a bug? Please report it on [GitHub Issues](https://github.com/lorenzoceglia/react-kiosk-keyboard/issues):

- Describe the bug clearly
- Include reproduction steps
- Provide expected vs actual behavior
- Add environment info (browser, React version, etc.)
- Include screenshots if applicable

## Questions?

- Open a GitHub Discussion
- Check existing issues and PRs
- Read the README.md for usage examples

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
