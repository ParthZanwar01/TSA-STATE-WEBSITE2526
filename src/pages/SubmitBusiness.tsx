import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { categories } from '@/data/businessData';
import { toast } from '@/hooks/use-toast';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';

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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Thank You!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your business has been submitted for review. We'll reach out to <strong className="text-foreground">{form.ownerEmail}</strong> once it's approved.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-navy-light transition-colors depth-shadow"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const inputClass = (field: keyof BusinessForm) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all ${errors[field] ? 'border-destructive ring-1 ring-destructive/30' : 'border-border'}`;

  const Field = ({ label, field, type = 'text', placeholder, required = false, children }: {
    label: string; field: keyof BusinessForm; type?: string;
    placeholder?: string; required?: boolean; children?: React.ReactNode;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children || (
        <input
          type={type}
          value={form[field] as string}
          onChange={e => update(field, e.target.value)}
          placeholder={placeholder}
          className={inputClass(field)}
        />
      )}
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-xs mt-1.5 font-medium"
        >
          {errors[field]}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="bg-primary py-16 md:py-20 px-6 relative">
          <FloatingOrbs className="opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-80" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto relative z-10"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
              Submit Your <span className="text-gold">Business</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg">Join the Cypress LocalLink directory and connect with your community</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        <ScrollFadeIn>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Info */}
            <GlassCard glow className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">Business Information</h2>
              </div>

              <div className="space-y-5">
                <Field label="Business Name" field="name" placeholder="e.g. Cypress Coffee Co." required />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Category" field="category" required>
                    <select
                      value={form.category}
                      onChange={e => update('category', e.target.value)}
                      className={inputClass('category')}
                    >
                      <option value="">Select a category</option>
                      {categories.map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Price Range" field="priceRange" required>
                    <select
                      value={form.priceRange}
                      onChange={e => update('priceRange', e.target.value)}
                      className={inputClass('priceRange')}
                    >
                      <option value="">Select price range</option>
                      <option value="$">$ — Budget-friendly</option>
                      <option value="$$">$$ — Moderate</option>
                      <option value="$$$">$$$ — Upscale</option>
                      <option value="Free">Free</option>
                    </select>
                  </Field>
                </div>

                <Field label="Address" field="address" placeholder="e.g. 123 Main Street, Cypress, TX" required />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Phone Number" field="phone" type="tel" placeholder="(281) 555-0123" />
                  <Field label="Website" field="website" type="url" placeholder="https://yourbusiness.com" />
                </div>

                <Field label="Business Hours" field="hours" placeholder="e.g. Mon-Fri 9am-6pm, Sat 10am-4pm" />

                <Field label="Description" field="description" required>
                  <textarea
                    value={form.description}
                    onChange={e => update('description', e.target.value)}
                    placeholder="Tell customers what makes your business special (20-500 characters)"
                    rows={4}
                    className={`${inputClass('description')} resize-none`}
                  />
                  <div className="flex justify-between mt-1.5">
                    {errors.description && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs font-medium">
                        {errors.description}
                      </motion.p>
                    )}
                    <p className={`text-xs ml-auto ${form.description.length > 450 ? 'text-gold' : 'text-muted-foreground'}`}>
                      {form.description.length}/500
                    </p>
                  </div>
                </Field>
              </div>
            </GlassCard>

            {/* Owner Info */}
            <GlassCard glow className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">Owner / Contact</h2>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Your Name" field="ownerName" placeholder="Full name" required />
                  <Field label="Email Address" field="ownerEmail" type="email" placeholder="you@email.com" required />
                </div>
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-3">
                  Your contact info is kept private and used only for listing verification.
                </p>
              </div>
            </GlassCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => { setForm(initialForm); setErrors({}); }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-border text-muted-foreground font-semibold hover:border-foreground hover:text-foreground transition-colors"
              >
                Reset Form
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-navy-light transition-colors depth-shadow"
              >
                Submit Business
              </motion.button>
            </div>
          </form>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default SubmitBusiness;
