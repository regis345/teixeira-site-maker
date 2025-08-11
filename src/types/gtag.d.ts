declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    trackWhatsAppConversion: () => void;
    trackPhoneConversion: () => void;
    trackFormConversion: () => void;
  }
}

export {};