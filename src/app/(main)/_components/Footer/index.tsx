import { FC } from "react";
import Link from "next/link";
import MasterCard from "./_components/icons/master-card";
import Visa from "./_components/icons/visa";
import PayPal from "./_components/icons/paypal";
import Facebook from "@/app/(main)/_components/Footer/_components/icons/facebook";
import Instagram from "@/app/(main)/_components/Footer/_components/icons/instagram";
import X from "@/app/(main)/_components/Footer/_components/icons/x";
import NewsletterForm from "@/app/(main)/_components/Footer/_components/NewsletterForm";

// Reusable FooterLink component
const FooterLink: FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="inline-block py-1.5 transition-all duration-200 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 hover:translate-x-1 w-full text-center"
  >
    {children}
  </Link>
);

// Reusable FooterSection component
const FooterSection: FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="space-y-4 w-full text-center">
    <h2 className="text-base font-bold sm:text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
      {title}
    </h2>
    {children}
  </div>
);

const SocialLink: FC<{
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}> = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:fill-gray-200 dark:hover:text-gray-200 dark:hover:bg-gray-800"
  >
    <Icon className="w-5 h-5 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-gray-200" />
  </a>
);

const EcommerceFooter: FC = () => {
  return (
    <footer className="relative border-t bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-wrap justify-evenly gap-y-8 gap-x-4">
          <div className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[200px]">
            <FooterSection title="Shop">
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/products">All Products</FooterLink>
                </li>
                <li>
                  <FooterLink href="/categories">Categories</FooterLink>
                </li>
                <li>
                  <FooterLink href="/new-arrivals">New Arrivals</FooterLink>
                </li>
                <li>
                  <FooterLink href="/sales">Sales</FooterLink>
                </li>
              </ul>
            </FooterSection>
          </div>

          <div className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[200px]">
            <FooterSection title="Customer Service">
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/faq">FAQ</FooterLink>
                </li>
                <li>
                  <FooterLink href="/shipping">Shipping Info</FooterLink>
                </li>
                <li>
                  <FooterLink href="/returns">Returns</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact Us</FooterLink>
                </li>
              </ul>
            </FooterSection>
          </div>

          <div className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[200px]">
            <FooterSection title="About">
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/about-us">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">Careers</FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                </li>
                <li>
                  <FooterLink href="/terms">Terms of Service</FooterLink>
                </li>
              </ul>
            </FooterSection>
          </div>

          <div className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[200px]">
            <FooterSection title="Follow Us">
              <div className="flex items-center justify-center space-x-1">
                {[
                  {
                    icon: Facebook,
                    href: "https://facebook.com",
                  },
                  {
                    icon: Instagram,
                    href: "https://instagram.com",
                  },
                  { icon: X, href: "https://twitter.com" },
                ].map((social) => (
                  <SocialLink key={social.href} {...social} />
                ))}
              </div>
            </FooterSection>
          </div>

          <div className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[200px]">
            <FooterSection title="Payment Methods">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center w-8 h-8 justify-center">
                  <Visa className="w-full h-full" />
                </div>

                <div className="flex items-center w-8 h-8 justify-center">
                  <MasterCard className="w-full h-full" />
                </div>

                <div className="flex items-center w-8 h-8 justify-center">
                  <PayPal className="w-full h-full" />
                </div>
              </div>
            </FooterSection>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <NewsletterForm />
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Your E-Commerce Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EcommerceFooter;
