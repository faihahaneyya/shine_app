import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiUsers, FiGift, FiAward, FiBarChart2, FiShoppingCart, FiBell,
  FiMenu, FiX, FiChevronDown, FiStar, FiArrowRight, FiArrowUp,
  FiShield, FiZap, FiCheckCircle, FiClock, FiTrendingUp,
  FiBox, FiMessageCircle, FiExternalLink, FiCheck, FiMail,
  FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook,
  FiPlay, FiHeart, FiSmile
} from 'react-icons/fi'

import img1 from '../assets/product-1.jpg'
import img2 from '../assets/product-2.jpg'
import img3 from '../assets/product-3.jpg'
import img4 from '../assets/product-4.jpg'

/* ─── Intersection Observer Hook ─────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── Count-up Hook ──────────────────────────────────────────────────────── */
function useCounter(end, go, ms = 2000) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let t = 0
    const step = end / (ms / 16)
    const id = setInterval(() => {
      t += step
      if (t >= end) { setN(end); clearInterval(id) } else setN(Math.floor(t))
    }, 16)
    return () => clearInterval(id)
  }, [go, end, ms])
  return n
}

/* ─── FAQ Accordion ──────────────────────────────────────────────────────── */
function FaqItem({ q, a, open, toggle }) {
  return (
    <div
      onClick={toggle}
      className={`lp-faq-item ${open ? 'open' : ''}`}
    >
      <div className="lp-faq-header">
        <span className="lp-faq-q">{q}</span>
        <span className={`lp-faq-icon ${open ? 'rotated' : ''}`}>
          <FiChevronDown />
        </span>
      </div>
      <div className="lp-faq-body" style={{ maxHeight: open ? '300px' : '0' }}>
        <p className="lp-faq-a">{a}</p>
      </div>
    </div>
  )
}

/* ─── Stat Card ──────────────────────────────────────────────────────────── */
function StatCard({ icon, end, suffix, label, go }) {
  const n = useCounter(end, go)
  return (
    <div className="lp-stat-card">
      <div className="lp-stat-icon">{icon}</div>
      <p className="lp-stat-num">{n.toLocaleString()}{suffix}</p>
      <p className="lp-stat-label">{label}</p>
    </div>
  )
}

/* ─── Pricing Card ───────────────────────────────────────────────────────── */
function PricingCard({ tier, price, desc, features, cta, popular, onClick }) {
  return (
    <div className={`lp-price-card ${popular ? 'popular' : ''}`}>
      {popular && <div className="lp-price-badge">⭐ Paling Populer</div>}
      <h3 className="lp-price-tier">{tier}</h3>
      <p className="lp-price-desc">{desc}</p>
      <div className="lp-price-amount">
        <span className="lp-price-num">{price}</span>
        {price !== 'Gratis' && <span className="lp-price-period">/bulan</span>}
      </div>
      <ul className="lp-price-features">
        {features.map((f, i) => (
          <li key={i}><FiCheck className="lp-check-icon" /> {f}</li>
        ))}
      </ul>
      <button className={`lp-btn ${popular ? 'lp-btn-white' : 'lp-btn-primary'}`} onClick={onClick}>
        {cta} <FiArrowRight />
      </button>
    </div>
  )
}

/* ─── Demo Modal ─────────────────────────────────────────────────────────── */
function DemoModal({ onClose }) {
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [onClose])
  return (
    <div className="lp-modal-overlay" onClick={onClose}>
      <div className="lp-modal-box" onClick={e => e.stopPropagation()}>
        <button className="lp-modal-close" onClick={onClose}><FiX /></button>
        <h3 className="lp-modal-title">Demo CRM na_store.id</h3>
        <p className="lp-modal-sub">Lihat bagaimana platform kami bekerja dalam 2 menit</p>
        <div className="lp-modal-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Demo CRM na_store.id"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="lp-modal-actions">
          <button className="lp-btn lp-btn-primary lp-btn-full" onClick={onClose}>
            Mulai Gratis Sekarang <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [showDemo, setShowDemo] = useState(false)
  const [activeNav, setActiveNav] = useState('hero')

  /* intersection refs */
  const [heroRef, heroVis] = useInView(0.05)
  const [probRef, probVis] = useInView()
  const [featRef, featVis] = useInView()
  const [statRef, statVis] = useInView()
  const [testRef, testVis] = useInView()
  const [priceRef, priceVis] = useInView()
  const [faqRef, faqVis] = useInView()
  const [ctaRef, ctaVis] = useInView()

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setShowTop(window.scrollY > 600)
      /* active nav */
      const sections = ['hero', 'features', 'pricing', 'faq', 'footer']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* smooth scroll helper */
  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  /* fade-in helper */
  const fade = (vis, delay = 0) => ({
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
    }
  })

  /* ── Data ── */
  const NAV = [
    { label: 'Beranda', id: 'hero' },
    { label: 'Fitur', id: 'features' },
    { label: 'Harga', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Kontak', id: 'footer' },
  ]

  const PROBLEMS = [
    { icon: <FiZap />, emoji: '⚡', color: '#ef4444', bg: '#fef2f2', title: 'Data Pelanggan Berantakan', desc: 'Catatan manual di buku atau spreadsheet membuat data pelanggan mudah hilang dan sulit dilacak saat dibutuhkan.' },
    { icon: <FiClock />, emoji: '⏰', color: '#f59e0b', bg: '#fffbeb', title: 'Tidak Ada Program Loyalitas', desc: 'Pelanggan setia tidak mendapat apresiasi khusus, akibatnya mereka mudah berpindah ke kompetitor.' },
    { icon: <FiTrendingUp />, emoji: '📊', color: '#3b82f6', bg: '#eff6ff', title: 'Laporan Manual & Lambat', desc: 'Menghitung penjualan dan tren pembelian membutuhkan waktu berjam-jam setiap bulannya.' },
  ]

  const FEATURES = [
    { icon: <FiUsers />, emoji: '👥', title: 'Manajemen Pelanggan', desc: 'Kelola seluruh data pelanggan lengkap dengan riwayat pembelian dalam satu tempat yang terorganisir.', color: '#F875AA' },
    { icon: <FiGift />, emoji: '🎁', title: 'Sistem Poin & Reward', desc: 'Otomatis hitung poin dari setiap transaksi. Pelanggan termotivasi untuk belanja lebih banyak.', color: '#8b5cf6' },
    { icon: <FiAward />, emoji: '🏆', title: 'Tier Membership', desc: 'Bronze, Silver, Gold, Platinum — semakin loyal semakin besar diskon yang didapat pelanggan Anda.', color: '#f59e0b' },
    { icon: <FiBarChart2 />, emoji: '📈', title: 'Laporan & Analitik', desc: 'Dashboard visual real-time lengkap dengan grafik penjualan harian, mingguan, dan bulanan.', color: '#10b981' },
    { icon: <FiShoppingCart />, emoji: '🛒', title: 'Riwayat Pesanan', desc: 'Tracking status lengkap setiap pesanan pelanggan dari pemesanan hingga pengiriman selesai.', color: '#3b82f6' },
    { icon: <FiBell />, emoji: '🔔', title: 'Notifikasi Otomatis', desc: 'Reminder otomatis untuk stok menipis, pesanan masuk, pembayaran diterima — tidak ada yang terlewat.', color: '#ef4444' },
  ]

  const STATS = [
    { icon: <FiUsers />, end: 500, suffix: '+', label: 'Pelanggan Aktif', emoji: '👥' },
    { icon: <FiShoppingCart />, end: 1200, suffix: '+', label: 'Transaksi Selesai', emoji: '📦' },
    { icon: <FiStar />, end: 4, suffix: '.9★', label: 'Rating Pengguna', emoji: '⭐' },
    { icon: <FiBox />, end: 50, suffix: '+', label: 'Produk Tersedia', emoji: '🎁' },
  ]

  const TESTIMONIALS = [
    { name: 'Nadia Rahma', role: 'Pelanggan Setia', avatar: 'N', text: 'Suka banget sama aksesoris di na_store. Kualitasnya premium dan awet banget! Bikin penampilanku makin pede tiap hari.', rating: 5, tier: 'Platinum', tierColor: '#8b5cf6' },
    { name: 'Siti Sarah', role: 'Reseller Jewelry Online', avatar: 'S', text: 'Dashboard-nya keren banget! Sekarang saya bisa pantau penjualan real-time tanpa repot buat laporan manual. Hemat waktu 5 jam per minggu.', rating: 5, tier: 'Gold', tierColor: '#f59e0b' },
    { name: 'Dewi Kartika', role: 'Crafter Handmade', avatar: 'D', text: 'Fitur membership tier membuat pelanggan tetap saya merasa spesial. Gold member paling senang dapat diskon eksklusif dan akses early-bird!', rating: 5, tier: 'Gold', tierColor: '#f59e0b' },
  ]

  const PRICING = [
    {
      tier: 'Starter', price: 'Gratis', desc: 'Sempurna untuk memulai',
      features: ['Hingga 50 pelanggan', 'Sistem poin dasar', 'Laporan bulanan', '1 user admin', 'Email support'],
      cta: 'Mulai Gratis',
    },
    {
      tier: 'Professional', price: 'Rp 99K', desc: 'Untuk bisnis yang berkembang',
      features: ['Pelanggan unlimited', 'Tier membership lengkap', 'Laporan real-time', '5 user admin', 'Notifikasi otomatis', 'Priority support'],
      cta: 'Coba 14 Hari Gratis', popular: true,
    },
    {
      tier: 'Enterprise', price: 'Rp 249K', desc: 'Untuk tim & brand besar',
      features: ['Semua fitur Pro', 'API access', 'Custom branding', 'User unlimited', 'Dedicated manager', 'SLA 99.9% uptime'],
      cta: 'Hubungi Sales',
    },
  ]

  const FAQS = [
    { q: 'Apakah layanan ini gratis?', a: 'Ya! Paket Starter gratis selamanya untuk hingga 50 pelanggan. Anda bisa langsung pakai tanpa kartu kredit. Upgrade ke Professional kapan saja saat bisnis Anda berkembang.' },
    { q: 'Bagaimana sistem poin bekerja?', a: 'Setiap transaksi pembelian otomatis menghasilkan poin untuk pelanggan. Misalnya, setiap Rp 10.000 belanja = 1 poin. Poin bisa ditukar diskon atau hadiah eksklusif.' },
    { q: 'Apa saja level membership yang tersedia?', a: 'Tersedia 4 level: Bronze (0-499 poin, diskon 5%), Silver (500-1499 poin, diskon 10%), Gold (1500-2999 poin, diskon 15%), dan Platinum (3000+ poin, diskon 20%).' },
    { q: 'Apakah data pelanggan saya aman?', a: 'Tentu! Data disimpan di server Supabase dengan enkripsi end-to-end dan Row Level Security (RLS). Kami mematuhi standar keamanan internasional.' },
    { q: 'Bagaimana cara mulai berbelanja di sini?', a: 'Klik tombol "Daftar Gratis", isi data singkat, dan Anda langsung bisa memilih berbagai koleksi eksklusif kami. Sangat mudah!' },
    { q: 'Bisakah saya mengekspor data pelanggan?', a: 'Ya, semua data bisa diekspor dalam format CSV atau Excel. Anda tetap memiliki kendali penuh atas data bisnis Anda kapan saja.' },
  ]

  /* ─────────────────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── GLOBAL STYLES (injected into head) ── */}
      <style>{`
        /* Reset root constraint for landing page */
        body:has(.lp-root) #root {
          width: 100% !important;
          max-width: 100% !important;
          border-inline: none !important;
          text-align: left !important;
        }

        /* ── Google Font ── */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ── Base ── */
        .lp-root { font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden; background: #fff; }

        /* ── ANIMATIONS ── */
        @keyframes lp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes lp-float2 { 0%,100%{transform:translateY(-8px)} 50%{transform:translateY(8px)} }
        @keyframes lp-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(248,117,170,.5)} 70%{box-shadow:0 0 0 16px rgba(248,117,170,0)} }
        @keyframes lp-spin { to{transform:rotate(360deg)} }
        @keyframes lp-bg-shift {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes lp-ripple { to{transform:scale(4);opacity:0} }
        @keyframes lp-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes lp-bounce-x { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes lp-badge-glow { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes lp-count-in { from{transform:scale(.8);opacity:0} to{transform:scale(1);opacity:1} }

        /* ── NAVBAR ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: all .4s ease;
          padding: 16px 0;
        }
        .lp-nav.scrolled {
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0,0,0,.08);
          padding: 10px 0;
        }
        .lp-nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .lp-logo { display:flex; align-items:center; gap:12px; cursor:pointer; text-decoration:none; }
        .lp-logo-icon {
          width:46px; height:46px; border-radius:14px;
          background: linear-gradient(135deg,#F875AA,#AEDEFC);
          display:flex; align-items:center; justify-content:center;
          font-size:22px; box-shadow:0 8px 20px rgba(248,117,170,.3);
          transition: transform .3s, box-shadow .3s;
        }
        .lp-logo:hover .lp-logo-icon { transform:scale(1.1) rotate(-5deg); box-shadow:0 12px 28px rgba(248,117,170,.4); }
        .lp-logo-text { display:flex; flex-direction:column; }
        .lp-logo-name { font-size:20px; font-weight:800; background:linear-gradient(90deg,#F875AA,#AEDEFC); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1.2; }
        .lp-logo-sub { font-size:9px; font-weight:700; color:#9ca3af; letter-spacing:.15em; text-transform:uppercase; }

        .lp-nav-links { display:flex; align-items:center; gap:4px; }
        .lp-nav-link {
          padding:8px 18px; border-radius:10px; font-size:14px; font-weight:500;
          color:#4b5563; cursor:pointer; border:none; background:transparent;
          transition: all .25s; white-space:nowrap;
        }
        .lp-nav-link:hover, .lp-nav-link.active { color:#F875AA; background:rgba(248,117,170,.08); }

        .lp-nav-cta { display:flex; align-items:center; gap:12px; }
        .lp-btn-outline {
          padding:10px 22px; border-radius:12px; font-size:14px; font-weight:700;
          color:#F875AA; border:2px solid rgba(248,117,170,.35); background:transparent;
          cursor:pointer; transition: all .3s; white-space:nowrap;
        }
        .lp-btn-outline:hover { background:#F875AA; color:#fff; border-color:#F875AA; transform:translateY(-2px); box-shadow:0 8px 20px rgba(248,117,170,.3); }

        .lp-nav-toggle {
          display:none; width:42px; height:42px; border-radius:10px;
          background:#f3f4f6; border:none; cursor:pointer;
          align-items:center; justify-content:center; font-size:20px; color:#374151;
          transition: all .2s;
        }
        .lp-nav-toggle:hover { background:rgba(248,117,170,.1); color:#F875AA; }
        .lp-nav-mobile {
          display:none; background:#fff; border-top:1px solid #f3f4f6;
          padding:12px 24px 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,.08);
        }
        .lp-nav-mobile.open { display:block; }
        .lp-nav-mobile .lp-nav-link { display:block; width:100%; text-align:left; margin:2px 0; padding:12px 16px; }
        .lp-nav-mobile-btns { display:flex; gap:10px; margin-top:12px; }

        @media(max-width:1024px){ .lp-nav-links,.lp-nav-cta{display:none!important} .lp-nav-toggle{display:flex} }

        /* ── BUTTONS ── */
        .lp-btn {
          display: inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:14px; font-size:15px; font-weight:700;
          cursor:pointer; border:none; transition: all .3s;
          position:relative; overflow:hidden;
        }
        .lp-btn::after {
          content:''; position:absolute; border-radius:50%;
          width:100px; height:100px;
          background:rgba(255,255,255,.25);
          transform:scale(0); opacity:0;
          left:50%; top:50%; translate:-50% -50%;
          transition: transform .5s, opacity .5s;
        }
        .lp-btn:active::after { transform:scale(4); opacity:0; transition:0s; animation:lp-ripple .6s linear; }
        .lp-btn-primary {
          background: linear-gradient(135deg,#F875AA 0%,#d64d8a 100%);
          color:#fff; box-shadow:0 8px 24px rgba(248,117,170,.35);
        }
        .lp-btn-primary:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 14px 32px rgba(248,117,170,.45); }
        .lp-btn-primary:active { transform:scale(.97); }
        .lp-btn-secondary {
          background:rgba(248,117,170,.1); color:#F875AA;
          border:2px solid rgba(248,117,170,.3);
          backdrop-filter:blur(8px);
        }
        .lp-btn-secondary:hover { background:rgba(248,117,170,.2); transform:translateY(-2px); border-color:rgba(248,117,170,.5); }
        .lp-btn-white { background:#fff; color:#F875AA; box-shadow:0 6px 20px rgba(0,0,0,.12); }
        .lp-btn-white:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,.18); }
        .lp-btn-ghost {
          background:transparent; color:#F875AA;
          border:2px solid rgba(248,117,170,.3);
        }
        .lp-btn-ghost:hover { background:#F875AA; color:#fff; border-color:#F875AA; transform:translateY(-2px); box-shadow:0 8px 20px rgba(248,117,170,.3); }
        .lp-btn-full { width:100%; justify-content:center; }
        .lp-btn-lg { padding:18px 40px; font-size:17px; border-radius:16px; }
        .lp-btn-sm { padding:10px 20px; font-size:13px; border-radius:10px; }
        .lp-btn-pulse { animation:lp-pulse 2s infinite; }
        .lp-btn-arrow { animation:lp-bounce-x 1.5s infinite; }

        /* ── HERO ── */
        .lp-hero {
          position:relative; min-height:100vh;
          display:flex; align-items:center;
          padding:120px 32px 80px;
          overflow:hidden;
        }
        .lp-hero-bg {
          position:absolute; inset:0;
          background: linear-gradient(135deg, #FFF5E4 0%, #FFFAF4 40%, #fef8fa 70%, #ffffff 100%);
          background-size:300% 300%;
          animation: lp-bg-shift 10s ease infinite;
        }
        .lp-hero-bg::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(248,117,170,.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 90% 80%, rgba(174,222,252,.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,92,246,.1) 0%, transparent 70%);
        }
        .lp-hero-dots {
          position:absolute; inset:0; opacity:.1;
          background-image: radial-gradient(rgba(248,117,170,.4) 1px, transparent 1px);
          background-size:28px 28px;
        }
        .lp-hero-orb1, .lp-hero-orb2, .lp-hero-orb3 {
          position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none;
        }
        .lp-hero-orb1 { width:500px; height:500px; top:-10%; left:-10%; background:rgba(248,117,170,.15); animation:lp-float 8s ease-in-out infinite; }
        .lp-hero-orb2 { width:400px; height:400px; bottom:-10%; right:-5%; background:rgba(174,222,252,.12); animation:lp-float2 10s ease-in-out infinite; }
        .lp-hero-orb3 { width:300px; height:300px; top:40%; left:45%; background:rgba(139,92,246,.1); animation:lp-float 12s ease-in-out infinite reverse; }

        .lp-hero-inner {
          position:relative; z-index:10;
          max-width:1280px; margin:0 auto; width:100%;
          display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;
        }

        .lp-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(248,117,170,.15); border:1px solid rgba(248,117,170,.3);
          backdrop-filter:blur(8px);
          padding:8px 20px; border-radius:50px;
          font-size:13px; font-weight:600; color:rgba(248,117,170,.9);
          margin-bottom:24px;
        }
        .lp-hero-badge-dot { width:8px; height:8px; border-radius:50%; background:#F875AA; animation:lp-badge-glow 2s ease-in-out infinite; }

        .lp-hero-h1 {
          font-size:clamp(2.4rem,4.5vw,3.8rem); font-weight:900;
          color:#1f2937; line-height:1.1; letter-spacing:-1.5px;
          margin:0 0 24px;
        }
        .lp-hero-h1 .grad {
          background: linear-gradient(90deg, #F875AA, #93c5fd, #F875AA);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:lp-shimmer 4s linear infinite;
        }
        .lp-hero-sub { font-size:18px; color:#4b5563; line-height:1.7; margin-bottom:36px; max-width:520px; }

        .lp-hero-btns { display:flex; flex-wrap:wrap; gap:14px; margin-bottom:40px; }

        .lp-trust-badges { display:flex; flex-wrap:wrap; gap:20px; }
        .lp-trust-item { display:flex; align-items:center; gap:8px; color:#6b7280; font-size:13px; font-weight:500; }
        .lp-trust-item svg { color:#10b981; }

        /* ── MOCKUP ── */
        .lp-mockup-wrap { position:relative; }
        .lp-mockup-glow {
          position:absolute; inset:-20px;
          background:radial-gradient(ellipse at 50% 50%, rgba(248,117,170,.25), transparent 70%);
          border-radius:40px; filter:blur(30px);
        }
        .lp-mockup {
          position:relative; background:#ffffff; border-radius:28px;
          border:1px solid rgba(0,0,0,.08);
          box-shadow: 0 40px 100px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04) inset;
          overflow:hidden; animation:lp-float 7s ease-in-out infinite;
        }
        .lp-mock-bar {
          display:flex; align-items:center; gap:8px;
          background:#f9fafb; padding:14px 20px; border-bottom:1px solid rgba(0,0,0,.06);
        }
        .lp-mock-dot { width:12px; height:12px; border-radius:50%; }
        .lp-mock-url {
          flex:1; background:#f3f4f6; border-radius:8px;
          padding:6px 14px; margin:0 12px; font-size:11px; color:#6b7280;
          display:flex; align-items:center; gap:6px;
        }
        .lp-mock-body { padding:20px; background:#f8fafc; }
        .lp-mock-stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:14px; }
        .lp-mock-stat {
          background:#ffffff; border:1px solid rgba(0,0,0,.06);
          border-radius:14px; padding:12px; text-align:left;
          box-shadow: 0 2px 8px rgba(0,0,0,.02);
        }
        .lp-mock-stat-icon {
          width:32px; height:32px; border-radius:10px;
          display:flex; align-items:center; justify-content:center; font-size:14px; margin-bottom:8px;
        }

        .lp-mock-stat-label { font-size:9px; color:#6b7280; font-weight:500; margin-bottom:2px; }
        .lp-mock-stat-val { font-size:15px; font-weight:800; color:#1f2937; }
        .lp-mock-charts { display:grid; grid-template-columns:3fr 2fr; gap:10px; }
        .lp-mock-chart, .lp-mock-members {
          background:#ffffff; border:1px solid rgba(0,0,0,.06);
          border-radius:14px; padding:14px;
          box-shadow: 0 2px 8px rgba(0,0,0,.02);
        }
        .lp-mock-chart-title { font-size:9px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:.1em; margin-bottom:4px; }
        .lp-mock-chart-badge { font-size:8px; font-weight:700; background:#10b98120; color:#10b981; padding:2px 8px; border-radius:50px; }
        .lp-mock-chart-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .lp-mock-bars { display:flex; align-items:flex-end; gap:3px; height:70px; }
        .lp-mock-bar-item { flex:1; border-radius:4px 4px 0 0; opacity:.85; transition:opacity .2s; }
        .lp-mock-bar-item:hover { opacity:1; }
        .lp-mock-member-row { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .lp-mock-member-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
        .lp-mock-member-name { font-size:9px; color:#6b7280; width:50px; }
        .lp-mock-member-bar { flex:1; height:5px; background:#f3f4f6; border-radius:50px; overflow:hidden; }
        .lp-mock-member-fill { height:100%; border-radius:50px; }

        .lp-float-card {
          position:absolute; background:rgba(20,22,40,.85);
          backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,.1);
          border-radius:16px; padding:14px 16px; display:flex; align-items:center; gap:10px;
        }
        .lp-float-card1 { right:-20px; top:60px; width:180px; animation:lp-float2 6s ease-in-out infinite; }
        .lp-float-card2 { left:-24px; bottom:60px; width:165px; animation:lp-float 8s ease-in-out infinite; }
        .lp-float-icon {
          width:34px; height:34px; border-radius:10px;
          display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0;
        }
        .lp-float-title { font-size:11px; font-weight:700; color:#fff; }
        .lp-float-sub { font-size:9px; color:rgba(255,255,255,.45); margin-top:1px; }
        .lp-float-bar { width:100%; height:4px; background:rgba(255,255,255,.1); border-radius:50px; margin-top:6px; }
        .lp-float-bar-fill { height:100%; border-radius:50px; background:linear-gradient(90deg,#F875AA,#AEDEFC); width:65%; }

        /* ── SCROLL INDICATOR ── */
        .lp-scroll-hint { position:absolute; bottom:28px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; }
        .lp-scroll-hint-text { font-size:11px; color:rgba(255,255,255,.35); font-weight:500; letter-spacing:.05em; }
        .lp-scroll-hint-arrow { color:rgba(248,117,170,.7); animation:lp-float2 1.5s ease-in-out infinite; }

        /* ── SECTION COMMON ── */
        .lp-section { padding:96px 32px; }
        .lp-section-inner { max-width:1280px; margin:0 auto; }
        .lp-section-tag {
          display:inline-block; font-size:11px; font-weight:800;
          text-transform:uppercase; letter-spacing:.18em;
          padding:6px 18px; border-radius:50px; margin-bottom:20px;
        }
        .lp-section-h2 { font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:900; color:#0f172a; letter-spacing:-1px; line-height:1.15; margin:0 0 16px; }
        .lp-section-sub { font-size:17px; color:#64748b; line-height:1.7; }

        /* ── PROBLEM SECTION ── */
        .lp-prob { background:#fff; }
        .lp-prob-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-bottom:56px; }
        .lp-prob-card {
          border-radius:24px; padding:36px; border:2px solid #f1f5f9;
          transition: all .4s; cursor:default; position:relative; overflow:hidden;
        }
        .lp-prob-card::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, transparent, transparent);
          opacity:0; transition:.4s;
        }
        .lp-prob-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(0,0,0,.1); border-color:rgba(248,117,170,.3); }
        .lp-prob-emoji { font-size:48px; margin-bottom:20px; display:block; }
        .lp-prob-title { font-size:20px; font-weight:800; color:#0f172a; margin-bottom:12px; }
        .lp-prob-desc { font-size:15px; color:#64748b; line-height:1.7; }

        .lp-solution-banner {
          background:linear-gradient(135deg,#fdf2f8,#eff6ff);
          border:2px solid rgba(248,117,170,.15);
          border-radius:24px; padding:36px 48px;
          display:flex; align-items:center; justify-content:space-between; gap:24px;
          flex-wrap:wrap;
        }
        .lp-solution-text { font-size:22px; font-weight:800; color:#0f172a; }
        .lp-solution-text span { color:#F875AA; }

        /* ── FEATURES ── */
        .lp-feat { background:linear-gradient(180deg,#fafafa,#fff); }
        .lp-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .lp-feat-card {
          background:#fff; border:2px solid #f1f5f9; border-radius:24px;
          padding:36px; transition:all .4s; cursor:default; overflow:hidden; position:relative;
        }
        .lp-feat-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#F875AA,#AEDEFC);
          transform:scaleX(0); transform-origin:left; transition:.4s;
        }
        .lp-feat-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(0,0,0,.09); border-color:rgba(248,117,170,.2); }
        .lp-feat-card:hover::after { transform:scaleX(1); }
        .lp-feat-icon-wrap {
          width:64px; height:64px; border-radius:18px;
          display:flex; align-items:center; justify-content:center;
          font-size:28px; margin-bottom:24px;
          transition: transform .4s;
        }
        .lp-feat-card:hover .lp-feat-icon-wrap { transform:scale(1.1) rotate(8deg); }
        .lp-feat-title { font-size:18px; font-weight:800; color:#0f172a; margin-bottom:10px; }
        .lp-feat-desc { font-size:14px; color:#64748b; line-height:1.7; margin-bottom:16px; }
        .lp-feat-link {
          display:inline-flex; align-items:center; gap:6px;
          font-size:13px; font-weight:700; color:#F875AA; cursor:pointer; border:none; background:none;
          opacity:0; transform:translateY(6px); transition:.3s;
        }
        .lp-feat-card:hover .lp-feat-link { opacity:1; transform:translateY(0); }

        /* ── STATS ── */
        .lp-stats {
          background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);
          padding:80px 32px; position:relative; overflow:hidden;
        }
        .lp-stats-inner { max-width:1200px; margin:0 auto; position:relative; z-index:10; }
        .lp-stats-dots { position:absolute; inset:0; opacity:.06; background-image:radial-gradient(white 1px,transparent 1px); background-size:24px 24px; }
        .lp-stats-h2 { font-size:clamp(1.6rem,3vw,2.4rem); font-weight:900; color:#fff; text-align:center; margin-bottom:12px; letter-spacing:-1px; }
        .lp-stats-sub { font-size:16px; color:rgba(255,255,255,.55); text-align:center; margin-bottom:56px; }
        .lp-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
        .lp-stat-card {
          text-align:center; background:rgba(255,255,255,.05); backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,.08); border-radius:24px; padding:32px 20px;
          transition:all .3s;
        }
        .lp-stat-card:hover { background:rgba(255,255,255,.09); transform:translateY(-6px); }
        .lp-stat-icon { font-size:40px; margin-bottom:16px; }
        .lp-stat-num { font-size:clamp(2rem,4vw,3rem); font-weight:900; color:#fff; margin-bottom:8px; }
        .lp-stat-label { font-size:13px; color:rgba(255,255,255,.5); font-weight:500; }

        /* ── TESTIMONIALS ── */
        .lp-test { background:#fff; }
        .lp-test-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .lp-test-card {
          background:#fff; border:2px solid #f1f5f9; border-radius:24px;
          padding:36px; transition:all .4s; position:relative;
        }
        .lp-test-card:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,.09); border-color:rgba(248,117,170,.2); }
        .lp-test-tier { position:absolute; top:20px; right:20px; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; padding:4px 12px; border-radius:50px; }
        .lp-test-stars { display:flex; gap:4px; margin-bottom:20px; }
        .lp-test-text { font-size:15px; color:#475569; line-height:1.8; margin-bottom:28px; }
        .lp-test-author { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid #f1f5f9; }
        .lp-test-avatar {
          width:48px; height:48px; border-radius:50%;
          background:linear-gradient(135deg,#F875AA,#AEDEFC);
          display:flex; align-items:center; justify-content:center;
          font-size:18px; font-weight:800; color:#fff; flex-shrink:0;
          box-shadow:0 6px 16px rgba(248,117,170,.3);
        }
        .lp-test-name { font-size:15px; font-weight:800; color:#0f172a; }
        .lp-test-role { font-size:12px; color:#94a3b8; margin-top:2px; }

        /* ── PRICING ── */
        .lp-price { background:linear-gradient(180deg,#fafafa,#fff); }
        .lp-price-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:start; }
        .lp-price-card {
          background:#fff; border:2px solid #e2e8f0; border-radius:28px;
          padding:40px 32px; position:relative; transition:all .4s;
        }
        .lp-price-card:hover { transform:translateY(-8px); box-shadow:0 30px 70px rgba(0,0,0,.1); }
        .lp-price-card.popular {
          background:linear-gradient(135deg,#F875AA,#d64d8a);
          border-color:transparent; box-shadow:0 24px 60px rgba(248,117,170,.35);
          transform:scale(1.04);
        }
        .lp-price-card.popular:hover { transform:scale(1.04) translateY(-8px); }
        .lp-price-badge {
          position:absolute; top:-16px; left:50%; transform:translateX(-50%);
          background:linear-gradient(90deg,#fbbf24,#f59e0b);
          color:#fff; font-size:11px; font-weight:800; text-transform:uppercase;
          letter-spacing:.1em; padding:6px 20px; border-radius:50px;
          box-shadow:0 4px 16px rgba(245,158,11,.4); white-space:nowrap;
        }
        .lp-price-tier { font-size:20px; font-weight:800; color:#0f172a; margin-bottom:6px; }
        .lp-price-card.popular .lp-price-tier { color:#fff; }
        .lp-price-desc { font-size:14px; color:#94a3b8; margin-bottom:28px; }
        .lp-price-card.popular .lp-price-desc { color:rgba(255,255,255,.7); }
        .lp-price-amount { display:flex; align-items:flex-end; gap:6px; margin-bottom:32px; }
        .lp-price-num { font-size:40px; font-weight:900; color:#0f172a; }
        .lp-price-card.popular .lp-price-num { color:#fff; }
        .lp-price-period { font-size:14px; color:#94a3b8; margin-bottom:8px; }
        .lp-price-card.popular .lp-price-period { color:rgba(255,255,255,.6); }
        .lp-price-features { list-style:none; padding:0; margin:0 0 32px; display:flex; flex-direction:column; gap:12px; }
        .lp-price-features li { display:flex; align-items:flex-start; gap:10px; font-size:14px; color:#475569; }
        .lp-price-card.popular .lp-price-features li { color:rgba(255,255,255,.85); }
        .lp-check-icon { color:#F875AA; flex-shrink:0; margin-top:2px; }
        .lp-price-card.popular .lp-check-icon { color:rgba(255,255,255,.9); }

        /* ── FAQ ── */
        .lp-faq { background:#fff; }
        .lp-faq-list { display:flex; flex-direction:column; gap:12px; }
        .lp-faq-item {
          background:#fff; border:2px solid #f1f5f9; border-radius:18px;
          overflow:hidden; cursor:pointer; transition:all .3s;
        }
        .lp-faq-item:hover { border-color:rgba(248,117,170,.25); }
        .lp-faq-item.open { border-color:rgba(248,117,170,.4); box-shadow:0 8px 30px rgba(248,117,170,.1); }
        .lp-faq-header { display:flex; align-items:center; justify-content:space-between; padding:22px 28px; }
        .lp-faq-q { font-size:16px; font-weight:700; color:#0f172a; flex:1; padding-right:16px; }
        .lp-faq-item.open .lp-faq-q { color:#F875AA; }
        .lp-faq-icon {
          width:34px; height:34px; border-radius:50%;
          background:rgba(248,117,170,.1); color:#F875AA;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; transition:all .3s; font-size:16px;
        }
        .lp-faq-item.open .lp-faq-icon { background:#F875AA; color:#fff; }
        .lp-faq-icon.rotated { transform:rotate(180deg); }
        .lp-faq-body { max-height:0; overflow:hidden; transition:max-height .4s ease; }
        .lp-faq-a { padding:0 28px 22px; font-size:15px; color:#64748b; line-height:1.75; }
        .lp-faq-contact { text-align:center; margin-top:40px; }
        .lp-faq-contact-text { font-size:15px; color:#94a3b8; margin-bottom:16px; }

        /* ── FINAL CTA ── */
        .lp-cta { padding:80px 32px; }
        .lp-cta-box {
          max-width:1100px; margin:0 auto; border-radius:40px;
          background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);
          padding:80px; position:relative; overflow:hidden; text-align:center;
        }
        .lp-cta-glow1, .lp-cta-glow2 {
          position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none;
        }
        .lp-cta-glow1 { width:400px; height:400px; background:rgba(248,117,170,.2); top:-100px; left:-100px; }
        .lp-cta-glow2 { width:300px; height:300px; background:rgba(174,222,252,.15); bottom:-80px; right:-80px; }
        .lp-cta-emoji { font-size:56px; margin-bottom:24px; }
        .lp-cta-h2 { font-size:clamp(2rem,4vw,3.2rem); font-weight:900; color:#fff; letter-spacing:-1.5px; margin-bottom:16px; }
        .lp-cta-sub { font-size:17px; color:rgba(255,255,255,.65); line-height:1.7; margin-bottom:40px; max-width:560px; margin-left:auto; margin-right:auto; }
        .lp-cta-btns { display:flex; flex-wrap:wrap; justify-content:center; gap:16px; margin-bottom:24px; }
        .lp-cta-note { font-size:13px; color:rgba(255,255,255,.35); }

        /* ── FOOTER ── */
        .lp-footer { background:#050507; color:rgba(255,255,255,.45); padding:80px 32px 40px; }
        .lp-footer-inner { max-width:1280px; margin:0 auto; }
        .lp-footer-grid { display:grid; grid-template-columns:1.5fr 1fr 1fr 1.2fr; gap:40px; margin-bottom:64px; }
        .lp-footer-brand-desc { font-size:14px; line-height:1.8; margin:16px 0 24px; }
        .lp-footer-socials { display:flex; gap:10px; }
        .lp-footer-social {
          width:38px; height:38px; border-radius:10px;
          background:rgba(255,255,255,.06); border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,.45); font-size:16px; transition:all .3s;
        }
        .lp-footer-social:hover { background:#F875AA; color:#fff; transform:scale(1.1); }
        .lp-footer-col-title { font-size:13px; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:.12em; margin-bottom:20px; }
        .lp-footer-links { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
        .lp-footer-links li button {
          background:none; border:none; cursor:pointer; font-size:14px;
          color:rgba(255,255,255,.45); transition:all .25s; padding:0; text-align:left;
        }
        .lp-footer-links li button:hover { color:#F875AA; transform:translateX(4px); }
        .lp-footer-contact-item { display:flex; align-items:flex-start; gap:10px; font-size:14px; margin-bottom:14px; }
        .lp-footer-contact-icon {
          width:30px; height:30px; border-radius:8px;
          background:rgba(255,255,255,.06); flex-shrink:0;
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        .lp-footer-contact-icon svg { color:#F875AA; font-size:13px; }
        .lp-footer-divider { border:none; border-top:1px solid rgba(255,255,255,.06); margin:0 0 32px; }
        .lp-footer-bottom { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .lp-footer-copy { font-size:13px; }
        .lp-footer-bottom-links { display:flex; gap:20px; }
        .lp-footer-bottom-links button { background:none; border:none; cursor:pointer; font-size:13px; color:rgba(255,255,255,.3); transition:.2s; padding:0; }
        .lp-footer-bottom-links button:hover { color:#F875AA; }

        /* ── SCROLL TO TOP ── */
        .lp-scroll-top {
          position:fixed; bottom:28px; right:28px; z-index:999;
          width:52px; height:52px; border-radius:16px;
          background:linear-gradient(135deg,#F875AA,#d64d8a);
          border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-size:20px;
          box-shadow:0 8px 24px rgba(248,117,170,.4);
          transition: all .35s; opacity:0; transform:translateY(16px) scale(.85);
        }
        .lp-scroll-top.visible { opacity:1; transform:translateY(0) scale(1); }
        .lp-scroll-top:hover { transform:translateY(-4px) scale(1.08); box-shadow:0 14px 32px rgba(248,117,170,.5); }

        /* ── MODAL ── */
        .lp-modal-overlay {
          position:fixed; inset:0; z-index:2000;
          background:rgba(0,0,0,.75); backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center; padding:24px;
        }
        .lp-modal-box {
          background:#1a1d2e; border-radius:28px; max-width:720px; width:100%;
          padding:36px; border:1px solid rgba(255,255,255,.08);
          box-shadow:0 40px 100px rgba(0,0,0,.6); position:relative;
        }
        .lp-modal-close {
          position:absolute; top:16px; right:16px;
          width:36px; height:36px; border-radius:10px;
          background:rgba(255,255,255,.08); border:none; cursor:pointer;
          color:rgba(255,255,255,.6); font-size:18px;
          display:flex; align-items:center; justify-content:center; transition:.2s;
        }
        .lp-modal-close:hover { background:rgba(255,255,255,.15); color:#fff; }
        .lp-modal-title { font-size:22px; font-weight:800; color:#fff; margin-bottom:8px; }
        .lp-modal-sub { font-size:14px; color:rgba(255,255,255,.5); margin-bottom:24px; }
        .lp-modal-video { width:100%; aspect-ratio:16/9; border-radius:16px; overflow:hidden; margin-bottom:24px; background:#000; }
        .lp-modal-actions {}

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .lp-hero-inner { grid-template-columns:1fr; }
          .lp-mockup-wrap { display:none; }
          .lp-prob-grid, .lp-feat-grid, .lp-test-grid, .lp-price-grid { grid-template-columns:1fr 1fr; }
          .lp-stats-grid { grid-template-columns:1fr 1fr; }
          .lp-footer-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:640px){
          .lp-section { padding:64px 20px; }
          .lp-hero { padding:100px 20px 60px; }
          .lp-prob-grid, .lp-feat-grid, .lp-test-grid, .lp-price-grid { grid-template-columns:1fr; }
          .lp-stats-grid { grid-template-columns:1fr 1fr; }
          .lp-footer-grid { grid-template-columns:1fr; }
          .lp-price-card.popular { transform:scale(1); }
          .lp-cta-box { padding:48px 24px; }
          .lp-hero-btns { flex-direction:column; }
          .lp-solution-banner { flex-direction:column; text-align:center; padding:28px; }
        }
      `}</style>

      <div className="lp-root">

        {/* ════════════════════════ NAVBAR ════════════════════════ */}
        <nav className={`lp-nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="lp-nav-inner">
            <button className="lp-logo" onClick={() => scrollTo('hero')}>
              <div className="lp-logo-icon">✨</div>
              <div className="lp-logo-text">
                <span className="lp-logo-name">na_store.id</span>
                <span className="lp-logo-sub">Handmade CRM</span>
              </div>
            </button>

            <div className="lp-nav-links">
              {NAV.map(l => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`lp-nav-link ${activeNav === l.id ? 'active' : ''}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="lp-nav-cta">
              <button className="lp-btn-outline" onClick={() => navigate('/login')}>
                Masuk
              </button>
              <button className="lp-btn lp-btn-primary" onClick={() => navigate('/register')}>
                Daftar Gratis <FiArrowRight />
              </button>
            </div>

            <button className="lp-nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lp-nav-mobile ${menuOpen ? 'open' : ''}`}>
            {NAV.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="lp-nav-link">
                {l.label}
              </button>
            ))}
            <div className="lp-nav-mobile-btns">
              <button className="lp-btn lp-btn-ghost" style={{ flex: 1 }} onClick={() => navigate('/login')}>Masuk</button>
              <button className="lp-btn lp-btn-primary" style={{ flex: 1 }} onClick={() => navigate('/register')}>Daftar Gratis</button>
            </div>
          </div>
        </nav>

        {/* ════════════════════════ HERO ════════════════════════ */}
        <section id="hero" ref={heroRef}>
          <div className="lp-hero">
            <div className="lp-hero-bg" />
            <div className="lp-hero-dots" />
            <div className="lp-hero-orb1" /><div className="lp-hero-orb2" /><div className="lp-hero-orb3" />

            <div className="lp-hero-inner">
              {/* Left */}
              <div>
                <div {...fade(heroVis, 0)}>
                  <div className="lp-hero-badge">
                    <span className="lp-hero-badge-dot" />
                    Toko Aksesoris Handmade Berkualitas
                  </div>
                </div>
                <div {...fade(heroVis, 100)}>
                  <h1 className="lp-hero-h1">
                    Temukan Aksesoris,<br />
                    <span className="grad">Tampil Lebih Menawan,</span><br />
                    Buat Hari Anda Berkilau
                  </h1>
                </div>
                <div {...fade(heroVis, 200)}>
                  <p className="lp-hero-sub">
                    na_store.id menghadirkan koleksi aksesoris handmade eksklusif yang dirancang khusus untuk memancarkan pesona alami Anda. Belanja lebih nyaman dengan berbagai pilihan premium.
                  </p>
                </div>
                <div {...fade(heroVis, 300)}>
                  <div className="lp-hero-btns">
                    <button
                      className="lp-btn lp-btn-primary lp-btn-lg lp-btn-pulse"
                      onClick={() => navigate('/register')}
                    >
                      🚀 Mulai Gratis Sekarang
                      <FiArrowRight className="lp-btn-arrow" />
                    </button>
                    <button
                      className="lp-btn lp-btn-secondary lp-btn-lg"
                      onClick={() => setShowDemo(true)}
                    >
                      <FiPlay /> Lihat Demo
                    </button>
                    <button
                      className="lp-btn lp-btn-secondary lp-btn-lg"
                      onClick={() => scrollTo('features')}
                    >
                      Explore Fitur
                    </button>
                  </div>
                </div>
                <div {...fade(heroVis, 400)}>
                  <div className="lp-trust-badges">
                    <span className="lp-trust-item"><FiCheckCircle /> Gratis selamanya</span>
                    <span className="lp-trust-item"><FiShield /> Data terenkripsi</span>
                    <span className="lp-trust-item"><FiClock /> Setup 2 menit</span>
                    <span className="lp-trust-item"><FiHeart /> 500+ pengguna aktif</span>
                  </div>
                </div>
              </div>

              {/* Right – Product Collage */}
              <div {...fade(heroVis, 500)}>
                <div className="lp-mockup-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', marginTop: '20px' }}>
                  <div className="lp-mockup-glow" />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', transform: 'translateY(24px)' }}>
                    <img src={img1} alt="Product 1" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover', height: '240px', animation: 'lp-float 8s ease-in-out infinite' }} />
                    <img src={img2} alt="Product 2" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover', height: '320px', animation: 'lp-float2 9s ease-in-out infinite' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', transform: 'translateY(-16px)' }}>
                    <img src={img3} alt="Product 3" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover', height: '320px', animation: 'lp-float2 7s ease-in-out infinite' }} />
                    <img src={img4} alt="Product 4" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover', height: '240px', animation: 'lp-float 10s ease-in-out infinite' }} />
                  </div>

                  {/* Floating notification */}
                  <div className="lp-float-card lp-float-card1">
                    <div className="lp-float-icon" style={{ background: 'rgba(248,117,170,.15)' }}>✨</div>
                    <div>
                      <div className="lp-float-title">Best Seller!</div>
                      <div className="lp-float-sub">Kalung Mutiara Premium</div>
                    </div>
                  </div>

                  {/* Floating points */}
                  <div className="lp-float-card lp-float-card2">
                    <div className="lp-float-icon" style={{ background: 'rgba(16,185,129,.15)' }}>🎁</div>
                    <div style={{ flex: 1 }}>
                      <div className="lp-float-title">Beli 2 Gratis 1</div>
                      <div className="lp-float-sub">Promo terbatas</div>
                      <div className="lp-float-bar"><div className="lp-float-bar-fill" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-scroll-hint">
              <span className="lp-scroll-hint-text">Scroll untuk melihat lebih</span>
              <FiChevronDown className="lp-scroll-hint-arrow" />
            </div>
          </div>
        </section>

        {/* ════════════════════════ PROBLEM ════════════════════════ */}
        <section id="problem" ref={probRef} className="lp-section lp-prob">
          <div className="lp-section-inner">
            <div {...fade(probVis)} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="lp-section-tag" style={{ background: '#fef2f2', color: '#ef4444' }}>Masalah Umum</span>
              <h2 className="lp-section-h2">Apakah Bisnis Anda <span style={{ color: '#ef4444' }}>Mengalami Ini?</span></h2>
              <p className="lp-section-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>Tiga tantangan utama pemilik bisnis handmade accessories yang kami selesaikan.</p>
            </div>
            <div className="lp-prob-grid">
              {PROBLEMS.map((p, i) => (
                <div key={i} {...fade(probVis, 150 + i * 120)} className="lp-prob-card">
                  <span className="lp-prob-emoji">{p.emoji}</span>
                  <h3 className="lp-prob-title">{p.title}</h3>
                  <p className="lp-prob-desc">{p.desc}</p>
                </div>
              ))}
            </div>
            <div {...fade(probVis, 600)} className="lp-solution-banner">
              <div>
                <p className="lp-solution-text">Temukan koleksi <span>na_store.id</span> yang dirancang khusus untuk Anda! 🎉</p>
                <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>Satu platform untuk semua kebutuhan manajemen pelanggan bisnis handmade Anda.</p>
              </div>
              <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/register')}>
                Coba Gratis Sekarang <FiArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════ FEATURES ════════════════════════ */}
        <section id="features" ref={featRef} className="lp-section lp-feat">
          <div className="lp-section-inner">
            <div {...fade(featVis)} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="lp-section-tag" style={{ background: '#eff6ff', color: '#3b82f6' }}>Fitur Unggulan</span>
              <h2 className="lp-section-h2">Semua yang Anda Butuhkan <span style={{ color: '#3b82f6' }}>dalam Satu Platform</span></h2>
              <p className="lp-section-sub" style={{ maxWidth: '520px', margin: '0 auto' }}>Fitur lengkap yang dirancang khusus untuk mengelola bisnis handmade accessories Anda.</p>
            </div>
            <div className="lp-feat-grid">
              {FEATURES.map((f, i) => (
                <div key={i} {...fade(featVis, 100 + i * 80)} className="lp-feat-card">
                  <div className="lp-feat-icon-wrap" style={{ background: f.color + '18' }}>
                    <span style={{ fontSize: '28px' }}>{f.emoji}</span>
                  </div>
                  <h3 className="lp-feat-title">{f.title}</h3>
                  <p className="lp-feat-desc">{f.desc}</p>
                  <button className="lp-feat-link" onClick={() => navigate('/register')}>
                    Mulai pakai fitur ini <FiArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════ STATISTICS ════════════════════════ */}
        <section ref={statRef} className="lp-stats">
          <div className="lp-stats-dots" />
          <div className="lp-stats-inner">
            <div {...fade(statVis)}>
              <p className="lp-stats-h2">Dipercaya Ratusan Bisnis Handmade</p>
              <p className="lp-stats-sub">Angka nyata yang membuktikan kualitas layanan kami.</p>
            </div>
            <div className="lp-stats-grid">
              {STATS.map((s, i) => (
                <div key={i} {...fade(statVis, i * 150)}>
                  <StatCard icon={<span style={{ fontSize: '36px' }}>{s.emoji}</span>} end={s.end} suffix={s.suffix} label={s.label} go={statVis} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════ TESTIMONIALS ════════════════════════ */}
        <section ref={testRef} className="lp-section lp-test">
          <div className="lp-section-inner">
            <div {...fade(testVis)} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="lp-section-tag" style={{ background: '#fdf2f8', color: '#F875AA' }}>Testimoni</span>
              <h2 className="lp-section-h2">Apa Kata <span style={{ color: '#F875AA' }}>Pengguna Kami?</span></h2>
              <p className="lp-section-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>Dengarkan langsung dari mereka yang sudah merasakan manfaatnya.</p>
            </div>
            <div className="lp-test-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} {...fade(testVis, 100 + i * 150)} className="lp-test-card">
                  <div className="lp-test-tier" style={{ background: t.tierColor + '20', color: t.tierColor }}>{t.tier}</div>
                  <div className="lp-test-stars">
                    {[...Array(5)].map((_, j) => (
                      <FiStar key={j} size={16} style={{ color: j < t.rating ? '#f59e0b' : '#e2e8f0', fill: j < t.rating ? '#f59e0b' : 'none' }} />
                    ))}
                  </div>
                  <p className="lp-test-text">"{t.text}"</p>
                  <div className="lp-test-author">
                    <div className="lp-test-avatar">{t.avatar}</div>
                    <div>
                      <p className="lp-test-name">{t.name}</p>
                      <p className="lp-test-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════ PRICING ════════════════════════ */}
        <section id="pricing" ref={priceRef} className="lp-section lp-price">
          <div className="lp-section-inner">
            <div {...fade(priceVis)} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="lp-section-tag" style={{ background: '#f0fdf4', color: '#10b981' }}>Harga</span>
              <h2 className="lp-section-h2">Pilih Paket yang <span style={{ color: '#10b981' }}>Sesuai Bisnis Anda</span></h2>
              <p className="lp-section-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>Mulai gratis, upgrade kapan saja. Tanpa biaya tersembunyi.</p>
            </div>
            <div className="lp-price-grid">
              {PRICING.map((p, i) => (
                <div key={i} {...fade(priceVis, 100 + i * 150)}>
                  <PricingCard
                    {...p}
                    onClick={() => {
                      if (p.tier === 'Enterprise') {
                        window.location.href = 'mailto:sales@nastore.id?subject=Inquiry%20Enterprise%20Plan'
                      } else {
                        navigate('/register')
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════ FAQ ════════════════════════ */}
        <section id="faq" ref={faqRef} className="lp-section lp-faq">
          <div className="lp-section-inner" style={{ maxWidth: '760px' }}>
            <div {...fade(faqVis)} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="lp-section-tag" style={{ background: '#eff6ff', color: '#3b82f6' }}>FAQ</span>
              <h2 className="lp-section-h2">Pertanyaan yang Sering Diajukan</h2>
              <p className="lp-section-sub">Temukan jawaban atas pertanyaan umum seputar pemesanan di na_store.id.</p>
            </div>
            <div {...fade(faqVis, 200)} className="lp-faq-list">
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
            <div {...fade(faqVis, 500)} className="lp-faq-contact">
              <p className="lp-faq-contact-text">Masih punya pertanyaan lain?</p>
              <button className="lp-btn lp-btn-ghost" onClick={() => scrollTo('footer')}>
                <FiMessageCircle /> Hubungi Kami
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════ FINAL CTA ════════════════════════ */}
        <section ref={ctaRef} className="lp-cta">
          <div {...fade(ctaVis)} className="lp-cta-box">
            <div className="lp-cta-glow1" /><div className="lp-cta-glow2" />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div className="lp-cta-emoji">🚀</div>
              <h2 className="lp-cta-h2">Siap Mengubah Cara Anda<br />Mengelola Pelanggan?</h2>
              <p className="lp-cta-sub">Mulai belanja sekarang dan lengkapi hari-harimu dengan koleksi aksesoris handmade terbaik kami.</p>
              <div className="lp-cta-btns">
                <button className="lp-btn lp-btn-primary lp-btn-lg lp-btn-pulse" onClick={() => navigate('/register')}>
                  🎉 Mulai Gratis Sekarang <FiArrowRight className="lp-btn-arrow" />
                </button>
                <button className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/login')}>
                  <FiExternalLink /> Masuk ke Dashboard
                </button>
              </div>
              <p className="lp-cta-note">Tidak perlu kartu kredit · Gratis selamanya · Cancel kapan saja</p>
            </div>
          </div>
        </section>

        {/* ════════════════════════ FOOTER ════════════════════════ */}
        <footer id="footer" className="lp-footer">
          <div className="lp-footer-inner">
            <div className="lp-footer-grid">
              {/* Brand */}
              <div>
                <button className="lp-logo" onClick={() => scrollTo('hero')}>
                  <div className="lp-logo-icon">✨</div>
                  <div className="lp-logo-text">
                    <span className="lp-logo-name">na_store.id</span>
                    <span className="lp-logo-sub">Handmade Accessories</span>
                  </div>
                </button>
                <p className="lp-footer-brand-desc">Platform CRM terdepan yang dirancang khusus untuk pemilik bisnis handmade accessories di Indonesia.</p>
                <div className="lp-footer-socials" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                  {[
                    { icon: <FiInstagram />, url: 'https://instagram.com/na_store.id', label: 'Instagram' },
                    { icon: <FiTwitter />, url: 'https://twitter.com/na_store.id', label: 'Twitter' },
                    { icon: <FiFacebook />, url: 'https://facebook.com/na_store.id', label: 'Facebook' },
                  ].map((s, i) => (
                    <button key={i} aria-label={s.label} className="lp-footer-social" style={{ width: 'auto', padding: '0 16px', gap: '8px' }} onClick={() => window.open(s.url, '_blank')}>
                      {s.icon} <span style={{ fontSize: '13px', fontWeight: '500' }}>@na_store.id</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Produk */}
              <div>
                <p className="lp-footer-col-title">Produk</p>
                <ul className="lp-footer-links">
                  {['Katalog Produk', 'Promo & Diskon', 'Testimoni Pelanggan', 'Cara Pemesanan', 'Sistem Reward'].map((item, i) => (
                    <li key={i}><button onClick={() => scrollTo('features')}>{item}</button></li>
                  ))}
                </ul>
              </div>

              {/* Perusahaan */}
              <div>
                <p className="lp-footer-col-title">Perusahaan</p>
                <ul className="lp-footer-links">
                  {[
                    { label: 'Tentang Kami', action: () => scrollTo('hero') },
                    { label: 'Harga', action: () => scrollTo('pricing') },
                    { label: 'Kebijakan Privasi', action: () => alert('Halaman Kebijakan Privasi akan segera tersedia.') },
                    { label: 'Syarat & Ketentuan', action: () => alert('Halaman Syarat & Ketentuan akan segera tersedia.') },
                    { label: 'Karir', action: () => window.location.href = 'mailto:karir@nastore.id?subject=Lamaran%20Kerja' },
                  ].map((item, i) => (
                    <li key={i}><button onClick={item.action}>{item.label}</button></li>
                  ))}
                </ul>
              </div>

              {/* Kontak */}
              <div>
                <p className="lp-footer-col-title">Kontak</p>
                <div className="lp-footer-contact-item">
                  <div className="lp-footer-contact-icon"><FiMail /></div>
                  <a href="mailto:hello@nastore.id" style={{ color: 'inherit', textDecoration: 'none', fontSize: '14px' }}>hello@nastore.id</a>
                </div>
                <div className="lp-footer-contact-item">
                  <div className="lp-footer-contact-icon"><FiPhone /></div>
                  <a href="tel:+6281234567890" style={{ color: 'inherit', textDecoration: 'none', fontSize: '14px' }}>+62 812-3456-7890</a>
                </div>
                <div className="lp-footer-contact-item">
                  <div className="lp-footer-contact-icon"><FiMapPin /></div>
                  <span style={{ fontSize: '14px' }}>Perawang<br />Riau, Indonesia</span>
                </div>
              </div>
            </div>

            <hr className="lp-footer-divider" />
            <div className="lp-footer-bottom">
              <p className="lp-footer-copy">© 2024 na_store.id. Dibuat dengan ❤️ di Indonesia.</p>
              <div className="lp-footer-bottom-links">
                <button onClick={() => alert('Kebijakan Privasi akan segera tersedia.')}>Kebijakan Privasi</button>
                <button onClick={() => alert('Syarat & Ketentuan akan segera tersedia.')}>Syarat Layanan</button>
                <button onClick={() => scrollTo('hero')}>Kembali ke Atas</button>
              </div>
            </div>
          </div>
        </footer>

        {/* ════════════════════════ SCROLL TO TOP ════════════════════════ */}
        <button
          className={`lp-scroll-top ${showTop ? 'visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll ke atas"
        >
          <FiArrowUp />
        </button>

        {/* ════════════════════════ DEMO MODAL ════════════════════════ */}
        {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}

      </div>
    </>
  )
}
