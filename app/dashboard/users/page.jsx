'use client';

import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Users,
    RefreshCw,
    Download,
    Shield,
    Building,
    User as UserIcon,
    AlertCircle,
    Lock,
    WifiOff,
    Server
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import UserCard from './UserCard';
import { Context } from '@/app/provider/AuthProvider';
import { userApi } from '@/app/api/userApi';

export default function UsersPage() {
    const { user, role, loading: authLoading } = useContext(Context);
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [stats, setStats] = useState({
        total: 0,
        customers: 0,
        managers: 0,
        admins: 0
    });
    const [apiStatus, setApiStatus] = useState('checking');

    // Redirect if not authenticated or not admin
    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/login');
            } else if (role !== 'admin') {
                router.push('/dashboard');
            }
        }
    }, [user, role, authLoading, router]);

    const fetchUsers = async () => {
        if (!user || role !== 'admin') return;

        setLoading(true);
        setError(null);

        try {

            // Try multiple approaches to fetch users
            let usersData;

            try {
                // Approach 1: Using the userApi (with auth headers)
                const data = await userApi.getAllUsers();
                usersData = data.data || data;
            } catch (apiError) {

                try {
                    // Approach 2: Direct axios call with token
                    const token = localStorage.getItem('accessToken');
                    const response = await axios.get(
                        'https://beauty-server-nine.vercel.app/api/users',
                        {
                            headers: token ? { Authorization: `Bearer ${token}` } : {},
                            timeout: 10000
                        }
                    );
                    usersData = response.data.data || response.data;
                } catch (directError) {

                    try {
                        // Approach 3: Without auth (public endpoint if available)
                        const response = await axios.get(
                            'https://beauty-server-nine.vercel.app/api/users',
                            { timeout: 10000 }
                        );
                        usersData = response.data.data || response.data;
                    } catch (publicError) {
                        throw new Error('All fetch methods failed');
                    }
                }
            }

            if (!usersData || !Array.isArray(usersData)) {
                throw new Error('Invalid data format received from server');
            }

            setUsers(usersData);
            setFilteredUsers(usersData);
            updateStats(usersData);
            setError(null);

        } catch (err) {

            let errorMessage = 'Failed to fetch users';

            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = 'Authentication expired. Please log in again.';
                    localStorage.removeItem('accessToken');
                    router.push('/login');
                } else if (err.response.status === 403) {
                    errorMessage = 'You do not have permission to view users.';
                } else if (err.response.status === 404) {
                    errorMessage = 'Users endpoint not found.';
                } else {
                    errorMessage = `Server error: ${err.response.status}`;
                }
            } else if (err.request) {
                errorMessage = 'No response from server. Please check your connection.';
            } else {
                errorMessage = err.message || 'Unknown error occurred';
            }

            setError(errorMessage);

            // Set empty state for UI
            setUsers([]);
            setFilteredUsers([]);
            updateStats([]);
        } finally {
            setLoading(false);
        }
    };

    const updateStats = (userList) => {
        const stats = {
            total: userList.length,
            customers: userList.filter(u => u.role === 'customer').length,
            //    managers: userList.filter(u => u.role === 'manager').length,
            admins: userList.filter(u => u.role === 'admin').length
        };
        setStats(stats);
    };

    const handleDelete = async (userId) => {
        if (!user || role !== 'admin') {
            alert('Unauthorized action');
            return;
        }

        try {
            await userApi.deleteUser(userId);
            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            updateStats(updatedUsers);
        } catch (err) {
            throw new Error(err.message || 'Delete failed');
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        let filtered = users;

        if (term) {
            filtered = filtered.filter(user =>
                user.email?.toLowerCase().includes(term.toLowerCase()) ||
                user.name?.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        setFilteredUsers(filtered);
    };

    const handleRoleFilter = (role) => {
        setRoleFilter(role);
        let filtered = users;

        if (role !== 'all') {
            filtered = filtered.filter(user => user.role === role);
        }

        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(filtered);
    };

    useEffect(() => {
        if (user && role === 'admin') {
            fetchUsers();
        }
    }, [user, role]);

    const StatCard = ({ icon: Icon, label, value, color, loading }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${color} rounded-2xl p-6 shadow-sm border border-gray-100`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    {loading ? (
                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                    ) : (
                        <p className="text-3xl font-bold mt-2">{value}</p>
                    )}
                </div>
                <div className="p-3 bg-white rounded-xl">
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </motion.div>
    );

    // Loading state
    if (authLoading || (loading && users.length === 0)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-lg w-64 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Unauthorized access
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
                    <p className="text-gray-600 mb-6">Please log in to access this page</p>
                    <Link
                        href="/login"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    if (role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">You don't have permission to access this page</p>
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                                User Management
                            </h1>
                            <p className="text-pink-600 pt-2">
                                Manage and track all users in one place
                            </p>
                        </div>
                        {/* <div className="flex space-x-3 mt-4 md:mt-0">
                            <button
                                onClick={exportUsers}
                                disabled={filteredUsers.length === 0}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export CSV</span>
                            </button>
                            <button
                                onClick={fetchUsers}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Refresh</span>
                            </button>
                        </div> */}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <StatCard
                            icon={Users}
                            label="Total Users"
                            value={stats.total}
                            color="bg-gradient-to-br from-pink-100 to-pink-200"
                            loading={loading}
                        />
                        <StatCard
                            icon={UserIcon}
                            label="Customers"
                            value={stats.customers}
                            color="bg-gradient-to-br from-rose-100 to-rose-200"
                            loading={loading}
                        />
                        <StatCard
                            icon={Shield}
                            label="Admins"
                            value={stats.admins}
                            color="bg-gradient-to-br from-pink-200 to-pink-300"
                            loading={loading}
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                disabled={loading || users.length === 0}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition disabled:opacity-50"
                            />
                        </div>

                        <div className="flex items-center space-x-2 px-4 py-3 bg-white border border-pink-300 rounded-xl">
                            <Filter className="w-5 h-5 text-pink-400" />
                            <select
                                value={roleFilter}
                                onChange={(e) => handleRoleFilter(e.target.value)}
                                disabled={loading || users.length === 0}
                                className="bg-transparent outline-none text-pink-700"
                            >
                                <option value="all">All Roles</option>
                                <option value="customer">Customers</option>
                                <option value="admin">Admins</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Error Message */}
                {/* {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 p-6 bg-red-50 border border-red-200 rounded-xl text-red-700"
                    >
                        <div className="flex items-start">
                            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2">Unable to Load Users</h3>
                                <p className="mb-3">{error}</p>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={fetchUsers}
                                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('accessToken');
                                            router.push('/login');
                                        }}
                                        className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                    >
                                        Re-login
                                    </button>
                                    <button
                                        onClick={() => {
                                            console.clear();
                                            console.log('Debug Info:', {
                                                user: user?.email,
                                                role,
                                                tokenExists: !!localStorage.getItem('accessToken'),
                                                apiStatus,
                                                usersCount: users.length,
                                                error
                                            });
                                            alert('Debug info logged to console');
                                        }}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Debug Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )} */}

                {/* Users Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-600">Loading users...</p>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-pink-200">
                            <Users className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">
                                No users found
                            </h3>
                            <p className="text-pink-500 mb-4">
                                Try adjusting your filters or refresh
                            </p>
                            <button
                                onClick={fetchUsers}
                                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                            >
                                Refresh Users
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredUsers.map((userData, index) => (
                                <UserCard
                                    key={userData._id || index}
                                    user={userData}
                                    onDelete={handleDelete}
                                    index={index}
                                    currentUserEmail={user?.email}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600"
                >
                    <div className="mt-8 pt-6 border-t border-pink-200 flex justify-between text-sm text-pink-600">
                        <div>
                            Showing <span className="font-semibold">{filteredUsers.length}</span> of{' '}
                            <span className="font-semibold">{users.length}</span> users
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
    );
}