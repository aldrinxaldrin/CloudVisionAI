import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cloud, CloudRain, CloudSnow, Cloudy, CloudFog } from "lucide-react";

const mockPredictions = [
  { label: "Cumulonimbus (Cb)", confidence: 85, icon: CloudRain, color: "text-blue-400", category: "Vertically Developed" },
  { label: "Cirrus (Ci)", confidence: 78, icon: Cloud, color: "text-cyan-300", category: "High-level" },
  { label: "Altocumulus (Ac)", confidence: 62, icon: Cloudy, color: "text-gray-400", category: "Mid-level" },
  { label: "Stratus (St)", confidence: 45, icon: CloudFog, color: "text-slate-400", category: "Low-level" },
  { label: "Cumulus (Cu)", confidence: 31, icon: Cloud, color: "text-indigo-400", category: "Vertically Developed" },
];

export const PredictionResults = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 flex-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        <span className="text-sm font-medium text-muted-foreground">AI Analysis Complete</span>
        <div className="h-1 flex-1 bg-gradient-to-l from-primary to-accent rounded-full"></div>
      </div>

      <Card className="bg-secondary/50 backdrop-blur-sm border-primary/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semold">Cloud Classification Results</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Top Match: {mockPredictions[0].label}
          </Badge>
        </div>

        <div className="space-y-4">
          {mockPredictions.map((prediction, index) => {
            const Icon = prediction.icon;
            return (
              <div
                key={prediction.label}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 hover:bg-card transition-all">
                  <div className={`${prediction.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium">{prediction.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">({prediction.category})</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {prediction.confidence}%
                      </span>
                    </div>
                    
                    <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {index === 0 && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-sm -z-10"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Analysis Note:</span> AI classifies clouds into categories including High-level (Cirrus, Cirrocumulus, Cirrostratus), Mid-level (Altocumulus, Altostratus, Nimbostratus), Low-level (Stratus, Stratocumulus), Vertically Developed (Cumulus, Cumulonimbus), and Other Formations (Lenticular, Mammatus, Fog, etc.).
          </p>
        </div>
      </Card>
    </div>
  );
};
