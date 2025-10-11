# Contributing to Resume Craft

First off, thank you for considering contributing to Resume Craft\! We're excited to have you. Every contribution helps make this project better.

This document provides a set of guidelines for contributing to the project. These are mostly guidelines, not strict rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

There are many ways to contribute, from writing code and improving documentation to submitting bug reports and feature requests.

### Reporting Bugs

If you find a bug, please make sure it hasn't already been reported by searching the issues on GitHub. If you can't find an open issue addressing the problem, please [open a new one](https://github.com/Varadarajan-M/resume-craft/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample or an executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

If you have an idea for a new feature or an enhancement to an existing one, please [open a new issue](https://github.com/Varadarajan-M/resume-craft/issues/new) to discuss it. This allows us to coordinate our efforts and prevent duplication of work.

### Pull Requests

We welcome pull requests for bug fixes, new features, and improvements. Please follow the steps below to ensure your contribution can be merged smoothly.

## Development Setup

Ready to contribute code? Here’s how to set up your development environment.

### Prerequisites

- **Node.js**: `v20.x` or later
- **pnpm**: This project uses `pnpm` as the package manager.
- **MongoDB**: A running instance of MongoDB. You can use a local instance or a free cloud service like MongoDB Atlas.
- **Environment Variables**: You will need to create a `.env.local` file in the root of the project with the necessary API keys and secrets.

### Installation

1.  **Fork** the repository and clone it locally:

    ```bash
    git clone https://github.com/Varadarajan-M/resume-craft.git
    cd resume-craft
    ```

2.  Install the project dependencies using `pnpm`:

    ```bash
    pnpm install
    ```

3.  Create a `.env.local` file in the root of the project and add the following environment variables. You can get these keys from their respective services (Clerk, MongoDB, Groq, PostHog).

    ```plaintext
    # MongoDB Connection String
    DB_URL="mongodb://..."

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
    CLERK_SECRET_KEY=sk_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    # Groq API for AI Features
    GROQ_API_KEY=gsk_...

    # PostHog Analytics (Optional)
    NEXT_PUBLIC_POSTHOG_KEY=phc_...
    NEXT_PUBLIC_POSTHOG_HOST=https://...
    ```

4.  Run the development server:

    ```bash
    pnpm dev
    ```

    The application should now be running at `http://localhost:3000`.

## Pull Request Process

1.  Create a new branch for your feature or fix: `git checkout -b feature/your-feature-name` or `fix/your-bug-fix`.
2.  Make your changes and ensure the code lints successfully by running `pnpm lint`.
3.  Commit your changes with a clear and descriptive commit message. We recommend following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
4.  Push your branch to your fork and open a pull request to the `main` branch of the original repository.
5.  In your pull request description, clearly explain the problem you are solving and the changes you have made. Include the issue number if one exists (e.g., `Fixes #123`).

## Code Style Guide

- **Code Style**: Please follow the existing code style. The project is configured with ESLint, and running `pnpm lint` will help you adhere to the style guide.
- **Components**: Follow the existing structure in the `src/features` and `src/shared` directories. Reusable, generic components go in `shared`, while feature-specific components live in their respective `features` folder.
- **TypeScript**: This is a TypeScript project. Please ensure your contributions are strongly typed.

Thank you again for your interest in contributing to Resume Craft\!
