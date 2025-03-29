
import { CardDescription, CardTitle } from "@/components/ui/card";

interface OTPHeaderProps {
  email: string | null;
}

const OTPHeader = ({ email }: OTPHeaderProps) => {
  return (
    <>
      <CardTitle className="text-2xl text-chamBlue mb-2">
        Verify Your Email
      </CardTitle>
      <CardDescription>
        Enter the 6-digit code sent to {email}
      </CardDescription>
    </>
  );
};

export default OTPHeader;
