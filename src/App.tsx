import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './App.css';

export default function PortfolioSite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    // Handle collapsible sections
    if (['product-mgmt', 'product-mkt', 'gallery'].includes(sectionId)) {
      // First expand the section if it's not already active
      if (activeSection !== sectionId) {
        setActiveSection(sectionId);
      }

      // Then scroll to it after a brief delay to allow expansion
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // Handle regular sections
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const toggleSection = (sectionName: string) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Compact, Right-aligned, Hides on Scroll */}
      <nav className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 bg-gunmetal/90 backdrop-blur-md rounded-full px-2 py-2 shadow-lg">
          <button onClick={() => scrollToSection('home')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">Home</button>
          <button onClick={() => scrollToSection('about')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">About</button>
          <button onClick={() => scrollToSection('product-mgmt')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">Product Mgmt</button>
          <button onClick={() => scrollToSection('product-mkt')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">Product Mkt</button>
          <button onClick={() => scrollToSection('gallery')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">Gallery</button>
          <button onClick={() => scrollToSection('experience')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">Experience</button>
          <button onClick={() => scrollToSection('contact')} className="px-4 py-2 text-white hover:text-gunmetal hover:bg-cream rounded-full transition-all duration-300 font-medium text-sm">Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 rounded-full bg-gunmetal/90 backdrop-blur-md text-white shadow-lg hover:bg-gunmetal transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-14 right-0 bg-gunmetal/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden min-w-[200px]">
            <div className="py-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">About</button>
              <button onClick={() => scrollToSection('product-mgmt')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">Product Management</button>
              <button onClick={() => scrollToSection('product-mkt')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">Product Marketing</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">Gallery</button>
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">Experience</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 px-5 text-white hover:bg-cream hover:text-gunmetal transition-all duration-300 font-medium text-sm">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/IAWvulFcZkY?autoplay=1&mute=1&loop=1&playlist=IAWvulFcZkY&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=49"
            className="w-full h-full object-cover border-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Suzanne De Silva Samsung Galaxy S10 Presentation"
          ></iframe>
        </div>

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                Suzanne De Silva
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white drop-shadow-lg">
                Mobile Expert, Creative Thinker,
                <span className="block">Inspiring Leader</span>
              </h1>
            </div>
          </div>
        </div>
      </section>



      {/* About Section - Moved to first position */}
      <section id="about" className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gunmetal mb-6">About Me</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                For the past 16 years I have developed and launched products based on consumer insights
                across the hardware and software stack. These products have driven engagement and delight
                across millions of consumers globally.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                I am passionate about developing technology that addresses real consumer needs;
                makes life easier, and reduces technology adoption friction through the use of AI.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                There has never been a more exciting time to be in technology. With the launch of 5G networks 
                and their hyper speeds, the proliferation of IoT, the rise of voice as interface, to the 
                simplification of tech with AI, this foundational tech is driving rapid change in the industry.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                I am excited to be at the heart of this shift, leveraging technology to help consumers 
                experience and do amazing things.
              </p>
              
              {/* Navigation buttons to collapsible sections */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    toggleSection('product-mgmt');
                    setTimeout(() => {
                      const element = document.querySelector('.collapsible-sections');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className="group bg-gunmetal text-white rounded-xl p-4 text-center hover:bg-gunmetal/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="font-semibold mb-1">Product Management</div>
                  <div className="text-sm opacity-90">Philosophy & Approach</div>
                </button>
                <button
                  onClick={() => {
                    toggleSection('product-mkt');
                    setTimeout(() => {
                      const element = document.querySelector('.collapsible-sections');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className="group bg-gunmetal text-white rounded-xl p-4 text-center hover:bg-gunmetal/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="font-semibold mb-1">Product Marketing</div>
                  <div className="text-sm opacity-90">Strategy & Positioning</div>
                </button>
                <button
                  onClick={() => {
                    toggleSection('gallery');
                    setTimeout(() => {
                      const element = document.querySelector('.collapsible-sections');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className="group bg-gunmetal text-white rounded-xl p-4 text-center hover:bg-gunmetal/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="font-semibold mb-1">Media Gallery</div>
                  <div className="text-sm opacity-90">Videos & Presentations</div>
                </button>
              </div>
            </div>
            <div className="bg-gunmetal rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Key Expertise</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-copper rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">Product Development & Launch</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-copper rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">Consumer Insights Research</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-copper rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">Hardware & Software Stack</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-copper rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">AI & Technology Integration</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-copper rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">5G & IoT Innovation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible Content Sections */}
      <section className="py-16 bg-white collapsible-sections">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gunmetal mb-4">Explore My Expertise</h2>
          </div>

          {/* Product Management Collapsible Section */}
          <div id="product-mgmt" className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <button
              onClick={() => toggleSection('product-mgmt')}
              className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 relative ${
                activeSection === 'product-mgmt'
                ? 'bg-cream text-gunmetal'
                : 'bg-white hover:bg-gunmetal/10 text-gunmetal'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Product Management Philosophy</h3>
                <p className="text-lg opacity-80">My approach revolves around 4 key themes that drive successful product development</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gunmetal text-white px-3 py-1 rounded-full text-sm font-medium">
                Click to explore
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === 'product-mgmt' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 bg-cream/50 border-t border-gunmetal/10">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gunmetal rounded-2xl p-6 text-white shadow-xl">
                    <h4 className="text-xl font-bold mb-4">Core Principles</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Launch and learn quickly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Keep the end consumer in mind</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Minimize the number of unknowns</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Create a feedback loop of learning and best practices</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <h5 className="font-semibold text-gunmetal mb-2">Be Proactive</h5>
                      <p className="text-gunmetal/80 text-sm">As I go into new projects I always advise my team that "we don't know what we don't know". So I challenge everyone to ask questions, uncover insights, and learn quickly.</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <h5 className="font-semibold text-gunmetal mb-2">Start with the Future in Mind</h5>
                      <p className="text-gunmetal/80 text-sm">I take a software development architecture approach to everything I do - build a scalable framework/platform that can stand the test of time and be added to.</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gunmetal rounded-xl p-4 text-white text-center">
                    <h5 className="font-semibold mb-2">Prototype & Fail Fast</h5>
                    <p className="text-sm">Demonstrate functionality along the way to ensure no surprises in the final product.</p>
                  </div>

                  <div className="bg-gunmetal rounded-xl p-4 text-white text-center">
                    <h5 className="font-semibold mb-2">Budget for Unknown</h5>
                    <p className="text-sm">Avoid failure by leaving enough room and time for the unexpected. Nothing is worse than missed deadlines.</p>
                  </div>

                  <div className="bg-gunmetal rounded-xl p-4 text-white text-center">
                    <h5 className="font-semibold mb-2">Build Loyalty into Product</h5>
                    <p className="text-sm">Loyalty starts with setting expectations and delivering everyday positive experiences.</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-xl inline-block mb-4">
                    <h5 className="text-lg font-semibold text-gunmetal mb-3">Monitor, Hypothesize, Test</h5>
                    <p className="text-gunmetal/80 mb-4 max-w-xl">When a product is in market, collect data about user behavior and pair it with hypotheses for actionable insights.</p>
                  </div>
                  <div>
                    <a
                      href="https://suzannedesilva.com/wp-content/uploads/2023/11/Product-Management-20-Years-in-20-Minutes-1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gunmetal text-white rounded-full font-semibold hover:bg-gunmetal/90 transition-colors"
                    >
                      Download Full Presentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Marketing Collapsible Section */}
          <div id="product-mkt" className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <button
              onClick={() => toggleSection('product-mkt')}
              className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 relative ${
                activeSection === 'product-mkt'
                ? 'bg-cream text-gunmetal'
                : 'bg-white hover:bg-gunmetal/10 text-gunmetal'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Product Marketing Philosophy</h3>
                <p className="text-lg opacity-80">Strategic positioning with 10-20 words that uniquely define market position</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gunmetal text-white px-3 py-1 rounded-full text-sm font-medium">
                Click to explore
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === 'product-mkt' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 bg-gunmetal text-white border-t border-gunmetal/10">
                <div className="mb-8">
                  <div className="bg-gunmetal/80 border border-white/20 rounded-2xl p-6 mb-6">
                    <h4 className="text-xl font-bold mb-3 text-copper">What is Product Marketing?</h4>
                    <p className="text-white/90">Product marketing is the process of strategically determining the 10 to 20 words that uniquely positions a product in the market. These words fit into a framework called the value proposition that provides the lens through which the product comes to life. A lot of insights and analysis go into determining the who (to target), the what (which features to talk about), and the how (to talk about those features).</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Anchor New Technology in the Familiar</h5>
                    <p className="text-sm text-white/90">Help consumers make the psychological leap of understanding how new technology fits into their lives.</p>
                  </div>

                  <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Create a Platform</h5>
                    <p className="text-sm text-white/90">Build positioning on a platform that can scale over time, ensuring your product uniquely stands for something.</p>
                  </div>

                  <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Position to Lockout Competition</h5>
                    <p className="text-sm text-white/90">Position in competitive white spaces authentic to your strengths and away from competitors.</p>
                  </div>

                  <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Marketize Technology</h5>
                    <p className="text-sm text-white/90">Brand technology around key user benefits, not the literal name of the technology.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h5 className="text-lg font-semibold mb-3 text-copper">5G Example: "Everything You Love, Hyperfast"</h5>
                    <p className="text-white/90 mb-3">Introducing 5G by anchoring it in familiar smartphone experiences rather than technical specifications.</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-xs text-copper/80">View the campaign: "Introducing 5G - Everything You Love, Hyperfast"</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h5 className="text-lg font-semibold mb-3 text-copper">Galaxy Foundation of Features</h5>
                    <p className="text-white/90 mb-3">Creating a positioning platform that ensures consumers view Galaxy products through a uniquely crafted lens over time.</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-xs text-copper/80">"The Performance You Can Expect In Galaxy"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Gallery Collapsible Section */}
          <div id="gallery" className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <button
              onClick={() => toggleSection('gallery')}
              className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 relative ${
                activeSection === 'gallery'
                ? 'bg-cream text-gunmetal'
                : 'bg-white hover:bg-gunmetal/10 text-gunmetal'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Media Gallery</h3>
                <p className="text-lg opacity-80">Featured presentations, speaking engagements, and media appearances</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gunmetal text-white px-3 py-1 rounded-full text-sm font-medium">
                Click to explore
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === 'gallery' ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 bg-cream/50 border-t border-gunmetal/10">
                <div className="mb-8">
                  <h4 className="text-3xl font-bold text-gunmetal mb-4 text-center">Featured Videos & Presentations</h4>
                  <p className="text-gunmetal/70 text-center max-w-3xl mx-auto">Watch Suzanne's key presentations from Samsung Unpacked events, product launches, and industry conferences showcasing mobile innovation and product strategy.</p>
                </div>

                {/* Video Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Samsung Galaxy S10 Presentation */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video relative group cursor-pointer">
                      <a
                        href="https://www.youtube.com/watch?v=IAWvulFcZkY&t=49s"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src="https://img.youtube.com/vi/IAWvulFcZkY/maxresdefault.jpg"
                          alt="Galaxy S10 Launch - Samsung Unpacked 2019"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h5 className="text-white font-semibold text-lg drop-shadow">Galaxy S10 Launch</h5>
                          <p className="text-white/90 text-sm drop-shadow">Samsung Unpacked 2019</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">Suzanne presents the Galaxy S10 features and camera innovations at Samsung's flagship event.</p>
                    </div>
                  </div>

                  {/* Samsung Unpacked 2019 Full Event */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video relative group cursor-pointer">
                      <a
                        href="https://www.youtube.com/watch?v=USDvd7fhbd0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src="https://img.youtube.com/vi/USDvd7fhbd0/maxresdefault.jpg"
                          alt="Unpacked 2019 Full Event - Complete Galaxy S10 Launch"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h5 className="text-white font-semibold text-lg drop-shadow">Unpacked 2019 Full Event</h5>
                          <p className="text-white/90 text-sm drop-shadow">Complete Galaxy S10 Launch</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">Full Samsung Unpacked 2019 event featuring Galaxy S10 series and innovative mobile technologies.</p>
                    </div>
                  </div>

                  {/* Product Strategy Video */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video relative group cursor-pointer">
                      <a
                        href="https://www.youtube.com/watch?v=SSCmwChfdvM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src="https://img.youtube.com/vi/SSCmwChfdvM/maxresdefault.jpg"
                          alt="Product Strategy Deep Dive - Innovation & Market Positioning"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h5 className="text-white font-semibold text-lg drop-shadow">Product Strategy Deep Dive</h5>
                          <p className="text-white/90 text-sm drop-shadow">Innovation & Market Positioning</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">Comprehensive discussion on product strategy, innovation methodology, and market positioning.</p>
                    </div>
                  </div>

                  {/* Samsung Galaxy Note 8 */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video relative group cursor-pointer">
                      <a
                        href="https://www.youtube.com/watch?v=aS3_7iifqYo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src="https://img.youtube.com/vi/aS3_7iifqYo/maxresdefault.jpg"
                          alt="Galaxy Note 8 Launch - Unpacked 2017 New York"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h5 className="text-white font-semibold text-lg drop-shadow">Galaxy Note 8 Launch</h5>
                          <p className="text-white/90 text-sm drop-shadow">Unpacked 2017 New York</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">Galaxy Note 8 unveiling at Brooklyn's Barclays Center featuring S-Pen innovations.</p>
                    </div>
                  </div>

                  {/* Samsung Live Stream */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video relative group cursor-pointer">
                      <a
                        href="https://www.youtube.com/watch?v=QduQGadjigM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src="https://img.youtube.com/vi/QduQGadjigM/maxresdefault.jpg"
                          alt="Live Event Coverage - Behind the Scenes"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h5 className="text-white font-semibold text-lg drop-shadow">Live Event Coverage</h5>
                          <p className="text-white/90 text-sm drop-shadow">Behind the Scenes</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">Live coverage and behind-the-scenes content from Samsung's major product launch events.</p>
                    </div>
                  </div>

                  {/* Latest Unpacked */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video relative group cursor-pointer">
                      <a
                        href="https://www.youtube.com/watch?v=DzjsdYZQ7ns"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src="https://img.youtube.com/vi/DzjsdYZQ7ns/maxresdefault.jpg"
                          alt="Galaxy Unpacked 2024 - Latest Innovations"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h5 className="text-white font-semibold text-lg drop-shadow">Galaxy Unpacked 2024</h5>
                          <p className="text-white/90 text-sm drop-shadow">Latest Innovations</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">Latest Samsung Unpacked event showcasing cutting-edge Galaxy AI and ecosystem innovations.</p>
                    </div>
                  </div>
                </div>

                {/* Speaking Engagements Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-2xl font-bold text-gunmetal mb-6 text-center">Speaking Engagements & Expertise</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-gunmetal pl-4">
                        <h5 className="font-semibold text-gunmetal">Samsung Unpacked Events</h5>
                        <p className="text-gunmetal/70">Lead presenter for Galaxy S10, Note 8, and major product launches</p>
                      </div>
                      <div className="border-l-4 border-gunmetal pl-4">
                        <h5 className="font-semibold text-gunmetal">Industry Conferences</h5>
                        <p className="text-gunmetal/70">Keynotes on mobile innovation, 5G technology, and product management</p>
                      </div>
                      <div className="border-l-4 border-gunmetal pl-4">
                        <h5 className="font-semibold text-gunmetal">Media Interviews</h5>
                        <p className="text-gunmetal/70">Technology insights, market analysis, and product strategy discussions</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="border-l-4 border-gunmetal pl-4">
                        <h5 className="font-semibold text-gunmetal">Product Strategy Sessions</h5>
                        <p className="text-gunmetal/70">Deep-dive presentations on product development methodology</p>
                      </div>
                      <div className="border-l-4 border-gunmetal pl-4">
                        <h5 className="font-semibold text-gunmetal">Camera & Innovation Focus</h5>
                        <p className="text-gunmetal/70">Specialized presentations on mobile photography and dual-camera technology</p>
                      </div>
                      <div className="border-l-4 border-gunmetal pl-4">
                        <h5 className="font-semibold text-gunmetal">Global Launch Events</h5>
                        <p className="text-gunmetal/70">International product reveals and market positioning strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-gunmetal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Experience Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-gunmetal mb-3">16+</div>
              <div className="text-xl font-semibold text-gunmetal mb-3">Years Experience</div>
              <p className="text-gunmetal/80">
                Developing and launching innovative products across the technology spectrum.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-gunmetal mb-3">Millions</div>
              <div className="text-xl font-semibold text-gunmetal mb-3">Global Consumers</div>
              <p className="text-gunmetal/80">
                Products have driven engagement and delight across millions of users worldwide.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-gunmetal mb-3">30+</div>
              <div className="text-xl font-semibold text-gunmetal mb-3">Product Launches</div>
              <p className="text-gunmetal/80">
                Successfully launched diverse hardware and software products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gunmetal text-center mb-12">Technology Focus Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group text-center p-8 bg-gunmetal rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-copper rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">5G Networks</h3>
              <p className="text-white/90">Hyper-speed connectivity driving innovation</p>
            </div>
            <div className="group text-center p-8 bg-gunmetal rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-copper rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">IoT</h3>
              <p className="text-white/90">Connected devices transforming experiences</p>
            </div>
            <div className="group text-center p-8 bg-gunmetal rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-copper rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Voice Interface</h3>
              <p className="text-white/90">Natural interaction through voice technology</p>
            </div>
            <div className="group text-center p-8 bg-gunmetal rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-copper rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Simplification</h3>
              <p className="text-white/90">Making technology more accessible with AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gunmetal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-8">Contact</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-white mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gunmetal" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-white mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gunmetal" placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-white mb-2">Message</label>
              <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gunmetal" placeholder="How can I help you?"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="inline-block px-8 py-3 bg-copper text-white font-semibold rounded-full shadow-lg hover:bg-copper/90 transition-all duration-300">Send Message</button>
            </div>
          </form>

          {/* LinkedIn Button */}
          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">Or connect with me on LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/suzannedesilva/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-cream text-gunmetal font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gunmetal/10 text-center text-gunmetal/60 text-sm">
        &copy; {new Date().getFullYear()} Suzanne De Silva. All rights reserved.
      </footer>
    </div>
  );
}