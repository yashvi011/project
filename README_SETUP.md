# Beauty Beats Project Setup and Running Instructions

This guide provides step-by-step instructions to set up, start, and run both the frontend React app and the backend Node.js server for the Beauty Beats project.

---

## Prerequisites

- Node.js and npm installed (recommend LTS version)
- MongoDB running locally or access to a MongoDB URI (if using cloud)
- Powershell or terminal access

---

## 1. Clone the Repo and Install Dependencies

1. Open your terminal or PowerShell.
2. Navigate to your desired projects folder.

```bash
git clone <repository_url> beauty-beats
cd beauty-beats
```

3. Install frontend dependencies:

```bash
npm install
```

4. Navigate to the server folder and install backend dependencies:

```bash
cd server
npm install
```

---

## 2. Configure Environment Variables

Create a `.env` file in the `server` folder with the following:

```
MONGODB_URI=<Your MongoDB connection string here>
PORT=5000
```

Replace `<Your MongoDB connection string here>` with your actual MongoDB URI.

---

## 3. Run Backend Server

In the `server` folder:

```bash
npm run server
```

This starts the backend server on port 5000 (or as specified in the `.env`).

You should see:

```
Server listening on port 5000
MongoDB connected successfully
```

---

## 4. Run Frontend Application

Open another terminal or PowerShell window.

Navigate to the `beauty-beats` root folder (frontend):

```bash
cd beauty-beats
npm start
```

This starts the React development server usually on http://localhost:3000.

---

## 5. Verify Setup

- Open http://localhost:3000 to use the frontend app.
- Verify backend API is running with test endpoint:

```bash
curl http://localhost:5000/testmongodb
```

You should receive:

```json
{ "message": "MongoDB is connected" }
```

---

## 6. Running Tests

To run frontend unit tests:

```bash
npm test
```

This runs Jest tests for React components.

---

## 7. Additional Notes

- Make sure MongoDB service is running before starting the backend.
- For production, consider environment-specific configurations and secure secrets.
- You can stop servers by pressing `Ctrl + C` in the terminal window.
- To install additional backend packages, rerun `npm install` in the `server` folder.
- Be sure to pull latest updates and rerun installs when switching branches or updating dependencies.

---

## Troubleshooting

- If you get a "Missing script: server" error, ensure you are running `npm run server` from the `server` folder or run `node index.js` inside the `server` folder.
- Check `.env` file is properly set in the `server` folder.
- Make sure ports 3000 and 5000 are free or properly forwarded.
- For any dependency error, try deleting `node_modules` and `package-lock.json` and reinstalling.

---

This README_SETUP.md aims to help developers and project managers run the project smoothly and avoid common errors.

If you have questions or need further assistance, please ask!
