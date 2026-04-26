import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/AuthComponents";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast.success("Recovery email sent.", {
      description: "If an account exists, you will receive reset instructions.",
    });
  };

  return (
    <AuthLayout>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-2">Enter your email to receive recovery instructions</p>
          </div>
        </motion.div>

        {!isSubmitSuccessful ? (
          <motion.form 
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="bg-black/20 border-white/10 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 text-white placeholder:text-white/20 h-11 transition-all"
                {...form.register("email")}
                disabled={isSubmitting}
              />
              {form.formState.errors.email && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-red-400 mt-1">
                  {form.formState.errors.email.message}
                </motion.p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium border-0 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all relative overflow-hidden group"
              disabled={isSubmitting}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="relative z-10">Send Reset Link</span>
              )}
            </Button>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-white/[0.02] border border-white/10 rounded-xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.000.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-white">Check your email</h3>
            <p className="text-sm text-white/60">
              We sent a password reset link to <span className="text-white font-medium">{form.getValues().email}</span>.
            </p>
          </motion.div>
        )}

        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 text-center text-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to sign in
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}
