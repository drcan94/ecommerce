import { useState } from "react";
import { toast } from "sonner";

type SendNewsletterParams = {
  subject: string;
  content: string;
  fromName?: string;
  replyTo?: string;
  previewText?: string;
};

export function useNewsletterSending() {
  const [isSending, setIsSending] = useState(false);

  const sendNewsletter = async ({
    subject,
    content,
    fromName,
    replyTo,
    previewText,
  }: SendNewsletterParams) => {
    setIsSending(true);

    try {
      const response = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          content,
          fromName,
          replyTo,
          previewText: previewText || subject,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          JSON.stringify({
            message: data.error,
            details: data.details,
          })
        );
      }

      toast.success("Newsletter sent successfully!", {
        description: "Your newsletter has been sent to all subscribers.",
      });

      return data;
    } catch (error: any) {
      let errorMessage = "Failed to send newsletter";
      let errorDetails = "Please try again later.";

      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message;
        errorDetails = parsedError.details;
      } catch {
        errorDetails = error.message;
      }

      console.log("Newsletter Error:", {
        message: errorMessage,
        details: errorDetails,
      });

      toast.error(errorMessage, {
        description: errorDetails,
      });

      throw error;
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendNewsletter,
    isSending,
  };
}
