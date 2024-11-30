import { NextResponse } from "next/server";
import mailchimp, { ErrorResponse } from "@mailchimp/mailchimp_marketing";

// Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // örn: 'us21'
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.length) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
      // Mailchimp list/audience ID'si
      const listId = process.env.MAILCHIMP_LIST_ID;

      // Subscribe the user
      await mailchimp.lists.addListMember(listId!, {
        email_address: email,
        status: "subscribed",
      });

      return NextResponse.json(
        { message: "Successfully subscribed to the newsletter!" },
        { status: 200 }
      );
    } catch (error) {
      const mailchimpError = error as { response: { body: ErrorResponse } };
      const actualError = mailchimpError.response.body;
      if (actualError.title === "Member Exists") {
        return NextResponse.json(
          {
            error: "You're already subscribed to our newsletter!",
          },
          { status: 400 }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
