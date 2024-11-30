import mailchimp from "./config";

type SendNewsletterEmailProps = {
  subject: string;
  content: string;
  fromName?: string;
  replyTo?: string;
  previewText?: string;
};

export async function sendNewsletterEmail({
  subject,
  content,
  fromName = process.env.MAILCHIMP_FROM_NAME || "Ecommerce Store",
  replyTo = process.env.MAILCHIMP_REPLY_TO_EMAIL,
  previewText,
}: SendNewsletterEmailProps) {
  try {
    const listId = process.env.MAILCHIMP_LIST_ID!;

    // Campaign oluştur
    const campaign = await mailchimp.campaigns.create({
      type: "regular",
      settings: {
        subject_line: subject,
        preview_text: previewText || subject,
        title: `Newsletter: ${subject}`,
        from_name: fromName,
        reply_to: replyTo,
        to_name: "*|FNAME|*",
        auto_footer: true,
        inline_css: true,
      },
      recipients: {
        list_id: listId,
      },
    });

    // Campaign içeriğini ayarla
    await mailchimp.campaigns.setContent(campaign.id, {
      html: content,
    });

    // Campaign'i gönder
    await mailchimp.campaigns.send(campaign.id);

    return {
      success: true,
      campaignId: campaign.id,
    };
  } catch (error) {
    console.error("Failed to send newsletter:", error);
    throw error;
  }
}
