import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { MapPin, Phone, Clock, DollarSign, Tag, FileText, Building2, CheckCircle } from 'lucide-react';
import { categories } from '@/data/businessData';
import { toast } from '@/hooks/use-toast';

const businessSchema = z.object({
  name: z.string().trim().min(2, "Business name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  category: z.string().min(1, "Please select a category"),
  address: z.string().trim().min(5, "Please enter a valid address").max(200, "Address must be less than 200 characters"),
  phone: z.string().trim().regex(/^[\d\s\-\(\)\+]*$/, "Invalid phone number format").max(20, "Phone number too long").optional().or(z.literal("")),
  website: z.string().trim().url("Please enter a valid URL").max(255, "URL too long").optional().or(z.literal("")),
  priceRange: z.string().min(1, "Please select a price range"),
  description: z.string().trim().min(20, "Description must be at least 20 characters").max(500, "Description must be less than 500 characters"),
  ownerName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  ownerEmail: z.string().trim().email("Please enter a valid email address").max(255, "Email too long"),
  hours: z.string().trim().max(200, "Hours description too long").optional().or(z.literal("")),
});

type BusinessForm = z.infer<typeof businessSchema>;

const initialForm: BusinessForm = {
  name: '', category: '', address: '', phone: '', website: '',
  priceRange: '', description: '', ownerName: '', ownerEmail: '', hours: '',
};

const SubmitBusiness = () => {
  const [form, setForm] = useState<BusinessForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const update = (field: keyof BusinessForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = businessSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BusinessForm, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof BusinessForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    toast({ title: "Submission received!", description: "We'll review your business listing shortly." });
  };

  if (submitted) {
    return (
      <div className="pt-20 pb-16 bg-background min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Thank You!</h1>
          <p className="text-muted-foreground mb-8">
            Your business has been submitted for review. We'll reach out to <strong className="text-foreground">{form.ownerEmail}</strong> once it's approved.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-navy-light transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const Field = ({ label, field, icon: Icon, type = 'text', placeholder, required = false, children }: {
    label: string; field: keyof BusinessForm; icon: React.ElementType; type?: string;
    placeholder?: string; required?: boolean; children?: React.ReactNode;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
        <Icon className="w-4 h-4 text-gold" />
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children || (
        <input
          type={type}
          value={form[field] as string}
          onChange={e => update(field, e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-shadow ${errors[field] ? 'border-destructive' : 'border-border'}`}
        />
      )}
      {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="bg-primary py-12 px-6 mb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
            Submit Your Business
          </h1>
          <p className="text-primary-foreground/70">Join the Cypress LocalLink directory and connect with your community</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <ScrollFadeIn>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Info */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground">Business Information</h2>

              <Field label="Business Name" field="name" icon={Building2} placeholder="e.g. Cypress Coffee Co." required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Category" field="category" icon={Tag} required>
                  <select
                    value={form.category}
                    onChange={e => update('category', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-gold/30 ${errors.category ? 'border-destructive' : 'border-border'}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Price Range" field="priceRange" icon={DollarSign} required>
                  <select
                    value={form.priceRange}
                    onChange={e => update('priceRange', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-gold/30 ${errors.priceRange ? 'border-destructive' : 'border-border'}`}
                  >
                    <option value="">Select price range</option>
                    <option value="$">$ — Budget-friendly</option>
                    <option value="$$">$$ — Moderate</option>
                    <option value="$$$">$$$ — Upscale</option>
                    <option value="Free">Free</option>
                  </select>
                </Field>
              </div>

              <Field label="Address" field="address" icon={MapPin} placeholder="e.g. 123 Main Street, Cypress, TX" required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Phone Number" field="phone" icon={Phone} type="tel" placeholder="(281) 555-0123" />
                <Field label="Website" field="website" icon={FileText} type="url" placeholder="https://yourbusiness.com" />
              </div>

              <Field label="Business Hours" field="hours" icon={Clock} placeholder="e.g. Mon-Fri 9am-6pm, Sat 10am-4pm" />

              <Field label="Description" field="description" icon={FileText} required>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="Tell customers what makes your business special (20-500 characters)"
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 resize-none transition-shadow ${errors.description ? 'border-destructive' : 'border-border'}`}
                />
                <p className="text-xs text-muted-foreground mt-1">{form.description.length}/500 characters</p>
              </Field>
            </div>

            {/* Owner Info */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground">Owner / Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your Name" field="ownerName" icon={Building2} placeholder="Full name" required />
                <Field label="Email Address" field="ownerEmail" icon={FileText} type="email" placeholder="you@email.com" required />
              </div>
              <p className="text-xs text-muted-foreground">Your contact info is kept private and used only for listing verification.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => { setForm(initialForm); setErrors({}); }}
                className="px-6 py-3 rounded-full border-2 border-border text-muted-foreground font-semibold hover:border-foreground hover:text-foreground transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-navy-light transition-colors"
              >
                Submit Business
              </button>
            </div>
          </form>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default SubmitBusiness;
