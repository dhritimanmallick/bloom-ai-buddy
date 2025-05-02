
import React from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import UserProfile from '@/components/UserProfile';
import EmergencySupport from '@/components/EmergencySupport';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import ResourceSection from '@/components/ResourceSection';
import Footer from '@/components/Footer';
import { ChatProvider } from '@/contexts/ChatContext';

const Index = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left sidebar */}
              <div className="space-y-6">
                <UserProfile />
                <EmergencySupport />
              </div>
              
              {/* Main chat area */}
              <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm overflow-hidden h-[600px] order-first lg:order-none">
                <ChatInterface />
              </div>
              
              {/* Right sidebar */}
              <div className="space-y-6">
                <AppointmentScheduler />
                <ResourceSection />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ChatProvider>
  );
};

export default Index;
