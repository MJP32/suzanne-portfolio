import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';

export default function PortfolioSite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Accept Event, not MouseEvent, for compatibility with addEventListener
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleSection = (sectionName: string) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  // Calculate video transform based on scroll
  const videoScale = Math.max(0, 1 - window.scrollY / 800);
  const videoOpacity = Math.max(0, 1 - window.scrollY / 600);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Suzanne De Silva
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-md border border-gray-200/50 relative">
              <button onClick={() => scrollToSection('home')} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                About
              </button>
              
              {/* Product Management Dropdown */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => toggleDropdown('product-mgmt')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center"
                >
                  Product Management
                  <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === 'product-mgmt' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'product-mgmt' && (
                  <div className="absolute top-full left-0 mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Product Management Philosophy</h3>
                      <p className="text-sm text-gray-600 mb-4">My approach is simple and revolves around 4 key themes</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-emerald-600 text-sm mb-2">Core Principles:</h4>
                        <ul className="space-y-1.5 text-sm text-gray-700">
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Launch and learn quickly</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Keep the end consumer in mind</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Minimize the number of unknowns</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Create a feedback loop of learning and best practices</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-teal-600 text-sm mb-2">Key Methodologies:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>• Be Proactive</div>
                          <div>• Prototype & Fail Fast</div>
                          <div>• Future-Minded Planning</div>
                          <div>• Budget for Unknown</div>
                          <div>• Build Product Loyalty</div>
                          <div>• Monitor & Test</div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          toggleSection('product-mgmt');
                          setTimeout(() => {
                            const element = document.querySelector('.collapsible-sections');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className="w-full bg-emerald-500 text-white rounded-lg py-2 hover:bg-emerald-600 transition-colors text-sm font-medium"
                      >
                        Read Full Philosophy
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Marketing Dropdown */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => toggleDropdown('product-mkt')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center"
                >
                  Product Marketing
                  <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === 'product-mkt' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'product-mkt' && (
                  <div className="absolute top-full left-0 mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Product Marketing Philosophy</h3>
                      <p className="text-sm text-gray-600 mb-4">Strategically determining the 10-20 words that uniquely position, acquire, sustain and defend a product's market share.</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-purple-600 text-sm mb-2">Strategic Framework:</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Anchor New Technology:</strong> Make unfamiliar tech relatable</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Create a Platform:</strong> Build scalable positioning frameworks</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Lockout Competition:</strong> Position in authentic white spaces</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Marketize Technology:</strong> Focus on user benefits, not tech specs</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                        <h5 className="text-xs font-semibold text-purple-700 mb-1">Example Success:</h5>
                        <p className="text-xs text-purple-600">"Everything You Love, Hyperfast" - 5G positioning that anchors new technology in familiar smartphone experiences</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          toggleSection('product-mkt');
                          setTimeout(() => {
                            const element = document.querySelector('.collapsible-sections');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className="w-full bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600 transition-colors text-sm font-medium"
                      >
                        Explore Marketing Strategy
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Media Gallery Dropdown */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => toggleDropdown('gallery')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center"
                >
                  Gallery
                  <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === 'gallery' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'gallery' && (
                  <div className="absolute top-full left-0 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Media Gallery</h3>
                      <p className="text-sm text-gray-600 mb-4">Featured presentations, speaking engagements, and media appearances</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-blue-600 text-sm mb-2">Featured Content:</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Samsung Unpacked Events:</strong> Product launches & strategy presentations</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Industry Conferences:</strong> Keynotes on mobile innovation</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Product Strategy Videos:</strong> Deep-dive presentations</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span><strong>Media Interviews:</strong> Technology insights & market analysis</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <h5 className="text-xs font-semibold text-blue-700 mb-1">Featured Video:</h5>
                        <p className="text-xs text-blue-600">Watch product strategy discussions and innovation insights from Samsung events</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          toggleSection('gallery');
                          setTimeout(() => {
                            const element = document.querySelector('.collapsible-sections');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        View Media Gallery
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => scrollToSection('experience')} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                Experience
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 bg-white/95 backdrop-blur-md rounded-2xl mt-4 border border-gray-200/50 shadow-xl mx-4 mb-4">
              <div className="p-2 space-y-1">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium">Home</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium">About</button>
                
                {/* Mobile Collapsible Section Links */}
                <div className="border-l-2 border-emerald-500 ml-4 pl-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      toggleSection('product-mgmt');
                      setTimeout(() => {
                        const element = document.querySelector('.collapsible-sections');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }} 
                    className="block w-full text-left py-2 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    Product Management
                  </button>
                  <p className="text-xs text-gray-500 px-2 pb-1">4 key themes: Launch & learn, consumer focus, minimize unknowns, feedback loops</p>
                  <p className="text-xs text-emerald-600 px-2 pb-2">Methodologies: Be proactive, prototype & fail fast, future-minded planning</p>
                </div>
                
                <div className="border-l-2 border-purple-500 ml-4 pl-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      toggleSection('product-mkt');
                      setTimeout(() => {
                        const element = document.querySelector('.collapsible-sections');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }} 
                    className="block w-full text-left py-2 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    Product Marketing
                  </button>
                  <p className="text-xs text-gray-500 px-2 pb-1">Strategic positioning with 10-20 words that uniquely define market position</p>
                  <p className="text-xs text-purple-600 px-2 pb-2">Framework: Anchor in familiar, create platforms, lockout competition</p>
                </div>
                
                <div className="border-l-2 border-blue-500 ml-4 pl-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      toggleSection('gallery');
                      setTimeout(() => {
                        const element = document.querySelector('.collapsible-sections');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }} 
                    className="block w-full text-left py-2 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    Gallery
                  </button>
                  <p className="text-xs text-gray-500 px-2 pb-1">Samsung Unpacked events, industry conferences, strategy videos</p>
                  <p className="text-xs text-blue-600 px-2 pb-2">Featured: Product launches, keynotes, media interviews</p>
                </div>
                
                <button onClick={() => scrollToSection('experience')} className="block w-full text-left py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium">Experience</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-24 relative overflow-hidden min-h-screen">
        {/* Video Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `scale(${videoScale})`,
            opacity: videoOpacity,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/s10-feature-suzanne-desilva.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="py-32">
            {/* Video section content can be added here if needed */}
          </div>
        </div>
      </section>

      {/* Header Content Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mobile Expert, Creative Thinker,
              <span className="text-purple-600 block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Inspiring Leader</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              For the past 16 years I have developed and launched products based on consumer insights
              across the hardware and software stack. These products have driven engagement and delight
              across millions of consumers globally.
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Moved to first position */}
      <section id="about" className="py-16 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">About Me</h2>
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
                  className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-4 text-center hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-4 text-center hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-4 text-center hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="font-semibold mb-1">Media Gallery</div>
                  <div className="text-sm opacity-90">Videos & Presentations</div>
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Key Expertise</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">Product Development & Launch</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">Consumer Insights Research</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">Hardware & Software Stack</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">AI & Technology Integration</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mr-4 shadow-lg"></div>
                  <span className="text-white/95 font-medium">5G & IoT Innovation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible Content Sections */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white collapsible-sections">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore My Expertise</h2>
            <p className="text-xl text-gray-600">Click on any section below to dive deeper into my approach and philosophy</p>
          </div>

          {/* Product Management Collapsible Section */}
          <div className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button 
              onClick={() => toggleSection('product-mgmt')}
              className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 ${
                activeSection === 'product-mgmt' 
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                : 'bg-white hover:bg-gray-50 text-gray-900'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Product Management Philosophy</h3>
                <p className="text-lg opacity-80">My approach revolves around 4 key themes that drive successful product development</p>
              </div>
              <ChevronDown 
                size={28} 
                className={`transition-transform duration-300 ${
                  activeSection === 'product-mgmt' ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === 'product-mgmt' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-t border-emerald-100">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                    <h4 className="text-xl font-bold mb-4">Core Principles</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Launch and learn quickly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Keep the end consumer in mind</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Minimize the number of unknowns</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Create a feedback loop of learning and best practices</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <h5 className="font-semibold text-emerald-600 mb-2">Be Proactive</h5>
                      <p className="text-gray-700 text-sm">As I go into new projects I always advise my team that "we don't know what we don't know". So I challenge everyone to ask questions, uncover insights, and learn quickly.</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <h5 className="font-semibold text-teal-600 mb-2">Start with the Future in Mind</h5>
                      <p className="text-gray-700 text-sm">I take a software development architecture approach to everything I do - build a scalable framework/platform that can stand the test of time and be added to.</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white text-center">
                    <h5 className="font-semibold mb-2">Prototype & Fail Fast</h5>
                    <p className="text-sm">Demonstrate functionality along the way to ensure no surprises in the final product.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-4 text-white text-center">
                    <h5 className="font-semibold mb-2">Budget for Unknown</h5>
                    <p className="text-sm">Avoid failure by leaving enough room and time for the unexpected. Nothing is worse than missed deadlines.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white text-center">
                    <h5 className="font-semibold mb-2">Build Loyalty into Product</h5>
                    <p className="text-sm">Loyalty starts with setting expectations and delivering everyday positive experiences.</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-xl inline-block mb-4">
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Monitor, Hypothesize, Test</h5>
                    <p className="text-gray-700 mb-4 max-w-xl">When a product is in market, collect data about user behavior and pair it with hypotheses for actionable insights.</p>
                  </div>
                  <div>
                    <a 
                      href="https://suzannedesilva.com/wp-content/uploads/2023/11/Product-Management-20-Years-in-20-Minutes-1.pdf"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
                    >
                      Download Full Presentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Marketing Collapsible Section */}
          <div className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button 
              onClick={() => toggleSection('product-mkt')}
              className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 ${
                activeSection === 'product-mkt' 
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700' 
                : 'bg-white hover:bg-gray-50 text-gray-900'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Product Marketing Philosophy</h3>
                <p className="text-lg opacity-80">Strategic positioning with 10-20 words that uniquely define market position</p>
              </div>
              <ChevronDown 
                size={28} 
                className={`transition-transform duration-300 ${
                  activeSection === 'product-mkt' ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === 'product-mkt' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white border-t border-purple-100">
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 mb-6">
                    <h4 className="text-xl font-bold mb-3 text-yellow-300">What is Product Marketing?</h4>
                    <p className="text-white/90">Product marketing is the process of strategically determining the 10 to 20 words that uniquely positions a product in the market. These words fit into a framework called the value proposition that provides the lens through which the product comes to life. A lot of insights and analysis go into determining the who (to target), the what (which features to talk about), and the how (to talk about those features).</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Anchor New Technology in the Familiar</h5>
                    <p className="text-sm text-white/90">Help consumers make the psychological leap of understanding how new technology fits into their lives.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Create a Platform</h5>
                    <p className="text-sm text-white/90">Build positioning on a platform that can scale over time, ensuring your product uniquely stands for something.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Position to Lockout Competition</h5>
                    <p className="text-sm text-white/90">Position in competitive white spaces authentic to your strengths and away from competitors.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 text-center">
                    <h5 className="font-semibold mb-2">Marketize Technology</h5>
                    <p className="text-sm text-white/90">Brand technology around key user benefits, not the literal name of the technology.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h5 className="text-lg font-semibold mb-3 text-yellow-300">5G Example: "Everything You Love, Hyperfast"</h5>
                    <p className="text-white/90 mb-3">Introducing 5G by anchoring it in familiar smartphone experiences rather than technical specifications.</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-xs text-cyan-300">View the campaign: "Introducing 5G - Everything You Love, Hyperfast"</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h5 className="text-lg font-semibold mb-3 text-yellow-300">Galaxy Foundation of Features</h5>
                    <p className="text-white/90 mb-3">Creating a positioning platform that ensures consumers view Galaxy products through a uniquely crafted lens over time.</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-xs text-cyan-300">"The Performance You Can Expect In Galaxy"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Gallery Collapsible Section */}
          <div className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button 
              onClick={() => toggleSection('gallery')}
              className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 ${
                activeSection === 'gallery' 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700' 
                : 'bg-white hover:bg-gray-50 text-gray-900'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Media Gallery</h3>
                <p className="text-lg opacity-80">Featured presentations, speaking engagements, and media appearances</p>
              </div>
              <ChevronDown 
                size={28} 
                className={`transition-transform duration-300 ${
                  activeSection === 'gallery' ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === 'gallery' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 border-t border-blue-100">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-red-500 to-pink-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a 
                          href="https://www.youtube.com/watch?v=SSCmwChfdvM"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </a>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold text-lg drop-shadow">Featured Video</h4>
                        <p className="text-white/90 text-sm drop-shadow">Watch Suzanne discuss product strategy and innovation</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700">Click to watch the full presentation on product strategy, innovation, and market positioning.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Speaking Engagements</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-semibold text-gray-900">Samsung Unpacked Events</h5>
                        <p className="text-gray-600">Product launches and strategy presentations for Galaxy devices</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-semibold text-gray-900">Industry Conferences</h5>
                        <p className="text-gray-600">Keynotes on mobile innovation and product management</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="font-semibold text-gray-900">Media Interviews</h5>
                        <p className="text-gray-600">Technology insights and market analysis</p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h5 className="font-semibold text-gray-900">Product Strategy Sessions</h5>
                        <p className="text-gray-600">Deep-dive presentations on product development methodology</p>
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
      <section id="experience" className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-600/20"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Experience Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
              <div className="text-4xl font-bold text-white mb-3 drop-shadow">16+</div>
              <div className="text-xl font-semibold text-white mb-3 drop-shadow">Years Experience</div>
              <p className="text-white/90">
                Developing and launching innovative products across the technology spectrum.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
              <div className="text-4xl font-bold text-white mb-3 drop-shadow">Millions</div>
              <div className="text-xl font-semibold text-white mb-3 drop-shadow">Global Consumers</div>
              <p className="text-white/90">
                Products have driven engagement and delight across millions of users worldwide.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
              <div className="text-4xl font-bold text-white mb-3 drop-shadow">30+</div>
              <div className="text-xl font-semibold text-white mb-3 drop-shadow">Product Launches</div>
              <p className="text-white/90">
                Successfully launched diverse hardware and software products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/30 to-purple-100/30"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Technology Focus Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group text-center p-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-white to-blue-100 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 drop-shadow">5G Networks</h3>
              <p className="text-white/90">Hyper-speed connectivity driving innovation</p>
            </div>
            <div className="group text-center p-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-white to-green-100 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 drop-shadow">IoT</h3>
              <p className="text-white/90">Connected devices transforming experiences</p>
            </div>
            <div className="group text-center p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-white to-purple-100 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 drop-shadow">Voice Interface</h3>
              <p className="text-white/90">Natural interaction through voice technology</p>
            </div>
            <div className="group text-center p-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-white to-orange-100 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 drop-shadow">AI Simplification</h3>
              <p className="text-white/90">Making technology more accessible with AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-white/90 mb-4">
                <span className="font-semibold">Email:</span> suzanne.desilva@gmail.com
              </p>
              <p className="text-white/90 mb-4">
                <span className="font-semibold">Phone:</span> +1 (123) 456-7890
              </p>
              <p className="text-white/90">
                <span className="font-semibold">Location:</span> San Francisco, CA
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/suzanne-desilva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3C3.88 3 3 3.88 3 4.98v14.04C3 20.12 3.88 21 4.98 21h14.04C20.12 21 21 20.12 21 19.02V4.98C21 3.88 20.12 3 19.02 3H4.98zM9 19H7v-6h2v6zm-1-7.07c-.65 0-1.17-.52-1.17-1.17S7.35 9.76 8 9.76s1.17.52 1.17 1.17-.52 1.17-1.17 1.17zm11 7.07h-2v-3.5c0-.83-.67-1.5-1.5-1.5S15 15.17 15 16v3h-2v-6h2v.84c.28-.54.79-.84 1.36-.84 1.1 0 2 .9 2 2v3.26z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/suzannedesilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.643 4.937c-.835.371-1.732.62-2.675.732a4.686 4.686 0 0 0 2.034-2.573 9.373 9.373 0 0 1-3.127 1.195A4.648 4.648 0 0 0 16.337 3c-2.573 0-4.655 2.082-4.655 4.655 0 .365.041.719.122 1.061-3.872-.194-7.314-2.051-9.605-4.867a4.646 4.646 0 0 0-.628 2.337c0 1.617.823 3.042 2.073 3.872a4.617 4.617 0 0 1-2.107-.582v.058c0 2.247 1.596 4.115 3.72 4.54a4.655 4.655 0 0 1-2.1.079c.593 1.855 2.309 3.208 4.33 3.244A9.354 9.354 0 0 1 2 19.543a13.186 13.186 0 0 0 7.148 2.094c8.577 0 13.287-7.113 13.287-13.287 0-.203 0-.406-.014-.608A9.427 9.427 0 0 0 24 4.557a9.24 9.24 0 0 1-2.657.728 4.646 4.646 0 0 0 2.034-2.573z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/suzannedesilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.273 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577 0-.287-.011-1.243-.018-2.25-3.338.724-4.042-1.607-4.042-1.607-.546-1.384-1.333-1.754-1.333-1.754-1.086-.743.083-.728.083-.728 1.204.084 1.836 1.237 1.836 1.237 1.067 1.827 2.803 1.297 3.487.992.107-.772.418-1.297.761-1.597-2.665-.303-5.467-1.333-5.467-5.933 0-1.312.469-2.384 1.236-3.219-.124-.303-.537-1.52.117-3.165 0 0 1.007-.323 3.303 1.23A11.56 11.56 0 0 1 12 3.013c1.03.004 2.06.139 3.086.404 2.296-1.553 3.303-1.23 3.303-1.23.654 1.645.241 2.862.118 3.165.767.835 1.236 1.907 1.236 3.219 0 4.605-2.805 5.63-5.465 5.933.429.371.812 1.104.812 2.223 0 1.607-.014 2.898-.014 3.287 0 .319.187.694.798.577A12.045 12.045 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a 
              href="https://suzannedesilva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
            >
              Visit My Website
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-700 pt-4">
            <p className="text-center text-gray-400 text-sm">
              &copy; 2023 Suzanne De Silva. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}