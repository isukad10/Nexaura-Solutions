import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Server, Lightbulb, Mail, Code, BarChart, Phone, MapPin, Linkedin, Github, PenSquare, ChevronRight, Menu, X, Users, Briefcase, Award } from 'lucide-react';
import * as THREE from 'three';
import Logo from '../images/logo2.jpg';

// Import all required icons from lucide-react.
const icons = {
  Rocket,
  Server,
  Lightbulb,
  Mail,
  Code,
  BarChart,
  Phone,
  MapPin,
  Linkedin,
  Github,
  PenSquare,
  Menu,
  X,
  Users,
  Briefcase,
  Award
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const fullText = "Building the future, one line of code at a time.";
  const typingSpeed = 50;

  const [visibleCards, setVisibleCards] = useState({});
  const [visibleInterns, setVisibleInterns] = useState({});
  const [visibleBlogPosts, setVisibleBlogPosts] = useState({});
  const [visibleWhyUs, setVisibleWhyUs] = useState({});
  const [visibleAbout, setVisibleAbout] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const threeCanvasRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, particles;
    let particleCount = 2000;
    let positions = new Float32Array(particleCount * 3);
    let colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
      camera.position.z = 200;

      scene = new THREE.Scene();

      const geometry = new THREE.BufferGeometry();
      const pMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
      });

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() * 2 - 1) * 500;
        positions[i3 + 1] = (Math.random() * 2 - 1) * 500;
        positions[i3 + 2] = (Math.random() * 2 - 1) * 500;

        color.setHSL(Math.random() * 0.1 + 0.5, 1.0, 0.5);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      particles = new THREE.Points(geometry, pMaterial);
      scene.add(particles);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      threeCanvasRef.current.appendChild(renderer.domElement);

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (threeCanvasRef.current && renderer) {
        threeCanvasRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    let title = 'Nexaura Solutions';
    let description = "Nexaura Solutions is a leading IT company offering expert services in web development, cloud solutions, AI, and more. We build the future, one line of code at a time.";
   
    setVisibleCards({});
    setVisibleInterns({});
    setVisibleBlogPosts({});
    setVisibleWhyUs({});
    setVisibleAbout({});

    const createTimers = (data, setVisible) => {
      return data.map((_, index) => {
        return setTimeout(() => {
          setVisible(prev => ({ ...prev, [index]: true }));
        }, index * 150);
      });
    };

    let timers = [];

    switch (activeTab) {
      case 'home':
        title = 'Home - Nexaura Solutions';
        description = "Nexaura Solutions is a leading IT company offering expert services in web development, cloud solutions, AI, and more. We build the future, one line of code at a time.";
        timers = createTimers(whyUsData, setVisibleWhyUs);
        break;
      case 'about':
        title = 'About Us - Nexaura Solutions';
        description = "Learn about Nexaura Solutions' mission, vision, and the passionate team behind our innovative technology solutions.";
        timers = createTimers(aboutData, setVisibleAbout);
        break;
      case 'services':
        title = 'Services - Nexaura Solutions';
        description = "Explore our comprehensive suite of IT services including web development, cloud computing, and AI solutions.";
        timers = createTimers(servicesData, setVisibleCards);
        break;
      case 'interns':
        title = 'Internships - Nexaura Solutions';
        description = "Kickstart your career with our hands-on tech internships in software engineering, AI/ML, and design.";
        timers = createTimers(internsData, setVisibleInterns);
        break;
      case 'blog':
        title = 'Blog - Nexaura Solutions';
        description = "Read our latest insights on technology, innovation, and the future of coding from industry experts.";
        timers = createTimers(blogPostsData, setVisibleBlogPosts);
        break;
      case 'contact':
        title = 'Contact - Nexaura Solutions';
        description = "Get in touch with Nexaura Solutions for expert IT consulting and project inquiries.";
        break;
      default:
        break;
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = description;
    if (!metaDescription.parentNode) {
      document.head.appendChild(metaDescription);
    }
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => handleTabClick(tab)}
      className={`px-4 py-2 rounded-full font-medium transition-colors duration-300
        ${activeTab === tab
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-400 hover:text-white hover:bg-slate-800'
        } flex items-center gap-2 cursor-pointer`}
    >
      <span>{label}</span>
    </button>
  );

  const Section = ({ title, children, id, innerRef, className = '', maxWidth = 'max-w-7xl' }) => (
    <section id={id} ref={innerRef} className={`py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-center justify-center relative z-10 ${className}`}>
      <div className={`${maxWidth} w-full`}>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-16 tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">{title}</span>
        </h2>
        {children}
      </div>
    </section>
  );

  const ServiceCard = ({ title, description, icon: Icon, isVisible, index }) => (
    <div
      data-index={index}
      className={`bg-slate-800 p-8 rounded-xl shadow-xl border border-blue-700 transition-all transform duration-1000 ease-out hover:scale-105 hover:shadow-blue-500/20
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-blue-600 rounded-full shadow-lg transition-transform hover:rotate-12 duration-300">
          <Icon size={48} className="text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-blue-400 mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );

  const InternCard = ({ title, description, requirement, icon: Icon, isVisible, index }) => (
    <div
      data-index={index}
      className={`bg-slate-800 p-8 rounded-xl shadow-xl border border-blue-700 transition-all transform duration-1000 ease-out hover:scale-105 hover:shadow-blue-500/20
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-blue-600 rounded-full shadow-lg transition-transform hover:rotate-12 duration-300">
          <Icon size={48} className="text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-blue-400 mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-center mb-2">{description}</p>
      <p className="text-gray-400 text-sm text-center mb-6">
          <span className="font-semibold text-white">Requirements:</span> {requirement}
      </p>
      <div className="flex justify-center">
        <a
          href={`https://wa.me/+94721191908?text=${encodeURIComponent(`I'm interested in the ${title} internship!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        >
          Apply Now
        </a>
      </div>
    </div>
  );

  const BlogPostCard = ({ title, date, summary, icon: Icon, isVisible, index }) => (
    <div
      data-index={index}
      className={`bg-slate-800 p-8 rounded-xl shadow-xl border border-blue-700 transition-all transform duration-1000 ease-out hover:scale-105 hover:shadow-blue-500/20
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-600 rounded-full shadow-lg transition-transform hover:rotate-12 duration-300">
          <Icon size={32} className="text-white" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-blue-400 mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-sm text-center mb-4">{date}</p>
      <p className="text-gray-300 text-center">{summary}</p>
    </div>
  );

  const WhyUsCard = ({ title, description, icon: Icon, isVisible, index }) => (
    <div
      data-index={index}
      className={`p-6 sm:p-8 rounded-xl bg-slate-800 border border-slate-700 shadow-lg flex flex-col items-center text-center space-y-4 transition-all duration-1000 ease-out transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="p-3 bg-blue-600 rounded-full shadow-lg">
        <Icon size={32} className="text-white" />
      </div>
      <h4 className="text-xl font-semibold text-blue-400">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  );

  const servicesData = [
    { title: "Web Development", description: "Crafting responsive, high-performance websites and web applications.", icon: Code },
    { title: "Cloud Solutions", description: "Expert cloud migration and optimization for scalable and secure infrastructure.", icon: Server },
    { title: "AI & Machine Learning", description: "Leveraging artificial intelligence to automate processes and create smarter solutions.", icon: Lightbulb },
    { title: "Data Analytics", description: "Turning complex data into actionable insights for informed business decisions.", icon: BarChart },
    { title: "Mobile App Development", description: "Building native and cross-platform apps for a seamless user experience.", icon: Rocket },
    { title: "IT Consulting", description: "Providing strategic guidance and expert advice to optimize your technology stack.", icon: Phone },
  ];

  const internsData = [
    { title: "Software Engineering Intern", description: "Join our core team to build scalable services and contribute to open-source projects.", requirement: "Proficiency in Python or Java.", icon: Code },
    { title: "AI/ML Research Intern", description: "Work on cutting-edge machine learning models and help solve complex data-driven problems.", requirement: "Experience with TensorFlow or PyTorch.", icon: Lightbulb },
    { title: "UI/UX Design Intern", description: "Collaborate with our design team to create beautiful, intuitive user interfaces for our web applications.", requirement: "A portfolio showcasing design skills.", icon: Rocket },
  ];

  const blogPostsData = [
    { title: "The Future of AI in Web Development", date: "August 20, 2024", summary: "Exploring how AI is revolutionizing front-end frameworks and back-end services.", icon: "Code" },
    { title: "Leveraging Cloud Computing for Scalability", date: "July 15, 2024", summary: "A deep dive into how businesses can use cloud infrastructure to scale operations efficiently.", icon: "Server" },
    { title: "5 Essential Skills for an IT Consultant", date: "June 30, 2024", summary: "From data analytics to cybersecurity, here are the skills needed to succeed in IT.", icon: "Lightbulb" },
    { title: "Introduction to Quantum Computing", date: "June 5, 2024", summary: "An overview of the fascinating world of quantum computing and its potential impact on technology.", icon: "BarChart" },
    { title: "Building a Better User Experience", date: "May 25, 2024", summary: "Tips and tricks for designing intuitive and engaging user interfaces that users will love.", icon: "Rocket" },
    { title: "Cybersecurity in the Age of Remote Work", date: "May 10, 2024", summary: "Protecting your data and systems when your team is distributed across different locations.", icon: "Phone" },
  ];

  const whyUsData = [
    { title: "Innovation", description: "We are constantly exploring new technologies to deliver cutting-edge solutions that give you a competitive edge.", icon: Lightbulb },
    { title: "Expertise", description: "Our team consists of industry veterans and talented specialists who are passionate about solving complex problems.", icon: Code },
    { title: "Reliability", description: "We build robust and secure systems that you can depend on, backed by our dedicated support team.", icon: Server },
    { title: "Client-Centric", description: "Your success is our priority. We work closely with you to understand your needs and deliver tailored solutions.", icon: Rocket },
  ];
  
  const aboutData = [
    {
      title: "Our Team",
      description: "A diverse group of passionate professionals dedicated to solving complex challenges and delivering exceptional results.",
      icon: "Users",
    },
    {
      title: "Our Mission",
      description: "To empower businesses with innovative and scalable technology solutions that drive growth and efficiency.",
      icon: "Briefcase",
    },
    {
      title: "Our Vision",
      description: "To be a global leader in IT services, recognized for our commitment to excellence, integrity, and client success.",
      icon: "Award",
    },
  ];

  return (
    <div className="bg-slate-900 text-gray-100 min-h-screen font-sans overflow-hidden">
      <div ref={threeCanvasRef} className="fixed top-0 left-0 w-full h-full -z-0"></div>

      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 bg-opacity-80 backdrop-blur-sm shadow-lg">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Nexaura Solutions Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold tracking-wider text-white">NEXAURA SOLUTIONS</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden text-gray-400 hover:text-white p-2 rounded"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav
            className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col sm:flex sm:flex-row justify-center sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto mt-4 sm:mt-0`}
          >
            <TabButton tab="home" label="Home" />
            <TabButton tab="about" label="About" />
            <TabButton tab="services" label="Services" />
            <TabButton tab="interns" label="Interns" />
            <TabButton tab="blog" label="Blog" />
            <TabButton tab="contact" label="Contact" />
          </nav>
        </header>
      </div>

      <main ref={mainRef} className="pt-1">
        {activeTab === 'home' && (
          <>
            <Section className="min-h-screen" maxWidth="max-w-screen-2xl">
              <div className="flex flex-col items-center justify-center gap-12 mt-8 text-center">
                <div className="flex-1 relative z-10">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Innovating</span>
                    <br />
                    <span className="text-white">the Digital Future.</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-300 mb-8 font-mono">
                    Building tomorrow's technology today.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleTabClick('services')}
                      className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      Our Services
                    </button>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleTabClick('contact'); }}
                      className="bg-transparent border-2 border-blue-600 text-blue-400 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 transform hover:scale-105"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>

                <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-slate-800 shadow-2xl border border-slate-700 font-mono text-xs sm:text-sm relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <pre className="text-blue-400 overflow-x-auto">
                    <code className="whitespace-pre-wrap">
      {`// Nexaura Solutions: We code the future.
      const NexauraSolutions = (focus) => {
  const coreServices = ['Web Dev', 'Cloud', 'AI/ML'];
// Find your solution.
  const solution = coreServices.find(s => s === focus) || 'Integrated Services';
  return \`Your partner in \${solution}.\`;
};

NexauraSolutions('Web Dev');
// Returns: 'Your partner in Web Dev.'
`}
                    </code>
                  </pre>
                </div>
              </div>
            </Section>

            <Section title="Why Choose Us?" className="bg-slate-900 border-t border-slate-800" maxWidth="max-w-screen-2xl">
              <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
                Our passion for technology and dedication to our clients sets us apart.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyUsData.map((item, index) => (
                  <WhyUsCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    isVisible={visibleWhyUs[index]}
                    index={index}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => handleTabClick('contact')}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Start Your Project
                  <ChevronRight size={20} />
                </button>
              </div>
            </Section>
          </>
        )}
        
        {activeTab === 'about' && (
          <Section title="About Nexaura Solutions" className="py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
              <div className="lg:w-1/2 text-gray-300 space-y-6 text-center lg:text-left">
                <p className="text-lg">
                  Founded in 2025, **Nexaura Solutions** is a dynamic IT company dedicated to delivering cutting-edge technology solutions. We believe in harnessing the power of code to build a smarter, more efficient future for businesses of all sizes.
                </p>
                <p className="text-lg">
                  Our team of expert developers, designers, and strategists works collaboratively to create custom software, scalable cloud infrastructure, and intelligent AI solutions that are tailored to our clients' unique needs. We pride ourselves on our agile approach, commitment to quality, and a passion for innovation.
                </p>
                <button
                  onClick={() => handleTabClick('services')}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  See Our Services
                </button>
              </div>
              <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 lg:mt-0">
                {aboutData.map((item, index) => (
                  <WhyUsCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={icons[item.icon]}
                    isVisible={visibleAbout[index]}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </Section>
        )}

        {activeTab === 'services' && (
          <Section title="Our Expertise">
            <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              We provide a full spectrum of technology services to drive your business forward.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  isVisible={visibleCards[index]}
                  index={index}
                />
              ))}
            </div>
          </Section>
        )}

        {activeTab === 'interns' && (
          <Section title="Internship Opportunities">
            <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Learn from the best and kickstart your tech career with our dynamic internship programs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {internsData.map((intern, index) => (
                <InternCard
                  key={index}
                  title={intern.title}
                  description={intern.description}
                  requirement={intern.requirement}
                  icon={intern.icon}
                  isVisible={visibleInterns[index]}
                  index={index}
                />
              ))}
            </div>
          </Section>
        )}

        {activeTab === 'blog' && (
          <Section title="Our Latest Insights">
            <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Stay up-to-date with our thoughts on technology, innovation, and the future of coding.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPostsData.map((post, index) => (
                <BlogPostCard
                  key={index}
                  title={post.title}
                  date={post.date}
                  summary={post.summary}
                  icon={icons[post.icon] || Code}
                  isVisible={visibleBlogPosts[index]}
                  index={index}
                />
              ))}
            </div>
          </Section>
        )}

        {activeTab === 'contact' && (
          <Section title="Get in Touch">
            <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 w-full max-w-3xl mx-auto relative z-10">
              <div className="space-y-6 text-center mb-8">
                <div className="flex flex-col items-center gap-2 text-gray-300">
                  <Mail size={24} className="text-blue-400" />
                  <a href="mailto:info.nexaurasolutions@gmail.com" className="text-lg font-medium hover:text-blue-400 transition-colors">
                    info.nexaurasolutions@gmail.com
                  </a>
                </div>
              </div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-3 px-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </Section>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between space-y-4 sm:space-y-0 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-gray-400">Nexaura Solutions.</p>
            <p className="text-sm text-gray-500">
              &copy; 2025 All rights reserved. 
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;