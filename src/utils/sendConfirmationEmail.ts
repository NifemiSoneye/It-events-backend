import resend from "../config/resend";

interface EmailParams {
  username: string;
  email: string;
  ticket?: number;
}

export const sendConfirmationEmail = async ({
  username,
  email,
  ticket,
}: EmailParams) => {
  await resend.emails.send({
    from: "onboarding@resend.dev", // swap for your domain later
    to: email,
    subject: "You're registered for Tech Meetup 2026! 🎉",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">You're in, ${username}! 🎉</h2>
        <p>Thanks for registering for <strong>Tech Meetup 2026</strong>.</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Your ticket number</p>
          <p style="margin: 4px 0 0; font-size: 32px; font-weight: bold; color: #16a34a;">
            #${ticket ?? "N/A"}
            </p>
        </div>
        <p>We'll see you at the event. Stay tuned for more details!</p>
        <p style="color: #6b7280; font-size: 12px;">If you didn't register for this event, please ignore this email.</p>
      </div>
    `,
  });
};
