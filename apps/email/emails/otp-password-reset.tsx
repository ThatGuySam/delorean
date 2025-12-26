import { APP_DEV_ORIGIN, APP_NAME } from "@repo/core/config";

import { OTPEmail } from "../templates/otp-email";

export default function OTPPasswordResetPreview() {
  return (
    <OTPEmail
      otp="456789"
      type="forget-password"
      appName={APP_NAME}
      appUrl={APP_DEV_ORIGIN}
    />
  );
}
