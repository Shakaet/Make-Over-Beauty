const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="group bg-white backdrop-blur-xl rounded-3xl overflow-hidden border border-pink-200 hover:border-pink-400 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30">
            <div className="relative h-56 bg-gradient-to-br from-pink-100 to-pink-200 overflow-hidden">
                <img
                    src={product.imagePrimary}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-[var(--pink)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{product.discount}%
                </div>
                {product.stock < 10 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Low Stock
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-pink-900 mb-2 truncate">{product.name}</h3>
                <p className="text-pink-700 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-pink-900 font-semibold">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-pink-700 text-sm">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-200">
                    <div>
                        <div className="text-2xl font-bold text-[var(--pink)]">${product.lowprice}</div>
                        {product.highprice && (
                            <div className="text-sm text-pink-400 line-through">${product.highprice}</div>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="text-pink-700 text-xs">Stock</div>
                        <div className="text-pink-900 font-bold text-lg">{product.stock}</div>
                    </div>
                </div>

                <div className="mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-900 rounded-full text-xs font-medium border border-pink-300">
                        {product.category}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product._id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-[var(--pink)] text-white py-2.5 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};