import { Card } from "./ui/card";
import { Brain, Database, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Model",
    description: "Trained on thousands of weather images using deep learning algorithms",
  },
  {
    icon: Database,
    title: "Extensive Dataset",
    description: "Powered by comprehensive weather pattern databases from global sources",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get weather predictions in seconds with high accuracy confidence scores",
  },
  {
    icon: Shield,
    title: "Reliable Results",
    description: "Validated predictions with detailed confidence metrics for each classification",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About CloudVisionAI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system uses cutting-edge machine learning to identify weather patterns
            from cloud formations with remarkable accuracy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all hover:shadow-glow group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/20">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">How It Works</h3>
            <p className="text-muted-foreground mb-4">
              CloudVisionAI employs a convolutional neural network (CNN) architecture trained on
              diverse weather datasets. The model analyzes cloud formations, density patterns, color
              gradients, and atmospheric indicators to classify weather conditions.
            </p>
            <p className="text-muted-foreground">
              Each prediction comes with a confidence score, providing transparency in the AI's
              decision-making process. Our system continuously learns and improves accuracy through
              advanced machine learning techniques.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
