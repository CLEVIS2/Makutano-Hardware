import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Boxes, Check, ChevronDown, CircleAlert, Clock3, Hammer, HardHat, Mail, Menu, Minus, Package, Plus, Search, ShoppingBag, SlidersHorizontal, Trash2, Truck, X } from 'lucide-react'
import simbaCement from './images/cement image/simba cement.jpg'
import bamburiCement from './images/cement image/bamburi cement.jpg'
import mombasaCement from './images/cement image/mombasa cement.png'
import ndovuCement from './images/cement image/ndovu cement.png'
import nguvuCement from './images/cement image/nguvu cement.jpg'
import machineCutStones from './images/masonry image/machine cut stones 9 by 9.jpg'
import concreteBlocks from './images/masonry image/concrete block 6 inches.jpg'
import clayBricks from './images/masonry image/clay building bricks.jpg'
import wallTiles from './images/masonry image/wall tiles.jpg'
import ballast from './images/masonry image/ballast.jpg'
import wheelbarrowImage from './assets/wheelbarrow.svg'
import hammerImage from './assets/hammer.svg'

type Product = { id: number; name: string; brand: string; category: string; price: number; cost: number; stock: number; unit: string; image: string; tag?: string }
type Cart = Record<number, number>

const startingProducts: Product[] = [
  { id: 1, name: 'Simba Cement 50kg', brand: 'Simba', category: 'Cement', price: 820, cost: 690, stock: 38, unit: 'bag', image: simbaCement, tag: 'BEST SELLER' },
  { id: 2, name: 'Bamburi Cement 50kg', brand: 'Bamburi', category: 'Cement', price: 780, cost: 650, stock: 42, unit: 'bag', image: bamburiCement },
  { id: 3, name: 'Mombasa Cement 50kg', brand: 'Mombasa', category: 'Cement', price: 760, cost: 635, stock: 31, unit: 'bag', image: mombasaCement },
  { id: 4, name: 'Ndovu Cement 50kg', brand: 'Ndovu', category: 'Cement', price: 840, cost: 700, stock: 27, unit: 'bag', image: ndovuCement },
  { id: 5, name: 'Nguvu Cement 50kg', brand: 'Nguvu', category: 'Cement', price: 800, cost: 670, stock: 35, unit: 'bag', image: nguvuCement },
  { id: 6, name: 'Machine Cut Stones 6×9', brand: 'Makutano Select', category: 'Masonry', price: 65, cost: 45, stock: 420, unit: 'piece', image: machineCutStones, tag: 'POPULAR' },
  { id: 7, name: 'Machine Cut Stones 9×9', brand: 'Makutano Select', category: 'Masonry', price: 75, cost: 52, stock: 290, unit: 'piece', image: machineCutStones },
  { id: 8, name: 'Concrete Blocks 6 inch', brand: 'Makutano Select', category: 'Masonry', price: 95, cost: 68, stock: 180, unit: 'piece', image: concreteBlocks },
  { id: 9, name: 'Clay Building Bricks', brand: 'Local Kiln', category: 'Masonry', price: 28, cost: 18, stock: 850, unit: 'piece', image: clayBricks },
  { id: 10, name: 'Wall Tiles', brand: 'Makutano Select', category: 'Masonry', price: 220, cost: 170, stock: 210, unit: 'piece', image: wallTiles },
  { id: 11, name: 'Ballast', brand: 'Makutano Select', category: 'Masonry', price: 3100, cost: 2550, stock: 90, unit: 'ton', image: ballast },
  { id: 12, name: 'DumuZas Mabati 2.5m', brand: 'Mabati Rolling Mills', category: 'Roofing', price: 1950, cost: 1620, stock: 24, unit: 'sheet', image: 'photo-1635424710928-3e6e9d4e9c4d', tag: 'POPULAR' },
  { id: 13, name: 'Versatile Roofing 3m', brand: 'Mabati Rolling Mills', category: 'Roofing', price: 2450, cost: 2050, stock: 19, unit: 'sheet', image: 'photo-1635424710928-3e6e9d4e9c4d' },
  { id: 14, name: 'Box Profile 2.5m', brand: 'Royal Mabati', category: 'Roofing', price: 1800, cost: 1470, stock: 32, unit: 'sheet', image: 'photo-1635424710928-3e6e9d4e9c4d' },
  { id: 15, name: 'Corrugated Iron Sheet 2.5m', brand: 'Imarisha Mabati', category: 'Roofing', price: 1550, cost: 1290, stock: 0, unit: 'sheet', image: 'photo-1635424710928-3e6e9d4e9c4d' },
  { id: 16, name: 'Common Wire Nails 2 inch', brand: 'Kamal', category: 'Fasteners', price: 250, cost: 185, stock: 18, unit: 'kg', image: 'photo-1586864387967-d02ef85d93e8' },
  { id: 17, name: 'Common Wire Nails 3 inch', brand: 'Kamal', category: 'Fasteners', price: 240, cost: 178, stock: 25, unit: 'kg', image: 'photo-1586864387967-d02ef85d93e8' },
  { id: 18, name: 'Roofing Nails 3 inch', brand: 'Kamal', category: 'Fasteners', price: 280, cost: 210, stock: 12, unit: 'kg', image: 'photo-1586864387967-d02ef85d93e8' },
  { id: 19, name: 'Binding Wire 18G', brand: 'Doshi', category: 'Fasteners', price: 180, cost: 130, stock: 28, unit: 'kg', image: 'photo-1586864387967-d02ef85d93e8' },
  { id: 20, name: 'Steel Bar Y12 12m', brand: 'Devki Steel Mills', category: 'Steel', price: 1250, cost: 1010, stock: 36, unit: 'piece', image: 'photo-1504917595217-d4dc5ebe6122', tag: 'IN DEMAND' },
  { id: 21, name: 'Steel Bar Y10 12m', brand: 'Devki Steel Mills', category: 'Steel', price: 880, cost: 710, stock: 45, unit: 'piece', image: 'photo-1504917595217-d4dc5ebe6122' },
  { id: 22, name: 'Steel Bar Y8 12m', brand: 'Tononoka', category: 'Steel', price: 590, cost: 475, stock: 52, unit: 'piece', image: 'photo-1504917595217-d4dc5ebe6122' },
  { id: 23, name: 'BRC Mesh A142', brand: 'BRC Kenya', category: 'Steel', price: 5200, cost: 4400, stock: 9, unit: 'sheet', image: 'photo-1504917595217-d4dc5ebe6122' },
  { id: 24, name: 'Wheelbarrow 100L', brand: 'Maan', category: 'Tools', price: 6800, cost: 5450, stock: 8, unit: 'piece', image: wheelbarrowImage, tag: 'HEAVY DUTY' },
  { id: 25, name: 'Jembe No. 2', brand: 'Maan', category: 'Tools', price: 850, cost: 620, stock: 16, unit: 'piece', image: 'photo-1581578731548-c64695cc6952' },
  { id: 26, name: 'Mason Hand Trowel', brand: 'Ingco', category: 'Tools', price: 650, cost: 430, stock: 11, unit: 'piece', image: 'photo-1581578731548-c64695cc6952' },
  { id: 27, name: 'Claw Hammer 16oz', brand: 'Ingco', category: 'Tools', price: 1200, cost: 840, stock: 7, unit: 'piece', image: hammerImage, tag: 'HEAVY DUTY' },
  { id: 28, name: 'PVC Pipe 4 inch 6m', brand: 'TopTank', category: 'Plumbing', price: 1850, cost: 1470, stock: 20, unit: 'length', image: 'photo-1607472586893-edb57bdc0e39' },
  { id: 29, name: 'PVC Pipe 2 inch 6m', brand: 'TopTank', category: 'Plumbing', price: 720, cost: 540, stock: 33, unit: 'length', image: 'photo-1607472586893-edb57bdc0e39' },
  { id: 30, name: 'PPR Pipe 20mm', brand: 'Danco', category: 'Plumbing', price: 320, cost: 220, stock: 40, unit: 'length', image: 'photo-1607472586893-edb57bdc0e39' },
  { id: 31, name: 'Acrylic Wall Paint 20L', brand: 'Crown Paints', category: 'Paint', price: 6200, cost: 5100, stock: 13, unit: 'tin', image: 'photo-1562259949-e8e7689d7828', tag: 'TOP PICK' },
  { id: 32, name: 'Weather Guard 4L', brand: 'Plascon', category: 'Paint', price: 2100, cost: 1650, stock: 17, unit: 'tin', image: 'photo-1562259949-e8e7689d7828' },
  { id: 33, name: 'Gloss Enamel 1L', brand: 'Crown Paints', category: 'Paint', price: 950, cost: 720, stock: 14, unit: 'tin', image: 'photo-1562259949-e8e7689d7828' },
  { id: 34, name: 'PPR Gate Valve 20mm', brand: 'Danco', category: 'Plumbing', price: 550, cost: 390, stock: 6, unit: 'piece', image: 'photo-1607472586893-edb57bdc0e39' },
]

const categories = ['All products', 'Cement', 'Masonry', 'Roofing', 'Fasteners', 'Steel', 'Tools', 'Plumbing', 'Paint']
const money = (amount: number) => `KSh ${amount.toLocaleString('en-KE')}`
const imageUrl = (photo: string, width = 700) => (
  photo.startsWith('http') || photo.startsWith('/') || photo.startsWith('data:')
    ? photo
    : `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=82`
)

function loadStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    if (!value) return fallback

    const parsed = JSON.parse(value) as T

    if (key === 'makutano-products' && Array.isArray(parsed)) {
      const requiredNames = ['Simba Cement 50kg', 'Bamburi Cement 50kg', 'Mombasa Cement 50kg', 'Ndovu Cement 50kg', 'Nguvu Cement 50kg', 'Machine Cut Stones 6×9', 'Concrete Blocks 6 inch', 'Clay Building Bricks', 'Wall Tiles', 'Ballast']
      const catalog = parsed as Array<{ name?: string }>
      const hasRequiredCatalog = requiredNames.every((name) => catalog.some((item) => item?.name === name))

      if (!hasRequiredCatalog) {
        localStorage.setItem(key, JSON.stringify(fallback))
        return fallback
      }
    }

    return parsed
  } catch { return fallback }
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => loadStored('makutano-products', startingProducts))
  const [cart, setCart] = useState<Cart>(() => loadStored('makutano-cart', {}))
  const [category, setCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [cartOpen, setCartOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [notice, setNotice] = useState('')
  const [order, setOrder] = useState({ name: '', phone: '', location: '' })
  const [newProduct, setNewProduct] = useState({ name: '', brand: '', category: 'Cement', price: '', cost: '', stock: '', unit: 'piece' })

  useEffect(() => { localStorage.setItem('makutano-products', JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem('makutano-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const filtered = useMemo(() => {
    const result = products.filter((product) => (category === 'All products' || product.category === category) && `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase()))
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price)
    return result
  }, [category, products, query, sort])
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const cartTotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0)
  const cartLines = products.filter((product) => cart[product.id])
  const adminProfit = products.reduce((sum, product) => sum + (product.price - product.cost) * product.stock, 0)
  const lowStock = products.filter((product) => product.stock <= 5)

  function setQuantity(id: number, quantity: number) {
    const product = products.find((item) => item.id === id)
    const bounded = Math.max(0, Math.min(quantity, product?.stock || 0))
    setCart((current) => ({ ...current, [id]: bounded }))
  }

  function submitOrder(event: React.FormEvent) {
    event.preventDefault()
    if (!cartLines.length) return
    const body = [`New order for MAKUTANO HARDWARE`, `Name: ${order.name}`, `Phone: ${order.phone}`, `Delivery / collection: ${order.location || 'To be confirmed'}`, '', ...cartLines.map((product) => `${cart[product.id]} × ${product.name} (${product.brand}) — ${money(product.price * cart[product.id])}`), '', `Estimated total: ${money(cartTotal)}`, '', 'Please confirm availability and delivery details.'].join('\n')
    window.location.href = `mailto:Nyongesaclevis76@gmail.com?subject=${encodeURIComponent(`Hardware order from ${order.name}`)}&body=${encodeURIComponent(body)}`
    setNotice('Your email app is opening with the order details.')
  }

  function addProduct(event: React.FormEvent) {
    event.preventDefault()
    if (!newProduct.name || !newProduct.price) return
    const product: Product = { id: Date.now(), name: newProduct.name, brand: newProduct.brand || 'Makutano Select', category: newProduct.category, price: Number(newProduct.price), cost: Number(newProduct.cost) || 0, stock: Number(newProduct.stock) || 0, unit: newProduct.unit, image: 'photo-1504307651254-35680f356dfd' }
    setProducts((current) => [product, ...current])
    setNewProduct({ name: '', brand: '', category: 'Cement', price: '', cost: '', stock: '', unit: 'piece' })
    setNotice('Product added to the catalogue.')
  }

  return (
    <div className="app-shell">
      <div className="topline"><span><Clock3 size={13} /> Mon–Sat, 7:30am–6:00pm</span><span>Quality materials. Fair prices. <a href="tel:0743483176">Call 0743 483 176</a></span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Makutano Hardware home"><span className="brand-mark"><Hammer size={23} strokeWidth={2.3} /></span><span className="brand-name">MAKUTANO<span>HARDWARE</span></span></a>
        <nav className="main-nav"><a href="#catalogue">Shop</a><a href="#about">Why Makutano</a><a href="#contact">Contact</a></nav>
        <div className="header-actions"><button className="admin-link" onClick={() => setAdminOpen(true)}><HardHat size={16} /> Admin</button><button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={19} /><span>My order</span><b>{cartCount}</b></button></div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy"><div className="eyebrow"><span /> YOUR BUILDING PARTNER IN MAKUTANO</div><h1>Build with<br /><em>confidence.</em></h1><p>From the first foundation bag to the finishing touches, find trusted building supplies at prices that make sense.</p><a className="primary-button" href="#catalogue">Explore products <ArrowRight size={17} /></a><div className="hero-proof"><div className="proof-avatars"><span>MK</span><span>BH</span><span>+K</span></div><div><strong>Trusted by local builders</strong><small>Reliable supplies, every day</small></div></div></div>
          <div className="hero-visual"><img src={imageUrl('photo-1504307651254-35680f356dfd', 1200)} alt="Construction professionals working on a building site" /><div className="hero-stamp"><span>BUILD<br />BETTER</span><ArrowDown size={20} /></div><div className="hero-caption"><span className="caption-line" /><span>Everything you need<br />to build what's next.</span></div><div className="floating-note"><span className="note-icon"><Truck size={19} /></span><span><b>Ready for your site</b><small>Call to arrange delivery</small></span></div></div>
          <div className="hero-index">01 <span /> 03</div>
        </section>

        <section className="trust-strip" id="about"><div><Boxes /><span><b>Built for the job</b><small>Trusted brands, dependable quality</small></span></div><div><Package /><span><b>Everything in one place</b><small>From foundation to finish</small></span></div><div><Truck /><span><b>Local and reliable</b><small>Delivery arranged on request</small></span></div><div><Check /><span><b>Clear, fair pricing</b><small>Know your total before ordering</small></span></div></section>

        <section className="catalogue-section" id="catalogue"><div className="section-heading"><div><div className="eyebrow dark-eyebrow">THE MAKUTANO RANGE</div><h2>Materials for <em>every build.</em></h2><p>Good materials make all the difference. Find your next project essential.</p></div><a href="#catalogue" className="text-link" onClick={() => { setCategory('All products'); setQuery('') }}>See all products <ArrowRight size={16} /></a></div>
          <div className="category-row" role="tablist" aria-label="Product categories">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="catalogue-tools"><div className="result-count">Showing <b>{filtered.length}</b> products</div><div className="tool-controls"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or brands" /></label><label className="sort-field"><SlidersHorizontal size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14} /></label></div></div>
          <div className="product-grid">{filtered.map((product, index) => <article className="product-card" key={product.id} style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }}><div className="product-image"><img src={imageUrl(product.image, 640)} alt={product.name} loading="lazy" />{product.tag && <span className="product-tag">{product.tag}</span>}{product.stock === 0 && <span className="sold-out-tag">OUT OF STOCK</span>}<button className="quick-add" onClick={() => product.stock > 0 && setQuantity(product.id, (cart[product.id] || 0) + 1)} disabled={product.stock === 0} aria-label={`Add ${product.name} to order`}><Plus size={19} /></button></div><div className="product-details"><div className="product-brand">{product.brand}</div><h3>{product.name}</h3><div className="product-bottom"><div><strong>{money(product.price)}</strong><small>per {product.unit}</small></div>{cart[product.id] ? <div className="qty-control"><button onClick={() => setQuantity(product.id, cart[product.id] - 1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{cart[product.id]}</span><button onClick={() => setQuantity(product.id, cart[product.id] + 1)} disabled={cart[product.id] >= product.stock} aria-label="Increase quantity"><Plus size={13} /></button></div> : <span className={product.stock <= 5 ? 'stock-note low' : 'stock-note'}>{product.stock === 0 ? 'Unavailable' : product.stock <= 5 ? 'Low stock' : 'In stock'}</span>}</div></div></article>)}</div>
          {!filtered.length && <div className="empty-state"><Search size={27} /><b>No products found</b><span>Try another product name or category.</span><button onClick={() => { setQuery(''); setCategory('All products') }}>Clear filters</button></div>}
        </section>

        <section className="callout-band"><div className="callout-icon"><HardHat size={27} /></div><div><span>BIG PROJECT? WE'VE GOT YOU.</span><h2>Planning a larger order?</h2><p>Talk to us about quantities, availability and delivery to your site.</p></div><a href="tel:0743483176" className="light-button">Call 0743 483 176 <ArrowRight size={16} /></a></section>
        <section className="contact-band" id="contact"><div><div className="eyebrow dark-eyebrow">HERE WHEN YOU NEED US</div><h2>Let's get your<br /><em>build moving.</em></h2></div><div className="contact-details"><a href="tel:0743483176"><span><Menu size={18} /></span><small>CALL OUR TEAM</small><b>0743 483 176</b></a><a href="mailto:Nyongesaclevis76@gmail.com"><span><Mail size={18} /></span><small>EMAIL YOUR ORDER</small><b>Nyongesaclevis76@gmail.com</b></a></div></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Hammer size={20} /></span><span className="brand-name">MAKUTANO<span>HARDWARE</span></span></a><span>Dependable materials for the work ahead.</span><span>© {new Date().getFullYear()} Makutano Hardware</span></footer>
      {notice && <div className="toast"><Check size={16} />{notice}</div>}

      {cartOpen && <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}><aside className="side-panel cart-panel"><div className="panel-heading"><div><span className="eyebrow dark-eyebrow">YOUR SELECTION</span><h2>My order <small>({cartCount})</small></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close order"><X /></button></div>{cartLines.length ? <><div className="cart-items">{cartLines.map((product) => <div className="cart-item" key={product.id}><img src={imageUrl(product.image, 180)} alt="" /><div className="cart-item-info"><span>{product.brand}</span><b>{product.name}</b><strong>{money(product.price * cart[product.id])}</strong><div className="qty-control"><button onClick={() => setQuantity(product.id, cart[product.id] - 1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{cart[product.id]}</span><button onClick={() => setQuantity(product.id, cart[product.id] + 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><button className="remove-item" onClick={() => setQuantity(product.id, 0)} aria-label={`Remove ${product.name}`}><Trash2 size={16} /></button></div>)}</div><form className="order-form" onSubmit={submitOrder}><div className="cart-total"><span>Estimated total</span><b>{money(cartTotal)}</b></div><p>Delivery charges, if applicable, will be confirmed by our team.</p><label>Your name<input required value={order.name} onChange={(event) => setOrder({ ...order, name: event.target.value })} placeholder="Name for the order" /></label><label>Phone number<input required type="tel" value={order.phone} onChange={(event) => setOrder({ ...order, phone: event.target.value })} placeholder="e.g. 0712 345 678" /></label><label>Delivery location (optional)<input value={order.location} onChange={(event) => setOrder({ ...order, location: event.target.value })} placeholder="Estate / site location" /></label><button className="primary-button full-button" type="submit">Send order by email <ArrowRight size={16} /></button><small className="email-note">Your order opens in your email app addressed to our team.</small></form></> : <div className="cart-empty"><ShoppingBag size={37} /><b>Your order is waiting to be built.</b><span>Add items from the catalogue to get started.</span><button className="primary-button" onClick={() => setCartOpen(false)}>Browse products <ArrowRight size={16} /></button></div>}</aside></div>}

      {adminOpen && <div className="overlay admin-overlay" onMouseDown={(event) => event.target === event.currentTarget && setAdminOpen(false)}><section className="admin-panel"><div className="panel-heading"><div><span className="eyebrow dark-eyebrow">MAKUTANO MANAGEMENT</span><h2>{isAdmin ? 'Admin dashboard' : 'Admin sign in'}</h2></div><button className="icon-button" onClick={() => setAdminOpen(false)} aria-label="Close admin"><X /></button></div>{!isAdmin ? <form className="login-form" onSubmit={(event) => { event.preventDefault(); if (login.username === 'admin' && login.password === 'makutano2026') setIsAdmin(true); else setNotice('Incorrect demo admin login.') }}><p>Sign in to manage your product list, stock and pricing.</p><label>Username<input required value={login.username} onChange={(event) => setLogin({ ...login, username: event.target.value })} placeholder="Username" /></label><label>Password<input required type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} placeholder="Password" /></label><button className="primary-button full-button">Sign in <ArrowRight size={16} /></button><div className="demo-warning"><CircleAlert size={16} /> Demo login: admin / makutano2026. Browser-only, not production security.</div></form> : <div className="dashboard"><div className="stat-grid"><div><span>PRODUCTS</span><b>{products.length}</b></div><div><span>STOCK ON HAND</span><b>{products.reduce((sum, item) => sum + item.stock, 0).toLocaleString()}</b></div><div><span>EST. STOCK PROFIT</span><b>{money(adminProfit)}</b></div></div>{lowStock.length > 0 && <div className="stock-alert"><CircleAlert size={18} /><div><b>Stock needs attention</b><span>{lowStock.map((item) => `${item.name} (${item.stock})`).join(', ')}</span></div></div>}<form className="add-product-form" onSubmit={addProduct}><h3>Add a product</h3><div className="admin-input-grid"><label>Product name<input required value={newProduct.name} onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })} placeholder="e.g. Roofing nails" /></label><label>Brand<input value={newProduct.brand} onChange={(event) => setNewProduct({ ...newProduct, brand: event.target.value })} placeholder="Brand name" /></label><label>Category<select value={newProduct.category} onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label><label>Unit<input value={newProduct.unit} onChange={(event) => setNewProduct({ ...newProduct, unit: event.target.value })} /></label><label>Sell price (KSh)<input required type="number" min="0" value={newProduct.price} onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })} /></label><label>Cost price (KSh)<input type="number" min="0" value={newProduct.cost} onChange={(event) => setNewProduct({ ...newProduct, cost: event.target.value })} /></label><label>Stock quantity<input type="number" min="0" value={newProduct.stock} onChange={(event) => setNewProduct({ ...newProduct, stock: event.target.value })} /></label></div><button className="primary-button"><Plus size={16} /> Add to catalogue</button></form><div className="inventory-heading"><h3>Inventory</h3><span>Profit estimate = margin × current stock</span></div><div className="inventory-list">{products.map((product) => <div className="inventory-row" key={product.id}><span className={product.stock <= 5 ? 'inventory-indicator alert-dot' : 'inventory-indicator'} /> <div className="inventory-product"><b>{product.name}</b><small>{product.brand} · {product.category}</small></div><label>Price<input type="number" min="0" value={product.price} onChange={(event) => setProducts((current) => current.map((item) => item.id === product.id ? { ...item, price: Number(event.target.value) } : item))} /></label><label>Stock<input type="number" min="0" value={product.stock} onChange={(event) => setProducts((current) => current.map((item) => item.id === product.id ? { ...item, stock: Number(event.target.value) } : item))} /></label><button className="remove-item" onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))} aria-label={`Remove ${product.name}`}><Trash2 size={16} /></button></div>)}</div><button className="signout-button" onClick={() => setIsAdmin(false)}>Sign out</button></div>}</section></div>}
    </div>
  )
}
