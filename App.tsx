
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  ChevronRight,
  Code2,
  Database,
  Monitor,
  Layout as LayoutIcon,
  Globe,
  Phone,
  PlayCircle,
  Menu,
  X,
  Command as CommandIcon,
  Activity,
  Cpu as CpuIcon,
  HardDrive,
  Cloud,
  Server,
  Search,
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, EXPERIENCES, PROJECTS, EDUCATION } from './data';

// --- Command Palette Component ---

interface CommandItem {
  id: string;
  label: string;
  category: string;
  action: () => void;
  shortcut?: string;
  icon: React.ReactNode;
}

const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    { id: 'nav-about', label: 'Navigate: About', category: 'Navigation', icon: <Terminal size={14} />, action: () => { window.location.href = '#about'; onClose(); } },
    { id: 'nav-skills', label: 'Navigate: Skills', category: 'Navigation', icon: <Code2 size={14} />, action: () => { window.location.href = '#skills'; onClose(); } },
    { id: 'nav-experience', label: 'Navigate: Experience', category: 'Navigation', icon: <Activity size={14} />, action: () => { window.location.href = '#experience'; onClose(); } },
    { id: 'nav-projects', label: 'Navigate: Projects', category: 'Navigation', icon: <HardDrive size={14} />, action: () => { window.location.href = '#projects'; onClose(); } },
    { id: 'ext-github', label: 'Open GitHub Profile', category: 'External', icon: <Github size={14} />, action: () => { window.open(PERSONAL_INFO.github, '_blank'); onClose(); } },
    { id: 'ext-linkedin', label: 'Open LinkedIn Profile', category: 'External', icon: <Linkedin size={14} />, action: () => { window.open(PERSONAL_INFO.linkedin, '_blank'); onClose(); } },
    { id: 'act-email', label: 'Send Email', category: 'Action', icon: <Mail size={14} />, action: () => { window.location.href = `mailto:${PERSONAL_INFO.email}`; onClose(); } },
    { id: 'act-download', label: 'Download Resume (Mock)', category: 'Action', icon: <ChevronRight size={14} />, action: () => { alert('Resume download requested...'); onClose(); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase()) || 
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSelectedIndex(0);
      setSearch('');
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/60" onClick={onClose}>
      <div 
        className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-lg overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-white/10 bg-white/[0.02]">
          <Search size={18} className="text-slate-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            className="w-full h-14 bg-transparent text-slate-200 outline-none font-mono text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="text-[10px] font-mono text-slate-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10 uppercase">
            Esc
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2 custom-scrollbar" ref={listRef}>
          {filteredCommands.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-500 font-mono text-xs">
              No results found for "{search}"
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors font-mono text-xs ${
                  index === selectedIndex ? 'bg-neon/10 text-neon' : 'text-slate-400 hover:bg-white/[0.03]'
                }`}
                onClick={cmd.action}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <span className={`${index === selectedIndex ? 'text-neon' : 'text-slate-600'}`}>
                    {cmd.icon}
                  </span>
                  <span>{cmd.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-600 uppercase tracking-tighter opacity-50">{cmd.category}</span>
                  {index === selectedIndex && <ArrowRight size={12} className="animate-pulse" />}
                </div>
              </button>
            ))
          )}
        </div>
        
        <div className="p-2 border-t border-white/10 bg-white/[0.01] flex justify-between items-center text-[9px] text-slate-600 font-mono uppercase tracking-widest">
          <div className="flex gap-4">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>ctrl+k to toggle</span>
        </div>
      </div>
    </div>
  );
};

// --- Main Components ---

const TerminalBar: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 bg-[#050505] border-b border-white/5 py-1 px-4 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-500">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-neon"><Activity size={12} /> STATUS: ONLINE</span>
        <span className="hidden sm:inline">USR: SAITEJA</span>
        <span className="hidden md:inline">NODE: PORTFOLIO_V2</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 text-slate-600 mr-4">
          <CommandIcon size={12} />
          <span>Press Ctrl+K for command palette</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-900/40"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-900/40"></div>
          <div className="w-2 h-2 rounded-full bg-green-900/40"></div>
        </div>
        <span>{time}</span>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ onOpenPalette: () => void }> = ({ onOpenPalette }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav className="fixed top-8 w-full z-40">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 relative z-50 group">
          <div className="bg-neon text-black px-1.5 py-0.5 rounded-sm font-bold">
             T
          </div>
          <span className="font-bold text-slate-100 group-hover:text-neon transition-colors tracking-tight">SAITEJA.sh</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 items-center bg-black/80 border border-white/10 rounded-md px-2 py-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-4 py-2 text-[11px] font-mono text-slate-400 hover:text-neon hover:bg-neon/5 transition-all rounded"
            >
              ./{link.name.toLowerCase()}
            </a>
          ))}
          <button 
            onClick={onOpenPalette}
            className="p-2 text-slate-500 hover:text-neon transition-colors mx-2"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search size={14} />
          </button>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-2 px-4 py-2 text-[11px] font-mono bg-neon text-black font-bold rounded hover:bg-[#00cc33] transition-colors"
          >
            connect.exe
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 text-neon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-6 transition-all duration-300 md:hidden z-40 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xl font-mono text-slate-300 hover:text-neon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              $ cd {link.name.toLowerCase()}
            </a>
          ))}
          <button 
            onClick={() => { onOpenPalette(); setIsMobileMenuOpen(false); }}
            className="text-slate-500 hover:text-neon font-mono mt-4"
          >
            $ search_commands
          </button>
          <a href={PERSONAL_INFO.linkedin} className="text-neon font-bold mt-4">$ ./connect.exe</a>
        </div>
      </div>
    </nav>
  );
};

const WindowFrame: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
  <div id={id} className="terminal-window rounded-t-md overflow-hidden border border-white/10 mb-12 scroll-mt-24">
    <div className="terminal-header py-1.5 px-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
        </div>
        <span className="text-[9px] font-mono text-slate-500 flex items-center gap-2 tracking-tighter uppercase">
          <CommandIcon size={10} /> {title}
        </span>
      </div>
      <span className="text-[9px] font-mono text-slate-700">STD_OUT</span>
    </div>
    <div className="p-6 md:p-8 bg-black">
      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen pb-20 selection:bg-neon selection:text-black">
      <TerminalBar />
      <Navbar onOpenPalette={() => setIsPaletteOpen(true)} />
      
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />

      <main className="container mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section id="about" className="scroll-mt-24 mb-32">
          <div className="max-w-5xl">
            <div className="mb-6 text-neon font-mono text-xs md:text-sm flex items-center gap-2">
              <span className="bg-neon/10 px-2 py-0.5 rounded text-[10px]">AUTH_SUCCESS</span>
              saiteja@sre:~$ <span className="text-white">whoami --bio</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter">
              DEVOPS ENGINEER <br />
              <span className="text-neon">& INFRA ARCHITECT</span>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-8">
                <p className="text-slate-400 font-mono leading-relaxed text-sm md:text-lg border-l-2 border-neon/20 pl-6 py-2">
                  {PERSONAL_INFO.summary}
                  <span className="inline-block w-2.5 h-5 bg-neon ml-2 cursor-blink align-middle"></span>
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#experience" className="bg-neon text-black px-8 py-3 font-bold font-mono hover:bg-[#00cc33] transition-all text-xs uppercase tracking-widest shadow-lg shadow-neon/10">
                    $ list_experience
                  </a>
                  <div className="flex gap-2">
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 text-slate-500 hover:text-neon hover:border-neon transition-all"><Github size={20} /></a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 text-slate-500 hover:text-neon hover:border-neon transition-all"><Linkedin size={20} /></a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-lg font-mono text-[11px] space-y-4 shadow-2xl">
                <div className="text-neon font-bold border-b border-white/10 pb-2 flex justify-between">
                  <span>SYSTEM_RESOURCES</span>
                  <Activity size={12} className="animate-pulse" />
                </div>
                <div className="space-y-2 text-slate-400">
                  <div className="flex justify-between"><span>NAME</span> <span className="text-white">SAITEJA K.</span></div>
                  <div className="flex justify-between"><span>ROLE</span> <span className="text-white">SRE / DEVOPS</span></div>
                  <div className="flex justify-between"><span>ZONE</span> <span className="text-white">AP-SOUTH-1</span></div>
                  <div className="flex justify-between"><span>SHELL</span> <span className="text-white">ZSH</span></div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between mb-1"><span>CPU_LOAD</span> <span className="text-neon">12%</span></div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-neon w-[12%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Window */}
        <WindowFrame title="capabilities.v3" id="skills">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/5 rounded-md text-neon group-hover:scale-110 transition-transform">
                    {cat.category.includes("Cloud") ? <Cloud className="size-4" /> : cat.category.includes("Infra") ? <Server className="size-4" /> : <Code2 className="size-4" />}
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <span key={si} className="px-2.5 py-1 text-[10px] font-mono border border-white/10 text-slate-500 hover:border-neon/40 hover:text-neon transition-all bg-black">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </WindowFrame>

        {/* Experience Window */}
        <WindowFrame title="employment_records.log" id="experience">
          <div className="space-y-16">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-10 group">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover:bg-neon/30 transition-colors"></div>
                <div className="absolute -left-[5px] top-1.5 w-[11px] h-[11px] bg-[#050505] border border-white/20 group-hover:border-neon group-hover:bg-neon transition-all rounded-full z-10"></div>
                
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-tight leading-none mb-2">{exp.role}</h4>
                    <div className="text-sm font-mono text-neon bg-neon/5 px-2 py-0.5 rounded-sm inline-block">{exp.company}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 uppercase bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
                </div>
                
                <ul className="space-y-3 max-w-4xl">
                  {exp.description.map((point, pi) => (
                    <li key={pi} className="text-xs md:text-sm text-slate-400 flex items-start gap-3 leading-relaxed">
                      <span className="text-neon mt-1.5 opacity-40 shrink-0 font-bold">»</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </WindowFrame>

        {/* Projects Grid */}
        <div id="projects" className="scroll-mt-24 mb-24">
           <div className="flex items-center gap-6 mb-12">
              <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-white">./projects_directory</h2>
              <div className="flex-1 h-px bg-white/5"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <div key={i} className="border border-white/10 hover:border-neon/50 transition-all duration-500 group flex flex-col bg-[#050505] p-1">
                  <div className="p-6 flex flex-col h-full bg-black">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-2 border border-white/5 text-slate-600 group-hover:text-neon transition-colors">
                        {project.title.includes("AI") ? <CpuIcon size={20} /> : project.title.includes("DevOps") ? <Terminal size={20} /> : <HardDrive size={20} />}
                      </div>
                      <div className="flex gap-4">
                        {project.links?.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white"><Github size={18} /></a>}
                        {project.links?.youtube && <a href={project.links.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white"><PlayCircle size={18} /></a>}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide group-hover:text-neon transition-colors">{project.title}</h3>
                    <p className="text-[11px] text-slate-500 mb-8 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.technologies.map((tech, ti) => (
                        <span key={ti} className="text-[9px] font-mono text-slate-500 border border-white/5 px-2 py-0.5 rounded-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Contact Footer */}
        <footer className="mt-32 pt-24 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <div className="text-neon text-[10px] mb-6 font-mono font-bold tracking-[0.2em]">0x1 // ACADEMIC_HISTORY</div>
                <div className="space-y-8">
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="border-l border-white/10 pl-6 group hover:border-neon transition-colors">
                      <h4 className="font-bold text-sm text-white group-hover:text-neon transition-colors">{edu.degree}</h4>
                      <p className="text-xs text-slate-500 mt-1">{edu.institution}</p>
                      <div className="flex items-center gap-3 mt-2">
                         <span className="text-[9px] font-mono text-slate-600">{edu.period}</span>
                         <span className="w-1 h-1 rounded-full bg-white/10"></span>
                         <span className="text-[9px] font-mono text-neon/50">GPA: {edu.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#050505] border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-[0.02] rotate-12">
                <Terminal size={240} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-[0.2em]">CONTACT_SERVER</h2>
              <div className="space-y-6 font-mono text-sm">
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-neon" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-neon transition-colors">{PERSONAL_INFO.email}</a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-neon" />
                  <span className="text-slate-400">{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe size={16} className="text-neon" />
                  <a href={PERSONAL_INFO.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-neon underline decoration-dotted decoration-white/20 underline-offset-8">
                    {PERSONAL_INFO.website.replace('https://', '')}
                  </a>
                </div>
                <div className="pt-8 flex gap-4">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-white/10 hover:border-neon hover:bg-neon/5 text-[10px] transition-all">GITHUB</a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-white/10 hover:border-neon hover:bg-neon/5 text-[10px] transition-all">LINKEDIN</a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-32 text-[10px] text-slate-700 font-mono tracking-widest flex flex-col gap-2">
            <div>[ (C) {new Date().getFullYear()} SAITEJA_KOTTAPALLY // VER: 2.1.0-LTS ]</div>
            <div className="opacity-40">ENCRYPTED_WITH_256BIT_AES // SYSTEM_STABLE</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
