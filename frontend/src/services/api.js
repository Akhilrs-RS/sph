/**
 * Aura API Client Service
 * Connects React frontend with ASP.NET Core Web API + MySQL backend.
 * Includes graceful offline fallback to local state if the backend server is starting up.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchWithFallback(endpoint, options = {}, fallbackFn = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second timeout for responsive fallback

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    if (fallbackFn) {
      // Graceful offline fallback
      console.warn(`[Aura API] Backend offline at ${API_BASE_URL}${endpoint}. Using local state fallback.`, err.message);
      return await fallbackFn();
    }
    throw err;
  }
}

export const api = {
  // Storefront Products & Catalog
  getProducts: async ({ category, search, sortBy } = {}, fallbackData = null) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return fetchWithFallback(`/products${queryStr}`, { method: 'GET' }, () => fallbackData);
  },

  getFeaturedProducts: async (fallbackData = null) => {
    return fetchWithFallback('/products/featured', { method: 'GET' }, () => fallbackData);
  },

  getProductById: async (id, fallbackData = null) => {
    return fetchWithFallback(`/products/${id}`, { method: 'GET' }, () => fallbackData);
  },

  getAutocomplete: async (query, fallbackData = null) => {
    return fetchWithFallback(`/products/autocomplete?q=${encodeURIComponent(query || '')}`, { method: 'GET' }, () => fallbackData);
  },

  // Customer Reviews
  addReview: async (productId, reviewData, fallbackFn = null) => {
    return fetchWithFallback(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    }, fallbackFn);
  },

  markReviewHelpful: async (reviewId) => {
    return fetchWithFallback(`/products/reviews/${reviewId}/helpful`, {
      method: 'POST'
    }, () => ({ helpful: 1 }));
  },

  // Indian Pincode Resolver
  checkPincode: async (pincode, fallbackFn = null) => {
    return fetchWithFallback(`/pincode/${pincode}`, { method: 'GET' }, fallbackFn);
  },

  // Orders & Fulfillment
  createOrder: async (orderPayload, fallbackFn = null) => {
    return fetchWithFallback('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    }, fallbackFn);
  },

  trackOrder: async (lookupId, fallbackFn = null) => {
    return fetchWithFallback(`/orders/track/${encodeURIComponent(lookupId)}`, { method: 'GET' }, fallbackFn);
  },

  // Merchant Dropship OS (Admin)
  getAdminMetrics: async (fallbackData = null) => {
    return fetchWithFallback('/admin/metrics', { method: 'GET' }, () => fallbackData);
  },

  getAdminOrders: async (statusFilter, searchTerm, fallbackData = null) => {
    const params = new URLSearchParams();
    if (statusFilter && statusFilter !== 'All') params.append('status', statusFilter);
    if (searchTerm) params.append('search', searchTerm);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return fetchWithFallback(`/admin/orders${queryStr}`, { method: 'GET' }, () => fallbackData);
  },

  fulfillOrder: async (orderId, fallbackFn = null) => {
    return fetchWithFallback(`/admin/orders/${orderId}/fulfill`, {
      method: 'POST'
    }, fallbackFn);
  },

  getSourcingCatalog: async (platformFilter, fallbackData = null) => {
    const queryStr = platformFilter && platformFilter !== 'All' ? `?platform=${encodeURIComponent(platformFilter)}` : '';
    return fetchWithFallback(`/admin/sourcing${queryStr}`, { method: 'GET' }, () => fallbackData);
  },

  importSourcingItem: async (sourcingItemId, customRetailPrice, fallbackFn = null) => {
    return fetchWithFallback('/admin/sourcing/import', {
      method: 'POST',
      body: JSON.stringify({ sourcingItemId, customRetailPrice })
    }, fallbackFn);
  },

  extractFromUrl: async (urlOrSku, fallbackFn = null) => {
    return fetchWithFallback('/admin/sourcing/extract-url', {
      method: 'POST',
      body: JSON.stringify({ urlOrSku })
    }, fallbackFn);
  },

  getSuppliers: async (fallbackData = null) => {
    return fetchWithFallback('/admin/suppliers', { method: 'GET' }, () => fallbackData);
  },

  getSettings: async (fallbackData = null) => {
    return fetchWithFallback('/admin/settings', { method: 'GET' }, () => fallbackData);
  },

  updateSettings: async (settingsData, fallbackFn = null) => {
    return fetchWithFallback('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    }, fallbackFn);
  }
};

