import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './App.css';

// Registra o ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = ({ size = 24, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function App() {
  // Configurações Globais
  const whatsappNumber = '5511992947425'; // WhatsApp de Atendimento
  const displayPhone = '(11) 99294-7425';
  const address = 'Av. Elísio Teixeira Leite, 6061 - São Paulo, Brasil - CEP 02810-000';
  const mapsLink = 'https://maps.google.com/?q=Av+Elisio+Teixeira+Leite+6061,+Sao+Paulo,+Brazil+02810000';
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

  // Estado de Controle de Rolagem da Navbar
  const [isScrolled, setIsScrolled] = useState(false);

  // Estado de Categoria Selecionada do Catálogo (para navegação por âncoras/abas)
  const [activeCategory, setActiveCategory] = useState('todos');

  // Estado do Carrinho de Compras
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('duma_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Salvar Carrinho no LocalStorage sempre que alterar
  useEffect(() => {
    localStorage.setItem('duma_cart', JSON.stringify(cart));
  }, [cart]);

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

  // Monitorar Abertura do Carrinho para Animações GSAP nos cards internos
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      // Animação de mola na abertura do painel
      gsap.fromTo('.cart-drawer', 
        { x: '100%' }, 
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      );
      // Animação em cascata (stagger) dos itens do carrinho
      gsap.fromTo('.cart-item', 
        { opacity: 0, y: 30, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.05, ease: 'back.out(1.2)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen]);

  // Catálogo Ampliado de Produtos em Promoção
  const produtosCatalogo = [
    // Carnes / Açougue (Promoções Especiais)
    {
      id: 1,
      nome: "Alcatra c/ Maminha Kg",
      precoOriginal: "49,90",
      preco: "41,99",
      desconto: "15% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/promos/alcatra.jpg"
    },
    {
      id: 2,
      nome: "Patinho Selecionado Kg",
      precoOriginal: "45,90",
      preco: "38,49",
      desconto: "16% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/promos/patinho.jpg"
    },
    {
      id: 3,
      nome: "Lagarto Kg",
      precoOriginal: "42,90",
      preco: "36,49",
      desconto: "15% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/promos/lagarto.jpg"
    },
    {
      id: 4,
      nome: "Costela Ponta de Agulha Kg",
      precoOriginal: "29,90",
      preco: "23,99",
      desconto: "20% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/promos/costela.jpg"
    },
    {
      id: 101,
      nome: "Picanha Fatiada Selecionada",
      precoOriginal: "89,90",
      preco: "69,99",
      desconto: "22% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/produtos/picanha.svg"
    },
    {
      id: 201,
      nome: "Linguiça Toscana Kg",
      precoOriginal: "26,90",
      preco: "19,99",
      desconto: "25% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/produtos/linguica.svg"
    },
    {
      id: 202,
      nome: "Asa de Frango Congelada Kg",
      precoOriginal: "19,90",
      preco: "14,99",
      desconto: "24% OFF",
      unidade: "Kg",
      categoria: "carnes",
      imagem: "/assets/produtos/asa-frango.svg"
    },
    // Mercearia
    {
      id: 102,
      nome: "Feijão Carioca Tipo 1 1kg",
      precoOriginal: "9,90",
      preco: "7,49",
      desconto: "24% OFF",
      unidade: "Un",
      categoria: "mercearia",
      imagem: "/assets/produtos/feijao.svg"
    },
    {
      id: 203,
      nome: "Arroz Agulhinha Tipo 1 5kg",
      precoOriginal: "32,90",
      preco: "26,99",
      desconto: "18% OFF",
      unidade: "Un",
      categoria: "mercearia",
      imagem: "/assets/produtos/arroz.svg"
    },
    {
      id: 204,
      nome: "Óleo de Soja 900ml",
      precoOriginal: "7,99",
      preco: "5,99",
      desconto: "25% OFF",
      unidade: "Un",
      categoria: "mercearia",
      imagem: "/assets/produtos/oleo.svg"
    },
    {
      id: 205,
      nome: "Café Torrado e Moído 500g",
      precoOriginal: "21,90",
      preco: "16,99",
      desconto: "22% OFF",
      unidade: "Un",
      categoria: "mercearia",
      imagem: "/assets/produtos/cafe.svg"
    },
    // Hortifrúti
    {
      id: 103,
      nome: "Tomate Italiano Fresco Kg",
      precoOriginal: "8,99",
      preco: "6,99",
      desconto: "22% OFF",
      unidade: "Kg",
      categoria: "hortifruti",
      imagem: "/assets/produtos/tomate.svg"
    },
    {
      id: 104,
      nome: "Banana Prata de Primeira Kg",
      precoOriginal: "6,99",
      preco: "5,49",
      desconto: "21% OFF",
      unidade: "Kg",
      categoria: "hortifruti",
      imagem: "/assets/produtos/banana.svg"
    },
    {
      id: 206,
      nome: "Batata Monalisa Kg",
      precoOriginal: "8,49",
      preco: "6,49",
      desconto: "23% OFF",
      unidade: "Kg",
      categoria: "hortifruti",
      imagem: "/assets/produtos/batata.svg"
    },
    {
      id: 207,
      nome: "Cebola Nacional Kg",
      precoOriginal: "7,99",
      preco: "5,99",
      desconto: "25% OFF",
      unidade: "Kg",
      categoria: "hortifruti",
      imagem: "/assets/produtos/cebola.svg"
    },
    // Padaria
    {
      id: 105,
      nome: "Pão Francês Crocante Kg",
      precoOriginal: "18,90",
      preco: "14,99",
      desconto: "20% OFF",
      unidade: "Kg",
      categoria: "padaria",
      imagem: "/assets/produtos/pao.svg"
    },
    {
      id: 106,
      nome: "Bolo Caseiro de Chocolate",
      precoOriginal: "28,00",
      preco: "22,00",
      desconto: "21% OFF",
      unidade: "Un",
      categoria: "padaria",
      imagem: "/assets/produtos/bolo.svg"
    },
    // Adega
    {
      id: 107,
      nome: "Cerveja Heineken Lata 350ml",
      precoOriginal: "7,49",
      preco: "5,99",
      desconto: "20% OFF",
      unidade: "Un",
      categoria: "adega",
      imagem: "/assets/produtos/cerveja.svg"
    },
    {
      id: 108,
      nome: "Vinho Tinto Fino Reservado",
      precoOriginal: "39,90",
      preco: "29,90",
      desconto: "25% OFF",
      unidade: "Un",
      categoria: "adega",
      imagem: "/assets/produtos/vinho.svg"
    },
    {
      id: 208,
      nome: "Refrigerante Coca-Cola 2L",
      precoOriginal: "11,99",
      preco: "8,99",
      desconto: "25% OFF",
      unidade: "Un",
      categoria: "adega",
      imagem: "/assets/produtos/coca.svg"
    },
    {
      id: 209,
      nome: "Suco de Uva Integral 1L",
      precoOriginal: "16,90",
      preco: "12,99",
      desconto: "23% OFF",
      unidade: "Un",
      categoria: "adega",
      imagem: "/assets/produtos/suco.svg"
    }
  ];

  // Setores do Supermercado
  const setores = [
    { id: 'carnes', nome: 'Açougue', emoji: '🥩' },
    { id: 'hortifruti', nome: 'Hortifrúti', emoji: '🍎' },
    { id: 'padaria', nome: 'Padaria', emoji: '🥖' },
    { id: 'adega', nome: 'Adega', emoji: '🍷' },
    { id: 'mercearia', nome: 'Mercearia', emoji: '🛒' }
  ];

  // Funções do Carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantidade: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const newQty = item.quantidade + amount;
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((i) =>
          i.id === productId ? { ...i, quantidade: newQty } : i
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Remover Item com Animação de Saída Suave
  const handleRemoveItem = (productId) => {
    const itemElement = document.getElementById(`cart-item-${productId}`);
    if (itemElement) {
      itemElement.classList.add('removing');
      // Aguarda o término da animação do CSS (300ms) para atualizar o estado
      setTimeout(() => {
        removeFromCart(productId);
      }, 300);
    } else {
      removeFromCart(productId);
    }
  };

  const clearCart = () => {
    // Efeito de desaparecimento nos itens antes de limpar o estado
    const items = document.querySelectorAll('.cart-item');
    if (items.length > 0) {
      items.forEach(el => el.classList.add('removing'));
      setTimeout(() => {
        setCart([]);
      }, 300);
    } else {
      setCart([]);
    }
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantidade, 0);
  
  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.preco.replace(',', '.'));
    return total + price * item.quantidade;
  }, 0);

  // Rolagem Suave até a Seção da Categoria
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`cat-${categoryId}`);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Rolar o Carrossel via Setas
  const scrollCarousel = (setorId, direction) => {
    const container = document.getElementById(`carousel-${setorId}`);
    if (container) {
      const cardWidth = 280 + 24; // Largura do card + gap no desktop
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Efeito Cinematográfico: Partícula "Fly to Cart" usando GSAP
  const animateFlyToCart = (startElement) => {
    const targetElement = document.querySelector('.navbar-cart-btn');
    if (!startElement || !targetElement) return;

    const startRect = startElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Cria a bolinha temporária
    const particle = document.createElement('div');
    particle.className = 'fly-to-cart-particle';
    particle.innerHTML = '🛒';
    document.body.appendChild(particle);

    const startX = startRect.left + startRect.width / 2 - 15;
    const startY = startRect.top + startRect.height / 2 - 15;
    
    const targetX = targetRect.left + targetRect.width / 2 - 15;
    const targetY = targetRect.top + targetRect.height / 2 - 15;

    // Define posição inicial da partícula
    gsap.set(particle, {
      x: startX + window.scrollX,
      y: startY + window.scrollY,
      scale: 1.2,
      opacity: 1
    });

    // Animação em curva parabólica para o carrinho
    const tl = gsap.timeline({
      onComplete: () => {
        particle.remove();
        // Efeito de mola no botão de carrinho na navbar
        gsap.fromTo(targetElement, 
          { scale: 1 }, 
          { scale: 1.35, duration: 0.15, yoyo: true, repeat: 1, ease: 'back.out(1.5)' }
        );
        // Efeito de pulso no botão flutuante se ele estiver ativo no DOM
        const floatCart = document.querySelector('.cart-float-btn');
        if (floatCart) {
          gsap.fromTo(floatCart, 
            { scale: 1 }, 
            { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: 'back.out(1.5)' }
          );
        }
      }
    });

    tl.to(particle, {
      x: targetX + window.scrollX,
      y: targetY + window.scrollY,
      scale: 0.3,
      opacity: 0.8,
      rotation: 360,
      duration: 0.75,
      ease: 'power2.inOut'
    });
  };

  const handleAddToCartAction = (e, prod) => {
    e.stopPropagation();
    addToCart(prod);

    // Mola rápida no botão clicado
    gsap.fromTo(e.currentTarget, 
      { scale: 1 }, 
      { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' }
    );

    // Dispara a bolinha voadora cinematográfica
    animateFlyToCart(e.currentTarget);
  };

  // GSAP: Animações de Entrada Globais
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
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsappAction = (messageText) => {
    const text = encodeURIComponent(messageText || 'Olá! Vi os produtos em promoção no site do Duma Supermercado e gostaria de fazer um pedido.');
    window.open(`${whatsappBaseUrl}?text=${text}`, '_blank');
  };

  const finalizarPedidoWhatsApp = () => {
    if (cart.length === 0) return;

    const agora = new Date();
    const dataStr = agora.toLocaleDateString('pt-BR');
    const horaStr = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let mensagem = `🛒 *DUMA SUPERMERCADO - NOVO PEDIDO*\n`;
    mensagem += `=========================================\n`;
    mensagem += `📅 _Pedido enviado em: ${dataStr} às ${horaStr}_\n\n`;
    mensagem += `Olá! Gostaria de fazer o seguinte pedido do catálogo:\n\n`;

    // Agrupa itens do carrinho por setor
    const itensPorSetor = {};
    cart.forEach(item => {
      if (!itensPorSetor[item.categoria]) {
        itensPorSetor[item.categoria] = [];
      }
      itensPorSetor[item.categoria].push(item);
    });

    // Renderiza cada setor que tem itens
    setores.forEach(setor => {
      const itensDoSetor = itensPorSetor[setor.id];
      if (itensDoSetor && itensDoSetor.length > 0) {
        mensagem += `-----------------------------------------\n`;
        mensagem += `${setor.emoji} *${setor.nome.toUpperCase()}*\n`;
        mensagem += `-----------------------------------------\n`;
        
        itensDoSetor.forEach(item => {
          const unitPrice = parseFloat(item.preco.replace(',', '.'));
          const itemTotal = unitPrice * item.quantidade;
          const formattedItemTotal = itemTotal.toFixed(2).replace('.', ',');
          
          mensagem += `• *${item.nome}*\n`;
          mensagem += `  Qtd: ${item.quantidade} ${item.unidade} | Unitário: R$ ${item.preco}\n`;
          mensagem += `  Subtotal: R$ ${formattedItemTotal}\n\n`;
        });
      }
    });

    mensagem += `=========================================\n`;
    mensagem += `📊 *RESUMO DO PEDIDO*\n`;
    mensagem += `=========================================\n`;
    mensagem += `📦 Total de Itens: ${cartItemsCount}\n`;
    mensagem += `💰 *VALOR TOTAL: R$ ${cartTotal.toFixed(2).replace('.', ',')}*\n`;
    mensagem += `=========================================\n\n`;
    mensagem += `*Formas de entrega e pagamento a combinar.*\n`;
    mensagem += `Aguardando retorno para fechar o pedido. Obrigado!`;

    const text = encodeURIComponent(mensagem);
    window.open(`${whatsappBaseUrl}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* NAVBAR — "A Ilha Flutuante" */}
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
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          
          <div className="navbar-actions">
            <button 
              className="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrinho"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && <span className="cart-badge-count">{cartItemsCount}</span>}
            </button>
            
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

      {/* CATÁLOGO DE PRODUTOS */}
      <section className="catalog-section" id="catalogo">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Ofertas do Duma Supermercado</h2>
            <p className="section-subtitle">
              Confira as promoções ativas em nossos setores. Adicione os itens ao carrinho e envie a sua lista direto para o nosso WhatsApp!
            </p>
          </div>

          {/* Menu de Abas (Tabs) para Rolagem Rápida */}
          <div className="catalog-tabs-container">
            <div className="catalog-tabs">
              <button
                className={`tab-btn ${activeCategory === 'todos' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('todos');
                  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Todos
              </button>
              {setores.map(setor => (
                <button
                  key={setor.id}
                  className={`tab-btn ${activeCategory === setor.id ? 'active' : ''}`}
                  onClick={() => scrollToCategory(setor.id)}
                >
                  {setor.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Fileiras de Categorias com Carrossel de Produtos */}
          <div className="category-rows-container">
            {setores.map(setor => {
              const produtosDoSetor = produtosCatalogo.filter(prod => prod.categoria === setor.id);
              if (produtosDoSetor.length === 0) return null;

              return (
                <div key={setor.id} id={`cat-${setor.id}`} className="category-row-section">
                  <div className="category-row-header">
                    <h3 className="category-row-title">
                      <span className="category-emoji">{setor.emoji}</span> {setor.nome}
                    </h3>
                    
                    <div className="category-header-actions">
                      <span className="category-items-count" style={{ marginRight: '8px' }}>{produtosDoSetor.length} Ofertas</span>
                      {/* Setas de Controle do Carrossel (Desktop) */}
                      <div className="carousel-nav-buttons">
                        <button 
                          className="carousel-nav-btn" 
                          onClick={() => scrollCarousel(setor.id, 'left')}
                          aria-label={`Rolar ${setor.nome} para esquerda`}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button 
                          className="carousel-nav-btn" 
                          onClick={() => scrollCarousel(setor.id, 'right')}
                          aria-label={`Rolar ${setor.nome} para direita`}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Carrossel Horizontal de Produtos */}
                  <div id={`carousel-${setor.id}`} className="category-products-carousel scrollbar-hide">
                    {produtosDoSetor.map(prod => {
                      const cartItem = cart.find(item => item.id === prod.id);
                      return (
                        <article 
                          className="product-card" 
                          key={prod.id}
                          aria-label={`Produto: ${prod.nome}`}
                        >
                          <div className="product-img-wrapper">
                            <img src={prod.imagem} alt={prod.nome} className="product-img" loading="lazy" />
                            {prod.desconto && <span className="product-discount-badge">{prod.desconto}</span>}
                            <span className="product-category-badge">{setor.nome}</span>
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
                            
                            {cartItem ? (
                              <div className="quantity-selector" onClick={(e) => e.stopPropagation()}>
                                <button className="qty-btn" onClick={() => updateQuantity(prod.id, -1)} aria-label="Diminuir quantidade">
                                  <Minus size={14} />
                                </button>
                                <span className="qty-val">{cartItem.quantidade} {prod.unidade}</span>
                                <button className="qty-btn" onClick={(e) => handleAddToCartAction(e, prod)} aria-label="Aumentar quantidade">
                                  <Plus size={14} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                className="btn-product-add"
                                onClick={(e) => handleAddToCartAction(e, prod)}
                              >
                                <Plus size={14} /> Adicionar
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão Central de Enviar Lista (aparece se tiver itens no carrinho) */}
          {cart.length > 0 && (
            <div className="cta-container" style={{ marginTop: '50px' }}>
              <button 
                className="btn-cta-whatsapp"
                onClick={finalizarPedidoWhatsApp}
              >
                <ShoppingCart size={20} />
                📲 ENVIAR MINHA LISTA DE COMPRAS ({cartItemsCount})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer" id="contato">
        <div className="container footer-grid">
          {/* Coluna 1: Marca */}
          <div className="footer-col footer-brand-col">
            <div className="footer-logo-wrapper" style={{ marginBottom: '16px' }}>
              <img 
                src="/assets/logo-white.png" 
                alt="Duma Supermercado Logo" 
                className="footer-logo-img" 
                style={{ height: '56px', objectFit: 'contain' }}
              />
            </div>
            <p style={{ marginBottom: '16px', color: '#E2E8F0' }}>
              Tradição em servir com qualidade, variedade e o menor preço da região.
            </p>
            <a 
              href="https://instagram.com/dumasupermercado" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-instagram-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}
            >
              <InstagramIcon size={18} style={{ color: '#ffffff' }} />
              @dumasupermercado
            </a>
          </div>

          {/* Coluna 2: Localização e Setores */}
          <div className="footer-col footer-info-col">
            <div style={{ marginBottom: '24px' }}>
              <h4>📍 Onde Estamos</h4>
              <p style={{ color: '#E2E8F0', lineHeight: '1.6' }}>
                Av. Elísio Teixeira Leite, 6061<br />
                São Paulo, SP - CEP 02810-000
              </p>
            </div>
            <div>
              <h4>🛒 Nossos Setores</h4>
              <p style={{ color: '#E2E8F0', lineHeight: '1.6' }}>
                Açougue, Padaria, Hortifrúti, Mercearia e Adega.
              </p>
            </div>
          </div>

          {/* Coluna 3: Chamada para Ação (CTA) */}
          <div className="footer-col footer-cta-col">
            <h4>Pronto para economizar?</h4>
            <p style={{ color: '#E2E8F0', marginBottom: '18px', lineHeight: '1.6' }}>
              Faça seu pedido sem sair de casa pelo WhatsApp.
            </p>
            <a 
              href={`${whatsappBaseUrl}?text=${encodeURIComponent('Olá! Gostaria de fazer o seguinte pedido do catálogo.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-cta-btn"
            >
              📲 PEDIR AGORA NO WHATSAPP
            </a>
          </div>
        </div>

        <div className="container footer-bottom-bar">
          <p>&copy; 2026 Duma Supermercado. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por <a href="https://kodava.com.br" target="_blank" rel="noopener noreferrer" className="footer-agency-link">Kodava Solutions</a>
          </p>
        </div>
      </footer>

      {/* FLOATING CART BUTTON (Apenas quando houver itens, acima do botão do WhatsApp) */}
      {cartItemsCount > 0 && (
        <button 
          className="cart-float-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Ver carrinho com ${cartItemsCount} itens`}
          title="Ver Carrinho"
        >
          <ShoppingCart size={24} />
          <span className="cart-float-badge">{cartItemsCount}</span>
        </button>
      )}

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

      {/* DRAWER DO CARRINHO (SLIDE-OVER) */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <div className="cart-drawer-title">
              <ShoppingCart size={22} className="cart-title-icon" />
              <h3>Meu Carrinho</h3>
              {cartItemsCount > 0 && <span className="cart-header-count">{cartItemsCount} {cartItemsCount === 1 ? 'item' : 'itens'}</span>}
            </div>
            <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)} aria-label="Fechar carrinho">
              <X size={24} />
            </button>
          </div>

          <div className="cart-drawer-content">
            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <ShoppingCart size={64} className="cart-empty-icon" />
                <p className="cart-empty-title">Seu carrinho está vazio</p>
                <p className="cart-empty-subtitle">Adicione produtos de nosso catálogo para iniciar seu pedido.</p>
                <button className="btn-continue-shopping" onClick={() => setIsCartOpen(false)}>
                  Voltar ao Catálogo
                </button>
              </div>
            ) : (
              <div className="cart-items-list">
                {cart.map(item => {
                  const unitPrice = parseFloat(item.preco.replace(',', '.'));
                  const itemTotal = unitPrice * item.quantidade;
                  const formattedItemTotal = itemTotal.toFixed(2).replace('.', ',');
                  
                  return (
                    <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>
                      <div className="cart-item-img-wrapper">
                        <img src={item.imagem} alt={item.nome} className="cart-item-img" />
                      </div>
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.nome}</h4>
                        <span className="cart-item-price-unit">R$ {item.preco} / {item.unidade}</span>
                        <div className="cart-item-actions">
                          <div className="cart-item-qty-control">
                            <button onClick={() => updateQuantity(item.id, -1)} aria-label="Diminuir quantidade">
                              <Minus size={12} />
                            </button>
                            <span className="cart-item-qty-value">{item.quantidade}</span>
                            <button onClick={() => addToCart(item)} aria-label="Aumentar quantidade">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="cart-item-subtotal">R$ {formattedItemTotal}</span>
                        </div>
                      </div>
                      <button className="cart-item-remove" onClick={() => handleRemoveItem(item.id)} aria-label="Remover item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-summary-row">
                <span>Total Geral</span>
                <span className="cart-total-value">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="cart-footer-disclaimer">Pedido mínimo e entrega sujeitos a disponibilidade e taxas adicionais.</p>
              <div className="cart-footer-buttons">
                <button className="btn-cart-checkout" onClick={finalizarPedidoWhatsApp}>
                  <MessageCircle size={18} fill="currentColor" />
                  Finalizar pelo WhatsApp
                </button>
                <button className="btn-cart-clear" onClick={clearCart}>
                  Limpar Carrinho
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Textura de Ruído (Noise Overlay) */}
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
