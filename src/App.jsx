import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import './App.css';

// Registra o ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Configurações Globais
  const whatsappNumber = '5511992947425'; // WhatsApp de Atendimento
  const displayPhone = '(11) 99294-7425';
  const address = 'Av. Elísio Teixeira Leite, 6061 - São Paulo, SP';
  const mapsLink = 'https://maps.google.com/?q=Av.+Elisio+Teixeira+Leite,+6061+-+Sao+Paulo,+SP';
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

  // Estado de Controle de Rolagem da Navbar
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitorar Rolagem para a Navbar Flutuante ("A Ilha Flutuante")
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Encartes de Ofertas Reais (Fotos Reais)
  const encartesOfertas = [
    {
      id: 1,
      nome: "Alcatra c/ Maminha Kg",
      imagem: "/assets/promos/alcatra.jpg",
      msgWhatsApp: "Olá! Gostaria de encomendar Alcatra c/ Maminha (R$ 41,99/Kg) em promoção."
    },
    {
      id: 2,
      nome: "Patinho Kg",
      imagem: "/assets/promos/patinho.jpg",
      msgWhatsApp: "Olá! Gostaria de encomendar Patinho (R$ 38,49/Kg) em promoção."
    },
    {
      id: 3,
      nome: "Lagarto Kg",
      imagem: "/assets/promos/lagarto.jpg",
      msgWhatsApp: "Olá! Gostaria de encomendar Lagarto (R$ 36,49/Kg) em promoção."
    },
    {
      id: 4,
      nome: "Costela Ponta de Agulha Kg",
      imagem: "/assets/promos/costela.jpg",
      msgWhatsApp: "Olá! Gostaria de encomendar Costela Ponta de Agulha (R$ 23,99/Kg) em promoção."
    }
  ];

  // GSAP: Animações de Entrada
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrada da Hero Section
      const heroTimeline = gsap.timeline();
      heroTimeline.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2')
      .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3')
      .from('.hero-actions > *', {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(1.2)'
      }, '-=0.2');

      // 2. Animação ScrollTrigger: Encartes
      gsap.from('.flyer-card', {
        scrollTrigger: {
          trigger: '.flyers-feed',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsappAction = (messageText) => {
    const text = encodeURIComponent(messageText || 'Olá! Vi os encartes promocionais do Duma Supermercado e gostaria de fazer um pedido.');
    window.open(`${whatsappBaseUrl}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* NAVBAR — "A Ilha Flutuante" (Pill-shaped, fixed e centralizada) */}
      <nav className={`pill-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo" aria-label="Duma Supermercado">
            <img 
              src={isScrolled ? "/assets/logo-red.png" : "/assets/logo-white.png"} 
              alt="Duma Supermercado Logo" 
              className="navbar-logo-img" 
            />
          </a>
          <ul className="navbar-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#ofertas">Ofertas</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <div className="navbar-cta">
            <a 
              href={`${whatsappBaseUrl}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento do Duma Supermercado.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-btn-whatsapp"
            >
              Pedir Agora
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (CENTRALIZADA E VERMELHA) */}
      <section className="hero-section" id="inicio">
        <div className="container hero-centered-content">
          <span className="hero-badge">Economia e Qualidade Todo Dia</span>
          
          <div className="hero-title-container">
            <h1 className="hero-title">
              As Melhores <span>Promoções da Semana!</span>
            </h1>
            {/* Underline Animado SVG */}
            <svg className="hero-underline-svg" viewBox="0 0 600 20" preserveAspectRatio="none">
              <path className="hero-underline-path" d="M 10,10 C 200,18 400,18 590,10" />
            </svg>
          </div>

          <p className="hero-subtitle">
            O Campeão de Ofertas da Região. Tudo o que você precisa com o máximo de frescor e economia no Açougue, Padaria e Hortifrúti.
          </p>

          <div className="hero-actions">
            <button 
              className="btn-cta-whatsapp"
              onClick={() => handleWhatsappAction('Olá! Vi o site do Duma Supermercado e gostaria de ver as ofertas de hoje.')}
            >
              <MessageCircle size={20} fill="currentColor" />
              📲 COMPRAR AGORA PELO WHATSAPP
            </button>
          </div>
        </div>
      </section>

      {/* OFERTAS / ENCARTES DA SEMANA */}
      <section className="offers-section" id="ofertas">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Encartes Digitais</h2>
            <p className="section-subtitle">
              Confira as ofertas exclusivas do nosso açougue. Toque no encarte ou no botão para fazer seu pedido direto no WhatsApp!
            </p>
          </div>

          {/* Feed de Folhas/Flyers de Carnes (Grid Responsivo Premium) */}
          <div className="flyers-feed">
            {encartesOfertas.map((flyer) => (
              <article 
                className="flyer-card" 
                key={flyer.id}
                onClick={() => handleWhatsappAction(flyer.msgWhatsApp)}
                aria-label={`Pedir ${flyer.nome} no WhatsApp`}
              >
                <div className="flyer-img-container">
                  <img src={flyer.imagem} alt={flyer.nome} loading="lazy" />
                  <div className="flyer-overlay">
                    <MessageCircle size={24} fill="currentColor" />
                    <span>Pedir pelo WhatsApp</span>
                  </div>
                </div>
                <button className="btn-card-checkout" onClick={(e) => { e.stopPropagation(); handleWhatsappAction(flyer.msgWhatsApp); }}>
                  🛒 PEDIR NO WHATSAPP
                </button>
              </article>
            ))}
          </div>

          {/* Botão Principal Central de WhatsApp */}
          <div className="cta-container">
            <button 
              className="btn-cta-whatsapp"
              onClick={() => handleWhatsappAction('Olá! Vi os encartes promocionais do Duma Supermercado e gostaria de enviar minha lista de compras.')}
            >
              <MessageCircle size={20} fill="currentColor" />
              📲 ENVIAR MINHA LISTA DE COMPRAS
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer" id="contato">
        <div className="container footer-grid">
          {/* Coluna 1: Marca */}
          <div className="footer-col">
            <h3>Duma Supermercado</h3>
            <p style={{ marginBottom: '16px' }}>
              Tradição em servir com qualidade, variedade e o menor preço da região de São Paulo.
            </p>
            <p><strong>{address}</strong></p>
          </div>

          {/* Coluna 2: Funcionamento */}
          <div className="footer-col">
            <h4>Horário de Atendimento</h4>
            <ul className="footer-links">
              <li>
                <Clock size={16} />
                <span>Segunda a Sábado: 08h às 21h</span>
              </li>
              <li>
                <Clock size={16} />
                <span>Domingos e Feriados: 08h às 13h</span>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contatos e Pagamentos */}
          <div className="footer-col">
            <h4>Fale Conosco &amp; Rotas</h4>
            <ul className="footer-links" style={{ marginBottom: '20px' }}>
              <li>
                <Phone size={16} />
                <a href={`${whatsappBaseUrl}`} target="_blank" rel="noopener noreferrer">
                  {displayPhone} (Pedidos WhatsApp)
                </a>
              </li>
              <li>
                <MapPin size={16} />
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Como Chegar via Maps <ExternalLink size={12} />
                </a>
              </li>
            </ul>
            
            <h4>Formas de Pagamento</h4>
            <div className="payment-badges">
              {['Pix', 'Crédito', 'Débito', 'Sodexo', 'Ticket Alimentação', 'VR', 'Dinheiro'].map(badge => (
                <span className="payment-badge" key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>&copy; 2026 Duma Supermercado. Todos os direitos reservados.</p>
          <p>Av. Elísio Teixeira Leite, 6061 - São Paulo, SP</p>
        </div>
      </footer>

      {/* FLOATING PULSING WHATSAPP BUTTON (Always on screen) */}
      <a 
        href={`${whatsappBaseUrl}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento do Duma Supermercado.')}`}
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
        <MessageCircle />
      </a>

      {/* Textura de Ruído (Noise Overlay) conforme gemini.md */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', opacity: 0.035, pointerEvents: 'none', zIndex: 9999 }} xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
      </svg>
    </>
  );
}

export default App;
