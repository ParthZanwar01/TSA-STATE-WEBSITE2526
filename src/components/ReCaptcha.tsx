/**
 * Google reCAPTCHA v2 wrapper. Uses VITE_RECAPTCHA_SITE_KEY from env.
 * For dev: Google test key 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI always passes.
 * For prod: Get keys at https://www.google.com/recaptcha/admin
 */

import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  className?: string;
}

export const ReCaptcha = ({ onVerify, onExpire, theme = 'light', size = 'normal', className = '' }: ReCaptchaProps) => (
  <div className={`w-full min-w-0 ${className}`}>
    <ReCAPTCHA
      sitekey={SITE_KEY}
      theme={theme}
      size={size}
      onChange={onVerify}
      onExpired={() => {
        onVerify(null);
        onExpire?.();
      }}
      onErrored={() => onVerify(null)}
    />
  </div>
);
