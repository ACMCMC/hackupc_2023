# Contributing to MiKasa

First off, thank you for considering contributing to MiKasa! It's people like you that make MiKasa such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by a respectful and inclusive environment. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When you are creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide mockups if applicable.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most MiKasa users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript/Go styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Setup

### Prerequisites

* Node.js (v16 or higher)
* Go (v1.20 or higher)
* Elasticsearch (v8.7.0 or higher)
* PostgreSQL

### Setup Instructions

1. Fork the repo and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hackupc_2023.git
   cd hackupc_2023
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   go mod download
   ```

4. Create `.env` files in both `frontend` and `backend` directories with the necessary environment variables (see README.md for details).

5. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   go run main.go

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

## Styleguides

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

**Commit Message Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation only changes
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `perf`: A code change that improves performance
* `test`: Adding missing tests or correcting existing tests
* `chore`: Changes to the build process or auxiliary tools

**Examples:**
```
feat(search): add autocomplete functionality
fix(auth): resolve token expiration issue
docs(readme): update installation instructions
```

### TypeScript Styleguide

* Use TypeScript for all frontend code
* Follow the existing code style (use ESLint)
* Use meaningful variable and function names
* Write self-documenting code; add comments only when necessary
* Use functional components with hooks
* Keep components small and focused

### Go Styleguide

* Follow the [Effective Go](https://golang.org/doc/effective_go.html) guidelines
* Use `gofmt` to format your code
* Write meaningful variable and function names
* Add comments for exported functions and types
* Keep functions small and focused
* Handle errors explicitly

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
go test ./...
```

## Documentation

* Update the README.md if you change functionality
* Update the docs/ARCHITECTURE.md if you change system design
* Add JSDoc/GoDoc comments for new functions
* Update API documentation if you change endpoints

## Community

* Join discussions in GitHub Issues
* Be respectful and constructive
* Help others when you can
* Share your knowledge

## Questions?

Feel free to open an issue with your question or reach out to the maintainers:
- [@JoachimStanislaus](https://github.com/JoachimStanislaus)
- [@AOrps](https://github.com/AOrps)
- [@acmcmc](https://github.com/acmcmc)
- [@ZacharyB1](https://github.com/ZacharyB1)

## Recognition

Contributors will be recognized in the project README. Thank you for your contributions!

---

Thank you for contributing to MiKasa! ❤️
