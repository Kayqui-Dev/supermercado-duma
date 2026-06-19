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

  // Estado de Categoria Selecionada do Catálogo
  const [selectedCategory, setSelectedCategory] = useState('todos');

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

  // Catálogo Geral de Produtos EM PROMOÇÃO (Utilizando as imagens SVG existentes)
  const produtosCatalogo = [
    {
      id: 101,
      nome: "Picanha Fatiada Selecionada",
      precoOriginal: "89,90",
      preco: "69,99",
      desconto: "22% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/produtos/picanha.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Picanha Fatiada em oferta (R$ 69,99/Kg) do catálogo."
    },
    {
      id: 102,
      nome: "Feijão Carioca Tipo 1",
      precoOriginal: "9,90",
      preco: "7,49",
      desconto: "24% OFF",
      unidade: "Kg",
      categoria: "mercearia",
      imagem: "/assets/produtos/feijao.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Feijão Carioca Tipo 1 em oferta (R$ 7,49/Kg) do catálogo."
    },
    {
      id: 103,
      nome: "Tomate Italiano Fresco",
      precoOriginal: "8,99",
      preco: "6,99",
      desconto: "22% OFF",
      unidade: "Kg",
      categoria: "hortifruti",
      imagem: "/assets/produtos/tomate.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Tomate Italiano em oferta (R$ 6,99/Kg) do catálogo."
    },
    {
      id: 104,
      nome: "Banana Prata de Primeira",
      precoOriginal: "6,99",
      preco: "5,49",
      desconto: "21% OFF",
      unidade: "Kg",
      categoria: "hortifruti",
      imagem: "/assets/produtos/banana.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Banana Prata em oferta (R$ 5,49/Kg) do catálogo."
    },
    {
      id: 105,
      nome: "Pão Francês Crocante",
      precoOriginal: "18,90",
      preco: "14,99",
      desconto: "20% OFF",
      unidade: "Kg",
      categoria: "padaria",
      imagem: "/assets/produtos/pao.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Pão Francês Crocante em oferta (R$ 14,99/Kg) do catálogo."
    },
    {
      id: 106,
      nome: "Bolo Caseiro de Chocolate",
      precoOriginal: "28,00",
      preco: "22,00",
      desconto: "21% OFF",
      unidade: "Un",
      categoria: "padaria",
      imagem: "/assets/produtos/bolo.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Bolo Caseiro de Chocolate em oferta (R$ 22,00/Un) do catálogo."
    },
    {
      id: 107,
      nome: "Cerveja Heineken Lata 350ml",
      precoOriginal: "7,49",
      preco: "5,99",
      desconto: "20% OFF",
      unidade: "Un",
      categoria: "adega",
      imagem: "/assets/produtos/cerveja.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Cerveja Heineken Lata em oferta (R$ 5,99/Un) do catálogo."
    },
    {
      id: 108,
      nome: "Vinho Tinto Fino Reservado",
      precoOriginal: "39,90",
      preco: "29,90",
      desconto: "25% OFF",
      unidade: "Un",
      categoria: "adega",
      imagem: "/assets/produtos/vinho.svg",
      msgWhatsApp: "Olá! Gostaria de fazer o pedido de Vinho Tinto Reservado em oferta (R$ 29,90/Un) do catálogo."
    }
  ];

  // Filtro de Categorias
  const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'carnes', nome: 'Açougue' },
    { id: 'hortifruti', nome: 'Hortifrúti' },
    { id: 'padaria', nome: 'Padaria' },
    { id: 'adega', nome: 'Adega' },
    { id: 'mercearia', nome: 'Mercearia' }
  ];

  const produtosFiltrados = selectedCategory === 'todos'
    ? produtosCatalogo
    : produtosCatalogo.filter(prod => prod.categoria === selectedCategory);

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
          trigger: '.offers-section',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });

      // 3. Animação ScrollTrigger: Grid de Produtos
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: '.catalog-section',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsappAction = (messageText) => {
    const text = encodeURIComponent(messageText || 'Olá! Vi os produtos em promoção no site do Duma Supermercado e gostaria de fazer um pedido.');
    window.open(`${whatsappBaseUrl}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* NAVBAR — "A Ilha Flutuante" (Pill-shaped, fixed e sempre com logo-white.png sem fundo) */}
      <nav className={`pill-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo" aria-label="Duma Supermercado">
            <img 
              src="/assets/logo-white.png" 
              alt="Duma Supermercado Logo" 
              className="navbar-logo-img" 
            />
          </a>
          <ul className="navbar-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#promocoes">Promoções</a></li>
            <li><a href="#catalogo">Catálogo</a></li>
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

      {/* PROMOÇÕES DA SEMANA (ENCARTES EM CARROSSEL MOBILE / GRID DESKTOP) */}
      <section className="offers-section" id="promocoes">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Promoções Imperdíveis</h2>
            <p className="section-subtitle">
              Confira os encartes exclusivos do nosso açougue. Role para o lado no celular ou clique para pedir direto pelo WhatsApp!
            </p>
          </div>

          {/* Feed de Folhas/Flyers de Carnes (Carrossel Horizontal no celular) */}
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
                  <span className="flyer-badge-tag">Oferta</span>
                  <div className="flyer-overlay">
                    <MessageCircle size={24} fill="currentColor" />
                    <span>Pedir pelo WhatsApp</span>
                  </div>
                </div>
                <div className="flyer-info-container">
                  <h3 className="flyer-title">{flyer.nome}</h3>
                  <div className="flyer-status">
                    <span className="status-dot"></span>
                    <span>Pronta entrega (Fresco)</span>
                  </div>
                  <button className="btn-card-whatsapp" onClick={(e) => { e.stopPropagation(); handleWhatsappAction(flyer.msgWhatsApp); }}>
                    <MessageCircle size={16} fill="currentColor" />
                    Pedir no WhatsApp
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE PRODUTOS (FILTRO POR ABAS E GRID COMPACTO 2 COLUNAS MOBILE) */}
      <section className="catalog-section" id="catalogo">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Nosso Catálogo em Promoção</h2>
            <p className="section-subtitle">
              Navegue pelas abas abaixo e confira as ofertas especiais com descontos incríveis nos setores do Duma.
            </p>
          </div>

          {/* Menu de Abas (Tabs) */}
          <div className="catalog-tabs-container">
            <div className="catalog-tabs">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="products-grid">
            {produtosFiltrados.map(prod => (
              <article 
                className="product-card" 
                key={prod.id}
                onClick={() => handleWhatsappAction(prod.msgWhatsApp)}
                aria-label={`Pedir ${prod.nome} no WhatsApp`}
              >
                <div className="product-img-wrapper">
                  <img src={prod.imagem} alt={prod.nome} className="product-img" loading="lazy" />
                  <span className="product-discount-badge">{prod.desconto}</span>
                  <span className="product-category-badge">{prod.categoria}</span>
                </div>
                <div className="product-details">
                  <h4 className="product-name">{prod.nome}</h4>
                  <div className="product-pricing">
                    <span className="price-original">R$ {prod.precoOriginal}</span>
                    <div className="price-promo">
                      <span className="currency">R$</span>
                      <span className="price-val">{prod.preco}</span>
                      <span className="unit">/{prod.unidade}</span>
                    </div>
                  </div>
                  <button 
                    className="btn-product-whatsapp"
                    onClick={(e) => { e.stopPropagation(); handleWhatsappAction(prod.msgWhatsApp); }}
                  >
                    <MessageCircle size={14} fill="currentColor" />
                    Pedir
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Botão Central de WhatsApp */}
          <div className="cta-container" style={{ marginTop: '40px' }}>
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
