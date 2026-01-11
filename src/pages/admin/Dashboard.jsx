export default function AdminDashboard() {
    return (
        <div className="admin-panel" style={{ background: '#f4f4f4', padding: '20px' }}>
            <h2 style={{ color: 'red' }}>Admin Control Center</h2>
            <ul>
                <li>Manage Products</li>
                <li>View All Sales</li>
                <li>Manage Users</li>
            </ul>
        </div>
    );
}