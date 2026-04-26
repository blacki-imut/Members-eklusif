import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthLayout } from "@/components/auth/AuthComponents";
import { OAuthButtons } from "@/components/auth/OAuthButtons";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast.success("Welcome back, member.", {
      description: "Successfully authenticated to Aura.",
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
            <h1 className="text-2xl font-semibold tracking-tight text-white">Sign In</h1>
            <p className="text-sm text-muted-foreground mt-2">Enter your details to access the portal</p>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <OAuthButtons disabled={isSubmitting} />
        </motion.div>

        <motion.form 
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email or Username</Label>
            <Input
              id="email"
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

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-black/20 border-white/10 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 text-white placeholder:text-white/20 h-11 pr-10 transition-all"
                {...form.register("password")}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-red-400 mt-1">
                {form.formState.errors.password.message}
              </motion.p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 pb-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={form.watch("remember")}
                onCheckedChange={(checked) => form.setValue("remember", checked as boolean)}
                disabled={isSubmitting}
                className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white/60 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
              Forgot password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium border-0 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all relative overflow-hidden group"
            disabled={isSubmitting}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="relative z-10">Sign In</span>
            )}
          </Button>
        </motion.form>

        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-6 text-center text-sm text-white/50">
          Not a member yet?{" "}
          <Link href="/register" className="text-white hover:text-purple-400 font-medium transition-colors">
            Request access
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}
