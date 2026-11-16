import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStoreProducts, initialSourcingCatalog, initialOrders, initialSuppliers } from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & View State
  const [activeView, setActiveView] = useState('store'); // 'store' | 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'sourcing' | 'orders' | 'suppliers' | 'calculator' | 'settings'
  const [storeTab, setStoreTab] = useState('home'); // 'home' | 'catalog' | 'track'

  // Catalog & Inventory State
  const [storefrontProducts, setStorefrontProducts] = useState(() => {
    const saved = localStorage.getItem('aura_store_products');
    return saved ? JSON.parse(saved) : initialStoreProducts;
  });

  const [sourcingCatalog, setSourcingCatalog] = useState(() => {
    const saved = localStorage.getItem('aura_sourcing_catalog');
    return saved ? JSON.parse(saved) : initialSourcingCatalog;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Suppliers State
  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('aura_suppliers');
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  // Storefront Shopping Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackingLookupId, setTrackingLookupId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Automation / Markup Settings
  const [settings, setSettings] = useState({
    defaultMarkup: 2.4, // 240% multiplier
    autoFulfillEnabled: true,
    currencySymbol: '$',
    currencyCode: 'USD',
    lowStockThreshold: 15,
    expressShippingRate: 9.99,
    standardShippingRate: 0.00
  });

  // Toast Notification System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('aura_store_products', JSON.stringify(storefrontProducts));
  }, [storefrontProducts]);

  useEffect(() => {
    localStorage.setItem('aura_sourcing_catalog', JSON.stringify(sourcingCatalog));
  }, [sourcingCatalog]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Actions
  const addToCart = (product, variantOptions = {}, quantity = 1) => {
    setCart(prevCart => {
      const variantKey = Object.entries(variantOptions).map(([k, v]) => `${k}:${v}`).join('|');
      const existingIdx = prevCart.findIndex(
        item => item.product.id === product.id && item.variantKey === variantKey
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, variantOptions, variantKey, quantity }];
      }
    });

    showToast(`Added "${product.title}" to cart!`, 'success');
    setCartOpen(true);
  };

  const updateCartQty = (productId, variantKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, variantKey);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.variantKey === variantKey
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, variantKey) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.variantKey === variantKey)));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Place Order (from Customer Storefront)
  const placeOrder = (customerDetails, shippingOption) => {
    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ORD-${orderNum}`;
    const shippingFee = shippingOption === 'express' ? settings.expressShippingRate : settings.standardShippingRate;
    const finalAmount = cartSubtotal + shippingFee;

    const orderItems = cart.map(item => ({
      id: item.product.id,
      title: item.product.title,
      variant: Object.values(item.variantOptions).join(' / ') || 'Default',
      quantity: item.quantity,
      retailPrice: item.product.price,
      supplierCost: item.product.supplierCost || (item.product.price * 0.35),
      supplierSku: item.product.supplier?.sku || `SKU-${item.product.id}`,
      image: item.product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    }));

    const totalCost = orderItems.reduce((acc, item) => acc + (item.supplierCost * item.quantity), 0);
    const grossProfit = finalAmount - totalCost;

    const newOrder = {
      id: orderId,
      customer: customerDetails,
      items: orderItems,
      totalAmount: parseFloat(finalAmount.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      grossProfit: parseFloat(grossProfit.toFixed(2)),
      status: 'Pending Sourcing',
      shippingCarrier: shippingOption === 'express' ? 'Priority Air Freight (YunExpress)' : 'Standard ePacket Tracking',
      trackingNumber: null,
      placedAt: new Date().toISOString(),
      supplierPlatform: 'CJ Dropshipping',
      autoFulfillEligible: true,
      trackingSteps: [
        { stage: 'Order Placed', completed: true, timestamp: 'Just now', desc: 'Customer order verified & payment authorized.' },
        { stage: 'Supplier Sourced', completed: false, timestamp: 'Pending', desc: 'Automatic dropship PO queuing with vendor warehouse.' },
        { stage: 'Carrier Dispatched', completed: false, timestamp: 'Pending', desc: 'Assigned to international cargo flight.' },
        { stage: 'In Transit', completed: false, timestamp: 'Pending', desc: 'Customs cleared & regional sorting.' },
        { stage: 'Delivered', completed: false, timestamp: 'Pending', desc: 'Final mile delivery to doorstep.' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock in storefront
    setStorefrontProducts(prev =>
      prev.map(p => {
        const orderedItem = cart.find(c => c.product.id === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    clearCart();
    setCheckoutOpen(false);
    showToast(`Order #${orderId} confirmed! Forwarded to Dropship Fulfillment queue.`, 'success');
    return newOrder;
  };

  // Dropship Admin: 1-Click Import from Sourcing Hub
  const importToStorefront = (sourcingItem, customRetailPrice) => {
    const finalPrice = customRetailPrice || parseFloat((sourcingItem.supplierCost * settings.defaultMarkup + sourcingItem.shippingCost).toFixed(2));

    const newStoreProduct = {
      id: `prod-${Date.now()}`,
      title: sourcingItem.title,
      tagline: sourcingItem.description,
      category: sourcingItem.category,
      price: finalPrice,
      compareAtPrice: parseFloat((finalPrice * 1.45).toFixed(2)),
      supplierCost: sourcingItem.supplierCost,
      shippingCost: sourcingItem.shippingCost,
      rating: sourcingItem.supplierRating,
      reviewsCount: Math.floor(Math.random() * 80) + 12,
      stock: Math.min(sourcingItem.stockAvailable, 150),
      shippingDays: sourcingItem.shippingTime,
      badge: 'New Import',
      images: [sourcingItem.image],
      variants: [
        { name: "Model / Style", options: ["Standard Edition", "Premium Pro Edition"] }
      ],
      description: sourcingItem.description,
      features: sourcingItem.features,
      supplier: {
        name: sourcingItem.supplierName,
        platform: sourcingItem.platform,
        sku: `IMP-${Math.floor(1000 + Math.random() * 9000)}`,
        warehouse: "Shenzhen / Domestic Cross-dock"
      }
    };

    setStorefrontProducts(prev => [newStoreProduct, ...prev]);
    // remove or mark from sourcing catalog
    setSourcingCatalog(prev => prev.filter(item => item.id !== sourcingItem.id));
    showToast(`Imported "${sourcingItem.title}" to Storefront at $${finalPrice}!`, 'success');
  };

  // Dropship Admin: Auto-Fulfill with Supplier
  const fulfillOrder = (orderId) => {
    const carrierPrefix = ['YNX', 'CJP', 'USPS', 'DHL'][Math.floor(Math.random() * 4)];
    const generatedTracking = `${carrierPrefix}${Math.floor(100000000 + Math.random() * 900000000)}`;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'In Transit',
            trackingNumber: generatedTracking,
            autoFulfillEligible: false,
            trackingSteps: [
              { stage: 'Order Placed', completed: true, timestamp: 'Completed', desc: 'Order placed & payment authorized.' },
              { stage: 'Supplier Sourced', completed: true, timestamp: 'Just now', desc: 'Automated PO sent to supplier. Stock reserved.' },
              { stage: 'Carrier Dispatched', completed: true, timestamp: 'In progress', desc: `Handed to ${ord.shippingCarrier}. Airway bill #${generatedTracking}.` },
              { stage: 'In Transit', completed: true, timestamp: 'Active', desc: 'En route to destination country airport hub.' },
              { stage: 'Delivered', completed: false, timestamp: 'Est. 4-6 days', desc: 'Out for final doorstep delivery.' }
            ]
          };
        }
        return ord;
      })
    );

    // Update supplier balance
    setSuppliers(prev =>
      prev.map(s => {
        if (s.name.includes('CJ') || s.name.includes('Global')) {
          const current = parseFloat(s.balance.replace(/[^0-9.-]+/g, '')) || 2000;
          return { ...s, balance: `$${(current - 29.50).toFixed(2)}` };
        }
        return s;
      })
    );

    showToast(`Order #${orderId} fulfilled! Carrier Tracking #${generatedTracking} assigned.`, 'success');
  };

  // Overall Business Metrics
  const metrics = {
    grossRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    totalCost: orders.reduce((sum, o) => sum + o.totalCost, 0),
    netProfit: orders.reduce((sum, o) => sum + o.grossProfit, 0),
    ordersCount: orders.length,
    pendingFulfillmentCount: orders.filter(o => o.status === 'Pending Sourcing').length,
    inTransitCount: orders.filter(o => o.status === 'In Transit').length,
    deliveredCount: orders.filter(o => o.status === 'Delivered').length,
    activeCatalogCount: storefrontProducts.length,
    averageOrderValue: orders.length ? (orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length) : 0
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        adminTab,
        setAdminTab,
        storeTab,
        setStoreTab,
        storefrontProducts,
        sourcingCatalog,
        orders,
        suppliers,
        cart,
        cartOpen,
        setCartOpen,
        checkoutOpen,
        setCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        trackingLookupId,
        setTrackingLookupId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        settings,
        setSettings,
        toast,
        showToast,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemsCount,
        placeOrder,
        importToStorefront,
        fulfillOrder,
        metrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

