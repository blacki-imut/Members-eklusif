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
import { AuthLayout } from "@/components/auth/AuthComponents";
import { OAuthButtons } from "@/components/auth/OAuthButtons";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (_data: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Pendaftaran terkirim.", {
      description: "Permintaan akses member eksklusif Anda akan segera ditinjau.",
    });
    setLocation("/");
  };

  return (
    <AuthLayout brandMessage="daftar ke akun member ekslusif di ABANGADEKganteng khusus untuk fitur member ekslusif yang tidak bisa di dapatkan oleh member biasanya">
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Apply for Access</h1>
            <p className="text-sm text-muted-foreground mt-2">Join the exclusive network</p>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <OAuthButtons disabled={isSubmitting} />
        </motion.div>

        <motion.form 
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4 mt-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white/80">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Jane Doe"
                className="bg-black/20 border-white/10 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 text-white placeholder:text-white/20 h-11 transition-all"
                {...form.register("fullName")}
                disabled={isSubmitting}
              />
              {form.formState.errors.fullName && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-red-400 mt-1">
                  {form.formState.errors.fullName.message}
                </motion.p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/80">Username</Label>
              <Input
                id="username"
                placeholder="janedoe"
                className="bg-black/20 border-white/10 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 text-white placeholder:text-white/20 h-11 transition-all"
                {...form.register("username")}
                disabled={isSubmitting}
              />
              {form.formState.errors.username && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-red-400 mt-1">
                  {form.formState.errors.username.message}
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
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

          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/80">Confirm</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-black/20 border-white/10 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 text-white placeholder:text-white/20 h-11 pr-10 transition-all"
                  {...form.register("confirmPassword")}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-red-400 mt-1">
                  {form.formState.errors.confirmPassword.message}
                </motion.p>
              )}
            </div>
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
              <span className="relative z-10">Create Account</span>
            )}
          </Button>
        </motion.form>

        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-6 text-center text-sm text-white/50">
          Already a member?{" "}
          <Link href="/" className="text-white hover:text-purple-400 font-medium transition-colors">
            Sign in
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}
