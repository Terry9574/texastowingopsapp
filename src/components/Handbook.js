import React, { useState, useMemo } from "react";
import { BookOpen, Search, FileText, Shield, Wrench, AlertTriangle, X, ChevronRight, Printer, ArrowLeft } from "lucide-react";

// Simple UI components (to avoid dependencies)
const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-6 border-b border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-xl font-bold text-slate-900 ${className}`} {...props}>
    {children}
  </h3>
);

const Button = ({ children, variant = "default", className = "", ...props }) => (
  <button 
    className={`
      px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2
      ${variant === "ghost" ? "bg-transparent hover:bg-slate-100 text-slate-600" : ""}
      ${variant === "outline" ? "border border-slate-200 hover:bg-slate-50 text-slate-700" : ""}
      ${variant === "default" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
      ${className}
    `} 
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input 
    className={`w-full px-3 py-2 border border-slate-200 rounded-md ${className}`}
    {...props}
  />
);

const Badge = ({ children, variant = "default", className = "", ...props }) => (
  <span 
    className={`
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      ${variant === "secondary" ? "bg-slate-100 text-slate-600" : ""}
      ${variant === "outline" ? "border border-slate-200 text-slate-600" : ""}
      ${variant === "default" ? "bg-blue-100 text-blue-800" : ""}
      ${className}
    `} 
    {...props}
  >
    {children}
  </span>
);

// Sample handbook content data
const handbookContent = [
  {
    id: 1,
    type: 'chapter',
    title: "Chapter 1: Company Policies & Introduction",
    icon: BookOpen,
    color: "bg-blue-600",
    description: "Equal opportunity, anti-harassment policies, and an overview of company standards.",
    keywords: ["introduction", "overview", "safety", "professionalism"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 1: Company Policies & Introduction</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">1. Equal Employment Opportunity and Non-Discrimination (Texas Law)</h3>
      <p class="mb-4">Texas Towing Ops is committed to providing equal employment opportunities to all employees and applicants for employment, in compliance with federal and Texas state law. Employment decisions are made without regard to race, color, religion, sex (including pregnancy, gender identity, and sexual orientation), national origin, age, disability, genetic information, veteran status, or any other characteristic protected by law.</p>
      <p class="mb-4">We do not tolerate discrimination or harassment of any kind. All employment practices—such as hiring, promotion, pay, training, and other terms and conditions—are administered fairly and in accordance with applicable law.</p>
      <p class="mb-4">Any employee who believes they have experienced discrimination should report it to management or HR immediately. Retaliation for reporting discrimination is strictly prohibited.</p>

      <h3 class="text-xl font-semibold mt-6 mb-2">2. Harassment and Workplace Conduct (Texas Law)</h3>
      <p class="mb-4">Our company is committed to maintaining a workplace free from harassment and inappropriate conduct. Harassment—including sexual harassment and harassment based on any protected characteristic—is strictly prohibited under Texas and federal law.</p>
      <p class="mb-4">Examples of prohibited harassment include, but are not limited to, unwelcome jokes, slurs, insults, offensive pictures, unwanted physical contact, or repeated unwelcome requests for social interaction.</p>
      <p class="mb-4">All employees are expected to conduct themselves in a professional and respectful manner at all times. Complaints of harassment will be investigated promptly and confidentially. Disciplinary action, up to and including termination, will be taken as appropriate.</p>
      <p class="mb-4">Any employee who believes they have been subjected to harassment should report the incident to management or HR without delay. Retaliation against anyone who reports harassment is strictly prohibited.</p>

      <hr class="my-8 border-slate-300">

      <h3 class="text-xl font-semibold mt-6 mb-2">Company Overview</h3>
      <p class="mb-4">Welcome to the official Tow Company Operations & Safety Handbook. This document is the primary resource for all employees, outlining the standards, procedures, and regulations that govern our operations. Our mission is to provide safe, professional, and efficient towing services while maintaining full compliance with all state and federal laws.</p>
      <p class="mb-4">Adherence to the policies within this handbook is mandatory for all personnel. A thorough understanding of these guidelines is essential for ensuring the safety of our team, the public, and the property we handle. This handbook is a living document and may be updated to reflect changes in law or company policy.</p>
    `
  },
  {
    id: 2,
    type: 'chapter',
    title: "Chapter 2: Licensing & Regulatory Compliance",
    icon: Shield,
    color: "bg-indigo-600",
    description: "Key legal frameworks governing Texas towing, including TOC §2308 and TAC Chapter 85 & 86.",
    keywords: ["licensing", "regulatory", "compliance", "TDLR"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 2: Licensing & Regulatory Compliance</h2>
      <p class="mb-4">All towing operations in Texas are strictly regulated by the Texas Department of Licensing and Regulation (TDLR). Compliance is not optional.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Core Legal Authorities:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Texas Occupations Code (TOC) §2308:</strong> This is the primary state law governing Vehicle Towing and Vehicle Storage Facilities (VSFs). It outlines requirements for licensing, non-consent towing, vehicle storage, and consumer rights.</li>
        <li><strong>Texas Administrative Code (TAC) Chapter 85:</strong> Rules pertaining to Vehicle Storage Facilities, including records, storage, and access.</li>
        <li><strong>Texas Administrative Code (TAC) Chapter 86:</strong> Rules for Vehicle Towing, detailing requirements for tow truck permits, operator licenses, safety standards, and insurance.</li>
      </ul>
      <p>No employee may operate a tow truck or perform towing services without the appropriate, valid TDLR-issued license or permit. This includes:</p>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Tow Company License:</strong> The company must maintain a valid license to operate.</li>
        <li><strong>Tow Truck Permit:</strong> Each truck in the fleet must have a unique, valid permit.</li>
        <li><strong>Tow Operator License:</strong> Each driver must possess a valid individual Tow Operator or Incident Management Tow Operator license.</li>
      </ul>
      <p class="mt-4">All licenses and permits must be kept current and renewed prior to expiration. Failure to comply can result in severe penalties for both the employee and the company.</p>
    `
  },
  {
    id: 3,
    type: 'chapter',
    title: "Chapter 3: Equipment Standards",
    icon: Wrench,
    color: "bg-slate-600",
    description: "Mandatory equipment for all tow trucks as required by TAC §86.705 and §86.707.",
    keywords: ["equipment", "standards", "TAC", "86.705"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 3: Equipment Standards</h2>
      <p class="mb-4">Each tow truck must be equipped with the minimum required equipment at all times to ensure operational readiness and safety. These standards are mandated by the TDLR.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Minimum Required Equipment (TAC §86.705, §86.707):</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Winch/Cable:</strong> At least one winch with a capacity appropriate for the truck's class and a cable in good condition.</li>
        <li><strong>Chains/Straps:</strong> An assortment of chains, straps, and hooks for safe loading and securement.</li>
        <li><strong>Fire Extinguisher:</strong> At least one 5 lb. or larger fire extinguisher with a current inspection tag.</li>
        <li><strong>Broom & Shovel:</strong> For clearing debris from accident scenes.</li>
        <li><strong>High-Visibility Warning Devices:</strong> At least three reflective triangles or flares.</li>
        <li><strong>Flashlight:</strong> A powerful, operational flashlight.</li>
        <li><strong>Basic Hand Tools:</b> For minor on-scene adjustments.</li>
      </ul>
      <p class="mt-4">All equipment must be maintained in good working order. Defective equipment must be reported immediately and replaced before the truck is put into service. Refer to the Daily Truck Inspection checklist for detailed inspection points.</p>
    `
  }
];

export default function Handbook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const chapters = handbookContent.filter(item => item.type === 'chapter');

  // Enhanced search functionality
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return handbookContent;
    
    const searchLower = searchTerm.toLowerCase();
    return handbookContent.filter(item => {
      // Search in title
      if (item.title.toLowerCase().includes(searchLower)) return true;
      
      // Search in description
      if (item.description.toLowerCase().includes(searchLower)) return true;
      
      // Search in keywords
      if (item.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))) return true;
      
      // Search in content (remove HTML tags for searching)
      const contentText = item.content.replace(/<[^>]*>/g, '').toLowerCase();
      if (contentText.includes(searchLower)) return true;
      
      return false;
    });
  }, [searchTerm]);

  // Function to highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  // Function to handle printing specifically for form chapters
  const handlePrint = () => {
    window.print();
  };

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Contents
                </Button>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${selectedItem.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <selectedItem.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle>
                    {selectedItem.title}
                  </CardTitle>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handlePrint} // General print button for any chapter
                  variant="outline"
                  className="text-slate-700 hover:text-slate-900"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div
                className="prose max-w-none prose-headings:text-slate-800 prose-p:text-slate-600"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(selectedItem.content, searchTerm) 
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Tow Company Operations & Safety Handbook</h1>
          <p className="text-lg text-slate-600">The official guide to Texas towing compliance and safety protocols.</p>
        </div>

        {/* Search */}
        <Card className="sticky top-4 z-10">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search handbook chapters, keywords, regulations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search Results Summary */}
            {searchTerm && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} for "{searchTerm}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results or Default View */}
        {searchTerm ? (
          /* Search Results */
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">
              Search Results {filteredItems.length > 0 && `(${filteredItems.length})`}
            </h2>
            
            {filteredItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Found</h3>
                  <p className="text-slate-600 mb-4">
                    Try searching for terms like "DOT", "PPE", "training", "TDLR", "safety", or specific regulation numbers.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                    className="hover:bg-blue-50"
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-300" />
                      </div>
                      <CardTitle 
                        dangerouslySetInnerHTML={{ 
                          __html: highlightText(item.title, searchTerm) 
                        }}
                      />
                    </CardHeader>
                    <CardContent>
                      <p 
                        className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-3"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightText(item.description, searchTerm) 
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Default View - Chapters */
          <>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Handbook Chapters</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                  <Card
                    key={chapter.id}
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedItem(chapter)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 ${chapter.color} rounded-xl flex items-center justify-center mb-3`}>
                          <chapter.icon className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-300" />
                      </div>
                      <CardTitle>{chapter.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {chapter.description}
                      </p>
                      
                      {/* Show some keywords */}
                      <div className="flex flex-wrap gap-1">
                        {chapter.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
