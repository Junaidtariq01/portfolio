import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Layers } from "lucide-react";
import PlanSelectionModal from "@/components/PlanSelectionModal";

const pricingPlans = [
  {
    name: "Web Development",
    price: "$999",
    description: "Perfect for business websites and web applications",
    icon: <Code2 className="h-8 w-8 text-white" />,
    features: [
      "Custom website design",
      "Responsive development",
      "SEO optimization",
      "Content management system",
      "Contact form integration",
      "Social media integration",
      "3 months support",
      "Performance optimization",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Mobile Development",
    price: "$1,499",
    description: "Native and cross-platform mobile applications",
    icon: <Smartphone className="h-8 w-8 text-white" />,
    features: [
      "iOS & Android development",
      "Cross-platform solutions",
      "Push notifications",
      "Offline functionality",
      "App store optimization",
      "Analytics integration",
      "6 months support",
      "Regular updates",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Full Stack Development",
    price: "$2,499",
    description: "Complete end-to-end development solutions",
    icon: <Layers className="h-8 w-8 text-white" />,
    features: [
      "Frontend & Backend development",
      "Database design & integration",
      "API development",
      "Authentication system",
      "Cloud deployment",
      "Security implementation",
      "12 months support",
      "Priority maintenance",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan: { name: string; price: string }) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 w-full z-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Pricing
          </span>
          <h2 className="text-4xl font-bold mb-4 text-[var(--text-secondary)]">
            Development Services
          </h2>
          <p className="text-sm font-normal leading-6 opacity-65 text-[var(--text-secodary)] max-w-2xl mx-auto">
            Choose the perfect development solution for your project. All plans
            include our core features and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border border-gray-200 rounded-md p-6 md:p-8 flex flex-col gap-6 ${
                plan.popular ? "ring-2 ring-[var(--text-primary)]" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-[var(--text-primary)] text-white text-center py-2">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-[#EF6C57]">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-secondary)]">
                    {plan.name}
                  </h3>
                </div>
                <div className="text-4xl font-bold mb-4 text-[var(--text-secondary)]">
                  {plan.price}
                  <span className="text-sm font-normal leading-6 opacity-65 text-[var(--text-secodary)]">
                    /project
                  </span>
                </div>
                <p className="text-sm font-normal leading-6 opacity-65 text-[var(--text-secodary)] mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm font-normal leading-6 opacity-65 text-[var(--text-secodary)]"
                    >
                      <svg
                        className="w-5 h-5 text-[var(--text-primary)] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handlePlanSelect({ name: plan.name, price: plan.price })
                  }
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-[var(--text-primary)] text-white hover:bg-[#ef6d58]/90"
                      : "bg-[var(--text-primary)] text-white hover:bg-[#ef6d58]/90"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PlanSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};

export default PricingSection;
