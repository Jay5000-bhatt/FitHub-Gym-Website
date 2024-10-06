# FitHub: Gym Management System

The **Gym Management System Website** is designed to manage gym operations efficiently, providing separate dashboards for **Admins**, **Trainers**, and **Clients**. Admins can manage trainers, packages, and orders, while trainers have access to their client data, earnings, and personal client lists. Clients can browse products, book trainers, purchase plans, and manage their orders via their own dashboard.

## Features

### Admin Role
- **Admin Dashboard:** Manage gym operations, view and control trainer data, packages, and orders.

- **Trainer Management:** Add, update, and delete trainers.
- **Package and Plan Management:** Create, update, and delete gym plans (Basic, Advanced, Premium).
- **Order Management:** View all orders placed by clients and manage order statuses.

### Trainer Role
- **Trainer Dashboard:** View personal clients, total clients, and order history.

- **Earnings Overview:** Track total earnings and individual client payments.
- **Client Management:** Manage personal client data and training schedules.

### Client Role
- **Client Dashboard:** View and manage profile, cart, orders, and booked trainers.

- **Product List:** Browse and purchase gym products (e.g., supplements, equipment).
- **Trainer Booking:** Book trainers for personal sessions.
- **Plan and Package Selection:** Purchase gym plans (Basic, Advanced, Premium).
- **Order Placement:** Add items to the cart and place orders for products and services.

## Technologies Used

- **Frontend:** React.js with Vite

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
  
## UI/UX

- Built with **Tailwind CSS** for a clean and modern interface.

- Responsive design for both desktop and mobile users.
- Admin, Trainer, and Client each have unique dashboards tailored to their roles.
  
## Project Structure

The project is divided into two main folders:

- **Admin Dashboard** (Admin role-based URL): `/admin`

- **Trainer Dashboard** (Trainer role-based URL): `/trainer`
- **Client Dashboard** (Client role-based URL): `/user`

### Admin Features
- **URL:** `/admin`
- Access to trainer management, packages, plans, and order lists.

- Admin can view the total list of trainers, clients, and order details.

### Trainer Features
- **URL:** `/trainer`
- View personal and total client data.

- Check earnings from individual clients and total monthly earnings.
- Manage order history and training schedules.

### Client Features
- **URL:** `/client`

- Browse the product list and book trainers for personalized sessions.
- Purchase plans and packages (Basic, Advanced, Premium).
- Add products to the cart and place orders for gym merchandise and supplements.
- Track order status in the client dashboard.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js

- MongoDB
- npm or yarn
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


#### Admin, Teacher Frontend .env File

`VITE_BASE_URL = <Your-Base-URL>`

#### User Frontend .env File

`VITE_BASE_URL = <Your-Base-URL>`

#### Backend .env File

`PORT = <Port-Number>`

`MONGODB_URI = <Your-DataBase-URL>`

`JWT_SECRET_KEY = "<Your-Secret-Key>"`

`CLOUDINARY_CLOUD_NAME = "<Cloudinary-Cloud-Name>"`

`CLOUDINARY_API_KEY = "<Cloudinary-Api-Key>"`

`CLOUDINARY_API_SECRET = "m<Cloudinary-Api-Secret>"`

`ADMIN_EMAIL = <Your-Admin-Email>`

`ADMIN_PASSWORD = <Your-Admin-Password>`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/gym-management-system.git
   cd gym-management-system

## Authors

- [@Jay5000-bhatt](https://github.com/Jay5000-bhatt)


