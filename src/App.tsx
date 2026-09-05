import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ProgressProvider, WorldId } from './context/ProgressContext';
import HomeScreen from './pages/HomeScreen';
import LettersWorld from './pages/LettersWorld';
import WordsWorld from './pages/WordsWorld';

type Screen = 'home' | WorldId;

function AppContent() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <PageTransition key="home">
            <HomeScreen onSelectWorld={(world) => setScreen(world)} />
          </PageTransition>
        )}
        {screen === 'letters' && (
          <PageTransition key="letters">
            <LettersWorld onBack={() => setScreen('home')} />
          </PageTransition>
        )}
        {screen === 'words' && (
          <PageTransition key="words">
            <WordsWorld onBack={() => setScreen('home')} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
