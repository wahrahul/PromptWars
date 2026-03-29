import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft,
  Cloud, Thermometer, Droplets, Wind,
  AlertTriangle, CheckCircle,
  Newspaper, Image, Activity,
  Navigation, TrendingDown, Minus,
  Camera, Heart, Zap, Shield
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const WEATHER_CONDITIONS = [
  { condition: 'Partly Cloudy', icon: '⛅', temp: 24, humidity: 62, wind: 14, feels: 22 },
  { condition: 'Clear Sky', icon: '☀️', temp: 28, humidity: 45, wind: 9, feels: 27 },
  { condition: 'Light Rain', icon: '🌧️', temp: 18, humidity: 88, wind: 21, feels: 16 },
  { condition: 'Overcast', icon: '☁️', temp: 20, humidity: 75, wind: 12, feels: 18 },
];

const TRAFFIC_ROUTES = [
  { name: 'Main Highway', status: 'clear', delay: 0, icon: '🛣️' },
  { name: 'City Center', status: 'moderate', delay: 8, icon: '🏙️' },
  { name: 'Tech District', status: 'heavy', delay: 22, icon: '🏗️' },
  { name: 'Ring Road', status: 'clear', delay: 2, icon: '🔄' },
];

const NEWS_ITEMS = [
  {
    title: 'Google I/O 2025: Gemini Ultra 2.0 Unveiled with Real-Time Multimodal Reasoning',
    source: 'Google Blog',
    time: '2h ago',
    tag: 'AI',
    color: '#3b82f6'
  },
  {
    title: 'PromptWar Wins Best SaaS Dashboard at Google Dev Hackathon',
    source: 'Dev Summit',
    time: '4h ago',
    tag: 'Hackathon',
    color: '#10b981'
  },
  {
    title: 'Cloud Run Now Supports Zero-Config Quantum Deployment Pipelines',
    source: 'Google Cloud',
    time: '6h ago',
    tag: 'Cloud',
    color: '#a855f7'
  },
  {
    title: 'Firebase Realtime DB Integrates with Universal Social Bridge Protocol',
    source: 'Firebase',
    time: '1d ago',
    tag: 'Firebase',
    color: '#f59e0b'
  },
];

const PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=130&fit=crop', caption: 'Cloud Architecture' },
  { id: 2, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=130&fit=crop', caption: 'Data Network' },
  { id: 3, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=130&fit=crop', caption: 'Tech Cosmos' },
  { id: 4, url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=130&fit=crop', caption: 'Code Lab' },
];

const ACTIVITY_HISTORY = [
  { action: 'Session started', detail: 'Rahul authenticated via OAuth', icon: <Shield size={12} />, time: 'Just now', color: '#10b981' },
  { action: 'Google Cloud Sync', detail: 'Bridge handshake successful', icon: <Zap size={12} />, time: '1m ago', color: '#3b82f6' },
  { action: 'PDF Exported', detail: 'quantum_bridge_report.pdf', icon: <Activity size={12} />, time: '8m ago', color: '#a855f7' },
  { action: 'AI Insight', detail: 'Synergy scan on 2 nodes', icon: <Heart size={12} />, time: '15m ago', color: '#f59e0b' },
  { action: 'Node Added', detail: 'Integrations API #42', icon: <CheckCircle size={12} />, time: '32m ago', color: '#10b981' },
  { action: 'CSV Export', detail: 'social_bridge_topology.csv', icon: <Activity size={12} />, time: '1h ago', color: '#3b82f6' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <span style={{ color: 'var(--primary-color)' }}>{icon}</span>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{title}</span>
  </div>
);

const WeatherWidget: React.FC = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % WEATHER_CONDITIONS.length), 8000);
    return () => clearInterval(t);
  }, []);
  const w = WEATHER_CONDITIONS[idx];
  return (
    <div className="insight-section">
      <SectionTitle icon={<Cloud size={14} />} title="Weather" />
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{w.icon}</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{w.temp}°C</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{w.condition}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Mumbai, IN</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
        {[
          { icon: <Thermometer size={11} />, val: `${w.feels}°`, label: 'Feels' },
          { icon: <Droplets size={11} />, val: `${w.humidity}%`, label: 'Humidity' },
          { icon: <Wind size={11} />, val: `${w.wind}km`, label: 'Wind' },
        ].map(item => (
          <div key={item.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '0.5rem 0.25rem' }}>
            <div style={{ color: 'var(--primary-color)', marginBottom: '0.15rem' }}>{item.icon}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{item.val}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrafficWidget: React.FC = () => {
  const statusConfig = {
    clear: { color: '#10b981', label: 'Clear', icon: <CheckCircle size={11} /> },
    moderate: { color: '#f59e0b', label: 'Moderate', icon: <Minus size={11} /> },
    heavy: { color: '#ef4444', label: 'Heavy', icon: <AlertTriangle size={11} /> },
  };
  return (
    <div className="insight-section">
      <SectionTitle icon={<Navigation size={14} />} title="Live Traffic" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {TRAFFIC_ROUTES.map(route => {
          const cfg = statusConfig[route.status as keyof typeof statusConfig];
          return (
            <div key={route.name} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '0.5rem 0.75rem',
              borderLeft: `3px solid ${cfg.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem' }}>{route.icon}</span>
                <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 500 }}>{route.name}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: cfg.color, fontSize: '0.65rem', fontWeight: 600 }}>
                  {cfg.icon} {cfg.label}
                </div>
                {route.delay > 0 && <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>+{route.delay} min</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '0.75rem', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TrendingDown size={11} color="#10b981" /> Traffic easing on 2 routes
      </div>
    </div>
  );
};

const NewsWidget: React.FC = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % NEWS_ITEMS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="insight-section">
      <SectionTitle icon={<Newspaper size={14} />} title="Tech News" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {NEWS_ITEMS.map((item, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            padding: '0.6rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
            background: i === active ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.02)',
            borderLeft: `3px solid ${i === active ? item.color : 'transparent'}`,
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 700, background: `${item.color}22`, color: item.color, padding: '1px 5px', borderRadius: '99px' }}>{item.tag}</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{item.time}</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: i === active ? '#fff' : 'var(--text-secondary)', lineHeight: 1.4, margin: 0, transition: 'color 0.2s' }}>{item.title}</p>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>— {item.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhotosWidget: React.FC = () => (
  <div className="insight-section">
    <SectionTitle icon={<Camera size={14} />} title="Media Gallery" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
      {PHOTOS.map(photo => (
        <div key={photo.id} style={{ borderRadius: '8px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
          className="photo-card">
          <img
            src={photo.url}
            alt={photo.caption}
            style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/200/130?random=${photo.id}`; }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            padding: '0.25rem 0.4rem', fontSize: '0.55rem', color: '#fff', fontWeight: 500
          }}>
            {photo.caption}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ActivityWidget: React.FC = () => (
  <div className="insight-section">
    <SectionTitle icon={<Activity size={14} />} title="Activity History" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {ACTIVITY_HISTORY.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
            background: `${item.color}18`, border: `1px solid ${item.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, marginTop: '2px'
          }}>
            {item.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.73rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.action}</div>
            <div style={{ fontSize: '0.63rem', color: 'var(--text-secondary)', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.detail}</div>
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', flexShrink: 0 }}>{item.time}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Panel ───────────────────────────────────────────────────────────────

type Tab = 'weather' | 'traffic' | 'news' | 'photos' | 'history';

const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'weather', icon: <Cloud size={14} />, label: 'Weather' },
  { id: 'traffic', icon: <Navigation size={14} />, label: 'Traffic' },
  { id: 'news', icon: <Newspaper size={14} />, label: 'News' },
  { id: 'photos', icon: <Image size={14} />, label: 'Photos' },
  { id: 'history', icon: <Activity size={14} />, label: 'History' },
];

const InsightPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('weather');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="insight-panel-container" style={{ display: 'flex', flexShrink: 0 }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="insight-toggle-btn"
        title={isOpen ? 'Collapse Panel' : 'Expand Insight Panel'}
        style={{
          alignSelf: 'flex-start',
          marginTop: '1rem',
          width: '20px',
          minHeight: '72px',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRight: 'none',
          borderRadius: '8px 0 0 8px',
          cursor: 'pointer',
          color: 'var(--primary-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        {isOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Panel Body */}
      <div className={`insight-panel ${isOpen ? 'open' : 'collapsed'}`} style={{
        width: isOpen ? '272px' : '0px',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        flexShrink: 0,
        background: 'rgba(10, 10, 20, 0.5)',
        backdropFilter: 'blur(16px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ width: '272px' }}>
          {/* Panel Header */}
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>INSIGHT PANEL</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                {time.toLocaleTimeString()}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 600 }}>LIVE</span>
            </div>
          </div>

          {/* Tab Bar */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            overflowX: 'auto',
          }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.25rem',
                  background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--primary-color)' : '2px solid transparent',
                  cursor: 'pointer',
                  color: activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-family)',
                }}
              >
                {tab.icon}
                <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div style={{ overflowY: 'auto', height: 'calc(100vh - 200px)', padding: '0.75rem' }}>
            {activeTab === 'weather' && <WeatherWidget />}
            {activeTab === 'traffic' && <TrafficWidget />}
            {activeTab === 'news' && <NewsWidget />}
            {activeTab === 'photos' && <PhotosWidget />}
            {activeTab === 'history' && <ActivityWidget />}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .insight-section {
          margin-bottom: 0.75rem;
        }
        .photo-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .photo-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        }
        .insight-toggle-btn:hover {
          background: rgba(59, 130, 246, 0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default InsightPanel;
