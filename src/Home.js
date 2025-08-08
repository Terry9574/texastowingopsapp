import React from 'react';
import { Link } from 'react-router-dom';

// Icons using emoji for simplicity
const icons = {
  handbook: "📖",
  training: "🎓",
  inspections: "🔍", 
  incident: "⚠️",
  inventory: "🚚",
  dispatch: "📻",
  impound: "🏢",
  billing: "💰"
};

function Home({ user }) {
  // Feature groups
  const operationsGroup = [
    { title: "Dispatch System", url: "/dispatch", icon: icons.dispatch, description: "Task info & assignments", color: "bg-slate-600" },
    { title: "Driver Calls", url: "/drivercalls", icon: "📝", description: "Service records & completion", color: "bg-gray-600" },
    { title: "Impound Facility", url: "/impound", icon: icons.impound, description: "Vehicle impound documentation", color: "bg-slate-700" },
    { title: "Customer Billing", url: "/billing", icon: icons.billing, description: "Manage customers and invoices", color: "bg-green-700" },
  ];

  const complianceGroup = [
    { title: "Handbook", url: "/handbook", icon: icons.handbook, description: "Safety protocols & procedures", color: "bg-blue-600" },
    { title: "Daily Inspections", url: "/inspections", icon: icons.inspections, description: "Vehicle safety checks", color: "bg-orange-600" },
    { title: "Incident Reports", url: "/incidentreports", icon: icons.incident, description: "Report safety incidents", color: "bg-red-600" },
    { title: "Tow Truck Inventory", url: "/inventory", icon: icons.inventory, description: "Manage equipment", color: "bg-blue-700" },
  ];

  // Feature section component
  const FeatureSection = ({ title, features, icon }) => (
    <div className="space-y-4">
      <div className="bg-slate-100/80 backdrop-blur-sm rounded-lg px-4 py-3 border-l-4 border-blue-600 flex items-center gap-3">
        <span className="w-6 h-6 text-blue-700">{icon}</span>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Link 
            key={feature.title} 
            to={feature.url}
            className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="p-4 flex flex-col items-center text-center h-full justify-center">
              <div className={`mb-3 w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-tight">{feature.title}</h3>
              <p className="text-xs text-slate-500 flex-grow">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header with company info */}
        <div
          className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#1e3a8a' }}
        >
          <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10">
            <span className="text-7xl">🚚</span>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {user?.logo_url ? (
                <img src={user.logo_url} alt={`${user.company_name} Logo`} className="h-16 w-16 object-contain bg-white/90 p-2 rounded-lg" />
              ) : (
                <div className="h-16 w-16 bg-white/90 p-2 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🚚</span>
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{user?.company_name || 'Texas Towing Ops'}</h1>
                <p className="text-lg opacity-90">Professional Handbook & Operations</p>
                <p className="text-sm opacity-75 mt-1">Version 1.0.0</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">{user?.full_name || 'User'}</p>
                <p className="text-sm opacity-80">{user?.custom_role || 'Admin'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Sections */}
        <FeatureSection title="🚚 Operations" features={operationsGroup} icon="🚚" />
        <FeatureSection title="📋 Compliance" features={complianceGroup} icon="📋" />
      </div>
    </div>
  );
}

export default Home;
