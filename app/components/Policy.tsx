import { RefreshCw, RotateCcw, Star } from "lucide-react"

export default function Policy() {
  return (
    <div 
      className="w-full px-6 py-8 bg-background rounded-lg shadow-sm "
      role="region" 
      aria-label="Product Features"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <FeatureItem icon={RefreshCw} text="Exchange Old Products" />
        <FeatureItem icon={RotateCcw} text="X Day Return Policy" />
        <FeatureItem icon={Star} text="Another Feature" />
      </div>
    </div>
  )
}

function FeatureItem({ 
  icon: Icon, 
  text
}: { 
  icon: React.ElementType
  text: string
}) {
  return (
    <div className="group flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg transition-colors hover:bg-muted/50">
      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform group-hover:scale-105">
        <Icon className="w-6 h-6 sm:w-5 sm:h-5 text-primary group-hover:text-primary/80" />
      </div>
      <span className="text-sm font-medium text-foreground">{text}</span>
    </div>
  )
}