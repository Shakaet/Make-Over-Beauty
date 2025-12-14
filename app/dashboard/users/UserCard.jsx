import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Shield,
  Trash2,
  ChevronDown,
  Eye,
  Building,
  Calendar,
  AlertTriangle,
  LocationEdit
} from 'lucide-react';

const UserCard = ({ user, onDelete, index, currentUserEmail }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'manager': return <Building className="w-4 h-4" />;
      case 'customer': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    // Prevent deleting yourself
    if (user.email === currentUserEmail) {
      alert('You cannot delete your own account!');
      return;
    }

    // Prevent deleting other admins if you're not admin
    if (user.role === 'admin' && user.email !== currentUserEmail) {
      alert('Only admins can delete other admin accounts!');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${user.name || user.email}?`)) return;

    setIsDeleting(true);
    try {
      await onDelete(user._id);
    } catch (error) {
      console.error('Delete failed:', error);
      alert(error.message || 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const isCurrentUser = user.email === currentUserEmail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gradient-to-b from-[#ffe8e6] to-[#fff5f3] rounded-2xl shadow-md overflow-hidden border ${isCurrentUser ? 'border-pink-400 border-2' : 'border-pink-200'
        } hover:shadow-xl transition-all duration-300`}
    >
      {isCurrentUser && (
        <div className="bg-pink-100 px-4 py-2 border-b border-pink-200">
          <div className="flex items-center text-pink-700 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            <span className="font-medium">This is your account</span>
          </div>
        </div>
      )}

      <div
        className="p-6 cursor-pointer hover:bg-pink-100 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold ${isCurrentUser
                  ? 'bg-gradient-to-br from-pink-600 to-pink-800'
                  : 'bg-gradient-to-br from-pink-500 to-fuchsia-600'
                  }`}
              >
                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>

              <div
                className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-pink-50 ${getRoleColor(
                  user.role
                )}`}
              >
                {getRoleIcon(user.role)}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-pink-900 text-lg">
                  {user.username || 'Unknown User'}
                </h3>

                {isCurrentUser && (
                  <span className="px-2 py-0.5 bg-pink-200 text-pink-800 text-xs rounded-full">
                    You
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <Mail className="w-4 h-4 text-pink-400" />
                <p className="text-pink-700 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                user.role
              )}`}
            >
              {user.role?.toUpperCase()}
            </span>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-pink-400" />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-pink-200 bg-white"
          >
            <div className="p-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-pink-600">Joined:</span>
                    <span className="text-sm font-medium text-pink-900">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-pink-600">Phone:</span>
                    <span
                      className={'px-2 py-0.5 rounded-full text-xs font-medium bg-pink-200 text-pink-800'}
                    >
                      {user.phone}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <LocationEdit className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-pink-600">Address:</span>
                    <span
                      className={'px-2 py-0.5 rounded-full text-xs font-medium bg-pink-200 text-pink-800'}
                    >
                      {user.address}
                    </span>
                  </div>
                </div>

                {user.role === 'manager' && (
                  <div className="bg-pink-100 rounded-lg p-4">
                    <h4 className="font-medium text-pink-900 mb-2">
                      Manager Access
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.product_access && (
                        <span className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full">
                          Products
                        </span>
                      )}
                      {user.blog_access && (
                        <span className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full">
                          Blog
                        </span>
                      )}
                      {user.order_access && (
                        <span className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full">
                          Orders
                        </span>
                      )}
                      {user.siteSetting_access && (
                        <span className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full">
                          Settings
                        </span>
                      )}
                      {user.customer_access && (
                        <span className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full">
                          Customers
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="flex justify-end space-x-3">
                {isCurrentUser ? (
                  <div className="flex items-center text-amber-600 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>This account cannot be deleted</span>
                  </div>
                ) : user.role === 'admin' ? (
                  <div className="flex items-center text-pink-700 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Admin accounts require special permission to delete</span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 disabled:opacity-50 transition flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{isDeleting ? 'Deleting...' : 'Delete User'}</span>
                  </button>
                )}
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

  );
};

export default UserCard;