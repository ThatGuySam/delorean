import { APP_DEV_ORIGIN, APP_NAME } from "@repo/core/config";

import { EmailVerification } from "../templates/email-verification";

export default function EmailVerificationPreview() {
  return (
    <EmailVerification
      userName="John Doe"
      verificationUrl={`${APP_DEV_ORIGIN}/verify?token=abc123`}
      appName={APP_NAME}
      appUrl={APP_DEV_ORIGIN}
    />
  );
}
