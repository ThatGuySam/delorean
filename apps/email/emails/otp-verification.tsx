import { APP_DEV_ORIGIN, APP_NAME } from "@repo/core/config";

import { OTPEmail } from "../templates/otp-email";

export default function OTPVerificationPreview() {
  return (
    <OTPEmail
      otp="789012"
      type="email-verification"
      appName={APP_NAME}
      appUrl={APP_DEV_ORIGIN}
    />
  );
}
