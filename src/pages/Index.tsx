
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import TrustBuildingAnimations from "@/components/TrustBuildingAnimations";
import PricingSection from "@/components/PricingSection";
import AnimatedSocialProof from "@/components/AnimatedSocialProof";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ROICalculator from "@/components/ROICalculator";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <HeroSection />
                <TargetAudienceSection />
                <ProblemSolutionSection />
                <ROICalculator />
                <section id="features">
                    <FeaturesSection />
                </section>
                <TrustBuildingAnimations />
                <AnimatedSocialProof />
                <section id="pricing">
                    <PricingSection />
                </section>
                <section id="faq">
                    <FAQSection />
                </section>
                <TestimonialsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
