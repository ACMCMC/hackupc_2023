# Contributing to Mikasa

First off, thank you for considering contributing to Mikasa! It's people like you that make Mikasa such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most Mikasa users.

### Pull Requests

* Fill in the required template
* Follow the JavaScript/TypeScript and Go style guides
* Include thoughtfully-worded, well-structured tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## Style Guides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Style Guide

* Use 2 spaces for indentation
* Prefer `const` over `let` when possible
* Use TypeScript types for all function parameters and return values
* Use meaningful variable names
* Add comments for complex logic

### Go Style Guide

* Follow the official [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
* Use `gofmt` to format your code
* Write descriptive error messages
* Use meaningful variable names
* Add comments for exported functions and types

### Python Style Guide

* Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
* Use 4 spaces for indentation
* Use meaningful variable names
* Add docstrings for functions and classes

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/hackupc_2023.git`
3. Create a new branch: `git checkout -b my-feature-branch`
4. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && go mod download
   ```
5. Make your changes
6. Run tests:
   ```bash
   cd frontend && npm test
   cd ../backend && go test ./...
   ```
7. Commit your changes using a descriptive commit message
8. Push to your fork: `git push origin my-feature-branch`
9. Submit a pull request

## Project Structure

```
hackupc_2023/
├── frontend/         # React TypeScript frontend
├── backend/          # Go backend server
├── infra/           # Infrastructure configuration
├── docs/            # Documentation
└── tests/           # Test files
```

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed

## Questions?

Feel free to open an issue with your question or reach out to the team members.

Thank you for contributing! 🎉
