'use client';

import { Phone } from 'lucide-react';

interface ProductActionsProps {
  productName: string;
  productUrl: string;
  whatsappLink: string;
}

export default function ProductActions({ productName, productUrl, whatsappLink }: ProductActionsProps) {
  
  const handleWhatsAppClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // We want to open WhatsApp immediately, but also trigger the email notification
    // We don't prevent default unless we want to do the navigation manually.
    // Letting the anchor tag handle navigation is better for UX (middle click etc), 
    // but we want to fire the email request.
    
    try {
      // Fire and forget email notification
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'WhatsApp Shopper',
          email: 'whatsapp-click@heerapannasaree.com',
          subject: `Product Interest: ${productName}`,
          message: `A user clicked the "Request Price on WhatsApp" button for the product: ${productName}.\n\nProduct Link: ${productUrl}`
        }),
      });
    } catch (error) {
      console.error('Failed to send notification email', error);
    }
  };

  return (
    <div className="space-y-4">
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white transition-transform hover:scale-[1.02] hover:bg-[#20bd5a] shadow-lg cursor-pointer"
      >
        <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Request Price on WhatsApp
      </a>
      <p className="text-[10px] md:text-xs text-center text-muted-foreground">
        Clicking this button will open WhatsApp with a pre-filled enquiry message.
      </p>
    </div>
  );
}
