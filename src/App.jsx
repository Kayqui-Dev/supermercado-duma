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
  ChevronRight,
  Beef,
  Apple,
  Cookie,
  Wine,
  ShoppingBag,
  CheckCircle2,
  Sparkles
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

  // Departamentos do Supermercado
  const departamentos = [
    { id: 1, nome: "Açougue", icon: <Beef size={24} />, class: "dept-red", msg: "Olá! Gostaria de saber os preços e cortes disponíveis de hoje no açougue." },
    { id: 2, nome: "Hortifrúti", icon: <Apple size={24} />, class: "dept-green", msg: "Olá! Gostaria de saber quais verduras e frutas frescas chegaram hoje." },
    { id: 3, nome: "Padaria", icon: <Cookie size={24} />, class: "dept-amber", msg: "Olá! Gostaria de saber se tem fornada quente de pão francês agora." },
    { id: 4, nome: "Adega", icon: <Wine size={24} />, class: "dept-purple", msg: "Olá! Gostaria de saber as ofertas de bebidas e vinhos da semana." },
    { id: 5, nome: "Mercearia", icon: <ShoppingBag size={24} />, class: "dept-slate", msg: "Olá! Gostaria de enviar minha lista de mercearia para fazer um pedido." }
  ];

  // Passos de Funcionamento do Delivery
  const passosDelivery = [
    {
      passo: "1",
      titulo: "Veja os Encartes",
      desc: "Explore nossas ofertas semanais e encartes de carnes selecionadas logo abaixo."
    },
    {
      passo: "2",
      titulo: "Envie seu Pedido",
      desc: "Clique no botão do encarte ou envie sua lista de compras direto no nosso WhatsApp."
    },
    {
      passo: "3",
      titulo: "Entrega Rápida",
      desc: "Nossa equipe separa os melhores itens e entrega frescos na sua porta em minutos."
    }
  ];

  // GSAP: Animações de Entrada e Contadores Dinâmicos
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
        stagger: 0.1,
        ease: 'back.out(1.2)'
      }, '-=0.2')
      .from('.hero-visual-card', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');

      // 2. Animação ScrollTrigger: Departamentos
      gsap.from('.department-card', {
        scrollTrigger: {
          trigger: '.departments-grid',
          start: 'top 85%',
        },
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.5)'
      });

      // 3. Animação ScrollTrigger: Encartes
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

      // 4. Animação ScrollTrigger: Passos do Delivery
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: '.delivery-steps',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // 5. Animação progressiva dos números de estatísticas comerciais (GSAP CountUp)
      const stats = [
        { selector: '#stat-clients', endVal: 15000, suffix: '+', isLocale: true },
        { selector: '#stat-delivery', endVal: 45, suffix: ' min', isLocale: false },
        { selector: '#stat-offers', endVal: 500, suffix: '+', isLocale: false }
      ];

      stats.forEach(stat => {
        const el = document.querySelector(stat.selector);
        if (!el) return;

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: stat.endVal,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            const floorVal = Math.floor(counterObj.val);
            if (stat.isLocale) {
              el.innerText = `${stat.suffix}${floorVal.toLocaleString('pt-BR')}`;
            } else {
              el.innerText = stat.suffix.startsWith('+') 
                ? `${stat.suffix}${floorVal}` 
                : `${floorVal}${stat.suffix}`;
            }
          }
        });
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
      {/* HEADER (GLASSMORPHISM NAVY) */}
      <header className="main-header">
        <div className="container header-flex">
          <a href="#" className="logo-link" aria-label="Duma Supermercado">
            <img src="/assets/logo-white.png" alt="Duma Supermercado Logo" className="logo-img" />
          </a>
          <div className="header-address">
            <MapPin size={16} />
            <span>{address}</span>
          </div>
          {/* Botão WhatsApp Exclusivo Mobile no Cabeçalho */}
          <a 
            href={`${whatsappBaseUrl}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento do Duma Supermercado.')}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="header-whatsapp-mobile"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </header>

      {/* HERO SECTION (GRID 2 COLUNAS PREMIUM) */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Coluna Esquerda: Texto e Ações */}
          <div className="hero-text-block">
            <span className="hero-badge">Qualidade, Economia e Praticidade</span>
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
              Sua casa abastecida com o pão quentinho da padaria, frutas frescas do hortifrúti e carnes nobres selecionadas no açougue. Compre agora sem sair de casa!
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

          {/* Coluna Direita: Card Visual de Destaque */}
          <div className="hero-visual-container">
            <div className="hero-visual-card">
              <span className="hero-visual-badge">Duma Delivery</span>
              <h2 className="hero-visual-title">O Campeão de Ofertas da Região!</h2>
              <ul className="hero-visual-list">
                <li>
                  <CheckCircle2 size={18} />
                  <span>Açougue Inspecionado e Fresco</span>
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  <span>Padaria com Fornadas de Hora em Hora</span>
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  <span>Hortifrúti Colhido do Produtor</span>
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  <span>Entrega Rápida em até 45 minutos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LETREIRO ROLANTE (RETAIL MARQUEE) */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>🔥 SHOW DE OFERTAS DUMA 🔥</span>
          <span>COMPRE PELO WHATSAPP E RECEBA EM CASA 🔥</span>
          <span>CARNES FRESCAS TODOS OS DIAS 🔥</span>
          <span>SHOW DE OFERTAS DUMA 🔥</span>
          <span>COMPRE PELO WHATSAPP E RECEBA EM CASA 🔥</span>
          <span>CARNES FRESCAS TODOS OS DIAS 🔥</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span>🔥 SHOW DE OFERTAS DUMA 🔥</span>
          <span>COMPRE PELO WHATSAPP E RECEBA EM CASA 🔥</span>
          <span>CARNES FRESCAS TODOS OS DIAS 🔥</span>
          <span>SHOW DE OFERTAS DUMA 🔥</span>
          <span>COMPRE PELO WHATSAPP E RECEBA EM CASA 🔥</span>
          <span>CARNES FRESCAS TODOS OS DIAS 🔥</span>
        </div>
      </div>

      {/* OFERTAS / ENCARTES DA SEMANA (GRID COMPACTO) */}
      <section className="offers-section" id="ofertas">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Encartes Digitais</h2>
            <p className="section-subtitle">
              Confira as ofertas exclusivas do nosso açougue. Toque no card ou no botão para fazer seu pedido direto no WhatsApp!
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

      {/* DEPARTAMENTOS DO SUPERMERCADO */}
      <section className="departments-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Nossos Setores</h2>
            <p className="section-subtitle">
              Tudo o que você precisa em um só lugar. Selecione um setor para falar com um atendente e fazer perguntas.
            </p>
          </div>

          <div className="departments-grid">
            {departamentos.map(dept => (
              <div 
                className={`department-card ${dept.class}`} 
                key={dept.id}
                onClick={() => handleWhatsappAction(dept.msg)}
              >
                <div className="dept-icon-circle">
                  {dept.icon}
                </div>
                <span className="dept-name">{dept.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA O DELIVERY */}
      <section className="delivery-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Como Funciona o Delivery?</h2>
            <p className="section-subtitle">
              Comprar no Duma Supermercado é rápido e muito simples. Siga os passos e receba tudo fresco.
            </p>
          </div>

          <div className="delivery-steps">
            {passosDelivery.map((passo, idx) => (
              <div className="step-card" key={idx}>
                <div className="step-number">{passo.passo}</div>
                <div className="step-icon-wrapper">
                  {idx === 0 && <Sparkles size={24} />}
                  {idx === 1 && <MessageCircle size={24} />}
                  {idx === 2 && <ThumbsUp size={24} />}
                </div>
                <h3 className="step-title">{passo.titulo}</h3>
                <p className="step-desc">{passo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE ESTATÍSTICAS COM CONTADORES (Live GSAP Counters) */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-number" id="stat-clients">+0</div>
            <div className="stat-label">Clientes Satisfeitos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" id="stat-delivery">0 min</div>
            <div className="stat-label">Tempo de Entrega</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" id="stat-offers">+0</div>
            <div className="stat-label">Ofertas Semanais</div>
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
