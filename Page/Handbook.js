
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  FileText,
  Shield,
  Wrench,
  AlertTriangle,
  Scale,
  Truck,
  Users,
  ExternalLink,
  ChevronRight,
  Award,
  DollarSign,
  ClipboardList,
  X,
  Archive,
  Building2,
  ArrowLeft, // Added for navigation
  Printer // Added for print functionality
} from "lucide-react";

const handbookContent = [
  {
    id: 1,
    type: 'chapter',
    title: "Chapter 1: Company Policies & Introduction",
    icon: BookOpen,
    color: "bg-blue-600",
    description: "Equal opportunity, anti-harassment policies, and an overview of company standards.",
    keywords: ["introduction", "overview", "safety", "professionalism", "compliance", "standards", "policies", "procedures", "regulations", "employees", "team", "mission", "equal opportunity", "eeo", "non-discrimination", "harassment", "workplace conduct", "sexual harassment", "retaliation", "complaints", "policy"],
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
    icon: Scale,
    color: "bg-indigo-600",
    description: "Key legal frameworks governing Texas towing, including TOC §2308 and TAC Chapter 85 & 86.",
    keywords: ["licensing", "regulatory", "compliance", "TDLR", "TOC", "85", "86", "permits", "operator license", "tow truck permit", "vehicle storage facility", "VSF", "legal", "law", "regulations", "texas", "department"],
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
    keywords: ["equipment", "standards", "TAC", "86.705", "86.707", "winch", "cable", "chains", "straps", "fire extinguisher", "broom", "shovel", "warning devices", "flashlight", "tools", "truck", "safety equipment", "required equipment", "mandatory"],
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
  },
  {
    id: 4,
    type: 'chapter',
    title: "Chapter 4: General Safety Protocols",
    icon: Shield,
    color: "bg-red-600",
    description: "Personal Protective Equipment (PPE), vehicle checks, and on-scene safety procedures.",
    keywords: ["safety", "protocols", "PPE", "personal protective equipment", "ANSI", "high-visibility", "vest", "boots", "gloves", "scene safety", "86.710", "86.1000", "incident management", "traffic", "emergency lighting", "warning devices"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 4: General Safety Protocols</h2>
      <p class="mb-4">Safety is our highest priority. These protocols are designed to protect our employees, other responders, and the public.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Personal Protective Equipment (PPE)</h3>
      <p>Approved PPE, including a high-visibility safety vest (ANSI Class 2 or 3), safety-toed boots, and gloves, must be worn on every job site.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Scene Safety (TAC §86.710)</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>Position the tow truck to protect the scene and create a safe work area.</li>
        <li>Use emergency lighting and warning devices to alert approaching traffic.</li>
        <li>Constantly monitor traffic and be aware of your surroundings.</li>
        <li>Never stand between the tow truck and the vehicle being towed unless absolutely necessary.</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-2">Incident Management Towing (TAC §86.1000)</h3>
      <p>When performing a non-consent tow at the direction of law enforcement, always follow the officer's instructions. The scene is under their control. Your role is to perform the tow safely and efficiently as directed.</p>
    `
  },
  {
    id: 5,
    type: 'chapter',
    title: "Chapter 5: Loading & Unloading Procedures",
    icon: Truck,
    color: "bg-orange-600",
    description: "Step-by-step guides for flatbed and wheel lift operations, including damage prevention.",
    keywords: ["loading", "unloading", "procedures", "flatbed", "wheel lift", "damage prevention", "photos", "documentation", "neutral", "parking brake", "attachment points", "manufacturer", "waivers", "unlocks", "jumpstarts", "liability"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 5: Loading & Unloading Procedures</h2>
      <p class="mb-4">Proper loading and unloading techniques are critical to prevent damage to customer vehicles and ensure safety.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">General Principles</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>Perform a walk-around and document any pre-existing damage with photos BEFORE starting the tow.</li>
        <li>Ensure the vehicle is in neutral and the parking brake is disengaged.</li>
        <li>Use the appropriate attachment points as specified by the vehicle manufacturer.</li>
        <li>Double-check all connections and securements before moving the vehicle.</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-2">Signed Waivers</h3>
      <p>For services like vehicle unlocks or jumpstarts, a signed waiver of liability must be obtained from the customer BEFORE the service is performed. This protects both the operator and the company.</p>
      <p class="mt-4"><i>Detailed, step-by-step procedures with photos for both flatbed and wheel lift operations would be included here, customized to company equipment.</i></p>
    `
  },
  {
    id: 6,
    type: 'chapter',
    title: "Chapter 6: State Regulation Compliance",
    icon: Award,
    color: "bg-green-600",
    description: "Rules for non-consent towing, VSF requirements, and fee schedules.",
    keywords: ["state regulations", "compliance", "non-consent towing", "TOC", "2308", "subchapter J", "VSF", "vehicle storage facility", "fees", "fee compliance", "TDLR", "maximum fees", "invoice", "itemized", "signage", "private property", "law enforcement"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 6: Compliance with State Regulations</h2>
      <p class="mb-4">Strict adherence to state regulations on non-consent towing and storage is mandatory.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Non-Consent Towing (TOC §2308 Subchapter J)</h3>
      <p>Non-consent tows must be performed in strict compliance with the law. This includes proper signage on private property, immediate notification to law enforcement, and lawful reasons for the tow.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Vehicle Storage Facility (VSF) Rules</h3>
      <p>All towed vehicles must be taken to a licensed VSF. The VSF must comply with all TDLR rules regarding record-keeping, notifications to owners/lienholders, and vehicle release procedures.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Fee Compliance</h3>
      <p>All fees charged for non-consent towing and storage must not exceed the maximum amounts set by the TDLR. A detailed, itemized invoice must be provided to the customer.</p>
    `
  },
  {
    id: 7,
    type: 'chapter',
    title: "Chapter 7: Training & Certification",
    icon: ClipboardList,
    color: "bg-teal-600",
    description: "TDLR requirements for initial operator training and continuing education (CE).",
    keywords: ["training", "certification", "TDLR", "initial training", "continuing education", "CE", "renewal", "86.250", "86.251", "4 hours", "texas law", "roadway safety", "towing", "license renewal", "education", "courses"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 7: Training & Certification</h2>
      <p class="mb-4">Maintaining a valid license requires ongoing education and training.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Initial Training & Licensing (TAC §86.250)</h3>
      <p>Before a license is issued, operators must complete a TDLR-approved initial training course covering safety, laws, and operational procedures.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Continuing Education (CE) for Renewal (TAC §86.251)</h3>
      <p>To renew a license, operators must complete 4 hours of TDLR-approved continuing education annually. This includes:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>1 hour of Texas law and rules</li>
        <li>1 hour of roadway safety</li>
        <li>2 hours of towing-related topics</li>
      </ul>
      <p class="mt-4">It is the employee's responsibility to complete CE and submit it to the TDLR for license renewal before expiration.</p>
    `
  },
  {
    id: 8,
    type: 'chapter',
    title: "Chapter 8: Emergency Procedures",
    icon: AlertTriangle,
    color: "bg-yellow-500",
    description: "Protocols for handling accidents, injuries, and other on-scene emergencies.",
    keywords: ["emergency", "procedures", "accidents", "injuries", "911", "first aid", "incident report", "scene control", "dispatch", "management", "photographs", "documentation", "safety", "hazards", "law enforcement"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 8: Emergency Procedures</h2>
      <p class="mb-4">In the event of an emergency, a calm and procedural response is crucial.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Accident Involving Company Vehicle</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li>Stop immediately and secure the scene to prevent further incidents.</li>
        <li>Check for injuries. Render first aid only if trained; otherwise, call 911 immediately.</li>
        <li>Notify dispatch and management.</li>
        <li>Exchange information with other parties involved but do not admit fault.</li>
        <li>Photograph the scene, vehicle damage, and relevant details.</li>
        <li>Complete an official Incident Report form as soon as possible.</li>
      </ol>
      <h3 class="text-xl font-semibold mt-6 mb-2">Scene Control</h3>
      <p>Maintain control of your work area. If a scene becomes unsafe due to traffic, weather, or other hazards, pause the operation and notify dispatch or law enforcement.</p>
    `
  },
  {
    id: 9,
    type: 'chapter',
    title: "Chapter 9: Daily Truck & DOT Inspections",
    icon: ClipboardList,
    color: "bg-gray-700",
    description: "Checklists and compliance with FMCSA Part 396 for pre-trip and post-trip inspections.",
    keywords: ["daily inspections", "DOT", "truck inspections", "FMCSA", "part 396", "pre-trip", "post-trip", "DVIR", "daily inspection report", "brakes", "lights", "tires", "fluid levels", "winch", "cable", "boom", "safety equipment", "out of service"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 9: Daily Truck & DOT Inspections</h2>
      <p class="mb-4">A thorough inspection must be completed before and after every shift to ensure the vehicle is safe to operate and compliant with Department of Transportation (DOT) regulations.</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">A. Truck Inspection Checklist</h3>
      <p>Use the "Daily Inspections" form in this app to conduct a full pre-trip and post-trip inspection. This includes checks on:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Brakes and air lines</li>
        <li>Lights and signals</li>
        <li>Tires, wheels, and rims</li>
        <li>Fluid levels (oil, coolant, etc.)</li>
        <li>Winch, cable, and boom</li>
        <li>All safety equipment</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-2">B. TX DOT & FMCSA Part 396 Compliance</h3>
      <p>These inspections are mandated by the Federal Motor Carrier Safety Administration (FMCSA) under 49 CFR Part 396. The completed daily inspection report (DVIR) must be signed, and any defects noted must be reported for repair. A vehicle with a safety-critical defect must be placed Out of Service until repaired.</p>
    `
  },
  {
    id: 10,
    type: 'chapter',
    title: "Chapter 10: Storage Lot Requirements",
    icon: Users,
    color: "bg-cyan-600",
    description: "Rules for VSF security, vehicle access, and business hours.",
    keywords: ["storage lot", "VSF", "vehicle storage facility", "security", "fence", "lighting", "access", "business hours", "key storage", "vehicle redemption", "posted hours", "TDLR regulations"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 10: Storage Lot Requirements</h2>
      <p class="mb-4">Our Vehicle Storage Facility (VSF) must operate in strict compliance with TDLR regulations.</p>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Security:</strong> The lot must be secured by a fence and adequate lighting to prevent theft or vandalism.</li>
        <li><strong>Access:</strong> The VSF must be accessible during posted business hours for vehicle redemption.</li>
        <li><strong>Key Storage:</strong> Vehicle keys must be stored securely to prevent unauthorized access.</li>
        <li><strong>Business Hours:</strong> Hours of operation must be clearly posted and adhered to.</li>
      </ul>
    `
  },
  {
    id: 11,
    type: 'chapter',
    title: "Chapter 11: Drug Testing Policy",
    icon: Shield,
    color: "bg-red-700",
    description: "Compliance with DOT-mandated pre-employment, random, and post-accident testing.",
    keywords: ["drug testing", "policy", "DOT", "drug-free workplace", "pre-employment", "random testing", "post-accident", "reasonable suspicion", "positive test", "refusal", "termination", "alcohol testing", "safety-sensitive"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 11: Drug Testing Policy</h2>
      <p class="mb-4">We are a drug-free workplace and comply with all federal DOT drug and alcohol testing requirements. All safety-sensitive employees are subject to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Pre-employment drug testing.</li>
        <li>Random drug and alcohol testing.</li>
        <li>Post-accident testing.</li>
        <li>Reasonable suspicion testing.</li>
      </ul>
      <p class="mt-4">A positive test or refusal to test will result in immediate termination of employment.</p>
    `
  },
  {
    id: 12,
    type: 'chapter',
    title: "Chapter 12: Progressive Discipline Policy",
    icon: Users,
    color: "bg-orange-700",
    description: "Company guidelines for addressing performance and behavioral issues.",
    keywords: ["progressive discipline", "policy", "performance issues", "behavioral issues", "verbal warning", "written warning", "final warning", "suspension", "termination", "theft", "violence", "insubordination", "safety violations", "violations"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 12: Progressive Discipline Policy</h2>
      <p class="mb-4">The company follows a progressive discipline model to address policy violations or performance issues. The typical steps are:</p>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Verbal Warning:</strong> A formal discussion of the issue and expectations.</li>
        <li><strong>Written Warning:</strong> A documented warning outlining the issue and required corrections.</li>
        <li><strong>Final Written Warning/Suspension:</strong> A final notice that further infractions will lead to termination. Suspension may be included.</li>
        <li><strong>Termination:</strong> Separation from employment.</li>
      </ul>
      <p class="mt-4">The company reserves the right to bypass these steps for serious offenses, including but not limited to theft, violence, insubordination, or major safety violations.</p>
    `
  },
  {
    id: 13,
    type: 'chapter',
    title: "Chapter 13: Non-Disclosure Agreement",
    icon: Shield,
    color: "bg-slate-700",
    description: "Policy on protecting confidential company and customer information.",
    keywords: ["non-disclosure", "NDA", "confidentiality", "proprietary information", "customer data", "customer names", "contact information", "vehicle details", "financial data", "pricing", "client lists", "trade secrets", "unauthorized disclosure", "legal action"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 13: Non-Disclosure Agreement (NDA)</h2>
      <p class="mb-4">As a condition of employment, all employees agree to maintain the confidentiality of proprietary company information and customer data. This includes, but is not limited to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Customer names, contact information, and vehicle details.</li>
        <li>Company financial data, pricing, and client lists.</li>
        <li>Internal operational procedures and trade secrets.</li>
      </ul>
      <p class="mt-4">Unauthorized disclosure of confidential information is a serious violation and will result in immediate termination and may lead to legal action.</p>
    `
  },
  {
    id: 14,
    type: 'chapter',
    title: "Chapter 14: Compensation & Liability",
    icon: DollarSign,
    color: "bg-green-700",
    description: "Statement on employee compensation structure and liability protections.",
    keywords: ["compensation", "liability", "hourly rate", "commission", "employment agreement", "payroll", "bi-weekly", "commercial liability", "workers compensation", "insurance", "negligent actions", "safety protocols", "damages", "disciplinary action", "coverage"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 14: Compensation & Liability Statement</h2>
      <h3 class="text-xl font-semibold mt-6 mb-2">Compensation</h3>
      <p>Employee compensation is based on [e.g., an hourly rate, commission per job, or a combination]. The specific structure is outlined in your employment agreement. Payroll is processed [e.g., bi-weekly].</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Liability Statement</h3>
      <p>The company maintains commercial liability and workers' compensation insurance as required by law. Employees are covered under these policies while acting within the scope of their employment and in accordance with company policy. Negligent actions or willful violations of safety protocols that result in damages may lead to disciplinary action and may affect liability coverage.</p>
    `
  },
  {
    id: 15,
    type: 'chapter',
    title: "Chapter 15: Equipment Inventory",
    icon: Wrench,
    color: "bg-gray-600",
    description: "Detailed list of standard and specialized equipment required on company vehicles.",
    keywords: ["equipment inventory", "required equipment", "assigned equipment", "truck equipment", "heavy-duty rigging", "go-jacks", "lockout kits", "operators", "responsible", "lost equipment", "damaged equipment", "manager", "vehicle inventory", "app"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Chapter 15: Equipment Inventory</h2>
      <p class="mb-4">A complete inventory of all required and assigned equipment is maintained for each truck. The standard inventory includes all items listed in Chapter 3, plus any additional tools or equipment specific to the truck's capabilities (e.g., heavy-duty rigging, go-jacks, lockout kits).</p>
      <p class="mt-4">Operators are responsible for the equipment assigned to their truck. Any lost or damaged equipment must be reported to a manager immediately. The "Vehicle Inventory" section of this app can be used to view the specific inventory for each truck.</p>
    `
  },
  {
    id: 16,
    type: 'chapter',
    title: "Chapter 16: Office Staff (Texas Edition)",
    icon: Building2,
    color: "bg-indigo-700",
    description: "Employment classifications, wage types, dress codes, and office-specific policies for administrative staff.",
    keywords: ["office staff", "employee types", "full-time", "part-time", "temporary", "independent contractor", "wages", "hourly", "salary", "commission", "dress code", "uniform", "business casual", "remote work", "probationary period", "at-will employment", "texas employment law", "wage changes", "termination", "final paycheck"],
    isFormChapter: true, // Add this flag to identify fillable chapters
    content: `
      <style>
        .fillable-input {
          border: none;
          border-bottom: 2px solid #374151;
          background: transparent;
          padding: 2px 4px;
          font-family: inherit;
          font-size: inherit;
          min-width: 60px;
          display: inline-block;
        }
        .fillable-input:focus {
          outline: none;
          border-bottom-color: #3b82f6;
          background-color: #eff6ff;
        }
        .fillable-textarea {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 8px;
          font-family: inherit;
          font-size: inherit;
          width: 100%;
          min-height: 60px;
          resize: vertical;
        }
        .fillable-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }
        .checkbox-container {
          display: inline-flex;
          align-items: center;
          margin-right: 15px;
        }
        .fillable-checkbox {
          margin-right: 5px;
          transform: scale(1.2);
        }
        @media print {
          .fillable-input, .fillable-textarea {
            border: none !important;
            border-bottom: 2px solid #000 !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          .fillable-textarea {
            border: 1px solid #000 !important;
            border-radius: 0 !important;
          }
        }
      </style>
      
      <h2 class="text-2xl font-bold mb-4">Chapter 16: Office Staff (Texas Edition)</h2>
      <p class="mb-4">This chapter outlines employment policies, compensation structures, and workplace expectations specifically for office and administrative personnel. All general handbook policies also apply to office staff unless otherwise specified.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">1. Types of Employees</h3>
      <ul class="list-disc list-inside space-y-3 mb-4">
        <li><strong>Full-Time:</strong> Regularly scheduled for <input type="text" class="fillable-input" placeholder="40" style="width: 40px;"> hours per week. Benefits eligible after <input type="text" class="fillable-input" placeholder="90" style="width: 40px;"> days/months of employment.</li>
        <li><strong>Part-Time:</strong> Works less than <input type="text" class="fillable-input" placeholder="32" style="width: 40px;"> hours per week. Benefits: Prorated/Limited (specify: <input type="text" class="fillable-input" placeholder="Health insurance pro-rated, no PTO" style="width: 200px;">).</li>
        <li><strong>Temporary:</strong> Hired for specific period from <input type="date" class="fillable-input" style="width: 120px;"> to <input type="date" class="fillable-input" style="width: 120px;">. Benefits (if any): <input type="text" class="fillable-input" placeholder="None" style="width: 150px;">.</li>
        <li><strong>Independent Contractor:</strong> Contract term <input type="text" class="fillable-input" placeholder="Project-based or ongoing" style="width: 180px;">. No employee benefits provided.</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">2. Types of Wages</h3>
      <ul class="list-disc list-inside space-y-3 mb-4">
        <li><strong>Hourly:</strong> $<input type="number" class="fillable-input" placeholder="15.00" style="width: 60px;"> per hour. Overtime eligibility after <input type="number" class="fillable-input" placeholder="40" style="width: 40px;"> hours per week at time-and-a-half rate.</li>
        <li><strong>Salary:</strong> $<input type="number" class="fillable-input" placeholder="3000" style="width: 80px;"> per pay period. Classification: 
          <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> Exempt</span>
          <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> Non-Exempt</span>
        </li>
        <li><strong>Commission:</strong> <input type="number" class="fillable-input" placeholder="5" style="width: 40px;">% per sale or <input type="text" class="fillable-input" placeholder="$50 per closed deal" style="width: 150px;">.</li>
        <li><strong>Contractor Pay:</strong> $<input type="number" class="fillable-input" placeholder="500" style="width: 60px;"> per project/task or <input type="text" class="fillable-input" placeholder="hourly rate as agreed" style="width: 150px;">.</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">3. Dress Code Options</h3>
      <div class="mb-4 space-y-4">
        <div>
          <p class="mb-3"><strong>Uniform Policy:</strong></p>
          <p class="ml-4 mb-2">
            <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> Yes</span>
            <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> No</span>
            Details: <input type="text" class="fillable-input" placeholder="Company polo shirts and khaki pants" style="width: 250px;">
          </p>
          <p class="ml-4 mb-4">
            Provided by: 
            <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> Employer</span>
            <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> Employee</span>
            Cleaning/maintenance responsibility: <input type="text" class="fillable-input" placeholder="Employee" style="width: 100px;">
          </p>
        </div>
        
        <div>
          <p class="mb-3"><strong>Business Casual:</strong></p>
          <p class="ml-4 mb-2">Includes: <input type="text" class="fillable-input" placeholder="Dress pants, button-down shirts, blouses, dress shoes" style="width: 300px;"></p>
          <p class="ml-4 mb-4">Jeans/sneakers allowed on: <input type="text" class="fillable-input" placeholder="Fridays and company events" style="width: 180px;"></p>
        </div>
        
        <div>
          <p class="mb-3"><strong>Casual Dress:</strong></p>
          <p class="ml-4">Allowed on: <input type="text" class="fillable-input" placeholder="Fridays or special occasions" style="width: 200px;"></p>
          <p class="ml-4">Restrictions: <input type="text" class="fillable-input" placeholder="No offensive graphics, torn clothing, or inappropriate attire" style="width: 300px;"></p>
        </div>
      </div>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">4. Wage Changes</h3>
      <p class="mb-4">Changes in compensation must be communicated in writing at least <input type="number" class="fillable-input" placeholder="30" style="width: 40px;"> days in advance. Wage adjustments may occur due to performance evaluations, promotions, demotions, or company operational needs. All changes comply with federal and Texas minimum wage requirements.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">5. Remote Work Policy (Optional)</h3>
      <div class="mb-4 bg-gray-50 p-4 rounded space-y-3">
        <p>Eligible positions: <input type="text" class="fillable-input" placeholder="Administrative Assistant, Bookkeeper, Customer Service" style="width: 300px;"></p>
        <p>Required office days: <input type="number" class="fillable-input" placeholder="2" style="width: 40px;"> per week/month</p>
        <p>Home office requirements: <input type="text" class="fillable-input" placeholder="Reliable internet, quiet workspace, company computer" style="width: 300px;"></p>
        <p>Equipment provided by company: <input type="text" class="fillable-input" placeholder="Laptop, headset, software licenses" style="width: 250px;"></p>
        <p>Remote work approval required from: <input type="text" class="fillable-input" placeholder="Direct Supervisor and HR Manager" style="width: 200px;"></p>
      </div>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">6. Probationary Period (Optional)</h3>
      <div class="mb-4 bg-gray-50 p-4 rounded space-y-3">
        <p>Length: <input type="number" class="fillable-input" placeholder="90" style="width: 40px;"> days/months from hire date</p>
        <p>Performance review schedule: Every <input type="number" class="fillable-input" placeholder="30" style="width: 40px;"> days/weeks during probation</p>
        <p>Benefits eligibility: 
          <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> During probation</span>
          <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox"> After successful completion</span>
        </p>
        <p>Evaluation criteria: <textarea class="fillable-textarea" placeholder="Job performance, attendance, adherence to policies, teamwork, customer service skills" rows="2"></textarea></p>
      </div>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">7. Employment Status & Termination</h3>
      <p class="mb-3"><strong>At-Will Employment:</strong> Employment with this company is <strong>"at-will"</strong> under Texas law. This means either the employee or the company may terminate the employment relationship at any time, with or without cause, and with or without advance notice, for any reason not prohibited by law.</p>
      <div class="mb-4 space-y-3">
        <p>Requested notice period (optional, not required): <input type="number" class="fillable-input" placeholder="14" style="width: 40px;"> days</p>
        <p>Final paycheck timing: Within <input type="number" class="fillable-input" placeholder="6" style="width: 40px;"> days of termination (Texas law requires within 6 days)</p>
        <p class="mb-2">Company property return: Must be returned by last workday, including:</p>
        <ul class="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Keys, access cards, equipment</li>
          <li>Company documents, files, and electronic data</li>
          <li>Uniforms and other company-provided items</li>
        </ul>
      </div>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">8. Handbook Applicability</h3>
      <p class="mb-4">Office staff must follow all policies and procedures described in other sections of the Texas Towing Ops and Handbook (Powered by Consulting Advisors of Texas), including but not limited to:</p>
      <ul class="list-disc list-inside space-y-2 mb-4 pl-4">
        <li>Equal Employment Opportunity and Non-Discrimination (Chapter 1)</li>
        <li>Harassment and Workplace Conduct (Chapter 1)</li>
        <li>Training and Professional Development (Chapters 2, 6, 7)</li>
        <li>Safety Protocols and Emergency Procedures (Chapter 4)</li>
        <li>Drug Testing Policy (Chapter 11)</li>
        <li>Progressive Discipline Policy (Chapter 12)</li>
        <li>Confidentiality and Non-Disclosure (Chapter 13)</li>
        <li>Leave Policies and Time-Off Procedures (Chapter 14)</li>
      </ul>
      <p class="font-medium text-gray-800">All office staff are expected to understand and comply with the full handbook, including the above chapters and any other applicable rules and standards.</p>
      
      <hr class="my-8 border-slate-300 print:border-black">
      
      <div class="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p class="text-sm"><strong>Note:</strong> This chapter supplements but does not replace any existing employment agreements, offer letters, or contracts. In case of conflicts, the most restrictive or protective policy applies. Questions about office policies should be directed to <input type="text" class="fillable-input" placeholder="HR Manager" style="width: 150px;"> (position/name).</p>
      </div>
      
      <div style="page-break-before: always; margin-top: 60px; padding-top: 40px; border-top: 3px solid #374151;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1f2937;">Employee Acknowledgment – Chapter 16: Office Staff</h2>
          <div style="border: 2px solid #374151; padding: 30px; margin: 20px auto; max-width: 600px; background-color: #f9fafb;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; text-align: left;">
              I acknowledge that I have received, read, and understand the Office Staff section (Chapter 16) of the employee handbook. I agree to comply with all outlined policies.
            </p>
            
            <div style="margin-bottom: 30px;">
              <p style="font-weight: bold; margin-bottom: 10px; text-align: left;">Employee Name (Print):</p>
              <input type="text" class="fillable-input" style="width: 100%; height: 40px; border-bottom: 2px solid #374151; font-size: 16px;" placeholder="Type employee name here">
            </div>
            
            <div style="margin-bottom: 30px;">
              <p style="font-weight: bold; margin-bottom: 10px; text-align: left;">Employee Signature:</p>
              <input type="text" class="fillable-input" style="width: 100%; height: 40px; border-bottom: 2px solid #374151; font-size: 16px;" placeholder="Type signature or sign after printing">
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="font-weight: bold; margin-bottom: 10px; text-align: left;">Date:</p>
              <input type="date" class="fillable-input" style="width: 200px; height: 40px; border-bottom: 2px solid #374151; font-size: 16px;">
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #d1d5db; text-align: left;">
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 15px;">
                <strong>For HR Use Only:</strong>
              </p>
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 10px;">
                Received by: <input type="text" class="fillable-input" style="width: 200px; font-size: 12px;" placeholder="HR Representative Name"> 
                Date: <input type="date" class="fillable-input" style="width: 120px; font-size: 12px;">
              </p>
              <p style="font-size: 12px; color: #6b7280; margin: 0;">
                Filed in personnel record: 
                <span class="checkbox-container"><input type="checkbox" class="fillable-checkbox" style="transform: scale(0.8);"> Yes</span>
                Initial: <input type="text" class="fillable-input" style="width: 60px; font-size: 12px;" placeholder="Initials">
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 17, // Changed ID to 17 to accommodate new Chapter 16
    type: 'appendix',
    title: "Appendix A – TDLR Laws & Definitions",
    icon: FileText,
    color: "bg-blue-800",
    description: "Full references and key definitions from Texas towing regulations.",
    keywords: ["appendix", "TDLR", "laws", "definitions", "TOC", "2308", "TAC", "chapter 85", "chapter 86", "non-consent tow", "vehicle storage facility", "VSF", "incident management towing", "law enforcement", "traffic accident", "official texas", "state websites"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Appendix A: TDLR Laws & Definitions</h2>
      <p class="mb-4">This section provides key references and definitions from the Texas Occupations Code (TOC) and Texas Administrative Code (TAC).</p>
      <h3 class="text-xl font-semibold mt-6 mb-2">Key Statutes & Rules:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>TOC §2308:</strong> Vehicle Towing and Booting</li>
        <li><strong>TAC Chapter 85:</strong> Vehicle Storage Facilities</li>
        <li><strong>TAC Chapter 86:</strong> Vehicle Towing</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-2">Definitions:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Non-Consent Tow:</strong> A tow of a motor vehicle that is not authorized by the owner or operator of the vehicle.</li>
        <li><strong>Vehicle Storage Facility (VSF):</strong> A garage, parking lot, or other facility owned or operated by a person other than a governmental entity for storing or parking 10 or more vehicles per year.</li>
        <li><strong>Incident Management Towing:</strong> A non-consent tow of a vehicle in which the tow truck is summoned to the scene of a traffic accident or incident by a law enforcement agency.</li>
      </ul>
      <p class="mt-4"><i>This is a summary. All employees are encouraged to review the full text of the laws at the official Texas state websites.</i></p>
    `
  },
  {
    id: 18, // Changed ID to 18
    type: 'appendix',
    title: "Appendix B – Training & Policy Agreement",
    icon: FileText,
    color: "bg-blue-800",
    description: "Acknowledgment form for employees to sign, confirming receipt and understanding of the handbook.",
    keywords: ["appendix", "training agreement", "policy agreement", "acknowledgment", "employee signature", "handbook", "policies", "procedures", "safety rules", "regulations", "employment", "disciplinary action", "termination", "signature", "printed name", "date", "manager signature"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Appendix B: Training & Policy Agreement</h2>
      <p class="mb-4">By signing below, I acknowledge that I have received a copy of the Tow Company Operations & Safety Handbook. I understand that it is my responsibility to read, understand, and adhere to all policies and procedures contained within.</p>
      <p class="mb-4">I agree to comply with all safety rules and regulations as a condition of my employment. I understand that failure to do so may result in disciplinary action, up to and including termination.</p>
      <div class="mt-12 space-y-8">
        <div>
          <p class="border-b border-gray-400 pb-2">Employee Signature</p>
        </div>
        <div>
          <p class="border-b border-gray-400 pb-2">Printed Name</p>
        </div>
        <div>
          <p class="border-b border-gray-400 pb-2">Date</p>
        </div>
        <div class="pt-8">
          <p class="border-b border-gray-400 pb-2">Manager Signature</p>
        </div>
      </div>
    `
  },
  {
    id: 19, // Changed ID to 19
    type: 'appendix',
    title: "Appendix C – License Verification",
    icon: FileText,
    color: "bg-blue-800",
    description: "Form for verifying and documenting an operator's required licenses.",
    keywords: ["appendix", "license verification", "management", "onboarding", "annually", "employee name", "driver's license", "state", "expires", "verified by", "date", "TDLR", "tow operator license", "DOT", "medical card"],
    content: `
      <h2 class="text-2xl font-bold mb-4">Appendix C: License Verification</h2>
      <p class="mb-4">To be completed by management during onboarding and reviewed annually.</p>
      <div class="space-y-6 mt-8">
        <p><strong>Employee Name:</strong> ______________________________</p>
        <h3 class="text-lg font-semibold">Driver's License</h3>
        <p><strong>License #:</strong> ____________________ <strong>State:</strong> ____ <strong>Expires:</strong> ________</p>
        <p><strong>Verified By:</strong> ____________________ <strong>Date:</strong> ________</p>
        <h3 class="text-lg font-semibold">TDLR Tow Operator License</h3>
        <p><strong>License #:</strong> ____________________ <strong>Expires:</strong> ________</p>
        <p><strong>Verified By:</strong> ____________________ <strong>Date:</b> ________</p>
        <h3 class="text-lg font-semibold">DOT Medical Card (if applicable)</h3>
        <p><strong>Expires:</strong> ________</p>
        <p><strong>Verified By:</strong> ____________________ <strong>Date:</strong> ________</p>
      </div>
    `
  }
];

export default function Handbook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const chapters = handbookContent.filter(item => item.type === 'chapter');
  const appendices = handbookContent.filter(item => item.type === 'appendix');

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
    
    // Do not highlight within input, textarea, or style tags
    const parts = text.split(/(<input[^>]*>|<textarea[^>]*>|<\/textarea>|<style[^>]*>.*?<\/style>)/gi);
    return parts.map(part => {
      if (part.startsWith('<input') || part.startsWith('<textarea') || part.startsWith('</textarea>') || part.startsWith('<style')) {
        return part;
      }
      const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return part.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    }).join('');
  };

  // Function to get matching keywords
  const getMatchingKeywords = (item) => {
    if (!searchTerm.trim()) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return item.keywords.filter(keyword => 
      keyword.toLowerCase().includes(searchLower)
    ).slice(0, 5); // Show max 5 matching keywords
  };

  // Function to handle printing specifically for form chapters (like Chapter 16)
  const handlePrintChapter = (chapter) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${chapter.title} - Texas Towing Ops Handbook</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              max-width: 8.5in; 
              margin: 0 auto; 
              padding: 1in;
              color: #000;
            }
            .fillable-input {
              border: none;
              border-bottom: 2px solid #000;
              background: transparent;
              padding: 2px 4px;
              font-family: inherit;
              font-size: inherit;
              min-width: 60px;
              display: inline-block;
            }
            .fillable-textarea {
              border: 1px solid #000;
              padding: 8px;
              font-family: inherit;
              font-size: inherit;
              width: 100%;
              min-height: 60px;
            }
            .checkbox-container {
              display: inline-flex;
              align-items: center;
              margin-right: 15px;
            }
            .fillable-checkbox {
              margin-right: 5px;
              transform: scale(1.2);
            }
            h2, h3 { color: #000; }
            @page { margin: 1in; }
          </style>
        </head>
        <body>
          ${chapter.content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  // General print function for any chapter
  const handlePrint = () => {
    window.print();
  };

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between p-6">
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
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {selectedItem.title}
                  </CardTitle>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedItem.id === 16 && ( // Only show for Chapter 16
                  <Button
                    onClick={() => handlePrintChapter(selectedItem)}
                    variant="outline"
                    className="text-blue-600 hover:text-blue-700 border-blue-300"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Fillable Form
                  </Button>
                )}
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
            
            <CardContent className="p-8">
              <div
                className="prose max-w-none prose-h2:text-slate-800 prose-h3:text-slate-700 prose-p:text-slate-600 prose-ul:text-slate-600 prose-ol:text-slate-600"
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

        {/* Enhanced Search */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-4 z-10">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search handbook chapters, keywords, regulations (e.g., 'DOT', 'PPE', 'training', 'TAC 86.705')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {/* Search Results Summary */}
            {searchTerm && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} for "{searchTerm}"
                </p>
                {filteredItems.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filteredItems.filter(i => i.type === 'chapter').length} chapters, {filteredItems.filter(i => i.type === 'appendix').length} appendices
                  </Badge>
                )}
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
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
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
                {filteredItems.map((item) => {
                  const matchingKeywords = getMatchingKeywords(item);
                  return (
                    <Card
                      key={item.id}
                      className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
                      onClick={() => setSelectedItem(item)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <CardTitle 
                          className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors"
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
                        
                        {/* Show matching keywords */}
                        {matchingKeywords.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {matchingKeywords.map((keyword, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="text-xs bg-blue-100 text-blue-700"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightText(keyword, searchTerm) 
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Default View - Chapters and Appendices */
          <>
            {/* Chapters */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Handbook Chapters</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                  <Card
                    key={chapter.id}
                    className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
                    onClick={() => setSelectedItem(chapter)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 ${chapter.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <chapter.icon className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {chapter.title}
                      </CardTitle>
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
                        {chapter.keywords.length > 3 && (
                          <Badge variant="outline" className="text-xs text-slate-400">
                            +{chapter.keywords.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Appendices */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Appendices</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appendices.map((appendix) => (
                  <Card 
                    key={appendix.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-white/60 backdrop-blur-sm border border-slate-200"
                    onClick={() => setSelectedItem(appendix)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 ${appendix.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <appendix.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{appendix.title}</h3>
                        <p className="text-sm text-slate-600 line-clamp-1">{appendix.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {appendix.keywords.slice(0, 2).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
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
