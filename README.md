# AI-Powered Blog App

A full-stack blogging platform where users can create, read, and manage blog posts — enhanced with AI-powered writing assistance for a smarter content creation experience.

**Live Demo:** [ai-powered-blog-app.netlify.app](https://ai-powered-blog-app.netlify.app)

---

## Features

- **User Authentication** — Secure sign-up and login with JWT-based auth
- **Markdown Editor** — Rich markdown support for writing and formatting posts
- **AI Writing Assistance** — AI-powered suggestions to help create better content
- **Full Post Management** — Create, view, and delete blog posts
- **Responsive Design** — Works seamlessly across desktop and mobile devices

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Markdown Editor | @uiw/react-md-editor |
| Backend | Node.js, Express.js |
| AI Integration | AI/LLM API |
| Deployment | Netlify (Frontend) |

---

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/UmangBytes/AI_powered_blog_app.git
cd AI_powered_blog_app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/blog-app
npm install
```

### Running the App

```bash
# Start the backend server
cd backend
npm start

# In a separate terminal, start the frontend
cd frontend/blog-app
npm start
```

The app will be available at `http://localhost:3000`.

---

## Demo Credentials

Want to explore the app without creating an account? Use the sample credentials below.

> Note: This account is for demo/testing purposes only. Please do not change the password.

| Field | Value |
|-------|-------|
| Email | `mike@gmail.com` |
| Password | `test@123` |

With this account, you can:
- Browse all existing blog posts
- Create a new post using the markdown editor
- Delete existing posts

---

## Project Structure

```
AI_powered_blog_app/
├── backend/          # Node.js + Express REST API
├── frontend/
│   └── blog-app/     # React frontend application
├── package.json
└── .gitignore
```

> Built by [UmangBytes](https://github.com/UmangBytes)
