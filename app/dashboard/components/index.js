import {
    Package, Eye, CheckCircle, Clock, RefreshCw, Truck,
    TrendingUp, TrendingDown, Cpu, Database, Server, Zap,
    Activity, ShoppingBag, DollarSign, Gift, Star, Bell
} from "lucide-react";

// ==================== CUSTOMER COMPONENTS ====================

// Component: Stat Card for Customer
export function StatCard({ icon: Icon, value, label, change, color, description }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
                    <p className="text-gray-600 text-sm mb-2">{label}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );
}

// Component: Order Item
export function OrderItem({ order }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'text-green-700 bg-green-100';
            case 'pending': return 'text-yellow-700 bg-yellow-100';
            case 'processing': return 'text-blue-700 bg-blue-100';
            case 'shipped': return 'text-purple-700 bg-purple-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return CheckCircle;
            case 'pending': return Clock;
            case 'processing': return RefreshCw;
            case 'shipped': return Truck;
            default: return Clock;
        }
    };

    const StatusIcon = getStatusIcon(order.status);

    return (
        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors duration-300 group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Package size={20} className="text-pink-500" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{order.invoiceId || order.id}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span>৳{order.totalAmount?.toLocaleString() || order.amount?.toLocaleString()}</span>
                        <span>•</span>
                        <span>{new Date(order.createdAt || order.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    <StatusIcon size={12} />
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Processing'}
                </span>
                <button className="p-1 hover:bg-pink-200 rounded">
                    <Eye size={16} className="text-gray-500" />
                </button>
            </div>
        </div>
    );
}

// Component: Product Card
export function ProductCard({ product }) {
    return (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 hover:from-pink-100 hover:to-rose-100 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{product.image}</div>
                <span className="px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                    {product.tag}
                </span>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
                <div className="flex items-center justify-between">
                    <div className="font-bold text-gray-800">৳{product.price}</div>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                </div>
            </div>
            <button className="w-full mt-4 py-2 bg-white border border-pink-200 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-colors duration-300">
                Add to Cart
            </button>
        </div>
    );
}

// Component: Notification Card
export function NotificationCard({ notification }) {
    const getIcon = (type) => {
        switch (type) {
            case 'order': return ShoppingBag;
            case 'price': return DollarSign;
            case 'reward': return Gift;
            case 'feature': return Zap;
            case 'review': return Star;
            default: return Bell;
        }
    };

    const Icon = getIcon(notification.type);

    return (
        <div className={`p-4 rounded-xl ${notification.read ? 'bg-pink-50' : 'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200'}`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${notification.read ? 'bg-white' : 'bg-pink-100'}`}>
                    <Icon size={16} className={notification.read ? 'text-gray-500' : 'text-pink-500'} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h5 className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                            {notification.title}
                        </h5>
                        {!notification.read && (
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
            </div>
        </div>
    );
}

// Component: Quick Action Button
export function QuickActionButton({ icon: Icon, label, color }) {
    return (
        <button className="flex flex-col items-center p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors duration-300 group">
            <div className={`p-3 rounded-xl ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={20} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
        </button>
    );
}

// Component: Info Card
export function InfoCard({ icon: Icon, title, description, actionText, color }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon size={20} className="text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">{title}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
            <button className="text-pink-600 hover:text-pink-700 font-semibold text-sm">
                {actionText} →
            </button>
        </div>
    );
}

// ==================== ADMIN COMPONENTS ====================

// Component: Admin Stat Card
export function AdminStatCard({ icon: Icon, value, label, change, trend, color, description }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
                    <p className="text-gray-600 text-sm mb-2">{label}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
}

// Component: Admin Order Item
export function AdminOrderItem({ order }) {
    return (
        <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white font-bold">
                    {order.customer?.charAt(0)}
                </div>
                <div>
                    <h4 className="font-medium text-gray-800">{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
            </div>

            <div className="text-right">
                <div className="font-bold text-gray-800 mb-1">৳{order.amount.toLocaleString()}</div>
                <StatusBadge status={order.status} />
            </div>
        </div>
    );
}

// Component: Status Badge
export function StatusBadge({ status }) {
    const config = {
        completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
        pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
        processing: { color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
        shipped: { color: 'bg-purple-100 text-purple-700', icon: Truck },
        cancelled: { color: 'bg-red-100 text-red-700', icon: TrendingDown },
    };

    const { color, icon: Icon } = config[status.toLowerCase()] || config.processing;

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
            <Icon size={10} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

// Component: System Metric
export function SystemMetric({ metric }) {
    const getIcon = (label) => {
        switch (label) {
            case 'CPU Usage': return Cpu;
            case 'Memory': return Database;
            case 'Storage': return Server;
            case 'Network': return Zap;
            default: return Activity;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'critical': return 'text-red-500';
            case 'warning': return 'text-yellow-500';
            case 'good': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const Icon = getIcon(metric.label);

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                    <Icon size={18} className="text-pink-500" />
                </div>
                <div>
                    <span className="font-medium text-gray-700">{metric.label}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>Trend: {metric.trend}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className={`font-bold ${getStatusColor(metric.status)}`}>{metric.value}%</div>
                <div className="text-xs text-gray-500 capitalize">{metric.status}</div>
            </div>
        </div>
    );
}

// Component: Top Product Item
export function TopProductItem({ product, index }) {
    return (
        <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white font-bold">
                    {index}
                </div>
                <div>
                    <h4 className="font-medium text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                </div>
            </div>

            <div className="text-right">
                <div className="font-bold text-gray-800">৳{product.revenue.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp size={12} />
                    +{product.growth}%
                </div>
            </div>
        </div>
    );
}

// Component: Quick Admin Action
export function QuickAdminAction({ icon: Icon, label, description, color, count, onClick, href }) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (href) {
            window.location.href = href;
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 group text-left"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                </div>
                {count && (
                    <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {count}
                    </span>
                )}
            </div>
            <div>
                <h3 className="font-bold text-gray-800 mb-2">{label}</h3>
                <p className="text-gray-600 text-sm mb-3">{description}</p>
            </div>
            <div className="text-pink-600 font-semibold text-sm">
                Manage →
            </div>
        </button>
    );
}