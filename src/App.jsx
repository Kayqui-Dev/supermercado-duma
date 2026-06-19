import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ThumbsUp,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import './App.css';

// Registra o ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Configurações Globais
  const whatsappNumber = '5511992947425'; // Novo número do WhatsApp solicitado pelo usuário
  const displayPhone = '(11) 99294-7425';
  const address = 'Av. Elísio Teixeira Leite, 6061 - São Paulo, SP';
  const mapsLink = 'https://maps.google.com/?q=Av.+Elisio+Teixeira+Leite,+6061+-+Sao+Paulo,+SP';
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

  // Encartes de Carnes Reais
  const encartesOfertas = [
    {
      id: 1,
      nome: "Alcatra c/ Maminha Kg",
      precoOriginal: "49,90",
      preco: "41,99",
      imagem: "/assets/promos/alcatra.jpg",
      unidade: "Kg",
      msgWhatsApp: "Olá! Gostaria de encomendar Alcatra c/ Maminha (R$ 41,99/Kg) em promoção."
    },
    {
      id: 2,
      nome: "Patinho Kg",
      precoOriginal: "45,90",
      preco: "38,49",
      imagem: "/assets/promos/patinho.jpg",
      unidade: "Kg",
      msgWhatsApp: "Olá! Gostaria de encomendar Patinho (R$ 38,49/Kg) em promoção."
    },
    {
      id: 3,
      nome: "Lagarto Kg",
      precoOriginal: "42,90",
      preco: "36,49",
      imagem: "/assets/promos/lagarto.jpg",
      unidade: "Kg",
      msgWhatsApp: "Olá! Gostaria de encomendar Lagarto (R$ 36,49/Kg) em promoção."
    },
    {
      id: 4,
      nome: "Costela Ponta de Agulha Kg",
      precoOriginal: "29,90",
      preco: "23,99",
      imagem: "/assets/promos/costela.jpg",
      unidade: "Kg",
      msgWhatsApp: "Olá! Gostaria de encomendar Costela Ponta de Agulha (R$ 23,99/Kg) em promoção."
    }
  ];

  // GSAP: Animações de Entrada (Slide Up & Fade In)
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animação Hero
      const heroTimeline = gsap.timeline();
      heroTimeline.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      .from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2')
      .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3');

      // Animação dos Flyers
      gsap.from('.flyer-card', {
        scrollTrigger: {
          trigger: '.flyers-feed',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out'
      });
      
      // Animação do botão CTA central
      gsap.from('.cta-container', {
        scrollTrigger: {
          trigger: '.cta-container',
          start: 'top 90%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.5)'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsappAction = (messageText) => {
    const text = encodeURIComponent(messageText || 'Olá! Vi o encarte de ofertas do Duma Supermercado e gostaria de fazer um pedido.');
    window.open(`${whatsappBaseUrl}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* HEADER */}
      <header className="main-header">
        <div className="container header-flex">
          <a href="#" className="logo-link" aria-label="Duma Supermercado">
            <img src="/assets/logo-red.png" alt="Duma Supermercado Logo" className="logo-img" />
          </a>
          <div className="header-address">
            <MapPin size={16} />
            <span>{address}</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <span className="hero-badge">Economia e Qualidade Todo Dia</span>
          <h1 className="hero-title">
            As Melhores <span>Promoções da Semana!</span>
          </h1>
          <p className="hero-subtitle">
            O Campeão de Ofertas da Região. Tudo o que você precisa com o máximo de frescor e economia no Açougue, Padaria e Hortifrúti.
          </p>
        </div>
      </section>

      {/* OFERTAS / ENCARTES DA SEMANA */}
      <section className="offers-section" id="ofertas">
        <div className="container">
          <h2 className="section-title">Nossos Encartes Digitais</h2>
          <p className="section-desc">
            Confira as ofertas imbatíveis do nosso açougue. Toque no encarte para fazer seu pedido direto no WhatsApp!
          </p>

          {/* Feed de Folhas/Flyers de Carnes (Retrato/Quadrado Gigante) */}
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
                    <MessageCircle size={28} fill="currentColor" />
                    <span>Pedir pelo WhatsApp</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Central Green Pulsing Button */}
          <div className="cta-container">
            <button 
              className="btn-cta-whatsapp"
              onClick={() => handleWhatsappAction('Olá! Vi os encartes promocionais do Duma Supermercado e gostaria de enviar minha lista de compras.')}
            >
              <MessageCircle size={24} fill="currentColor" />
              📲 COMPRAR AGORA PELO WHATSAPP
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
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
    </>
  );
}

export default App;
