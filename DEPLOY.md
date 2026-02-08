# Deployment Instructions

## Backend (Render/Railway)

1.  **Connect Repo:** Connect your GitHub repository to Render or Railway.
2.  **Configuration:**
    *   If using Render, it should automatically detect `render.yaml`.
    *   Ensure the Root Directory is set to `.` (root) or configure build command to `cd backend && npm install` and start command to `cd backend && npm start`.
3.  **Environment Variables:** Set the following keys in your dashboard:
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: A secure random string for authentication.
    *   `FRONTEND_URL`: The URL where your frontend will be deployed (e.g., `https://my-app.vercel.app`).

## Frontend (Vercel)

1.  **Connect Repo:** Connect your GitHub repository to Vercel.
2.  **Root Directory:** Select `frontend` as the Root Directory for the project.
3.  **Environment Variables:**
    *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://my-api.onrender.com`).
4.  **Deploy:** Click Deploy.

## Verification

Once both are deployed:
1.  Open the Vercel URL.
2.  Try to Sign Up.
3.  Create a project.
4.  Refresh the page (to test `vercel.json` rewrites).
