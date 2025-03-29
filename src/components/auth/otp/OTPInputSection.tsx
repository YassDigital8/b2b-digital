
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Define the form schema for the component
export const otpFormSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits' }),
});

export type OTPFormValues = z.infer<typeof otpFormSchema>;

interface OTPInputSectionProps {
  form: UseFormReturn<OTPFormValues>;
}

const OTPInputSection = ({ form }: OTPInputSectionProps) => {
  return (
    <FormField
      control={form.control}
      name="otp"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-center">
            <FormControl>
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default OTPInputSection;
