import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStoreProducts, initialSourcingCatalog, initialOrders, initialSuppliers } from '../data/initialData';
import { api } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & View State
  const [activeView, setActiveView] = useState('store'); // 'store' | 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'sourcing' | 'orders' | 'suppliers' | 'calculator' | 'settings'
  const [storeTab, setStoreTab] = useState('home'); // 'home' | 'catalog' | 'track'

  // Catalog & Inventory State (using v3 keys for rich reviews & specs)
  const [storefrontProducts, setStorefrontProducts] = useState(() => {
    const saved = localStorage.getItem('aura_inr_store_products_v3');
    return saved ? JSON.parse(saved) : initialStoreProducts;
  });

  const [sourcingCatalog, setSourcingCatalog] = useState(() => {
    const saved = localStorage.getItem('aura_inr_sourcing_catalog_v3');
    return saved ? JSON.parse(saved) : initialSourcingCatalog;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aura_inr_orders_v3');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Suppliers State
  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('aura_inr_suppliers_v3');
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  // Storefront Shopping Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_inr_cart_v3');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aura_inr_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // User Delivery Pincode State
  const [userPincode, setUserPincode] = useState(() => {
    return localStorage.getItem('aura_user_pincode') || '560038';
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackingLookupId, setTrackingLookupId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Automation / Markup Settings
  const [settings, setSettings] = useState({
    defaultMarkup: 2.2, // 220% multiplier
    autoFulfillEnabled: true,
    currencySymbol: '₹',
    currencyCode: 'INR',
    lowStockThreshold: 15,
    expressShippingRate: 199,
    standardShippingRate: 0,
    codFee: 49,
    prepaidDiscount: 100
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
    localStorage.setItem('aura_inr_store_products_v3', JSON.stringify(storefrontProducts));
  }, [storefrontProducts]);

  useEffect(() => {
    localStorage.setItem('aura_inr_sourcing_catalog_v3', JSON.stringify(sourcingCatalog));
  }, [sourcingCatalog]);

  useEffect(() => {
    localStorage.setItem('aura_inr_orders_v3', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_inr_cart_v3', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_inr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_user_pincode', userPincode);
  }, [userPincode]);

  // Connect & Sync with ASP.NET Core Web API + MySQL Backend
  useEffect(() => {
    let isMounted = true;
    async function syncBackendData() {
      try {
        const remoteProducts = await api.getProducts({}, null);
        if (remoteProducts && Array.isArray(remoteProducts) && remoteProducts.length > 0 && isMounted) {
          setStorefrontProducts(remoteProducts);
        }
        const remoteOrders = await api.getAdminOrders('All', '', null);
        if (remoteOrders && Array.isArray(remoteOrders) && remoteOrders.length > 0 && isMounted) {
          setOrders(remoteOrders);
        }
        const remoteSettings = await api.getSettings(null);
        if (remoteSettings && isMounted) {
          setSettings(prev => ({ ...prev, ...remoteSettings }));
        }
      } catch (e) {
        // Fallback is automatically handled
      }
    }
    syncBackendData();
    return () => { isMounted = false; };
  }, []);

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from Wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved "${product.title}" to Wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Pincode Delivery Resolver
  const resolvePincode = (code) => {
    const cleanCode = code ? code.trim() : '';
    if (!/^\d{6}$/.test(cleanCode)) {
      return { valid: false, error: 'Please enter a valid 6-digit Indian PIN code' };
    }

    const prefix = cleanCode.substring(0, 2);
    let city = 'Metro Hub';
    let state = 'India';
    let days = '2-3 days';

    if (prefix === '56') { city = 'Bengaluru'; state = 'Karnataka'; days = 'Next Day Delivery (Local Hub)'; }
    else if (prefix === '40') { city = 'Mumbai'; state = 'Maharashtra'; days = '2 business days'; }
    else if (prefix === '11') { city = 'Delhi NCR'; state = 'Delhi'; days = '2 business days'; }
    else if (prefix === '50') { city = 'Hyderabad'; state = 'Telangana'; days = '2-3 business days'; }
    else if (prefix === '60') { city = 'Chennai'; state = 'Tamil Nadu'; days = '2-3 business days'; }
    else if (prefix === '70') { city = 'Kolkata'; state = 'West Bengal'; days = '3 business days'; }
    else if (prefix === '41') { city = 'Pune'; state = 'Maharashtra'; days = '2 business days'; }
    else if (prefix === '38') { city = 'Ahmedabad'; state = 'Gujarat'; days = '2-3 business days'; }
    else { city = 'Regional Postal Zone'; state = 'India'; days = '3-5 business days'; }

    return {
      valid: true,
      pincode: cleanCode,
      city,
      state,
      estimatedDelivery: days,
      codAvailable: true,
      freeDelivery: true
    };
  };

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
  const placeOrder = (customerDetails, shippingOption, paymentMethod = 'upi') => {
    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ORD-${orderNum}`;
    const shippingFee = shippingOption === 'express' ? settings.expressShippingRate : settings.standardShippingRate;
    
    // Prepaid gets ₹100 discount, COD gets ₹49 fee
    const paymentAdjustment = paymentMethod === 'cod' ? settings.codFee : (paymentMethod === 'upi' ? -settings.prepaidDiscount : 0);
    const finalAmount = Math.max(0, cartSubtotal + shippingFee + paymentAdjustment);

    const orderItems = cart.map(item => ({
      id: item.product.id,
      title: item.product.title,
      variant: Object.values(item.variantOptions).join(' / ') || 'Default',
      quantity: item.quantity,
      retailPrice: item.product.price,
      supplierCost: item.product.supplierCost || (item.product.price * 0.4),
      supplierSku: item.product.supplier?.sku || `SKU-${item.product.id}`,
      image: item.product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    }));

    const totalCost = orderItems.reduce((acc, item) => acc + (item.supplierCost * item.quantity), 0);
    const grossProfit = finalAmount - totalCost;

    const newOrder = {
      id: orderId,
      customer: customerDetails,
      items: orderItems,
      totalAmount: Math.round(finalAmount),
      totalCost: Math.round(totalCost),
      grossProfit: Math.round(grossProfit),
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'Pending Sourcing',
      shippingCarrier: shippingOption === 'express' ? 'BlueDart Air Express' : 'Delhivery Surface Tracked',
      trackingNumber: null,
      placedAt: new Date().toISOString(),
      supplierPlatform: 'CJ Dropshipping',
      autoFulfillEligible: true,
      trackingSteps: [
        { stage: 'Order Placed', completed: true, timestamp: 'Just now', desc: `Customer order confirmed via ${paymentMethod.toUpperCase()}. Payment verified.` },
        { stage: 'Supplier Sourced', completed: false, timestamp: 'Pending', desc: 'Automatic dropship PO queuing with vendor warehouse.' },
        { stage: 'Carrier Dispatched', completed: false, timestamp: 'Pending', desc: 'Assigned to line-haul transit flight/van.' },
        { stage: 'In Transit', completed: false, timestamp: 'Pending', desc: 'Regional hub arrival & sorting.' },
        { stage: 'Delivered', completed: false, timestamp: 'Pending', desc: 'Final doorstep delivery by field courier.' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Dispatch to ASP.NET Core backend API
    api.createOrder({
      customer: {
        name: customerDetails.name,
        phone: customerDetails.phone || '+91 98450 12345',
        email: customerDetails.email || 'customer@example.com',
        address: customerDetails.address || '',
        pincode: userPincode,
        city: 'Bengaluru',
        state: 'Karnataka'
      },
      items: orderItems.map(i => ({
        productId: typeof i.product.id === 'number' ? i.product.id : 1,
        quantity: i.quantity,
        selectedVariants: i.variants || {}
      })),
      shippingOption,
      paymentMethod,
      paymentDetails
    }).catch(() => {});

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
    showToast(`Order #${orderId} placed via ${paymentMethod.toUpperCase()}! Synced to Merchant OS.`, 'success');
    return newOrder;
  };

  // Dropship Admin: 1-Click Import from Sourcing Hub
  const importToStorefront = (sourcingItem, customRetailPrice) => {
    const finalPrice = customRetailPrice || Math.round(sourcingItem.supplierCost * settings.defaultMarkup + sourcingItem.shippingCost);

    const newStoreProduct = {
      id: `prod-${Date.now()}`,
      title: sourcingItem.title,
      tagline: sourcingItem.description,
      category: sourcingItem.category,
      price: finalPrice,
      compareAtPrice: Math.round(finalPrice * 1.5),
      supplierCost: sourcingItem.supplierCost,
      shippingCost: sourcingItem.shippingCost,
      rating: sourcingItem.supplierRating,
      reviewsCount: Math.floor(Math.random() * 80) + 12,
      stock: Math.min(sourcingItem.stockAvailable, 150),
      hubLocation: "Bengaluru Logistics Hub",
      shippingDays: sourcingItem.shippingTime,
      badge: 'New Import',
      viewersCount: Math.floor(Math.random() * 20) + 5,
      images: [
        sourcingItem.image,
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
      ],
      variants: [
        { name: "Model / Style", options: ["Standard Edition", "Premium Pro Edition"] }
      ],
      description: sourcingItem.description,
      features: sourcingItem.features,
      specs: {
        "Origin": "Verified Overseas OEM",
        "Lead Time": sourcingItem.shippingTime,
        "Warranty": "1-Year Manufacturer Replacement Warranty",
        "Material": "Certified Grade Components"
      },
      inTheBox: [
        sourcingItem.title,
        "USB Fast Charging Cable",
        "Warranty & User Documentation"
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: "Sameer Verma",
          location: "Indiranagar, Bengaluru",
          verified: true,
          rating: 5,
          date: "Yesterday",
          title: "Surpassed all expectations!",
          comment: "High build quality, shipped quickly. Very happy with this direct factory purchase.",
          helpful: 12
        }
      ],
      supplier: {
        name: sourcingItem.supplierName,
        platform: sourcingItem.platform,
        sku: `IMP-${Math.floor(1000 + Math.random() * 9000)}`,
        warehouse: "Bengaluru / Domestic Cross-dock"
      }
    };

    setStorefrontProducts(prev => [newStoreProduct, ...prev]);
    setSourcingCatalog(prev => prev.filter(item => item.id !== sourcingItem.id));
    
    // Dispatch to ASP.NET Core backend API
    api.importSourcingItem(sourcingItem.id, finalPrice).catch(() => {});

    showToast(`Imported "${sourcingItem.title}" to Storefront at ₹${finalPrice.toLocaleString('en-IN')}!`, 'success');
  };

  // Dropship Admin: Auto-Fulfill with Supplier
  const fulfillOrder = (orderId) => {
    const carrierPrefix = ['BLU', 'DLV', 'EXPR', 'SHP'][Math.floor(Math.random() * 4)];
    const generatedTracking = `${carrierPrefix}${Math.floor(100000000 + Math.random() * 900000000)}IN`;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'In Transit',
            trackingNumber: generatedTracking,
            autoFulfillEligible: false,
            trackingSteps: [
              { stage: 'Order Placed', completed: true, timestamp: 'Completed', desc: `Verified via ${ord.paymentMethod || 'UPI'}.` },
              { stage: 'Supplier Sourced', completed: true, timestamp: 'Just now', desc: 'Automated PO sent to supplier. Stock reserved.' },
              { stage: 'Carrier Dispatched', completed: true, timestamp: 'In progress', desc: `Handed to ${ord.shippingCarrier}. Docket #${generatedTracking}.` },
              { stage: 'In Transit', completed: true, timestamp: 'Active', desc: 'En route to destination city sorting hub.' },
              { stage: 'Delivered', completed: false, timestamp: 'Est. 2-4 days', desc: 'Out for final doorstep delivery.' }
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
          const current = parseInt(s.balance.replace(/[^0-9]/g, '')) || 185000;
          return { ...s, balance: `₹${(current - 1999).toLocaleString('en-IN')}` };
        }
        return s;
      })
    );

    // Dispatch fulfillment to ASP.NET Core backend API
    api.fulfillOrder(orderId).catch(() => {});

    showToast(`Order #${orderId} fulfilled! Assigned Docket #${generatedTracking}.`, 'success');
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
        wishlist,
        wishlistOpen,
        setWishlistOpen,
        toggleWishlist,
        isWishlisted,
        userPincode,
        setUserPincode,
        resolvePincode,
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
