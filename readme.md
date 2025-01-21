# Calendar Project

## **Project Setup**

Follow these steps to clone, set up, and run the project locally:

### **Step 1: Clone the Repository**

```bash
git clone <repository-url>
cd <repository-name>
```

### **Step 2: Install Dependencies**

```bash
npm install
```

### **Step 3: Start the Development Server**

```bash
npm run dev
```

This will start the application at `http://localhost:5173`.

---

## **Important Notes**

1. **Environment Variables (`.env` File)**:

   - The `.env` file **has not been added to `.gitignore`**, so it is included in the repository. Ensure you handle sensitive keys like `VITE_GOOGLE_CLIENT_ID` carefully if deploying to production.

2. **Default Redirect URI**:
   - The Google OAuth redirect URI is configured as:
     ```
     http://localhost:5173/
     ```

---

## **Project Overview**

- **React Framework**: Built with React and Vite for fast development.
- **OAuth Integration**: Utilizes Google OAuth for secure authentication.
- **Local Storage**: Events persist across page refreshes using `localStorage`.
- **Editable Events**: Add, edit, delete, and filter events.

---

## **Key Features**

1. **OAuth Integration**:

   - Google sign-in implemented with `@react-oauth/google`.

2. **Event Management**:

   - Add, edit, and delete calendar events.
   - Search, filter by date, and filter by location.

3. **Local Storage Persistence**:
   - Default events are loaded on the first run.
   - Changes to events are automatically saved to `localStorage`.

---
