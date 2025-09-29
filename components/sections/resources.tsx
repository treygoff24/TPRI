import Link from "next/link";
import { FileText, Download, ArrowRight, BookOpen, Users, Presentation } from "lucide-react";

import type { ResourceItem } from "@/components/sections/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";

interface ResourcesSectionProps {
  resources: ResourceItem[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  // Get appropriate icon based on resource type
  const getResourceIcon = (title: string) => {
    if (title.toLowerCase().includes("backgrounder")) return BookOpen;
    if (title.toLowerCase().includes("mobilization")) return Users;
    if (title.toLowerCase().includes("outline")) return FileText;
    return Presentation;
  };

  // Get resource type badge
  const getResourceType = (title: string) => {
    if (title.toLowerCase().includes("backgrounder")) return "Backgrounder";
    if (title.toLowerCase().includes("mobilization")) return "Playbook";
    if (title.toLowerCase().includes("outline")) return "Legislative";
    return "FAQ";
  };

  return (
    <Section id="resources" className="relative overflow-hidden">
      <SectionBackground variant="hero" />

      <div className="relative z-10">
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6 dark:bg-indigo-900/20 dark:text-indigo-300">
            <FileText className="w-4 h-4 mr-2" />
            Policy Resources
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
            Resources for <span className="text-gradient">Policymakers</span>
          </h2>
          <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Download briefings and legislative tools to move the Total Political Risk Insurance Act
            forward this session.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {resources.map((resource, index) => {
            const IconComponent = getResourceIcon(resource.title);
            const resourceType = getResourceType(resource.title);

            return (
              <Card
                key={resource.id}
                hover
                emphasis
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-full flex-col gap-6">
                  {/* Header with icon and type badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium dark:bg-indigo-900/20 dark:text-indigo-300">
                      {resourceType}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-serif font-bold text-text-primary group-hover:text-gradient transition-all duration-300 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                      {resource.description}
                    </p>
                  </div>

                  {/* Download action */}
                  <div className="pt-4 border-t border-border/50">
                    <Button asChild variant="ghost" className="w-full justify-between group/btn">
                      <Link href={resource.file}>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 via-transparent to-indigo-500/20 pointer-events-none -z-10" />
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-card border border-border/50 backdrop-blur-sm">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                Need custom materials?
              </h3>
              <p className="text-text-secondary text-sm">
                Contact our policy team for tailored briefings and analysis.
              </p>
            </div>
            <Button variant="gradient" size="md" className="whitespace-nowrap">
              Contact Team
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
