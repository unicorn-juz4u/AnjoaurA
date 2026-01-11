src/
├── assets/             # Images, Global CSS
├── components/         # Shared UI (Navbar, Footer, Button)
├── context/            # AuthContext (Tracks User/Admin/Affiliate role)
├── layouts/            # Layout wrappers (PublicLayout, AdminLayout)
├── pages/              # Page components
│   ├── public/         # Home, Collections, Not Found
│   ├── user/           # User Dashboard, Profile
│   ├── admin/          # Admin Dashboard, Settings
│   └── affiliate/      # Affiliate Dashboard, Earnings
├── routes/             # Route configurations & ProtectedRoute wrapper
├── App.jsx             # Main Route Definitions
└── main.jsx            # Entry point with Router