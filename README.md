# AuthMaster

**AuthMaster** is a robust authentication platform built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive solution for managing user authentication with best practices such as signup, login, email verification, password recovery, and more.
## Live Link
### Live Website Link : [Click Here](https://authmaster-fo5w.onrender.com)
## Features

- **User Signup & Login**: Secure registration and login functionality with JWT (JSON Web Tokens).
- **Email Verification**: Confirm user email addresses through automated verification emails.
- **Password Recovery**: Enable users to recover their passwords with a secure email-based reset process.
- **Welcome Emails**: Send personalized welcome emails upon successful registration.
- **Profile Management**: Allow users to manage their profiles, update personal information, and securely change passwords.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/MamunKhan71/AuthMaster
    cd AuthMaster
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Install frontend and backend dependencies**:
    ```bash
    npm run build
    ```

4. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add the following variables:
    ```
    MONGO_URI=your_mongodb_uri
    PORT=your_local_port
    JWT_SECRET=your_secret_key
    NODE_ENV=development
    MAILTRAP_ENDPOINT=your_mailtrap_endpoint
    MAILTRAP_TOKEN=your_mailtrap_token
    CLIENT_URL=http://localhost:5173
    ```

5. **Run the backend server**:
    ```bash
    cd backend
    npm start
    ```

6. **Run the backend development server**:
    ```bash
    npm run dev
    ```
7. **Run the frontend development server**:
    ```bash
    cd frontend
    npm run dev
    ```
## Usage

- **Access the application**: Open your browser and navigate to `http://localhost:5173` to access the frontend.
- **API Documentation**: Refer to the [docs](https://documenter.getpostman.com/view/25442205/2sAXjJ6DBj) endpoint on the backend server for API documentation.

## Contributing

Feel free to contribute by opening issues or submitting pull requests.


## Acknowledgements

- Inspired by best practices in authentication and user management.
- Utilizes various libraries and tools for enhanced security and performance.

---
## Screenshots
<img src="https://i.ibb.co/StkXdC1/fourth-page.png" alt="fourth-page" border="0" style="width:100%;">
<img src="https://i.ibb.co/qr9YzyJ/third-page.png" alt="third-page" border="0" style="width:100%;">
<img src="https://i.ibb.co/DVkgKDm/second-page.png" alt="second-page" border="0" style="width:100%;">
<img src="https://i.ibb.co/gv0Mnrs/First-Page.png" alt="First-Page" border="0" style="width:100%;">
