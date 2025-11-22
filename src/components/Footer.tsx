import { Cloud } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">CloudVisionAI</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            AI-Powered Weather Image Identifier
          </p>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CloudVisionAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
