import React, { useState, useEffect } from 'react';
import { Menu, X, User, Mail, Search, Heart, ShoppingCart, Bell, Send, Moon, Sun, Trash2, Download } from 'lucide-react';

export default function GenericWebApp() {
  // ==================== ESTADOS ====================
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('info');
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Bienvenido a MiApp', read: false },
    { id: 2, text: 'Nueva actualización disponible', read: false }
  ]);
  const [user, setUser] = useState(null);
  const [counter, setCounter] = useState(0);

  // ==================== EFECTOS ====================
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = '#1a202c';
    } else {
      document.body.style.backgroundColor = '#f7fafc';
    }
  }, [darkMode]);

  // ==================== FUNCIONES ====================
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert(`¡Mensaje enviado por ${formData.name}! 📧`);
      setFormData({ name: '', email: '', message: '' });
      addNotification('Mensaje enviado correctamente');
    } else {
      alert('Por favor completa todos los campos');
    }
  };
  
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };
  
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    addNotification(`${product.name} añadido al carrito`);
  };
  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };
  
  const addNotification = (text) => {
    const newNotif = { id: Date.now(), text, read: false };
    setNotifications(prev => [newNotif, ...prev]);
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  const handleLogin = () => {
    setUser({ name: 'Usuario Demo', email: 'demo@miapp.com' });
    addNotification('¡Sesión iniciada con éxito!');
    setActiveModal(null);
  };
  
  const handleLogout = () => {
    setUser(null);
    addNotification('Sesión cerrada');
  };
  
  const exportData = () => {
    const data = { favorites, cart, user };
    console.log('Exportando datos:', data);
    alert('Datos exportados a la consola');
  };

  // ==================== DATOS ====================
  const products = [
    { id: 1, name: 'Producto Premium', price: '99€', image: '🎨', desc: 'Diseño profesional' },
    { id: 2, name: 'Servicio Pro', price: '149€', image: '💼', desc: 'Consultoría experta' },
    { id: 3, name: 'Pack Completo', price: '199€', image: '📦', desc: 'Todo incluido' },
    { id: 4, name: 'Básico', price: '49€', image: '⭐', desc: 'Para empezar' },
  ];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const price = parseFloat(product.price.replace('€', ''));
    const matchesPrice = 
      priceFilter === 'all' ||
      (priceFilter === 'low' && price < 100) ||
      (priceFilter === 'mid' && price >= 100 && price < 150) ||
      (priceFilter === 'high' && price >= 150);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} transition-colors duration-300`}>
      
      {/* ========== HEADER ========== */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-50 transition-colors`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                APP
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>MiApp</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition font-medium`}>Inicio</a>
              <a href="#productos" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition font-medium`}>Productos</a>
              <a href="#contacto" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition font-medium`}>Contacto</a>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
              </button>
              
              <button 
                onClick={() => setActiveModal('search')}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <Search size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              
              <button 
                onClick={() => setActiveModal('notifications')}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition relative`}
              >
                <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              <button 
                onClick={() => setActiveModal('cart')}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition relative`}
              >
                <ShoppingCart size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              
              {user ? (
                <button 
                  onClick={() => setActiveModal('user')}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
              ) : (
                <button 
                  onClick={() => setActiveModal('login')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Login
                </button>
              )}
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} className={darkMode ? 'text-white' : ''} /> : <Menu size={24} className={darkMode ? 'text-white' : ''} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#inicio" className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Inicio</a>
              <a href="#productos" className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Productos</a>
              <a href="#contacto" className={`block py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contacto</a>
            </div>
          )}
        </nav>
      </header>

      {/* ========== HERO ========== */}
      <section id="inicio" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            ✨ React + Tailwind CSS
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">MiApp</span>
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 max-w-2xl mx-auto`}>
            Plantilla educativa completa con React Hooks y más de 15 funcionalidades
          </p>
          
          <div className={`inline-flex items-center space-x-4 mb-8 px-6 py-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
            <button 
              onClick={() => setCounter(counter - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              -
            </button>
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Contador: {counter}
            </span>
            <button 
              onClick={() => setCounter(counter + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              +
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveModal('demo')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-xl transition transform hover:scale-105 font-medium"
            >
              Ver Demo
            </button>
            <button 
              onClick={exportData}
              className={`px-8 py-3 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'} rounded-lg transition shadow-lg font-medium flex items-center justify-center gap-2`}
            >
              <Download size={18} />
              Exportar Datos
            </button>
          </div>
        </div>
      </section>

      {/* ========== TECNOLOGÍAS ========== */}
      <section className={`py-12 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
            🚀 Tecnologías y Lenguajes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-6 rounded-xl text-center`}>
              <div className="text-4xl mb-3">⚛️</div>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>React</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>JavaScript Library</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-50 to-cyan-100'} p-6 rounded-xl text-center`}>
              <div className="text-4xl mb-3">🎨</div>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Tailwind CSS</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Framework CSS</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'} p-6 rounded-xl text-center`}>
              <div className="text-4xl mb-3">📱</div>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Responsive</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mobile-first</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-50 to-green-100'} p-6 rounded-xl text-center`}>
              <div className="text-4xl mb-3">🔧</div>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Hooks</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>useState, useEffect</p>
            </div>
          </div>
          
          <div className={`mt-8 p-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl`}>
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>💻 Dónde usar este código:</h3>
            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>✓ <strong>Claude.ai</strong> - Directamente aquí (artefactos React)</li>
              <li>✓ <strong>CodeSandbox</strong> - Entorno online para React</li>
              <li>✓ <strong>StackBlitz</strong> - Editor online instantáneo</li>
              <li>✓ <strong>Local</strong> - Create React App o Vite</li>
              <li>✓ <strong>Next.js / Remix</strong> - Frameworks React</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========== FUNCIONALIDADES ========== */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
            ⚡ Funcionalidades Incluidas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌙', title: 'Modo Oscuro', desc: 'Toggle entre tema claro y oscuro' },
              { icon: '🛒', title: 'Carrito de Compras', desc: 'Añadir, eliminar y calcular totales' },
              { icon: '🔔', title: 'Notificaciones', desc: 'Sistema de alerts en tiempo real' },
              { icon: '🔍', title: 'Búsqueda', desc: 'Filtrar productos dinámicamente' },
              { icon: '💾', title: 'Gestión de Estado', desc: 'useState y useEffect en acción' },
              { icon: '❤️', title: 'Favoritos', desc: 'Sistema de me gusta' },
              { icon: '📝', title: 'Formularios', desc: 'Validación y manejo de datos' },
              { icon: '🪟', title: 'Modales', desc: 'Ventanas emergentes interactivas' },
              { icon: '📊', title: 'Contador', desc: 'Ejemplo básico de estado' },
            ].map((feature, i) => (
              <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition`}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{feature.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUCTOS ========== */}
      <section id="productos" className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Nuestros Productos
          </h2>
          <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
            Usa los filtros para buscar lo que necesitas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className={`px-4 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} rounded-lg focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">Todos los precios</option>
              <option value="low">Menos de 100€</option>
              <option value="mid">100€ - 150€</option>
              <option value="high">Más de 150€</option>
            </select>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'} rounded-xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2`}
              >
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{product.name}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 text-sm`}>{product.desc}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 text-sm"
                  >
                    + Carrito
                  </button>
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-lg transition transform hover:scale-110 ${
                      favorites.includes(product.id) 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : `${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'} hover:bg-gray-300`
                    }`}
                  >
                    <Heart size={18} fill={favorites.includes(product.id) ? 'white' : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-8`}>
              No se encontraron productos con esos filtros
            </p>
          )}
        </div>
      </section>

      {/* ========== CONTACTO ========== */}
      <section id="contacto" className="py-16 px-4">
        <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-8`}>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 text-center`}>
            Contáctanos
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center mb-6`}>
            Completa el formulario y te responderemos pronto
          </p>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <User size={16} className="inline mr-2" />
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <Mail size={16} className="inline mr-2" />
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Mensaje
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-xl transition transform hover:scale-105 font-medium flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Enviar Mensaje
            </button>
          </div>
        </div>
      </section>

      {/* ========== MODALES ========== */}
      {activeModal === 'demo' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>🎉 Modal Demo</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <X size={24} className={darkMode ? 'text-white' : ''} />
              </button>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Este es un modal de ejemplo. Puedes personalizar su contenido completamente.
            </p>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {activeModal === 'cart' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl max-h-96 overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>🛒 Carrito</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <X size={24} className={darkMode ? 'text-white' : ''} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} py-8`}>
                Tu carrito está vacío
              </p>
            ) : (
              <div>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                      <div className="flex-1">
                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.price} x {item.quantity}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 mb-4`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total:</span>
                    <span className="text-2xl font-bold text-blue-600">{getCartTotal()}€</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeModal === 'notifications' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl max-h-96 overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>🔔 Notificaciones</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <X size={24} className={darkMode ? 'text-white' : ''} />
              </button>
            </div>
            
            {notifications.length === 0 ? (
              <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} py-8`}>
                No tienes notificaciones
              </p>
            ) : (
              <div>
                <div className="space-y-2 mb-4">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`p-4 rounded-lg cursor-pointer transition ${
                        notif.read 
                          ? darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{notif.text}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={clearNotifications}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  Limpiar Todo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeModal === 'login' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>👤 Iniciar Sesión</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <X size={24} className={darkMode ? 'text-white' : ''} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <button 
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium mb-3"
            >
              Acceder
            </button>
            <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Esta es una demo. Haz clic en Acceder para simular login.
            </p>
          </div>
        </div>
      )}

      {activeModal === 'user' && user && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>👤 Mi Perfil</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <X size={24} className={darkMode ? 'text-white' : ''} />
              </button>
            </div>
            
            <div className={`space-y-4 mb-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nombre</p>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {activeModal === 'search' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>🔍 Búsqueda</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition`}
              >
                <X size={24} className={darkMode ? 'text-white' : ''} />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en MiApp..."
                className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500`}
                autoFocus
              />
            </div>
            
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
              Escribe algo para buscar productos, páginas o contenido
            </p>
          </div>
        </div>
      )}

      {/* ========== FOOTER ========== */}
      <footer className={`${darkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">MiApp</h4>
              <p className="text-gray-400 text-sm">
                Plantilla educativa para aprender desarrollo web moderno con React.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition">Tutoriales</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 MiApp. Plantilla educativa. Hecha con ❤️ para aprender React.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
