import { APP_DEV_ORIGIN, APP_NAME } from "@repo/core/config";

import { PasswordReset } from "../templates/password-reset";

export default function PasswordResetPreview() {
  return (
    <PasswordReset
      userName="John Doe"
      resetUrl={`${APP_DEV_ORIGIN}/reset?token=xyz789`}
      appName={APP_NAME}
      appUrl={APP_DEV_ORIGIN}
    />
  );
}
