import { APP_DEV_ORIGIN, APP_NAME } from "@repo/core/config";

import { OTPEmail } from "../templates/otp-email";

export default function OTPSignInPreview() {
  return (
    <OTPEmail
      otp="123456"
      type="sign-in"
      appName={APP_NAME}
      appUrl={APP_DEV_ORIGIN}
    />
  );
}
