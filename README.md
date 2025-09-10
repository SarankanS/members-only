Sure! Here's a cleaned-up, well-formatted, and polished version of your README:

---

# Members Only

## Introduction

Welcome to the **Members Only** project! This app allows members to write anonymous posts inside a private clubhouse. Inside the clubhouse, members can see who authored each post, but outside the clubhouse, posts appear anonymous—encouraging curiosity and intrigue.

---

## Features

* User sign-up with validation and password hashing
* User login using Passport.js authentication
* Membership system requiring a secret passcode to join the club
* Anonymous post creation with titles and text content
* Posts visible to everyone, but author info shown only to club members

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your PostgreSQL database**

   * Create a database
   * Configure your database connection details and other environment variables in a `.env` file:

   ```ini
   DATABASE_URL=your_postgres_connection_string
   SESSION_SECRET=your_session_secret
   CLUB_PASSCODE=your_secret_passcode_for_membership
   ```

4. **Run database migrations**

   * Ensure your models are synced with the database (refer to your ORM setup, e.g., Sequelize or Prisma).

5. **Start the application**

   ```bash
   npm start
   ```

6. **Access the app**

   * Open your browser and visit: [http://localhost:3000](http://localhost:3000) (or your configured port)

---

## Database Models Overview

### User

* `firstName`
* `lastName`
* `email` (used as username)
* `password` (hashed)
* `membershipStatus` (boolean: true if member)

*Note: Admin field is not implemented.*

### Message

* `title`
* `text`
* `timestamp`
* `authorId` (relation to User)

---

## Usage

* **Sign Up:** Create an account with full name, email, and password. Password confirmation is required.
* **Membership:** Enter the secret passcode on the membership page to gain membership status.
* **Login:** Authenticate using your email and password.
* **Create Post:** Members can create new messages with a title and content.
* **View Posts:** Everyone can view messages, but only members can see who wrote them and when.
* **Admin Features:** Not implemented in this version.

---

## Notes

* Passwords are securely hashed using bcrypt.
* Form inputs are sanitized and validated.
* Admin functionalities like deleting posts and admin user management are intentionally omitted.

---

## Future Improvements

* Add an admin role with the ability to delete posts
* Implement admin sign-up or admin passcode for access
* Enhance UI/UX for better user experience

