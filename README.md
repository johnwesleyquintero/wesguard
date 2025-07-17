# WesGuard PC Optimizer

![WesGuard UI Screenshot](https://i.imgur.com/xI1tB7m.png) <!-- It's great to have a hero image. You can replace this URL with your own screenshot! -->

**A modern, lightweight, and powerful PC optimization tool built with Electron and React, designed to be fast, reliable, and easy to use.**

---

## Project Overview

WesGuard was born from a simple need: a clean, modern, and performant utility to keep a Windows PC running smoothly, without the bloat and clutter of typical "optimizer" software. This project combines a beautiful user interface built with the latest web technologies with powerful backend access provided by Node.js to deliver a seamless user experience.

Developed with a professional workflow, WesGuard leverages a strong, scalable architecture to ensure it's both easy to maintain and ready for future feature expansion.

## Core Features

- **Real-time System Dashboard:** Get an instant, live overview of your system's health, including:
  - Operating System Information
  - CPU Model and Live Usage Percentage
  - Live Memory Usage Percentage

- **Junk File Cleaner:** Safely analyze and remove temporary files and other system junk to free up valuable disk space.
  - **Analyze:** Scans your system to calculate the total amount of recoverable space.
  - **Clean:** Securely deletes junk files upon user confirmation.

## Tech Stack

WesGuard is built on a modern, robust, and scalable technology stack:

- **Framework:** [Electron](https://www.electronjs.org/)
- **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** CSS Modules
- **Backend/System Interaction:** [Node.js](https://nodejs.org/)

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
- **`npm run build`**: Compiles and builds the application for production.
- **`npm run check`**: Runs our automated Code Quality Framework, which executes formatting, linting, and type-checking in parallel to ensure the codebase is healthy.

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

**Built with ❤️ by The WesGuard Founders.**
