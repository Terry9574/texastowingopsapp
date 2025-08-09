import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Save, X } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function TrainingForm({ training, user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    employee_name: "",
    training_date: new Date().toISOString().split('T')[0],
    training_type: "safety",
    training_description: "",
    hours_completed: 0,
    certification_number: "",
    expiration_date: "",
    notes: ""
  });

  useEffect(() => {
    if (training) {
      setFormData({
        employee_name: training.employee_name || "",
        training_date: training.training_date || new Date().toISOString().split('T')[0],
        training_type: training.training_type || "safety",
        training_description: training.training_description || "",
        hours_completed: training.hours_completed || 0,
        certification_number: training.certification_number || "",
        expiration_date: training.expiration_date || "",
        notes: training.notes || ""
      });
    }
  }, [training]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Simple translations
  const translations = {
    add_training: "Add Training Record",
    edit_training: "Edit Training Record",
    save: "Save",
    cancel: "Cancel",
    employee_name: "Employee Name",
    training_date: "Training Date",
    training_type: "Training Type",
    training_description: "Description",
    hours_completed: "Hours Completed",
    certification_number: "Certification Number",
    expiration_date: "Expiration Date (if applicable)",
    notes: "Notes",
    safety_training: "Safety Training",
    dot_training: "DOT Training",
    equipment_training: "Equipment Training",
    other_training: "Other Training",
    required_field: "This field is required"
  };

  const t = (key) => translations[key] || key;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardHeader className="border-b bg-slate-50">
        <CardTitle className="text-lg font-semibold text-slate-800">
          {training ? t('edit_training') : t('add_training')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="employee_name" className="text-sm font-medium text-slate-700 mb-1">
                {t('employee_name')} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="employee_name"
                name="employee_name"
                value={formData.employee_name}
                onChange={handleChange}
                required
                placeholder="Enter employee name"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="training_date" className="text-sm font-medium text-slate-700 mb-1">
                {t('training_date')} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="training_date"
                name="training_date"
                type="date"
                value={formData.training_date}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="training_type" className="text-sm font-medium text-slate-700 mb-1">
                {t('training_type')} <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.training_type}
                onValueChange={(value) => handleSelectChange("training_type", value)}
              >
                <SelectTrigger id="training_type">
                  <SelectValue placeholder="Select training type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="safety">{t('safety_training')}</SelectItem>
                  <SelectItem value="dot">{t('dot_training')}</SelectItem>
                  <SelectItem value="equipment">{t('equipment_training')}</SelectItem>
                  <SelectItem value="other">{t('other_training')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="hours_completed" className="text-sm font-medium text-slate-700 mb-1">
                {t('hours_completed')} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="hours_completed"
                name="hours_completed"
                type="number"
                value={formData.hours_completed}
                onChange={handleChange}
                required
                min="0"
                step="0.5"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="certification_number" className="text-sm font-medium text-slate-700 mb-1">
                {t('certification_number')}
              </Label>
              <Input
                id="certification_number"
                name="certification_number"
                value={formData.certification_number}
                onChange={handleChange}
                placeholder="Enter certification number (if applicable)"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="expiration_date" className="text-sm font-medium text-slate-700 mb-1">
                {t('expiration_date')}
              </Label>
              <Input
                id="expiration_date"
                name="expiration_date"
                type="date"
                value={formData.expiration_date}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="training_description" className="text-sm font-medium text-slate-700 mb-1">
                {t('training_description')} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="training_description"
                name="training_description"
                value={formData.training_description}
                onChange={handleChange}
                required
                placeholder="Enter training description"
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="notes" className="text-sm font-medium text-slate-700 mb-1">
                {t('notes')}
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional notes or details"
                className="w-full h-24"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" type="button" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" /> {t('cancel')}
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" /> {t('save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
