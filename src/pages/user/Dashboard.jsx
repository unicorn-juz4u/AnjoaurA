export default function UserDashboard() {
    return (
        <div className="dashboard">
            <h2>Welcome Back, User</h2>
            <div className="stats">
                <div>Recent Orders: 0</div>
                <div>Loyalty Points: 100</div>
            </div>
            <button>Edit Profile</button>
        </div>
    );
}