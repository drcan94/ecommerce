import { NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/utils/mailchimp/sendNewsletterEmail";
// import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Admin yetkisi kontrolü
    // const session = await auth();
    // if (!session?.user?.role === 'ADMIN') {
    //   return NextResponse.json(
    //     {
    //       error: "Unauthorized access",
    //       details: "You don't have permission to send newsletters"
    //     },
    //     { status: 401 }
    //   );
    // }

    const { subject, content, fromName, replyTo, previewText } =
      await request.json();

    // Input validasyonu
    if (!subject?.trim()) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: "Subject is required",
        },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: "Content is required",
        },
        { status: 400 }
      );
    }

    // Newsletter gönder
    const result = await sendNewsletterEmail({
      subject,
      content,
      fromName,
      replyTo,
      previewText,
    });

    return NextResponse.json({
      success: true,
      campaignId: result.campaignId,
    });
  } catch (error: any) {
    console.error("Newsletter sending error:", error);

    // Mailchimp'ten gelen hatayı yakalayıp daha detaylı bilgi gönderelim
    const errorDetails =
      error.response?.body?.detail || error.message || "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to send newsletter",
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
