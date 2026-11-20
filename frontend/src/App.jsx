import React from 'react';
import { useApp } from './context/AppContext';

// Common Components
import TopNavRoleSwitcher from './components/common/TopNavRoleSwitcher';
import Toast from './components/common/Toast';
import WishlistDrawer from './components/common/WishlistDrawer';

// Storefront Components
import StoreNavbar from './components/storefront/StoreNavbar';
import StoreHomeView from './components/storefront/StoreHomeView';
import StoreCatalogView from './components/storefront/StoreCatalogView';
import StoreFooter from './components/storefront/StoreFooter';
import OrderTrackingView from './components/storefront/OrderTrackingView';
import ProductDetailModal from './components/storefront/ProductDetailModal';
import CartDrawer from './components/storefront/CartDrawer';
import CheckoutModal from './components/storefront/CheckoutModal';

// Admin Components
import AdminSidebar from './components/admin/AdminSidebar';
import DashboardView from './components/admin/DashboardView';
import SourcingView from './components/admin/SourcingView';
import OrdersFulfillmentView from './components/admin/OrdersFulfillmentView';
import SuppliersView from './components/admin/SuppliersView';
import ProfitCalculatorView from './components/admin/ProfitCalculatorView';
import SettingsView from './components/admin/SettingsView';

export default function App() {
  const { activeView, adminTab, storeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] font-sans text-slate-900 selection:bg-slate-950 selection:text-white">
      {/* Top Demo & Role Switcher Banner */}
      <TopNavRoleSwitcher />

      {/* Toast Notification Container */}
      <Toast />

      {/* Render Active View */}
      {activeView === 'store' ? (
        /* CUSTOMER STOREFRONT LAYOUT */
        <div className="flex-1 flex flex-col">
          <StoreNavbar />

          <main className="flex-1">
            {storeTab === 'home' && <StoreHomeView />}
            {storeTab === 'catalog' && <StoreCatalogView />}
            {storeTab === 'track' && <OrderTrackingView />}
          </main>

          {/* Premium Obsidian Jet-Black Storefront Footer */}
          <StoreFooter />

          {/* Modals & Slide-Overs */}
          <ProductDetailModal />
          <CartDrawer />
          <WishlistDrawer />
          <CheckoutModal />
        </div>
      ) : (
        /* DROPSHIPPING MERCHANT MANAGEMENT ADMIN LAYOUT */
        <div className="flex-1 flex min-h-[calc(100vh-2.5rem)]">
          <AdminSidebar />

          <main className="flex-1 bg-slate-50/70 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {adminTab === 'dashboard' && <DashboardView />}
              {adminTab === 'sourcing' && <SourcingView />}
              {adminTab === 'orders' && <OrdersFulfillmentView />}
              {adminTab === 'suppliers' && <SuppliersView />}
              {adminTab === 'calculator' && <ProfitCalculatorView />}
              {adminTab === 'settings' && <SettingsView />}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
