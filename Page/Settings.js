import React, { useState } from 'react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample user profile data
  const [profile, setProfile] = useState({
    name: "Terry Smith",
    email: "terry@towtruckmanager.com",
    phone: "(555) 987-6543",
    position: "Administrator",
    avatar: "",
    notifyEmail: true,
    notifySMS: true,
    notifyApp: true,
    theme: "light",
    language: "english"
  });

  // Sample company data
  const [company, setCompany] = useState({
    name: "Premier Towing & Recovery",
    address: "1234 Tow Road, Houston, TX 77001",
    phone: "(555) 123-4567",
    email: "dispatch@premiertowing.com",
    website: "www.premiertowing.com",
    taxId: "12-3456789",
    licenseNumber: "TX-987654321",
    logo: "",
    operatingHours: "24/7"
  });

  // System settings
  const [system, setSystem] = useState({
    dispatchAutoAssign: true,
    requireInspectionPhotos: true,
    autoNotifyCustomers: true,
    distanceUnit: "miles",
    weightUnit: "pounds",
    currencyFormat: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    autoLogout: 30,
    dataRetention: 12
  });

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value
    });
  };

  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystem({
      ...system,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      
      // Reset the "saved" notification after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };

  const handleTestSMS = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Test SMS sent successfully!");
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Settings</h1>
        {saved && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 rounded">
            <p className="text-sm flex items-center">
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Settings saved successfully!
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-700">Settings Menu</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              <li>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    User Profile
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notifications
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('company')}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${activeTab === 'company' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Company Info
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('system')}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${activeTab === 'system' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    System Settings
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('integrations')}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${activeTab === 'integrations' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    Integrations
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    User Management
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
                  <p className="text-gray-600 text-sm">Manage your personal information and preferences</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center mb-6">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-gray-500 text-3xl">{profile.name.charAt(0)}</span>
                        )}
                        <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                          <input
                            type="text"
                            name="position"
                            value={profile.position}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Appearance & Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select
                          name="language"
                          value={profile.language}
                          onChange={handleProfileChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                        <select
                          name="theme"
                          value={profile.theme}
                          onChange={handleProfileChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System Default</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="••••••••"
                        />
                      </div>
                      <div></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
                  <p className="text-gray-600 text-sm">Configure how and when you receive notifications</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="notifyEmail"
                              checked={profile.notifyEmail}
                              onChange={handleProfileChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <div className="flex items-center">
                          <button 
                            type="button"
                            onClick={handleTestSMS}
                            className="text-sm text-blue-600 hover:text-blue-800 mr-4"
                          >
                            Test SMS
                          </button>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="notifySMS"
                              checked={profile.notifySMS}
                              onChange={handleProfileChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">In-App Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications within the application</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="notifyApp"
                              checked={profile.notifyApp}
                              onChange={handleProfileChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Types</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th className="px-6 py-3">Event Type</th>
                            <th className="px-6 py-3 text-center">Email</th>
                            <th className="px-6 py-3 text-center">SMS</th>
                            <th className="px-6 py-3 text-center">In-App</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium">New Job Assignment</td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium">Job Status Updates</td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium">Inspection Reminders</td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium">License Expirations</td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-medium">System Alerts</td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" checked />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Preferences</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Company Info Settings */}
            {activeTab === 'company' && (
              <div>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
                  <p className="text-gray-600 text-sm">Manage your company details and branding</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center mb-6">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center relative">
                        {company.logo ? (
                          <img src={company.logo} alt="Company Logo" className="w-full h-full rounded-lg object-contain" />
                        ) : (
                          <span className="text-gray-500 text-sm">Company Logo</span>
                        )}
                        <button className="absolute bottom-2 right-2 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Recommended size: 512x512px</p>
                    </div>
                    <div className="md:w-3/4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                          <input
                            type="text"
                            name="name"
                            value={company.name}
                            onChange={handleCompanyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                          <input
                            type="text"
                            name="operatingHours"
                            value={company.operatingHours}
                            onChange={handleCompanyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={company.phone}
                            onChange={handleCompanyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={company.email}
                            onChange={handleCompanyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                          <input
                            type="text"
                            name="website"
                            value={company.website}
                            onChange={handleCompanyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={company.address}
                            onChange={handleCompanyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / EIN</label>
                        <input
                          type="text"
                          name="taxId"
                          value={company.taxId}
                          onChange={handleCompanyChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={company.licenseNumber}
                          onChange={handleCompanyChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Email Signature</h3>
                    <div className="bg-gray-50 p-4 mb-4 rounded-lg">
                      <p className="text-gray-700 mb-2">Preview:</p>
                      <div className="border border-gray-300 p-4 bg-white rounded">
                        <p className="font-medium">Best regards,</p>
                        <p className="font-medium">{profile.name}</p>
                        <p>{profile.position}</p>
                        <p className="text-gray-600">{company.name}</p>
                        <p className="text-gray-600">{company.phone}</p>
                        <p className="text-blue-600">{company.website}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Custom Signature HTML</label>
                      <textarea
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                        placeholder="<p>Your custom HTML signature here</p>"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Company Info</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">System Settings</h2>
                  <p className="text-gray-600 text-sm">Configure system-wide preferences and options</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                        <select
                          name="dateFormat"
                          value={system.dateFormat}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                        <select
                          name="timeFormat"
                          value={system.timeFormat}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="12h">12-hour (AM/PM)</option>
                          <option value="24h">24-hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Distance Unit</label>
                        <select
                          name="distanceUnit"
                          value={system.distanceUnit}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="miles">Miles</option>
                          <option value="kilometers">Kilometers</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight Unit</label>
                        <select
                          name="weightUnit"
                          value={system.weightUnit}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="pounds">Pounds (lbs)</option>
                          <option value="kilograms">Kilograms (kg)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency Format</label>
                        <select
                          name="currencyFormat"
                          value={system.currencyFormat}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD ($)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Auto Logout (minutes)</label>
                        <input
                          type="number"
                          name="autoLogout"
                          value={system.autoLogout}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          min="0"
                          step="5"
                        />
                        <p className="mt-1 text-xs text-gray-500">0 to disable auto logout</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Dispatch System</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Automatic Driver Assignment</p>
                          <p className="text-sm text-gray-500">Automatically assign jobs to the nearest available driver</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="dispatchAutoAssign"
                              checked={system.dispatchAutoAssign}
                              onChange={handleSystemChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Require Photos for Inspections</p>
                          <p className="text-sm text-gray-500">Require photo evidence for vehicle inspections</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="requireInspectionPhotos"
                              checked={system.requireInspectionPhotos}
                              onChange={handleSystemChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Automatic Customer Notifications</p>
                          <p className="text-sm text-gray-500">Automatically notify customers of job status changes</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="autoNotifyCustomers"
                              checked={system.autoNotifyCustomers}
                              onChange={handleSystemChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Data & Privacy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention Period (months)</label>
                        <input
                          type="number"
                          name="dataRetention"
                          value={system.dataRetention}
                          onChange={handleSystemChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          min="1"
                          max="36"
                        />
                        <p className="mt-1 text-xs text-gray-500">How long to keep historical data</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Export All Company Data
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save System Settings</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Integrations</h2>
                  <p className="text-gray-600 text-sm">Connect with other services and platforms</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center p-4 bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">SMS Provider</h3>
                            <p className="text-sm text-gray-500">Configure text message notifications</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Connected</span>
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md">
                              <option>Twilio</option>
                              <option>Nexmo</option>
                              <option>MessageBird</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <div className="flex items-center">
                              <span className="flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                              </span>
                              Active
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Configure API Keys
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center p-4 bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Email Provider</h3>
                            <p className="text-sm text-gray-500">Configure email delivery service</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Connected</span>
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md">
                              <option>SendGrid</option>
                              <option>Mailgun</option>
                              <option>Amazon SES</option>
                              <option>SMTP</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <div className="flex items-center">
                              <span className="flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                              </span>
                              Active
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Configure Settings
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center p-4 bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Payment Gateway</h3>
                            <p className="text-sm text-gray-500">Process payments and invoices</p>
                          </div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Setup Required</span>
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <div className="text-center py-4">
                          <p className="text-gray-600 mb-3">Connect your payment processor to accept credit card payments</p>
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                            Set Up Payment Integration
                          </button>
                        </div>
                      </div>
                
