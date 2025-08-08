import React, { useState } from 'react';

function ResourceLibrary() {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Texas Towing Laws & Regulations Guide",
      type: "PDF",
      category: "Legal",
      description: "Comprehensive guide on Texas state towing regulations and compliance",
      uploadedBy: "Michael Johnson",
      uploadDate: "2025-07-15",
      url: "#",
      tags: ["legal", "regulations", "compliance"]
    },
    {
      id: 2,
      title: "Equipment Maintenance Checklist",
      type: "Spreadsheet",
      category: "Maintenance",
      description: "Standard checklist for routine equipment maintenance and inspection",
      uploadedBy: "Sarah Williams",
      uploadDate: "2025-07-22",
      url: "#",
      tags: ["maintenance", "inspection", "equipment"]
    },
    {
      id: 3,
      title: "Customer Service Best Practices",
      type: "Document",
      category: "Training",
      description: "Training material for handling difficult customer situations",
      uploadedBy: "David Martinez",
      uploadDate: "2025-08-01",
      url: "#",
      tags: ["customer service", "training", "communication"]
    },
    {
      id: 4,
      title: "Towing Safety Protocol Video",
      type: "Video",
      category: "Safety",
      description: "Instructional video on safe towing practices and procedures",
      uploadedBy: "Emily Rodriguez",
      uploadDate: "2025-07-28",
      url: "#",
      tags: ["safety", "protocol", "video", "training"]
    },
    {
      id: 5,
      title: "Insurance Claim Form Template",
      type: "Form",
      category: "Administrative",
      description: "Standard form for filing insurance claims after incidents",
      uploadedBy: "James Taylor",
      uploadDate: "2025-08-05",
      url: "#",
      tags: ["insurance", "claims", "administrative"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showGoogleSearch, setShowGoogleSearch] = useState(false);
  const [googleSearchTerm, setGoogleSearchTerm] = useState("");
  const [showAddResource, setShowAddResource] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "",
    category: "",
    description: "",
    url: "",
    tags: ""
  });

  // Filter resources based on search term and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = categoryFilter === "all" || resource.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesType = typeFilter === "all" || resource.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Handle Google search
  const handleGoogleSearch = (e) => {
    e.preventDefault();
    // Open Google search in a new tab
    if (googleSearchTerm) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(googleSearchTerm)}`, '_blank');
    }
  };

  // Handle adding a new resource
  const handleAddResource = (e) => {
    e.preventDefault();
    
    // Process tags
    const tagArray = newResource.tags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag !== "");
    
    const newResourceItem = {
      id: resources.length + 1,
      title: newResource.title,
      type: newResource.type,
      category: newResource.category,
      description: newResource.description,
      uploadedBy: "Current User", // Replace with actual logged-in user
      uploadDate: new Date().toISOString().split('T')[0],
      url: newResource.url,
      tags: tagArray
    };
    
    setResources([...resources, newResourceItem]);
    setShowAddResource(false);
    setNewResource({
      title: "",
      type: "",
      category: "",
      description: "",
      url: "",
      tags: ""
    });
  };

  // Handle input change for new resource form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource(prev => ({ ...prev, [name]: value }));
  };

  // Available resource categories and types
  const categories = ["Legal", "Maintenance", "Training", "Safety", "Administrative", "Operations", "Marketing"];
  const types = ["PDF", "Document", "Spreadsheet", "Video", "Image", "Form", "Link", "Presentation"];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Resource Library</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowGoogleSearch(!showGoogleSearch);
              if (showAddResource) setShowAddResource(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showGoogleSearch ? "Cancel" : "Search Google"}
          </button>
          <button
            onClick={() => {
              setShowAddResource(!showAddResource);
              if (showGoogleSearch) setShowGoogleSearch(false);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showAddResource ? "Cancel" : "Add Resource"}
          </button>
        </div>
      </div>

      {showGoogleSearch && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Google Search</h2>
          <form onSubmit={handleGoogleSearch}>
            <div className="flex gap-2">
              <input
                type="text"
                value={googleSearchTerm}
                onChange={(e) => setGoogleSearchTerm(e.target.value)}
                placeholder="Enter search term..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Clicking "Search" will open Google search results in a new tab. You can then copy information or URLs 
              to add as a resource.
            </p>
          </form>
        </div>
      )}

      {showAddResource && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Resource</h2>
          <form onSubmit={handleAddResource}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newResource.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                <select
                  name="type"
                  value={newResource.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={newResource.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL or Link</label>
                <input
                  type="url"
                  name="url"
                  value={newResource.url}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://..."
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newResource.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={newResource.tags}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter tags separated by commas"
                />
                <p className="mt-1 text-xs text-gray-500">Example: safety, training, regulations</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">File upload functionality coming soon</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Resource
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Resources</label>
              <input
                type="text"
                placeholder="Search by title, description or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                {types.map((type, index) => (
                  <option key={index} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div key={resource.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 truncate" title={resource.title}>
                    {resource.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    resource.type === 'PDF' ? 'bg-red-100 text-red-800' : 
                    resource.type === 'Document' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'Spreadsheet' ? 'bg-green-100 text-green-800' :
                    resource.type === 'Video' ? 'bg-purple-100 text-purple-800' :
                    resource.type === 'Form' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {resource.type}
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                    <p className="text-sm text-blue-600">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        View Resource →
                      </a>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-3 text-xs text-gray-500 flex justify-between">
                    <span>Category: {resource.category}</span>
                    <span>Added: {resource.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No resources found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourceLibrary;
