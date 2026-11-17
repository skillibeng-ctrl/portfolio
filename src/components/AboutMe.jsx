// src/components/AboutMe.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, Github, ExternalLink, // Changed 'Behance' to 'ExternalLink'
  ArrowLeft, ArrowRight, Coffee, Zap, Shield 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Footer from "./Footer";

const profileData = {
  name: "Olayinka Abdulwaheed",
  initials: "OA",
  title: "Full-Stack Developer",
  email: "avunit145@gmail.com",
  location: "Lagos, Nigeria",
  githubUrl: "https://github.com/skillibeng-ctrl",
  behanceUrl: "https://www.behance.net/skillibeng",
  profileImage: null,
};

const values = [
  {
    icon: Zap,
    title: "Performance First",
    text: "I care about how things feel. Optimizing APIs, caching data, and making sure the UI loads instantly.",
  },
  {
    icon: Shield,
    title: "Clean Architecture",
    text: "Code should be easy to read, easy to maintain, and built to scale. I write code for the next developer.",
  },
  {
    icon: Coffee,
    title: "Always Building",
    text: "Whether it's an AI gateway or an e-commerce platform, I stay in the code and keep learning.",
  },
];

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative selection:bg-purple-500/30">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white -ml-4">
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
            </a>
          </Button>
        </motion.div>

        {/* Header */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Avatar className="w-24 h-24 ring-2 ring-purple-500/30">
              {profileData.profileImage && (
                <AvatarImage src={profileData.profileImage} alt={profileData.name} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-2xl font-bold">
                {profileData.initials}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            I'm {profileData.name}.
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            A {profileData.title} based in {profileData.location}. I specialize in building production-ready web applications with React, Node.js, and MongoDB.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button asChild className="rounded-full bg-white text-black hover:bg-gray-200">
              <a href={`mailto:${profileData.email}`}>
                <Mail className="w-4 h-4 mr-2" /> Contact Me
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white">
              <a href={profileData.githubUrl} target="_blank" rel="noreferrer">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
           <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white">
  <a href={profileData.behanceUrl} target="_blank" rel="noreferrer">
    <ExternalLink className="w-4 h-4 mr-2" /> Behance
  </a>
</Button>
          </motion.div>
        </section>

        {/* The Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-none mb-20 space-y-4"
        >
          <h2 className="text-2xl font-bold text-white mb-6">My Story</h2>
          <p className="text-gray-400">
            I didn't start with a massive computer science degree. I started with curiosity. I wanted to know how the web worked, so I started building. I learned through building small projects, breaking things, and fixing them until they worked perfectly.
          </p>
          <p className="text-gray-400">
            Over time, those small projects turned into production applications serving hundreds of users. I moved from just writing code to focusing on <strong className="text-white">performance, architecture, and user experience</strong>.
          </p>
          <p className="text-gray-400">
            Now, I'm formalizing my expertise through a Diploma in Software Engineering, while building full-stack applications like an AI API Gateway and a scalable E-Commerce platform. I don't just build websites—I build tools that solve real problems.
          </p>
        </motion.section>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold text-white mb-8">How I Work</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card key={i} className="bg-white/[0.02] border-white/[0.06]">
                  <CardContent className="pt-6">
                    <Icon className="w-6 h-6 text-purple-400 mb-4" />
                    <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{value.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.section>

        {/* Nano CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 border-t border-white/[0.06]"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Want to see what I've built?</h3>
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <a href="/#projects">
              View My Projects <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}