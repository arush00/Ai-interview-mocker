"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Contect from "./_components/Contect";
import Link from "next/link";
import { Book, Target, Brain, ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <div>
      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full py-8 bg-gray-100 shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <h1 className="text-3xl font-bold text-primary">AI Mock Interview</h1>
            <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="#features" className="text-lg text-gray-800 mx-2 md:mx-4">
                Features
              </a>
              <a href="#testimonials" className="text-lg text-gray-800 mx-2 md:mx-4">
                Testimonials
              </a>
              <a href="#contact" className="text-lg text-gray-800 mx-2 md:mx-4">
                Contact
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-gray-900 to-gray-400 px-6 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ace Your Next Interview</h2>
          <p className="mt-4 text-lg md:text-xl text-white">Practice with AI-powered mock interviews and get personalized feedback</p>
          <div className="mt-6 flex flex-col md:flex-row">
            <a
              href="/dashboard"
              className="px-6 py-3 mb-4 md:mb-0 md:mr-4 text-lg font-semibold bg-white !text-primary-600 rounded-lg shadow-lg hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 text-lg font-semibold border border-white rounded-lg hover:bg-white hover:text-black-600"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">Features</h2>
            <p className="mt-4 text-lg text-gray-800">Our AI Mock Interview platform offers a range of powerful features:</p>
            <div className="flex flex-wrap justify-center mt-8">
              {["AI Mock Interviews", "Instant Feedback", "Comprehensive Reports"].map((title, index) => (
                <div key={index} className="w-full md:w-1/3 px-4 py-8">
                  <div className="bg-blue-100 rounded-lg p-6 shadow-md">
                    <h3 className="text-2xl font-semibold text-black-600">{title}</h3>
                    <p className="mt-2 text-gray-600">Description for {title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-50 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center mt-8">
              {[{ name: "Arush Chaubey", quote: "The AI mock interviews were incredibly helpful." }, { name: "Sankesh Yadav", quote: "The feedback was spot on and helped me improve my answers." }].map((testimonial, index) => (
                <div key={index} className="w-full md:w-1/2 px-4 py-8">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <p className="text-gray-600">{testimonial.quote}</p>
                    <h4 className="mt-4 text-lg font-semibold text-blue-600">- {testimonial.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white px-6 md:px-0">
          <Contect />
        </section>
      </main>

      {/* Additional Resources Section */}
      <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Additional Preparation Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Explore supplementary resources to enhance your interview and career preparation journey</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 p-8 pt-0">
          {[
            { title: "Resume Building", description: "Create a standout professional resume", icon: <Book />, url: "https://www.canva.com/resumes/templates/" },
            { title: "Mock Interviews", description: "Practice with AI-powered interview simulations", icon: <Target />, url: "/dashboard" },
            { title: "Skill Assessment", description: "Identify and improve your key skills", icon: <Brain />, url: "https://www.skillvalue.com/" },
          ].map((tip, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all group">
              {tip.icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{tip.title}</h3>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              <a href={tip.url} target="_blank" rel="noopener noreferrer" className="group-hover:text-indigo-800 text-indigo-600 flex items-center justify-center">
                Explore
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-black text-white text-center">
        <p>© 2025 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;

