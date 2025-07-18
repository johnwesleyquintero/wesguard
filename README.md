# WesGuard PC Optimizer

<img width="1405" height="764" alt="image" src="https://github.com/user-attachments/assets/d3711723-e5d6-43ac-a59d-ea04a6c0dd94" />

**A modern, lightweight, and powerful PC optimization tool built with Electron and React, designed to be fast, reliable, and easy to use.**

---

## Project Overview

WesGuard was born from a simple need: a clean, modern, and performant utility to keep a Windows PC running smoothly, without the bloat and clutter of typical "optimizer" software. This project combines a beautiful user interface built with the latest web technologies with powerful backend access provided by Node.js to deliver a seamless user experience.

Developed with a professional workflow, WesGuard leverages a strong, scalable architecture to ensure it's both easy to maintain and ready for future feature expansion.

## Core Features

- **Consistent UI/UX Design:** A unified and modern aesthetic applied across all application tabs for a seamless user experience.
- **Real-time System Dashboard:** Get an instant, live overview of your system's health, including:
  - Operating System Information
  - CPU Model and Live Usage Percentage
  - Live Memory Usage Percentage
  - Disk Usage
  - Network Activity (Rx/Tx)

- **Junk File Cleaner:** Safely analyze and remove temporary files and other system junk to free up valuable disk space.
  - **Analyze:** Scans your system to calculate the total amount of recoverable space.
  - **Clean:** Securely deletes junk files upon user confirmation.
  - Features a consistent card-like design for improved aesthetics.

- **Reminder Feature:** Set custom reminders with messages and optional system sound notifications to help manage your time or tasks.
  - Customizable reminder messages.
  - Option to play system sound notification when a reminder triggers.
  - Pause, reset, and delete individual reminders.

## Tech Stack

WesGuard is built on a modern, robust, and scalable technology stack:

- **Framework:** [Electron](https://www.electronjs.org/)
- **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** CSS Modules
- **Backend/System Interaction:** [Node.js](https://nodejs.org/)
- **System Information Library:** [systeminformation](https://systeminformation.io/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/) (which includes npm) installed on your system.

### Installation & Launch

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/johnwesleyquintero/wesguard.git
    ```

    (Replace with your actual repo URL when it's public)

2.  **Navigate into the project directory:**

    ```bash
    cd wesguard
    ```

3.  **Install NPM packages:**

    ```bash
    npm install
    ```

4.  **Run the application in development mode:**
    ```bash
    npm run dev
    ```

## Development Scripts

We use a high-quality, automated workflow to ensure code stability.

- **`npm run dev`**: Starts the application in development mode with hot-reloading.
- **`npm run build`**: Compiles and builds the application for production. This command will also package the Electron application into distributable formats (e.g., `.exe` for Windows).
- **`npm run lint`**: Runs ESLint to check for code quality and style issues.
- **`npm run preview`**: Previews the frontend build.
- **`npm run format`**: Formats code using Prettier.
- **`npm run typecheck`**: Runs TypeScript type checking.
- **`npm run check`**: Executes our automated Code Quality Framework, which runs formatting, linting, and type-checking in parallel to ensure the codebase is healthy.

## Publishing the Application

To create a publishable version of the application, use the `npm run build` command. This will generate distributable files (e.g., `.exe` for Windows) in the `dist` or `dist_electron` directory.

**Important:** For a professional release, it is highly recommended to code sign your application. This requires obtaining a developer certificate and configuring `electron-builder` to use it. Without code signing, users may encounter security warnings.

## Future Roadmap (Phase 2)

Our development is guided by a strategic roadmap to ensure scalability. Future development will focus on a "Phase 2 Refactor" which includes:

- Implementing a lightweight global state manager (e.g., Zustand).
- Introducing a standard routing library (e.g., `react-router-dom`).
- Creating a dedicated API abstraction layer for all backend communication.

## Contributing

This project is currently under active development. As co-founders, we're building the core product. Future contribution guidelines will be established post-MVP.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ by John Wesley Quintero.**
