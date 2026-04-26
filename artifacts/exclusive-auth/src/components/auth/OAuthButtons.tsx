import { FC, useState } from "react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const OAuthButtons: FC<{ disabled?: boolean }> = ({ disabled }) => {
  const handleOAuth = (provider: string) => {
    toast(`Connecting to ${provider}...`);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-3 gap-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all h-11"
            onClick={() => handleOAuth("Google")}
            disabled={disabled}
            type="button"
          >
            <FaGoogle className="w-4 h-4 text-white/80" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all h-11"
            onClick={() => handleOAuth("GitHub")}
            disabled={disabled}
            type="button"
          >
            <FaGithub className="w-4 h-4 text-white/80" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all h-11"
            onClick={() => handleOAuth("Apple")}
            disabled={disabled}
            type="button"
          >
            <FaApple className="w-4 h-4 text-white/80" />
          </Button>
        </motion.div>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background/80 px-2 text-muted-foreground backdrop-blur-sm">
            Or continue with email
          </span>
        </div>
      </div>
    </div>
  );
};
