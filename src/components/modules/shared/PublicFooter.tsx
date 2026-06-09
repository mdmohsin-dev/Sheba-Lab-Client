import {
    Activity,
    Mail,
    Phone,
    MapPin,
} from 'lucide-react'
import Link from 'next/link'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs'
export function PublicFooter() {
    return (
        <footer className="bg-slate-100 pt-16 pb-8 mt-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">
                                Sheba Lab
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Transforming healthcare with AI-powered doctor recommendations,
                            seamless appointments, and comprehensive medical records
                            management.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <BsTwitterX className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <BsFacebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <BsInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <BsLinkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/doctors"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Find a Doctor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ai-finder"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    AI Symptom Checker
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/accessibility"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Accessibility
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">
                                    123 Healthcare Blvd, Medical District, NY 10001
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                    +1 (800) 123-4567
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                    support@medicareai.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Sheba Lab. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <span className="text-red-500">♥</span>
                        <span>for better healthcare</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
