# Preparation App

![Preparation App](/public/preparation-app.jpg)

Welcome to the **Preparation App**! This platform is built using React.js, designed to implement CRUD operations for managing Bible themes, adding Bible readings, working with groups, and voting on readings. Users can also save their preparation results, including the final four readings for each category.

The application connects to a REST API, providing a smooth interface for interacting with the database and performing necessary actions.

## Features

- **CRUD Operations:** Create, read, update, and delete Bible themes and readings.
- **Voting System:** Vote on Bible readings within groups.
- **Preparation Results:** Save final results with the top four readings in each category.
- **Group Management:** Work with groups for collaborative reading preparation.
- **REST API Integration:** Connects to a backend API for data management.

## Project Structure

Here's a breakdown of the project's structure:

```plaintext
├── public/                    # Static files (images, icons, etc.)
├── src/
│   ├── context/                # Global context providers for state management
│   ├── data/                   # Mock data or static files (if any)
│   ├── features/               # Contains core features of the app (CRUD operations, etc.)
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Application views (routes)
│   ├── services/               # API service calls (connects to the REST API)
│   ├── store/                  # Zustand state management
│   ├── ui/                     # UI components (buttons, forms, etc.)
│   ├── utils/                  # Utility functions and helpers (e.g., formatters, validators)
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point for React app
│   ├── index.css               # Global styles
├── tailwind.config.mjs         # Tailwind CSS configuration
└── package.json                # Project dependencies and scripts
```
