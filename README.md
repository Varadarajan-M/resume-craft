# Resume Craft

An open-source, AI-powered resume builder that helps you create professional, ATS-friendly resumes in minutes.

---

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Varadarajan-M/resume-craft)

## Introduction

Resume Craft is a modern web application designed to simplify the resume creation process. It provides users with professionally designed templates, a real-time WYSIWYG editor, and AI-powered content suggestions to help them craft the perfect resume and land their dream job.

The goal of this project is to offer a beautiful, intuitive, and powerful tool for job seekers, completely open-source.

---

## Key Features

- **Modern Templates**: A collection of professionally designed and ATS-friendly resume templates.
- **AI-Powered Content Enhancement**: Get intelligent suggestions to improve your resume's content for various sections like summaries, work experience, and achievements.
- **Real-Time Preview**: Instantly see your changes with a live PDF preview as you edit your resume.
- **Theme and Layout Customization**: Easily reorder sections and customize the look and feel of your resume.
- **Auto-Save**: Your work is automatically saved to both local storage and the server, so you never lose your progress.
- **PDF Export**: Download a high-quality PDF of your final resume.
- **Dark & Light Mode**: A comfortable viewing experience in any lighting condition.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **AI Integration**: [Groq API](https://groq.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Project Structure

The project follows a feature-sliced design, making it modular and easy to navigate.

```
/src
├── app/                # Next.js App Router pages and layouts
├── backend/            # Server-side logic (actions, models, db config)
│   ├── actions/        # Server actions for mutations and queries
│   ├── config/         # Database and AI prompt configurations
│   └── models/         # Mongoose schemas for the database
├── features/           # Feature-based modules (e.g., dashboard, resume-builder)
│   ├── dashboard/
│   ├── documents/
│   ├── pdf-templates/  # Resume templates
│   └── resume-builder/
│       ├── components/ # React components specific to the resume builder
│       ├── hooks/      # Custom hooks for the feature
│       └── store/      # Zustand store for state management
├── shared/             # Shared code used across multiple features
│   ├── components/     # Reusable components (UI, common elements)
│   ├── hooks/          # Global custom hooks
│   └── lib/            # Utility functions and library configurations
└── public/             # Static assets
```

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js**: `v20.x` or later
- **pnpm**: This project uses `pnpm`. You can install it with `npm install -g pnpm`.
- **MongoDB**: A running instance of MongoDB. A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster is a great option.

### Installation & Setup

1.  **Fork the repository** and clone it to your local machine:

    ```bash
    git clone https://github.com/Varadarajan-M/resume-craft.git
    cd resume-craft
    ```

2.  **Install dependencies** using `pnpm`:

    ```bash
    pnpm install
    ```

3.  **Set up environment variables**:
    Create a `.env.local` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env.local
    ```

    Now, fill in the required API keys and secrets in `.env.local`. You can get these from their respective services:

    - `DB_URL`: Your MongoDB connection string.
    - `CLERK_*`: Keys from your [Clerk](https://clerk.com/) dashboard.
    - `GROQ_API_KEY`: API key from [Groq](https://console.groq.com/keys).

4.  **Run the development server**:

    ```bash
    pnpm dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Contributing

Contributions are welcome\! If you have ideas for improvements or want to fix a bug, please check out the [Contributing Guidelines](https://www.google.com/search?q=./CONTRIBUTING.md) to get started.
