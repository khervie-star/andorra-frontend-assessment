# Task Management – Andorra Frontend Assessment

A modern, responsive task management web app built with **React + Vite**, designed for performance, modularity, and ease of use. This project was created as part of a frontend assessment and showcases clean architecture, reusable components, and functional state management.

## Live Demo

Hosted on Vercel: [https://task-fawn.vercel.app](https://taskr-fawn.vercel.app)

## Tech Stack

- **React 19 + Vite** – Fast, modern frontend stack
- **TypeScript** – For static typing and better developer experience
- **MUI (Material UI)** – Component styling and layout system
- **styled-components** – Styling
- **React Router DOM v7** – Client-side routing
- **Zustand** – Lightweight global state management
- **Formik + Yup** – Form state and validation
- **Recharts** – Interactive visualizations
- **Lucide-react** – Icons
- **Sonner** – Toast notifications

## 📁 Project Structure

The codebase follows a modular and maintainable structure:

```bash
src/
├── assets/ # Static assets like icons, illustrations
├── components/ # Reusable UI components
├── context / # App Context
├── hooks/ # Custom React hooks
├── pages/ # Route-based pages
├── routes/ # React Router configuration
├── store/ # Zustand global store
├── styles/ # Global styling and theming
├── types/ # Global TypeScript types
└── utils/ # Utility functions
```



## Setup Instructions

To run the project locally:

```bash
# 1. Clone the repo
git clone https://github.com/khervie-star/andorra-frontend-assessment.git

# 2. Navigate into the project folder
cd andorra-frontend-assessment

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```


## Architectural Decisions

- Vite: Fast, modern etc
- Zustand: Used instead of Redux for its simplicity, minimal boilerplate, and great developer experience for local/global state.
- Folder structure : Encourages modularity and scalability as the app grows, easy to read and maintain.
- Formik + Yup: Better and declarative form handling with integrated schema validation.
- MUI + styled-components: Combined to balance ease of use (with MUI components) and flexibility (for custom styles).

 
 
## Trade-offs & Considerations
Zustand over Context or Redux: Zustand is lightweight and very flexible for this scale. For larger apps with more complex state trees, Redux or something like Jotai might offer more structure.

No backend logic: Since this is frontend-only, data is mocked or managed locally. In a real-world project, API integration would be handled with tools like React Query, Axios, or tRPC.
