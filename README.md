# TicketBari - Online Ticket Booking Platform

## Project Purpose
TicketBari is a full-stack online ticket booking platform where users can discover and book travel tickets (Bus, Train, Launch, Plane). It features three distinct roles: **User**, **Vendor**, and **Admin**, each with tailored dashboards and functionalities.

## Live URL


## Admin & Vendor Credentials

### Admin
- **Email:** 
- **Password:** 

### Vendor
- **Email:** 
- **Password:** 

## Key Features

### Authentication
- Registration & Login with BetterAuth (Email + Password)
- Google OAuth Social Login
- Role-based access control (User, Vendor, Admin)
- Secure JWT token authentication for API protection

### User Dashboard
- **User Profile** – View personal information (name, email, role, profile picture)
- **My Booked Tickets** – View all bookings in a 3-column grid with status (pending/accepted/rejected/paid)
- **Transaction History** – View all Stripe payment transactions in a table

### Vendor Dashboard
- **Vendor Profile** – View personal information
- **Add Ticket** – Upload ticket with image (imgbb), perks, departure date/time
- **My Added Tickets** – View all tickets with status (pending/approved/rejected)
- **Requested Bookings** – Accept or reject booking requests from users
- **Revenue Overview** – View total revenue, tickets sold, tickets added with monthly revenue chart

### Admin Dashboard
- **Admin Profile** – View personal information
- **Manage Tickets** – Approve or reject vendor tickets
- **Manage Users** – Change user roles (Make Admin/Vendor), Mark vendors as fraud
- **Advertise Tickets** – Toggle advertisement status (maximum 6 tickets on homepage)

### Ticket Features
- Browse all approved tickets with **search**, **filter** (by transport type), and **sort** (by price)
- **Pagination** – 6 tickets per page
- **Ticket Details** – View full information, countdown timer, book now modal
- **Booking System** – Book tickets with quantity, status tracking (pending/accepted/rejected/paid)
- **Stripe Payment** – Secure online payment after vendor acceptance

### UI/UX
- **Fully Responsive** – Mobile, tablet, and desktop views
- **Dark/Light Mode** – User preference toggle
- **Professional Design** – Clean, modern, and recruiter-friendly
- **Loading Spinners** – For all data fetching states
- **Error Pages** – 404 and Unauthorized pages

## NPM Packages Used (Frontend)

| Package | Purpose |
| :--- | :--- |
| `next` | React framework for server-side rendering |
| `better-auth` | Authentication (Email/Password + Google OAuth) |
| `stripe` | Payment gateway integration |
| `recharts` | Revenue overview charts |
| `react-icons`, `lucide-react`, `@gravity-ui/icons` | Icons |
| `react-toastify` | Toast notifications |
| `framer-motion` | Animations |
| `next-themes` | Dark/Light mode toggle |
| `@heroui/react` | UI components (Modal, Button, Input) |

## NPM Packages Used (Backend)

| Package | Purpose |
| :--- | :--- |
| `express` | Backend framework |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variables |
| `mongodb` | MongoDB database driver |
| `stripe` | Stripe payment webhooks |
| `jsonwebtoken` | JWT token generation and verification |
| `better-auth` | Authentication (Email/Password + Google OAuth) |


# Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://...
AUTHDB_NAME=ticketBari_db
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
