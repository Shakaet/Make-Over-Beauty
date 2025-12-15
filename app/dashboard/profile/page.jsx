'use client';

import { useState, useEffect, useContext } from 'react';
import {
    User, Mail, Phone, Calendar, MapPin, Shield,
    Edit2, Save, Camera, Bell, Lock, Activity,
    Users, Settings, LogOut, CheckCircle
} from 'lucide-react';
import { Context } from '@/app/provider/AuthProvider';
import { userApi } from '@/app/api/userApi';


export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState(null);
    const [tempData, setTempData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, role } = useContext(Context);

    useEffect(() => {
        console.log('Auth Context User:', user); // Debug log

        const fetchUserData = async () => {
            if (!user?.email) {
                console.log('No user email available');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                console.log('Fetching user data for email:', user.email);

                // Fetch user data from API
                const response = await userApi.getUserByEmail(user.email);
                console.log('API Response:', response);

                const fetchedData = {
                    name: response?.name || user?.displayName || 'User',
                    email: response?.email || user?.email,
                    phone: response?.phone || user?.phone || 'N/A',
                    joinDate: response?.joinDate || 'N/A',
                    address: response?.address || user?.address || 'N/A',
                    bio: response?.bio || 'No bio available',
                    avatar: response?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
                    role: response?.role || role || 'User',
                    twoFactor: response?.twoFactor || false,
                    notifications: response?.notifications || true,
                };

                console.log('Processed user data:', fetchedData);

                setUserData(fetchedData);
                setTempData(fetchedData);
                setIsAdmin(fetchedData.role === 'Admin');

            } catch (error) {
                //       console.error('Failed to fetch user data:', error);
                setError(error.message || 'Failed to load user data');

                // Create basic user data from context as fallback
                const fallbackData = {
                    name: user?.displayName || 'User',
                    email: user?.email || 'N/A',
                    phone: user?.phone || 'N/A',
                    joinDate: 'N/A',
                    address: 'N/A',
                    bio: 'No bio available',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'user'}`,
                    role: user?.role || 'User',
                    twoFactor: false,
                    notifications: true,
                };

                setUserData(fallbackData);
                setTempData(fallbackData);
                setIsAdmin(fallbackData.role === 'Admin');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleEdit = async () => {
        if (isEditing) {
            try {
                // Save changes to API
                if (tempData && user?.email) {
                    // Assuming you have an updateUser method in your API
                    await userApi.updateUser(user.email, tempData);
                    setUserData({ ...tempData });
                    setIsAdmin(tempData.role === 'Admin');
                    alert('Profile updated successfully!');
                }
            } catch (error) {
                console.error('Failed to save changes:', error);
                alert('Failed to save changes. Please try again.');
            }
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field, value) => {
        if (tempData) {
            setTempData(prev => ({ ...prev, [field]: value }));
        }
    };

    const toggleRole = () => {
        const newIsAdmin = !isAdmin;
        setIsAdmin(newIsAdmin);
        if (tempData) {
            setTempData(prev => ({
                ...prev,
                role: newIsAdmin ? 'Admin' : 'User'
            }));
        }
    };

    const adminFeatures = [
        { icon: Users, label: 'Manage Users', count: 1243, description: 'View and manage all users' },
        { icon: Shield, label: 'Manage Product', description: 'Configure security settings' },
        { icon: Activity, label: 'Manage Site Setting', description: 'View platform insights' },
        { icon: Settings, label: 'Manage Blog', description: 'Configure system preferences' },
    ];

    // const stats = {
    //     totalUsers: 1243,
    //     activeProjects: 12,
    //     storageUsed: 78,
    //     weeklyActivity: 85,
    // };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Not Logged In</h3>
                    <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No User Data</h3>
                    <p className="text-gray-600 mb-4">Unable to load user data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                            {isAdmin ? 'Admin' : 'User'} Profile
                        </h1>
                        <p className="text-[var(--pink)] mt-2">Manage your account and administrative settings</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-pink-100">
                            <div className="flex flex-col items-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 p-1">
                                        <img
                                            src={userData.avatar}
                                            alt={userData.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-white"
                                        />
                                    </div>
                                    <button className="absolute bottom-4 right-4 bg-pink-500 hover:bg-[var(--pink)] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                                        <Camera size={20} />
                                    </button>
                                    {isAdmin && (
                                        <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <Shield size={14} />
                                            Admin
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempData?.name || ''}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="text-center bg-pink-50 border-pink-200 rounded-lg px-3 py-1"
                                        />
                                    ) : (
                                        userData.name
                                    )}
                                </h2>
                                <p className="text-gray-600 mb-6 flex items-center gap-2">
                                    <Mail size={16} />
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={tempData?.email || ''}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="bg-pink-50 border-pink-200 rounded-lg px-3 py-1 text-sm"
                                        />
                                    ) : (
                                        userData.email
                                    )}
                                </p>

                                {/* Role */}
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="text-gray-700 font-medium">Role:</span>
                                    <span className="font-semibold text-gray-800">{userData.role}</span>
                                </div>

                                {/* Stats */}
                                {/* {activeTab === 'admin' && isAdmin && (
                                    <div className="bg-pink-50 rounded-xl p-4 text-center w-full mb-4">
                                        <div className="text-2xl font-bold text-[var(--pink)]">{stats.totalUsers}</div>
                                        <div className="text-sm text-gray-600">Users</div>
                                    </div>
                                )} */}

                                {/* Edit Button */}
                                <button
                                    onClick={handleEdit}
                                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-[var(--pink)] hover:to-rose-600'} text-white shadow-lg`}
                                >
                                    {isEditing ? (
                                        <>
                                            <Save size={20} />
                                            Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 size={20} />
                                            Edit Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tabs Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="flex space-x-2 mb-8 overflow-x-auto">
                            {['profile', 'security', ...(isAdmin ? ['admin'] : [])].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-white text-[var(--pink)] shadow-lg' : 'text-gray-600 hover:bg-white/50'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InfoField
                                            icon={Phone}
                                            label="Phone"
                                            value={userData.phone}
                                            isEditing={isEditing}
                                            field="phone"
                                            tempValue={tempData?.phone}
                                            onChange={handleInputChange}
                                        />
                                        <InfoField
                                            icon={Calendar}
                                            label="Join Date"
                                            value={userData.joinDate}
                                            isEditing={isEditing}
                                            field="joinDate"
                                            tempValue={tempData?.joinDate}
                                            onChange={handleInputChange}
                                        />
                                        <InfoField
                                            icon={MapPin}
                                            label="Address"
                                            value={userData.address}
                                            isEditing={isEditing}
                                            field="address"
                                            tempValue={tempData?.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={tempData?.bio || ''}
                                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                                className="w-full h-32 bg-pink-50 border-pink-200 rounded-xl p-4"
                                            />
                                        ) : (
                                            <p className="text-gray-600 bg-pink-50 rounded-xl p-4">{userData.bio}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h3>

                                    <SecurityToggle
                                        icon={Lock}
                                        label="Two-Factor Authentication"
                                        description="Add an extra layer of security to your account"
                                        enabled={tempData?.twoFactor || false}
                                        onToggle={() => handleInputChange('twoFactor', !(tempData?.twoFactor || false))}
                                    />

                                    <SecurityToggle
                                        icon={Bell}
                                        label="Email Notifications"
                                        description="Receive security alerts and updates"
                                        enabled={tempData?.notifications || false}
                                        onToggle={() => handleInputChange('notifications', !(tempData?.notifications || false))}
                                    />

                                    <div className="pt-6 border-t">
                                        <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-[var(--pink)] transition-all duration-300">
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            )}


                            {/* Admin Tab */}
                            {activeTab === 'admin' && isAdmin && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {adminFeatures.map((feature, index) => (
                                            <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                                        <feature.icon className="text-pink-500" size={24} />
                                                    </div>
                                                    {feature.count && (
                                                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                            {feature.count}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-gray-800 mb-2">{feature.label}</h4>
                                                <p className="text-gray-600 text-sm">{feature.description}</p>
                                                <button className="mt-4 text-[var(--pink)] hover:text-pink-700 font-semibold text-sm">
                                                    Manage →
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t">
                                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300">
                                            <LogOut size={20} />
                                            <span className="font-semibold">Logout All Sessions</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function InfoField({ icon: Icon, label, value, isEditing, field, tempValue, onChange }) {
    return (
        <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Icon size={18} />
                {label}
            </label>
            {isEditing ? (
                <input
                    type="text"
                    value={tempValue || ''}
                    onChange={(e) => onChange(field, e.target.value)}
                    className="w-full bg-pink-50 border-pink-200 rounded-xl px-4 py-3"
                />
            ) : (
                <p className="text-gray-600 bg-pink-50 rounded-xl px-4 py-3">{value}</p>
            )}
        </div>
    );
}

function SecurityToggle({ icon: Icon, label, description, enabled, onToggle }) {
    return (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl">
                    <Icon size={20} className="text-pink-500" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{label}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${enabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
        </div>
    );
}