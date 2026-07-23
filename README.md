# Campus Lost & Found Management System

A comprehensive web-based platform developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)** to help students and faculty efficiently manage lost and found items within the university campus. The system also includes a **Professor Office Navigation Module**, **Notes Sharing Portal**, and **Campus Gallery**, providing a centralized platform for campus communication and resource sharing.

---

## 📖 Project Overview

Finding lost items on a university campus can be difficult due to the lack of a centralized reporting system. This project aims to solve this problem by providing a digital platform where students and faculty can report lost or found items, search existing records, and recover belongings more efficiently.

In addition to the Lost & Found system, the platform includes:

- A Professor Office Navigation feature to help students locate faculty offices.
- A Notes Sharing Portal for exchanging academic resources.
- A Campus Gallery to showcase events, achievements, and campus activities.

---

## 🎯 Project Objectives

- Provide a centralized Lost & Found platform.
- Improve communication between students and faculty.
- Reduce the time required to recover lost belongings.
- Enable easy access to professor office information.
- Facilitate sharing of study materials and notes.
- Promote campus activities through a dedicated gallery.

---

# 🚀 Features

## 1. User Authentication

- User Registration
- Secure Login
- Password Encryption
- User Profile Management
- Session Management

---

## 2. Lost Item Management

- Report Lost Items
- Upload Item Images
- Enter Item Description
- Mention Date and Location
- View Lost Item Reports

### Information Collected

- Item Name
- Category
- Description
- Date Lost
- Location Lost
- Contact Information
- Item Image

---

## 3. Found Item Management

- Report Found Items
- Upload Item Photos
- Mention Found Location
- View Found Item Listings
- Mark Items as Claimed

### Information Collected

- Item Name
- Category
- Description
- Date Found
- Location Found
- Contact Information
- Item Image

---

## 4. Search and Filtering

Users can search items using:

- Item Name
- Category
- Location
- Date
- Status

### Categories

- Electronics
- Mobile Phones
- Wallets
- Books
- Student Cards
- Accessories
- Other Items

---

## 5. Professor Office Navigation

Students can easily locate faculty members through:

- Professor Search
- Department Search
- Office Information
- Office Location Details
- Contact Information

### Available Information

- Professor Name
- Department
- Office Number
- Office Floor
- Contact Details

---

## 6. Notes Sharing Portal

Students can upload and download academic resources.

### Features

- Upload Notes
- Download Notes
- Subject Categorization
- Semester Categorization
- Search Notes
- Resource Sharing

### Supported Files

- PDF
- DOCX
- PPT
- Images

---

## 7. Campus Gallery

The gallery provides a collection of:

- Campus Events
- Student Activities
- Academic Achievements
- Sports Events
- Workshops
- Seminars

### Features

- Upload Images
- View Images
- Categorized Albums
- Event Highlights

---

## 8. Admin Dashboard

The administrator can:

- Manage Users
- Manage Lost Items
- Manage Found Items
- Verify Reports
- Remove Inappropriate Content
- Manage Notes
- Manage Gallery Content
- Monitor System Activity

---

# 🛠 Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- Bootstrap / Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose ODM

## Authentication

- JSON Web Token (JWT)
- bcrypt.js

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman

---

# 🏗 System Architecture

```text
Frontend (React.js)
        │
        ▼
REST API (Node.js + Express.js)
        │
        ▼
MongoDB Database
```

---


# ⚙ Installation Guide

## Clone Repository


## Move to Project Directory

```bash
cd campus-lost-found-system
```

## Install Backend Dependencies

```bash
cd server
npm install
```

## Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## Configure Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend Server

```bash
npm run server
```

---

## Run Frontend

```bash
npm start
```

---

# 📊 Future Enhancements

- AI-Based Lost & Found Item Matching
- QR Code Verification System
- Email Notifications
- SMS Notifications
- Real-Time Chat System
- Interactive Campus Map
- Mobile Application
- Multi-Campus Support
- OCR-Based Item Recognition
- AI Recommendation System

---

# 🎓 Learning Outcomes

This project demonstrates practical implementation of:

- Full Stack Web Development
- MERN Stack Development
- RESTful API Design
- Database Design and Management
- Authentication and Authorization
- File Upload Handling
- Frontend and Backend Integration
- Software Engineering Principles
- Git and GitHub Collaboration

---

# 👨‍💻 Project Team

This project was developed as a collaborative semester project by:

### Abdul Haseeb
**Role:** Full Stack Developer

- Frontend Development
- Backend Development
- Database Integration
- System Testing

### Arslan Ahmed Khan
**Role:** Frontend Developer

- User Interface Design
- React Components
- Responsive Layout Development
- User Experience Enhancement

### Asim Nawaz
**Role:** Backend & Database Developer

- API Development
- MongoDB Database Design
- Authentication System
- Server-Side Functionality

---

# 🏫 Academic Information

**Project Title:** Campus Lost & Found Management System

**Technology Stack:** MERN Stack (MongoDB, Express.js, React.js, Node.js)

**Project Type:** Semester Project

**Department:** Computer Science

**Year:** 2026

---

# 🙏 Acknowledgment

We would like to express our sincere gratitude to our project supervisor, faculty members, and the Department of Computer Science for their guidance, support, and valuable feedback throughout the development of this project.

---

# 📄 License

This project is developed solely for educational and academic purposes.

© 2026 Abdul Haseeb, Asim Nawaz, and Arslan Ahmed Khan
