import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Search, Users, Award, Filter, Shield, Printer, FileDown } from "lucide-react";

import TrainingForm from "../components/training/TrainingForm";
import TrainingCard from "../components/training/TrainingCard";

// Mock data - replace with actual API calls in production
const mockTrainings = [
  {
    id: '1',
    employee_name: 'John Doe',
    training_date: '2023-08-15',
    training_type: 'safety',
    training_description: 'Defensive Driving Course',
    hours_completed: 8,
    certification_number: 'CERT-DD-2023-123',
    expiration_date: '2025-08-15',
    notes: 'Completed with excellent performance',
    company_name: 'Premier Towing',
    creator_role: 'admin'
  },
  {
    id: '2',
    employee_name: 'Jane Smith',
    training_date: '2023-07-20',
    training_type: 'dot',
    training_description: 'DOT Regulations Training',
    hours_completed: 4,
    certification_number: 'DOT-REG-2023-456',
    expiration_date: '2024-07-20',
    notes: 'Annual DOT compliance training completed',
    company_name: 'Premier Towing',
    creator_role: 'manager'
  },
  {
    id: '3',
    employee_name: 'Mike Johnson',
    training_date: '2023-09-05',
    training_type: 'equipment',
    training_description: 'Heavy Duty Tow Truck Operation',
    hours_completed: 16,
    certification_number: 'EQ-HD-2023-789',
    expiration_date: '2025-09-05',
    notes: 'Successfully completed practical assessment',
    company_name: 'Premier Towing',
    creator_role: 'admin'
  }
];

// Mock User entity for development
const mockUser = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  company_name: 'Premier Towing',
  custom_role: 'admin',
  role: 'admin',
  language: 'en'
};

// Simple translations
const translations = {
  en: {
    loading_please_wait: 'Loading, please wait...',
    training_logs: 'Training Logs',
    track_employee_training: 'Track and manage employee training records',
    submit_view_training_records: 'Submit and view your training records',
    access_denied: 'Access Denied',
    permission_required: 'You do not have permission to view this page.',
    admin_access: 'Admin Access',
    full_access_message: 'You have full access to all training records.',
    print: 'Print',
    download_pdf: 'Download PDF',
    new_training: 'New Training',
    cancel: 'Cancel',
    total_training: 'Total Training Records',
    search: 'Search',
    driver_name: 'Driver Name',
    filter: 'Filter',
    training_type: 'Training Type',
    all_types: 'All Types',
    safety_training: 'Safety Training',
    dot_training: 'DOT Training',
    equipment_training: 'Equipment Training',
    other_training: 'Other Training',
    no_records_found: 'No Records Found',
    start_first_training_record: 'Start by adding your first training record.',
    no_records_match_filters: 'No records match your current filters.',
    confirm_delete: 'Are you sure you want to delete this training record?'
  }
};

// Permission utility functions
const canManageTraining = (role) => ['admin', 'owner', 'manager'].includes(role?.toLowerCase());
const canSubmitTraining = (role) => ['admin', 'owner', 'manager', 'supervisor', 'trainer'].includes(role?.toLowerCase());
const canViewAllTraining = (role) => ['admin', 'owner', 'manager', 'supervisor'].includes(role?.toLowerCase());
const canViewOwnTraining = (role) => ['driver', 'technician', 'dispatcher'].includes(role?.toLowerCase());

// Print utilities
const printPage = () => {
  window.print();
};

const downloadPDF = (filename) => {
  // In a real implementation, this would create a PDF
  // For now, we'll just trigger a print dialog
  alert('This would download a PDF in production. Showing print dialog instead.');
  window.print();
};

export default function TrainingLogs() {
  const [trainings, setTrainings] = useState(mockTrainings);
  const [user, setUser] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Simulating the useTranslations hook
  const t = (key) => translations.en[key] || key;

  const handlePrint = () => {
    printPage();
  };

  const handleDownloadPDF = () => {
    const today = new Date().toISOString().split('T')[0];
    downloadPDF(`training-logs-${today}.pdf`);
  };

  const loadData = async () => {
    // In a real app, this would fetch from an API
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Data is already loaded from mock data
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (trainingData) => {
    try {
      if (editingTraining) {
        // Update existing training
        const updatedTrainings = trainings.map(t => 
          t.id === editingTraining.id ? {...trainingData, id: t.id} : t
        );
        setTrainings(updatedTrainings);
      } else {
        // Create new training
        const newTraining = {
          ...trainingData,
          id: (Math.max(0, ...trainings.map(t => parseInt(t.id))) + 1).toString(),
          company_name: user.company_name,
          creator_role: user.custom_role
        };
        setTrainings([newTraining, ...trainings]);
      }
      setShowForm(false);
      setEditingTraining(null);
    } catch (error) {
      console.error("Error saving training:", error);
    }
  };

  const handleEdit = (training) => {
    setEditingTraining(training);
    setShowForm(true);
  };

  const handleDelete = async (trainingId) => {
    if (window.confirm(t('confirm_delete'))) {
      try {
        // Delete training
        const updatedTrainings = trainings.filter(t => t.id !== trainingId);
        setTrainings(updatedTrainings);
      } catch (error) {
        console.error("Error deleting training:", error);
      }
    }
  };

  const filteredTrainings = trainings.filter(training => {
    if (user?.custom_role?.toLowerCase() === 'admin' || user?.role === 'admin') {
      const matchesSearch = !searchTerm || 
        training.employee_name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || training.training_type === typeFilter;
      return matchesSearch && matchesType;
    }

    const canViewAll = canViewAllTraining(user?.custom_role);
    
    const matchesSearch = !canViewAll || !searchTerm || 
      training.employee_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !canViewAll || typeFilter === "all" || training.training_type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <p>{t('loading_please_wait')}</p>
      </div>
    );
  }

  if (!user || !(user.custom_role?.toLowerCase() === 'admin' || user.role === 'admin' || canViewAllTraining(user.custom_role) || canViewOwnTraining(user.custom_role))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('access_denied')}</h2>
              <p className="text-slate-600">{t('permission_required')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isAdminUser = user.custom_role?.toLowerCase() === 'admin' || user.role === 'admin';
  const canManage = isAdminUser || canManageTraining(user.custom_role);
  const canSubmit = isAdminUser || canSubmitTraining(user.custom_role);
  const canViewAll = isAdminUser || canViewAllTraining(user.custom_role);
  const canExport = isAdminUser || user.custom_role?.toLowerCase() === 'owner';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {isAdminUser && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 no-print">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">
                {t('admin_access')}: {t('full_access_message')}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{t('training_logs')}</h1>
              <p className="text-slate-600">
                {canViewAll ? t('track_employee_training') : t('submit_view_training_records')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canExport && (
              <>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" /> {t('print')}
                </Button>
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <FileDown className="w-4 h-4 mr-2" /> {t('download_pdf')}
                </Button>
              </>
            )}
            {(canManage || canSubmit) && (
              <Button
                onClick={() => {
                  setEditingTraining(null);
                  setShowForm(!showForm);
                }}
                className="bg-green-600 hover:bg-green-700 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                {showForm ? t('cancel') : t('new_training')}
              </Button>
            )}
          </div>
        </div>

        <div id="printable-area">
          {canViewAll && (
            <div className="no-print">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">{t('total_training')}</p>
                    <p className="text-2xl font-bold text-slate-900">{trainings.length}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg col-span-3">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          placeholder={t('search') + " " + t('driver_name').toLowerCase() + "..."}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('filter') + " " + t('training_type').toLowerCase()} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('all_types')}</SelectItem>
                          <SelectItem value="safety">{t('safety_training')}</SelectItem>
                          <SelectItem value="dot">{t('dot_training')}</SelectItem>
                          <SelectItem value="equipment">{t('equipment_training')}</SelectItem>
                          <SelectItem value="other">{t('other_training')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {showForm && (canManage || canSubmit) && (
            <div className="no-print">
              <TrainingForm
                training={editingTraining}
                user={user}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTraining(null);
                }}
              />
            </div>
          )}

          <div className="space-y-4">
            {filteredTrainings.length === 0 && !showForm ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg printable-card">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('no_records_found')}</h3>
                  <p className="text-slate-600 mb-4">
                    {trainings.length === 0 
                      ? t('start_first_training_record')
                      : t('no_records_match_filters')
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredTrainings.map((training) => (
                  <TrainingCard
                    key={training.id}
                    training={training}
                    user={user}
                    onEdit={canManage ? handleEdit : null}
                    onDelete={canManage ? handleDelete : null}
                    className="printable-card"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
