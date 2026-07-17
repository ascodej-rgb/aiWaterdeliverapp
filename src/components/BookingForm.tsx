import React, { useState, useEffect } from 'react';
import { DELIVERY_ZONES, TANKER_CAPACITIES, RATE_PER_LITER, DISTANCE_RATE_PER_KM, VAT_RATE } from '../data/waterData';
import { BookingDetails, BookingEstimation } from '../types';
import { 
  Calculator, 
  Building, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Droplet, 
  Sparkles, 
  CheckCircle, 
  FileCheck,
  AlertCircle,
  Truck,
  RotateCcw
} from 'lucide-react';

interface BookingFormProps {
  selectedTankerId?: string;
  onSelectTanker: (id: string) => void;
}

export default function BookingForm({ selectedTankerId, onSelectTanker }: BookingFormProps) {
  // Form State
  const [formData, setFormData] = useState<BookingDetails>({
    companyName: '',
    taxId: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    deliveryZoneId: DELIVERY_ZONES[0].id,
    tankerCapacityId: selectedTankerId || TANKER_CAPACITIES[1].id,
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow by default
    deliveryTimeSlot: 'morning',
    specialInstructions: '',
    waterType: 'potable',
  });

  // Success State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync selected tanker ID from parent clicks
  useEffect(() => {
    if (selectedTankerId) {
      setFormData(prev => ({ ...prev, tankerCapacityId: selectedTankerId }));
    }
  }, [selectedTankerId]);

  // Find active data objects for pricing
  const activeZone = DELIVERY_ZONES.find(z => z.id === formData.deliveryZoneId) || DELIVERY_ZONES[0];
  const activeTanker = TANKER_CAPACITIES.find(t => t.id === formData.tankerCapacityId) || TANKER_CAPACITIES[0];

  // Live Math Calculations
  const basePrice = activeTanker.capacityLiters * RATE_PER_LITER;
  const distanceFee = activeZone.distanceKm * DISTANCE_RATE_PER_KM;
  const subtotal = basePrice + distanceFee;
  const vatAmount = subtotal * VAT_RATE;
  const totalPrice = subtotal + vatAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for that field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.companyName.trim()) errors.companyName = 'Company Registered Name is required.';
    if (!formData.taxId.trim()) {
      errors.taxId = 'TIN (Taxpayer Identification Number) is required.';
    } else if (!/^\d{9,12}$/.test(formData.taxId.trim())) {
      errors.taxId = 'TIN must be a valid 9 to 12 digit corporate taxpayer number.';
    }
    if (!formData.contactName.trim()) errors.contactName = 'Authorized Contact Name is required.';
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Valid phone number is required.';
    } else if (!/^\+?[0-9\s-]{9,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid commercial telephone number.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Corporate Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid corporate email address.';
    }
    if (!formData.deliveryDate) errors.deliveryDate = 'Delivery Date is required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to first error
      const firstError = Object.keys(formErrors)[0];
      const el = document.getElementsByName(firstError)[0];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Generate simulated booking reference
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    const generatedRef = `HF-WT-${timestamp}-${random}`;
    setBookingRef(generatedRef);
    setIsSubmitted(true);
    window.scrollTo({ top: document.getElementById('calculator-section')?.offsetTop || 300, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      taxId: '',
      contactName: '',
      phoneNumber: '',
      email: '',
      deliveryZoneId: DELIVERY_ZONES[0].id,
      tankerCapacityId: TANKER_CAPACITIES[1].id,
      deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      deliveryTimeSlot: 'morning',
      specialInstructions: '',
      waterType: 'potable',
    });
    setFormErrors({});
    setIsSubmitted(false);
    onSelectTanker('');
  };

  return (
    <section id="calculator-section" className="py-20 bg-white border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3.5 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-4 rounded-full italic border border-blue-200">
            TRANSPARENT TARIFF LOGISTICS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            REQUEST WATER DISPATCH
          </h2>
          <p className="mt-4 text-base font-medium text-slate-500 leading-relaxed max-w-xl mx-auto">
            Calculate real-time delivery estimates, configure capacity footprint, and enter company tax details for priority release.
          </p>
        </div>

        {isSubmitted ? (
          /* SUCCESS ORDER PANEL */
          <div className="max-w-3xl mx-auto bg-slate-50 border-2 border-slate-200 rounded-none overflow-hidden shadow-sm animate-fadeIn">
            {/* Header Status */}
            <div className="bg-slate-950 text-white p-8 text-center relative border-b-4 border-blue-600">
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                TAX INVOICE READY
              </div>
              <div className="mx-auto w-16 h-16 bg-white/5 rounded-none flex items-center justify-center mb-4 border-2 border-slate-800">
                <CheckCircle className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="font-display text-3xl font-black uppercase tracking-tight">DISPATCH REQUEST FILED</h3>
              <p className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest">
                Booking Reference: <span className="font-black text-white underline decoration-blue-500">{bookingRef}</span>
              </p>
            </div>

            {/* Simulated Live Tracking Progress */}
            <div className="p-6 sm:p-8 bg-white border-b-2 border-slate-200">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 font-mono">SIMULATED FLEET DISPATCH PIPELINE</h4>
              
              <div className="relative">
                {/* Horizontal progress bar background */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 md:left-1/2 md:top-5 md:bottom-auto md:w-[80%] md:h-0.5 bg-slate-200 md:-translate-x-1/2 z-0"></div>
                
                {/* Steps container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  
                  {/* Step 1: Active */}
                  <div className="flex md:flex-col items-center text-left md:text-center space-x-4 md:space-x-0">
                    <div className="w-10 h-10 bg-blue-50 border-2 border-blue-600 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div className="md:mt-3">
                      <p className="text-xs font-black uppercase tracking-tight text-slate-950">1. Order Approved</p>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">TIN verified pass</p>
                    </div>
                  </div>

                  {/* Step 2: Filling */}
                  <div className="flex md:flex-col items-center text-left md:text-center space-x-4 md:space-x-0">
                    <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 animate-pulse ring-4 ring-blue-100">
                      <Droplet className="h-5 w-5" />
                    </div>
                    <div className="md:mt-3">
                      <p className="text-xs font-black uppercase tracking-tight text-blue-600 flex items-center justify-start md:justify-center">
                        <span>2. Filling Tanker</span>
                        <span className="ml-1.5 flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Purity lab sampled</p>
                    </div>
                  </div>

                  {/* Step 3: Pending Transit */}
                  <div className="flex md:flex-col items-center text-left md:text-center space-x-4 md:space-x-0">
                    <div className="w-10 h-10 bg-slate-100 border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div className="md:mt-3">
                      <p className="text-xs font-black uppercase tracking-tight text-slate-400">3. En Route</p>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Depot release pending</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Final Order Breakdown Receipt */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 border-2 border-slate-200 p-6">
                <h4 className="font-display font-black text-slate-900 text-sm border-b border-slate-200 pb-3 mb-4 flex items-center justify-between uppercase tracking-tight">
                  <span>Commercial Booking Summary</span>
                  <span className="text-[10px] font-bold bg-slate-900 text-white px-2.5 py-1 uppercase tracking-widest">
                    {formData.waterType === 'potable' ? 'Potable Grade' : 'Industrial Grade'}
                  </span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Registered Client</span>
                    <span className="font-black text-slate-800 uppercase tracking-tight">{formData.companyName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Commercial TIN / Tax ID</span>
                    <span className="font-mono font-black text-slate-800">{formData.taxId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Delivery Destination</span>
                    <span className="font-black text-slate-800 uppercase tracking-tight">{activeZone.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Selected Fleet Tanker</span>
                    <span className="font-black text-slate-800 uppercase tracking-tight">{activeTanker.name} ({activeTanker.capacityLiters.toLocaleString()}L)</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Scheduled Delivery</span>
                    <span className="font-black text-slate-800 uppercase tracking-tight">
                      {formData.deliveryDate} ({formData.deliveryTimeSlot === 'morning' ? 'MORNING 08:00 - 12:00' : 'AFTERNOON 13:00 - 17:00'})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Contact Logistics Manager</span>
                    <span className="font-black text-slate-800 uppercase tracking-tight">{formData.contactName} ({formData.phoneNumber})</span>
                  </div>
                </div>

                {formData.specialInstructions && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Logistical Instructions</span>
                    <p className="text-xs text-slate-600 bg-white p-2.5 border border-slate-200 italic">"{formData.specialInstructions}"</p>
                  </div>
                )}
              </div>

              {/* Itemized Calculation Receipt */}
              <div className="border-2 border-dashed border-slate-200 p-6 bg-[#F8FAFC]">
                <h5 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-4 font-mono">Invoice Pricing Calculations</h5>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Water Cost ({activeTanker.capacityLiters.toLocaleString()}L @ 20 Birr/L)</span>
                    <span className="font-mono font-black">{basePrice.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Depot Logistics & Fuel Fee ({activeZone.distanceKm} km @ 60 Birr/km)</span>
                    <span className="font-mono font-black">{distanceFee.toLocaleString()} ETB</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between text-slate-800 font-bold uppercase tracking-tight">
                    <span>Subtotal Price</span>
                    <span className="font-mono">{subtotal.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px] font-medium">
                    <span>Commercial VAT (15% compliance)</span>
                    <span className="font-mono font-black">+{vatAmount.toLocaleString()} ETB</span>
                  </div>
                  <div className="border-t-2 border-double border-slate-300 pt-3.5 flex justify-between text-slate-900 font-black text-lg uppercase tracking-tight">
                    <span>Total Estimated Cost</span>
                    <span className="font-mono text-blue-600">{totalPrice.toLocaleString()} ETB</span>
                  </div>
                </div>
              </div>

              {/* Reset button to submit again */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">An official confirmation PDF invoice has been emailed to <span className="text-slate-600 font-black">{formData.email}</span></p>
                <button
                  onClick={handleReset}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-5 py-3 rounded-none font-black uppercase tracking-widest text-xs flex items-center space-x-2 transition cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>REQUEST ANOTHER</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* ACTIVE INTERACTIVE FORM & CALCULATOR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Side: Form Inputs */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#F8FAFC] border-2 border-slate-200 p-6 sm:p-10 rounded-none space-y-8">
              
              {/* Section 1: Commercial Details */}
              <div className="space-y-4">
                <h3 className="font-display font-black text-slate-900 text-base uppercase tracking-tight flex items-center space-x-2">
                  <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center text-xs font-black">1</span>
                  <span>Corporate Billing Compliance</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      <span>Company Registered Name *</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Midroc Construction Ethiopia"
                      className={`w-full bg-white border-2 ${formErrors.companyName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} px-4 py-3 rounded-none text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition`}
                    />
                    {formErrors.companyName && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center space-x-1 uppercase tracking-wide">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formErrors.companyName}</span>
                      </p>
                    )}
                  </div>

                  {/* Tax ID (TIN) */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>Corporate Tax ID / TIN *</span>
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      placeholder="e.g. 0012345678 (10 digits)"
                      maxLength={12}
                      className={`w-full bg-white border-2 ${formErrors.taxId ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} px-4 py-3 rounded-none text-xs font-mono font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition`}
                    />
                    {formErrors.taxId && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center space-x-1 uppercase tracking-wide">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formErrors.taxId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div className="space-y-4 pt-6 border-t-2 border-slate-200">
                <h3 className="font-display font-black text-slate-900 text-base uppercase tracking-tight flex items-center space-x-2">
                  <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center text-xs font-black">2</span>
                  <span>Contact Personnel Info</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Contact Name */}
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span>Contact Name *</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="e.g. Abebe Kebede"
                      className={`w-full bg-white border-2 ${formErrors.contactName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} px-4 py-3 rounded-none text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition`}
                    />
                    {formErrors.contactName && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center space-x-1 uppercase tracking-wide">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formErrors.contactName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>Telephone *</span>
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. +251 911 234567"
                      className={`w-full bg-white border-2 ${formErrors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} px-4 py-3 rounded-none text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center space-x-1 uppercase tracking-wide">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formErrors.phoneNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>Corporate Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. logistics@midroc.et"
                      className={`w-full bg-white border-2 ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} px-4 py-3 rounded-none text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition`}
                    />
                    {formErrors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center space-x-1 uppercase tracking-wide">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery Details & Logistic Specifications */}
              <div className="space-y-4 pt-6 border-t-2 border-slate-200">
                <h3 className="font-display font-black text-slate-900 text-base uppercase tracking-tight flex items-center space-x-2">
                  <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center text-xs font-black">3</span>
                  <span>Logistic Configuration</span>
                </h3>

                {/* Delivery Zone Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>Select Dispatch Delivery Zone / Location *</span>
                  </label>
                  <select
                    name="deliveryZoneId"
                    value={formData.deliveryZoneId}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 transition cursor-pointer"
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} — ({zone.distanceKm} Km from Dispatch Depot)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid for Water Type, Date, and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Water Quality Grade */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <Droplet className="h-3.5 w-3.5 text-slate-400" />
                      <span>Water Quality Grade *</span>
                    </label>
                    <select
                      name="waterType"
                      value={formData.waterType}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 transition cursor-pointer"
                    >
                      <option value="potable">Potable (Drinking / Food Certified)</option>
                      <option value="industrial_non_potable">Industrial (Construction / Non-Potable)</option>
                    </select>
                  </div>

                  {/* Scheduled Date */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>Delivery Date *</span>
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 transition cursor-pointer"
                    />
                  </div>

                  {/* Scheduled Slot */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>Target Delivery Window *</span>
                    </label>
                    <select
                      name="deliveryTimeSlot"
                      value={formData.deliveryTimeSlot}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 transition cursor-pointer"
                    >
                      <option value="morning">Morning (08:00 - 12:00)</option>
                      <option value="afternoon">Afternoon (13:00 - 17:00)</option>
                    </select>
                  </div>
                </div>

                {/* Interactive Radio Group for Tanker Capacity Choice */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                    <Truck className="h-3.5 w-3.5 text-slate-400" />
                    <span>Select Tanker Volume Capacity *</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {TANKER_CAPACITIES.map((tanker) => {
                      const isSelected = formData.tankerCapacityId === tanker.id;
                      return (
                        <div
                          key={tanker.id}
                          onClick={() => onSelectTanker(tanker.id)}
                          className={`border-2 rounded-none p-4 cursor-pointer transition flex flex-col justify-between ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/40 text-blue-900'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="font-display font-black text-xs uppercase tracking-tight">{tanker.name}</span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-bold uppercase tracking-wide">
                              {tanker.capacityLiters.toLocaleString()} L capacity
                            </p>
                          </div>
                          <span className="text-xs font-mono font-black mt-3 block text-right text-slate-800">
                            {tanker.basePrice.toLocaleString()} ETB Base
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Logistical Notes & Special Offload Requirements (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g. Over 50m pump line required, discharge point is in the second basement reservoir, specific building block directions..."
                    className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-none text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-850 text-white font-black py-4 rounded-none uppercase tracking-widest text-xs transition duration-150 flex items-center justify-center space-x-2.5 cursor-pointer border-2 border-slate-900 active:scale-98"
              >
                <Truck className="h-4 w-4 shrink-0" />
                <span>SUBMIT OFFICIAL DISPATCH REQUEST</span>
              </button>

            </form>

            {/* Right Side: Live Sticky Receipt Estimator */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-none border-2 border-slate-800 sticky top-28 space-y-6">
                
                {/* Header info */}
                <div className="border-b-2 border-slate-850 pb-5">
                  <span className="text-blue-500 font-bold text-xs uppercase tracking-widest italic">REAL-TIME TARIFF ESTIMATOR</span>
                  <h3 className="font-display font-black text-xl mt-2 flex items-center justify-between uppercase tracking-tight">
                    <span>INVOICE ESTIMATION</span>
                    <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-1.5">
                    Calculated in compliance with regional bulk water rates and standardized transport logistics coefficients.
                  </p>
                </div>

                {/* Receipt Details */}
                <div className="space-y-4 text-xs font-semibold">
                  {/* Base Water Calculation */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-slate-300 block">Water Volume Cost</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5 uppercase tracking-wider">
                        {activeTanker.capacityLiters.toLocaleString()}L @ 20 Birr/Liter
                      </span>
                    </div>
                    <span className="font-mono font-black text-slate-100">{basePrice.toLocaleString()} ETB</span>
                  </div>

                  {/* Distance Calculation */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-slate-300 block">Depot Transit Logistics</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5 uppercase tracking-wider">
                        {activeZone.name} ({activeZone.distanceKm} km @ 60 Birr/km)
                      </span>
                    </div>
                    <span className="font-mono font-black text-slate-100">{distanceFee.toLocaleString()} ETB</span>
                  </div>

                  {/* Water Grade Surcharge */}
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-900">
                    <span className="text-slate-300 uppercase tracking-wider text-[10px]">Quality Grade Verification</span>
                    <span className="bg-blue-600/15 border border-blue-600/30 text-blue-400 px-2.5 py-1 rounded-none font-black font-mono uppercase tracking-widest text-[9px]">
                      {formData.waterType === 'potable' ? 'POTABLE DRINKING' : 'INDUSTRIAL GRADE'}
                    </span>
                  </div>

                  {/* Subtotal */}
                  <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center">
                    <span className="text-slate-300 font-black uppercase tracking-tight">Logistics Subtotal</span>
                    <span className="font-mono font-black text-slate-100 text-base">{subtotal.toLocaleString()} ETB</span>
                  </div>

                  {/* VAT Compliance */}
                  <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>Corporate VAT Compliance (15%)</span>
                    <span className="font-mono font-black">+{vatAmount.toLocaleString()} ETB</span>
                  </div>

                  {/* Grand Total */}
                  <div className="border-t-2 border-double border-slate-800 pt-5 flex justify-between items-baseline">
                    <span className="font-display font-black text-white text-sm uppercase tracking-wider">GRAND TOTAL (EST.)</span>
                    <div className="text-right">
                      <span className="font-mono font-black text-3xl text-blue-500">
                        {totalPrice.toLocaleString()}
                      </span>
                      <span className="font-bold text-[10px] text-slate-400 ml-1 uppercase tracking-widest">ETB</span>
                    </div>
                  </div>
                </div>

                {/* Additional Details & Assurances */}
                <div className="bg-slate-900 border-l-4 border-l-blue-600 p-4 text-[10px] text-slate-400 space-y-2 font-bold uppercase tracking-wider">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mr-2" />
                    <span>Rate matches standard 20 Birr per liter</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mr-2" />
                    <span>Includes 15% VAT corporate compliance receipt</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mr-2" />
                    <span>Auxiliary pump & custom 50m discharge line inclusive</span>
                  </div>
                </div>

                {/* Compliance Statement */}
                <div className="pt-2 text-center border-t border-slate-900">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                    This is a formal commercial invoice estimate. Operational release occurs within 15 minutes of dispatcher audit confirmation.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
