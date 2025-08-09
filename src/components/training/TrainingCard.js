import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Clock, FileText, Edit, Trash2 } from "lucide-react";

export default function TrainingCard({ training, user, onEdit, onDelete, className }) {
  // Simple translations
  const translations = {
    safety_training: "Safety Training",
    dot_training: "DOT Training",
    equipment_training: "Equipment Training",
    other_training: "Other Training",
    hours: "Hours",
    certificate: "Certificate",
    expires: "Expires",
    notes: "Notes",
    no_notes: "No additional notes provided.",
    no_expiration: "No expiration date",
    edit: "Edit",
    delete: "Delete"
  };

  const t = (key) => translations[key] || key;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get badge color based on training type
  const getBadgeColor = (type) => {
    switch (type) {
      case "safety":
        return "bg-red-100 text-red-800 border-red-200";
      case "dot":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "equipment":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  // Get training type label
  const getTrainingTypeLabel = (type) => {
    switch (type) {
      case "safety":
        return t("safety_training");
      case "dot":
        return t("dot_training");
      case "equipment":
        return t("equipment_training");
      default:
        return t("other_training");
    }
  };

  // Check if user can edit/delete this training
  const isAdminUser = user.custom_role?.toLowerCase() === "admin" || user.role === "admin";
  const canEditDelete = isAdminUser || training.creator_id === user.id;

  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex justify-between flex-wrap gap-2 mb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{training.employee_name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{formatDate(training.training_date)}</span>
                </div>
              </div>
              <Badge className={`${getBadgeColor(training.training_type)} border text-sm px-2.5 py-0.5`}>
                {getTrainingTypeLabel(training.training_type)}
              </Badge>
            </div>

            <h4 className="text-lg font-semibold text-slate-800 mb-3">{training.training_description}</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-700">
                  <strong>{training.hours_completed}</strong> {t("hours")}
                </span>
              </div>
              
              {training.certification_number && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">
                    <strong>{t("certificate")}:</strong> {training.certification_number}
                  </span>
                </div>
              )}
              
              {training.expiration_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">
                    <strong>{t("expires")}:</strong> {formatDate(training.expiration_date)}
                  </span>
                </div>
              )}
            </div>

            {training.notes && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{t("notes")}</span>
                </div>
                <p className="text-sm text-slate-600 pl-6">{training.notes || t("no_notes")}</p>
              </div>
            )}
          </div>

          {(onEdit || onDelete) && (
            <div className="flex md:flex-col gap-2 no-print">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(training)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {t("edit")}
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(training.id)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t("delete")}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
