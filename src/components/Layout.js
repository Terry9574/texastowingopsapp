import React from "react";
import { Link } from "react-router-dom";
import { 
  Home,
  Book,
  ClipboardList,
  FileText,
  AlertTriangle,
  Users,
  Building2,
  Truck,
  DollarSign,
  Car,
  CreditCard,
  Route,
  Ticket,
  LogOut,
  Menu
} from "lucide-react";

// Function to create page URLs
const createPageUrl = (pageName) => `/${pageName.toLowerCase()}`;

const navItems = [
  { href: "Home", icon: Home, label: "Dashboard", role: ["all"] },
  { href: "Handbook", icon: Book, label: "Handbook", role: ["all"] },
  { href: "TrainingLogs", icon: ClipboardList, label: "Training Logs", role: ["all"] },
  { href: "DailyInspections", icon: ClipboardList, label: "Daily Inspections", role: ["all"] },
  { href: "IncidentReports", icon: AlertTriangle, label: "Incident Reports", role: ["all"] },
  { href: "LicenseVault", icon: FileText, label: "License Vault", role: ["all"] },
  { type: "divider", label: "Operations", role: ["all"] },
  { href: "JobTickets", icon: Ticket, label: "Driver Calls", role: ["all"] },
  { href: "DispatchLog", icon: Route, label: "Dispatch System", role: ["all"] },
  { href: "ImpoundLogs", icon: Car, label: "Storage Lot", role: ["all"] },
  { href: "CustomerBilling", icon: CreditCard, label: "Customer Billing", role: ["all"] },
  { type: "divider", label: "Company", role: ["all"] },
  { href: "CompanyManagement", icon: Building2, label: "Company Management", role: ["all"] },
  { href: "DriverScorecard", icon: Users, label: "Driver Scorecard", role: ["all"] },
];

export default function Layout({ children }) {
  // Mock user data for demo purposes
  const user = {
    full_name: "Demo User",
    custom_role: "owner",
    email: "demo@texastowingops.com"
  };
  
  const logoUrl = "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=100&h=100&fit=crop&crop=center";
  const companyName = "Texas Towing Ops";
  const currentPath = window.location.pathname;

  const renderNavLinks = () => (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item, index) => {
        if (item.type === 'divider') {
          return <div key={`divider-${index}`} className="my-2 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase px-4 pt-2 block">{item.label}</span>
          </div>;
        }
        
        const pageUrl = createPageUrl(item.href);
        const isActive = currentPath === pageUrl;
        
        return (
          <Link
            key={item.href}
            to={pageUrl}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-700 hover:bg-blue-100/50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar navigation - desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-shrink-0 flex-col">
        <div className="p-4 border-b">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img src={logoUrl} alt="Company Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-lg font-bold text-slate-800">{companyName}</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {renderNavLinks()}
        </div>
        
        <div className="border-t border-slate-200 p-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.full_name}</p>
              <p className="text-xs text-slate-500 truncate">{user.custom_role}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          
          <button className="w-full px-4 py-2 flex items-center gap-2 text-slate-700 hover:text-red-600 border border-slate-200 rounded-lg hover:border-red-300">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile header with menu */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-10">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <img src={logoUrl} alt="Company Logo" className="w-8 h-8 rounded-md" />
            <span className="text-md font-bold text-slate-800">{companyName}</span>
          </Link>
          
          <button className="p-2 rounded-lg hover:bg-slate-100">
            <Menu className="w-6 h-6" />
          </button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
