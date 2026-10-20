import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HubExplorer from './components/HubExplorer';
import Showcase from './components/Showcase';
import Expertise from './components/Expertise';
import Milestones from './components/Milestones';
import FAQ from './components/FAQ';
import Inquiry from './components/Inquiry';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import { findProject } from './data/portfolio';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);

  const handleOpenProject = (id) => {
    setSelectedProjectId(id);
    setSelectedScreen(null);
  };

  const handleOpenScreen = (screen) => {
    setSelectedScreen(screen);
    setSelectedProjectId(screen.projectId);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
    setSelectedScreen(null);
  };

  const activeProject = selectedProjectId ? findProject(selectedProjectId) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Background radial glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[32rem] h-[32rem] bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 right-10 w-[28rem] h-[28rem] bg-indigo-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-20 left-10 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero onOpenFlareAlert={() => handleOpenProject('flare-alert')} />
          <HubExplorer onOpenProject={handleOpenProject} />
          <Showcase onOpenScreen={handleOpenScreen} />
          <Expertise />
          <Milestones />
          <FAQ />
          <Inquiry />
        </main>
        <Footer />
      </div>

      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          screen={selectedScreen}
          onClose={handleCloseModal}
          onSelectScreen={(screen) => setSelectedScreen(screen)}
        />
      )}
    </div>
  );
}
