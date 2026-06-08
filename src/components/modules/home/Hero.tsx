'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Shield, Search, Calendar, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import doctorImage from '../../../assets/images/Doctor.png'
import doctorImage2 from '../../../assets/images/Doctor2.jpg'

const Hero = () => {
  return (
    <div className="relative z-0 min-h-screen"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #0071DF 100%)", }}>
      <section className="relative container px-4 mx-auto">

        {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5"></div> */}
        <div className="relative z-10">
          <div className="flex min-h-screen justify-between gap-6 items-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="max-w-2xl"
            >
              <Badge
                variant="secondary"
                className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                <Shield className="w-3 h-3 mr-1" /> Trusted Healthcare Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Find the Right Doctor for Your{' '}
                <span className="text-primary">Health Needs</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Experience the future of healthcare. Use our AI-powered platform
                to find the perfect specialist, book appointments instantly, and
                manage your medical records securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base h-12 px-8" asChild>
                  <Link href="/doctors">
                    Find a Doctor <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8"
                  asChild
                >
                  <Link href="/register">
                    Book Appointment <Calendar className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm text-slate-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Patient"
                    />
                  ))}
                </div>
                <p>
                  Join{' '}
                  <span className="font-semibold text-slate-900">50,000+</span>{' '}
                  happy patients
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="relative hidden lg:block  max-w-xl w-full"
            >
              <div className="relative  overflow-hidden">
                {/* <img
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Healthcare"
                  className="w-full h-auto object-cover"
                /> */}
                <Image
                  src={doctorImage2}
                  alt="Modern Healthcare"
                  className="w-full h-auto object-cover"
                />
                {/* <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div> */}
              </div>

              {/* Floating Card */}
              <Card className="absolute -bottom-6 -left-6 w-52 shadow-xl border-none">
                <CardContent className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      AI Accuracy
                    </p>
                    <p className="text-xl font-bold text-slate-900">98.5%</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;