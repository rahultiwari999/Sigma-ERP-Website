import type { LucideIcon } from 'lucide-react';
import {
  Receipt, Boxes, Zap, BarChart3, ShieldCheck, TrendingUp, ShoppingCart,
  Users, Truck, FileText, Pill, Building2, Store, Briefcase, Rocket,
  Sparkles, Layers, Network, Target,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Receipt, Boxes, Zap, BarChart3, ShieldCheck, TrendingUp, ShoppingCart,
  Users, Truck, FileText, Pill, Building2, Store, Briefcase, Rocket,
  Sparkles, Layers, Network, Target,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
