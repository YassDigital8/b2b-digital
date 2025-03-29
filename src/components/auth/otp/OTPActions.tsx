
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface OTPActionsProps {
  isLoading: boolean;
  onSubmit: () => void;
  onResend: () => Promise<void>;
  onChangeAccount: () => void;
}

const OTPActions = ({ 
  isLoading, 
  onSubmit, 
  onResend, 
  onChangeAccount 
}: OTPActionsProps) => {
  const [resendLoading, setResendLoading] = useState(false);
  
  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      await onResend();
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        type="submit" 
        className="w-full bg-chamBlue hover:bg-chamBlue/90"
        disabled={isLoading || resendLoading}
        onClick={onSubmit}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : 'Verify OTP'}
      </Button>
      
      <div className="flex flex-col items-center gap-2 text-sm">
        <p className="text-gray-500">Didn't receive the code?</p>
        <Button 
          variant="link" 
          className="text-chamBlue hover:text-chamGold"
          onClick={handleResendOTP}
          disabled={resendLoading || isLoading}
        >
          {resendLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Resending...
            </>
          ) : 'Resend Code'}
        </Button>
        
        <Button 
          variant="link" 
          className="text-gray-500 hover:text-gray-700"
          onClick={onChangeAccount}
          disabled={isLoading || resendLoading}
        >
          Use a different account
        </Button>
      </div>
    </div>
  );
};

export default OTPActions;
