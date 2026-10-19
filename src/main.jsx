import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Clock3, MapPin, Navigation, ChevronDown, Heart, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import './styles.css';
import './scratch.css';

const homeVenue = 'Kalpataru Niketan, New HN Colony, Dhanbad';
const events = [
  { day: '25', month: 'NOV', year: '2026', name: 'Tilak', time: '6:00 PM onwards', venue: homeVenue, note: 'An auspicious beginning to our celebrations.' },
  { day: '28', month: 'NOV', year: '2026', name: 'Haldi', time: '11:00 AM onwards', venue: homeVenue, note: 'A sunlit morning of turmeric, laughter and blessings.' },
  { day: '28', month: 'NOV', year: '2026', name: 'Mehndi & Sangeet', time: '5:00 PM onwards', venue: homeVenue, note: 'An evening of henna, melodies and dancing.' },
  { day: '29', month: 'NOV', year: '2026', name: 'Devpujan', time: '10:00 AM onwards', venue: homeVenue, note: 'Seeking divine grace for the journey ahead.' },
  { day: '29', month: 'NOV', year: '2026', name: 'Matkor', time: '2:00 PM onwards', venue: homeVenue, note: 'A cherished ritual rooted in family tradition.' },
  { day: '29', month: 'NOV', year: '2026', name: 'Mandap', time: '6:00 PM onwards', venue: homeVenue, note: 'Sacred preparations beneath the wedding canopy.' },
  { day: '30', month: 'NOV', year: '2026', name: 'Baraat', time: '7:00 AM departure', venue: 'Kalpataru Niketan, Dhanbad → Mirjanhat, Bhagalpur', map: 'Mirjanhat, Bhagalpur, Bihar', note: 'The joyous wedding procession begins.' },
  { day: '02', month: 'DEC', year: '2026', name: 'Reception', time: '7:00 PM onwards', venue: 'Yamuna Banquet Hall, Barmasia, Dhanbad', note: 'An evening of celebration, dinner and togetherness.' }
];

let effectsContext;
const getEffectsContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  effectsContext ||= new AudioContext();
  if (effectsContext.state === 'suspended') effectsContext.resume();
  return effectsContext;
};

const playDoorSound = () => {
  const audio = getEffectsContext();
  if (!audio) return;
  const now = audio.currentTime;
  const sparkleNotes = [1046.5, 1318.51, 1567.98, 2093, 2637.02, 3135.96, 2093, 2637.02];
  sparkleNotes.forEach((frequency, index) => {
    const start = now + index * .085;
    const oscillator = audio.createOscillator(), gain = audio.createGain(), shimmer = audio.createOscillator(), shimmerGain = audio.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = frequency;
    shimmer.type = 'sine'; shimmer.frequency.value = frequency * 2.01;
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(.035, start + .008); gain.gain.exponentialRampToValueAtTime(.0001, start + .55);
    shimmerGain.gain.setValueAtTime(.0001, start); shimmerGain.gain.exponentialRampToValueAtTime(.009, start + .006); shimmerGain.gain.exponentialRampToValueAtTime(.0001, start + .3);
    oscillator.connect(gain); shimmer.connect(shimmerGain); gain.connect(audio.destination); shimmerGain.connect(audio.destination);
    oscillator.start(start); shimmer.start(start); oscillator.stop(start + .58); shimmer.stop(start + .34);
  });
};

const playSlideSound = () => {
  const audio = getEffectsContext();
  if (!audio) return;
  const now = audio.currentTime, oscillator = audio.createOscillator(), gain = audio.createGain();
  oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(620, now); oscillator.frequency.exponentialRampToValueAtTime(980, now + .16);
  gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.035, now + .018); gain.gain.exponentialRampToValueAtTime(.0001, now + .22);
  oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(now); oscillator.stop(now + .24);
};

const receptionMapUrl = 'https://maps.app.goo.gl/kWyvGpdCjtzQKS3KA';

function OrnateDivider() {
  return <div className="ornate-divider" aria-hidden="true"><span /><b>✦</b><span /></div>;
}

function GaneshaMark() {
  return <svg className="ganesha-mark" viewBox="0 0 240 250" role="img" aria-label="Sacred Ganesh symbol">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M76 66Q120 19 164 66M91 55Q120 35 149 55M102 39L120 17l18 22" />
      <path d="M91 74Q62 50 43 80q-15 27 20 52M149 74q29-24 48 6 15 27-20 52" />
      <path d="M83 71q37-29 74 0v42q0 31-23 43" />
      <path d="M116 91q-13 35 1 65 17 35-9 58-19 16-38 1 22 1 25-18" />
      <path d="M90 112q9 9 20 0M137 112q9 9 18 0" />
      <path d="M53 145q26 17 35 43M187 145q-27 17-37 43M69 228q51-28 102 0" />
      <circle cx="120" cy="77" r="3" fill="currentColor" stroke="none" />
    </g>
  </svg>;
}

function PeacockCorner({ className }) {
  return <svg className={`peacock-corner ${className}`} viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M8 92Q24 50 62 22Q76 12 91 9M19 91Q31 61 58 43M31 88Q42 67 61 56" />
      <path d="M55 29Q66 5 84 16Q98 25 78 43Q62 53 55 29Z" />
      <path d="M62 28Q70 14 80 20Q88 26 77 35Q67 41 62 28Z" />
      <circle cx="73" cy="28" r="3" fill="currentColor" stroke="none" />
      <path d="M17 73l10 2-6 8M31 55l9 1-5 8M46 40l8-1-3 7" />
    </g>
  </svg>;
}

function ElephantSeal() {
  const elephant = 'M3 24Q3 12 12 9Q22 4 31 11Q38 9 42 15Q46 21 42 29Q39 32 36 28L37 21Q33 25 28 24L27 31H21L20 24H12L11 31H5L5 22';
  return <svg className="elephant-seal" viewBox="0 0 100 38" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d={elephant} /><path d={elephant} transform="translate(100 0) scale(-1 1)" />
      <path d="M43 27q6 7 10 0M50 8v13M46 13h8" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" /><circle cx="85" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </g>
  </svg>;
}

function LuxuryBorder({ bright = false, variant = 'crown' }) {
  return <div className={`luxury-border variant-${variant} ${bright ? 'border-bright' : ''}`} aria-hidden="true">
    <PeacockCorner className="pc-tl" /><PeacockCorner className="pc-tr" /><PeacockCorner className="pc-bl" /><PeacockCorner className="pc-br" />
    <div className="gold-rail rail-top"><ElephantSeal /></div><div className="gold-rail rail-bottom"><ElephantSeal /></div>
    <span className="border-emblem emblem-top" /><span className="border-emblem emblem-bottom" />
  </div>;
}

function ScratchReveal({ countdown }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const audioRef = useRef(null);
  const lastPluckRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const box = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = box.width * ratio; canvas.height = box.height * ratio; ctx.scale(ratio, ratio);
    const gold = ctx.createLinearGradient(0, 0, box.width, box.height);
    gold.addColorStop(0, '#e2c582'); gold.addColorStop(.5, '#9f7336'); gold.addColorStop(1, '#d7b66d');
    ctx.fillStyle = gold; ctx.fillRect(0, 0, box.width, box.height);
    ctx.fillStyle = 'rgba(255,255,255,.12)';
    for (let x = -box.height; x < box.width; x += 18) ctx.fillRect(x, 0, 2, box.height);
    ctx.fillStyle = '#3d1720'; ctx.textAlign = 'center';
    ctx.font = "500 12px 'DM Sans'"; ctx.fillText('SCRATCH TO REVEAL THE WEDDING DATE', box.width / 2, box.height / 2 - 4);
    ctx.font = "italic 19px 'Cormorant Garamond'"; ctx.fillText('rub here ✦', box.width / 2, box.height / 2 + 25);
  }, []);
  const playGuitarPluck = (position) => {
    const now = performance.now();
    if (now - lastPluckRef.current < 145) return;
    lastPluckRef.current = now;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audio = audioRef.current || new AudioContext();
    audioRef.current = audio;
    const strings = [196, 246.94, 293.66, 392];
    const frequency = strings[Math.min(3, Math.floor(position * strings.length))];
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();
    oscillator.type = 'triangle'; oscillator.frequency.value = frequency;
    filter.type = 'lowpass'; filter.frequency.setValueAtTime(2200, audio.currentTime); filter.frequency.exponentialRampToValueAtTime(550, audio.currentTime + .55);
    gain.gain.setValueAtTime(.0001, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.11, audio.currentTime + .008); gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + .72);
    oscillator.connect(filter); filter.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + .75);
  };
  const scratch = (event) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current, box = canvas.getBoundingClientRect(), point = event.touches?.[0] || event, ctx = canvas.getContext('2d');
    playGuitarPluck(Math.max(0, Math.min(1, (point.clientX - box.left) / box.width)));
    ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(point.clientX - box.left, point.clientY - box.top, 30, 0, Math.PI * 2); ctx.fill();
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0, checked = 0;
    for (let i = 3; i < pixels.length; i += 128) { checked++; if (pixels[i] === 0) clear++; }
    if (clear / checked > .42) setRevealed(true);
  };
  return <div className="scratch-wrap">
    <div className="revealed-date">
      <small>THE WEDDING DAY</small><strong>30</strong><span>NOVEMBER 2026</span><p>Monday</p>
      <div className="scratch-countdown">{Object.entries(countdown).map(([label, value]) => <div key={label}><b>{String(value).padStart(2, '0')}</b><small>{label}</small></div>)}</div>
    </div>
    {!revealed && <canvas ref={canvasRef} className="scratch-canvas" aria-label="Scratch to reveal the wedding date" onMouseDown={() => drawing.current = true} onMouseUp={() => drawing.current = false} onMouseLeave={() => drawing.current = false} onMouseMove={scratch} onTouchStart={() => drawing.current = true} onTouchEnd={() => drawing.current = false} onTouchMove={scratch} />}
    {revealed && <div className="revealed-badge">Date revealed ✦</div>}
  </div>;
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [opening, setOpening] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const activePhotoRef = useRef(0);
  const galleryRef = useRef(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const openInvitation = () => {
    if (opening) return;
    playDoorSound();
    setOpening(true);
    window.setTimeout(() => setShowWelcome(false), 1100);
  };

  const moveGallery = (direction) => {
    const next = Math.max(0, Math.min(3, activePhoto + direction));
    if (next === activePhotoRef.current) return;
    playSlideSound();
    activePhotoRef.current = next;
    const gallery = galleryRef.current;
    const card = gallery?.children[next];
    if (gallery && card) gallery.scrollTo({ left: card.offsetLeft - gallery.offsetLeft, behavior: 'smooth' });
    setActivePhoto(next);
  };

  const trackGallery = () => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const nearest = [...gallery.children].reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - gallery.offsetLeft - gallery.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    if (nearest.index !== activePhotoRef.current) {
      activePhotoRef.current = nearest.index;
      playSlideSound();
    }
    setActivePhoto(nearest.index);
  };

  useEffect(() => {
    document.body.style.overflow = showWelcome ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showWelcome]);

  useEffect(() => {
    const target = new Date('2026-11-30T00:00:00+05:30');
    const update = () => {
      const remaining = Math.max(0, target - new Date());
      setCountdown({ days: Math.floor(remaining / 86400000), hours: Math.floor((remaining / 3600000) % 24), minutes: Math.floor((remaining / 60000) % 60), seconds: Math.floor((remaining / 1000) % 60) });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {showWelcome && <section className={`welcome-screen ${opening ? 'is-opening' : ''}`} aria-label="Wedding invitation welcome" onClick={openInvitation}>
        <div className="welcome-grain" />
        <div className="royal-door door-left"><span className="door-arch" /><span className="door-motif">✦</span></div>
        <div className="royal-door door-right"><span className="door-arch" /><span className="door-motif">✦</span></div>
        <div className="welcome-frame frame-outer" /><div className="welcome-frame frame-inner" />
        <div className="welcome-corner wc-one" /><div className="welcome-corner wc-two" /><div className="welcome-corner wc-three" /><div className="welcome-corner wc-four" />
        <div className="welcome-content">
          <p className="welcome-blessing">श्री गणेशाय नमः</p>
          <div className="ganesha-halo"><GaneshaMark /></div>
          <p className="welcome-overline">A wedding invitation</p>
          <h2>Abhishek <em>&</em> Anvi</h2>
          <div className="welcome-flourish"><span />✦<span /></div>
          <p className="welcome-message">With the blessings of Lord Ganesha<br />and the love of our families</p>
          <button className="open-invitation" onClick={(event) => { event.stopPropagation(); openInvitation(); }}><b className="click-hint">Click here</b><span>Open the invitation</span><i>→</i></button>
        </div>
      </section>}
      <section className="hero decorated-section" id="home">
        <LuxuryBorder bright variant="crown" />
        <img className="hero-photo" src="/photos/optimized/DSC03153.jpg" alt="Abhishek and Anvi together beside the palace lake" />
        <div className="grain" />
        <div className="corner corner-tl" /><div className="corner corner-tr" />
        <div className="corner corner-bl" /><div className="corner corner-br" />
        <div className="hero-content reveal">
          <p className="eyebrow">Together with our families</p>
          <div className="monogram"><span>A</span><i>&</i><span>A</span></div>
          <h1><span>Abhishek</span><em>&</em><span>Anvi</span></h1>
          <OrnateDivider />
          <p className="invitation-line">joyfully invite you to celebrate their wedding</p>
          <div className="journey-route" aria-label="Wedding journey from Dhanbad to Bhagalpur">
            <div className="route-city"><MapPin size={17} /><strong>Dhanbad</strong><small>The celebration begins</small></div>
            <div className="route-line"><span /><i>♥</i><span /></div>
            <div className="route-city"><MapPin size={17} /><strong>Bhagalpur</strong><small>Where two hearts unite</small></div>
          </div>
        </div>
        <a href="#story" className="scroll-cue"><span>Discover</span><ChevronDown size={18} /></a>
      </section>

      <section className="blessing decorated-section" id="story">
        <LuxuryBorder variant="lotus" />
        <div className="section-blessing"><span>✦</span><p className="sanskrit">श्री गणेशाय नमः</p><span>✦</span></div>
        <p className="kicker">A sacred union</p>
        <h2>Two souls, one beautiful beginning</h2>
        <p className="lead">With hearts full of gratitude and joy, we request the pleasure of your company as we begin our forever—surrounded by the love and blessings of family and friends.</p>
        <div className="families">
          <article>
            <p className="side-label">The Groom</p>
            <h3>Abhishek Suman</h3>
            <p>Beloved son of</p>
            <strong>Ajay Kumar Sinha</strong>
            <span>&</span>
            <strong>Nilam Sinha</strong>
          </article>
          <div className="union"><Heart size={21} fill="currentColor" /><span /></div>
          <article>
            <p className="side-label">The Bride</p>
            <h3>Anvi Verma</h3>
            <p>Beloved daughter of</p>
            <strong>Manoj Kumar Verma</strong>
            <span>&</span>
            <strong>Sneha Verma</strong>
          </article>
        </div>
      </section>

      <section className="photo-story decorated-section" aria-label="Abhishek and Anvi photo story">
        <LuxuryBorder variant="jali" />
        <header className="photo-story-heading">
          <p className="kicker">Our story, in frames</p>
          <h2>A love written in<br /><em>quiet moments</em></h2>
          <p>Before the vows, there was this beautiful journey—and a thousand little reasons to choose each other.</p>
        </header>
        <div className="editorial-gallery" ref={galleryRef} onScroll={trackGallery} onPointerDown={getEffectsContext}>
          <figure className="photo-frame photo-one"><img src="/photos/optimized/DSC03425.jpg" alt="Abhishek and Anvi together beside a carved stone window" loading="lazy" /><figcaption><span>01</span>In every light, together</figcaption></figure>
          <figure className="photo-frame photo-two"><img src="/photos/optimized/DSC03348.jpg" alt="Abhishek and Anvi beneath a palace arch" loading="lazy" /><figcaption><span>02</span>Where forever feels close</figcaption></figure>
          <figure className="photo-frame photo-three"><img src="/photos/optimized/DSC03303.jpg" alt="Abhishek and Anvi in a historic palace courtyard" loading="lazy" /><figcaption><span>03</span>A story shaped by grace</figcaption></figure>
          <figure className="photo-frame photo-four"><img src="/photos/optimized/DSC03283.jpg" alt="Abhishek and Anvi standing at an ornate heritage doorway" loading="lazy" /><figcaption><span>04</span>Two paths, one promise</figcaption></figure>
        </div>
        <div className="gallery-controls" aria-label="Photo gallery controls">
          <button onClick={() => moveGallery(-1)} disabled={activePhoto === 0} aria-label="Previous photograph"><ArrowLeft size={17} /></button>
          <div className="gallery-progress">{[0,1,2,3].map(index => <span className={index === activePhoto ? 'active' : ''} key={index} />)}</div>
          <p><strong>0{activePhoto + 1}</strong> / 04</p>
          <button onClick={() => moveGallery(1)} disabled={activePhoto === 3} aria-label="Next photograph"><ArrowRight size={17} /></button>
        </div>
      </section>

      <section className="reveal-section decorated-section">
        <LuxuryBorder variant="treasury" />
        <div className="reveal-copy"><p className="kicker">A little surprise</p><h2>Scratch to reveal<br />our wedding day</h2><p>Use your finger or cursor over the golden card.</p></div>
        <ScratchReveal countdown={countdown} />
      </section>

      <section className="celebrations decorated-section" id="events">
        <LuxuryBorder variant="procession" />
        <header>
          <p className="kicker">The festivities</p>
          <h2>Celebrations & Ceremonies</h2>
          <p>Each gathering is a chapter in our story. We would be honoured to share them with you.</p>
        </header>
        <div className="event-list">
          {events.map((event, index) => (
            <article className="event-card" key={`${event.name}-${index}`}>
              <div className="event-symbol"><Sparkles size={16} /></div>
              <div className="date-block"><strong>{event.day}</strong><span>{event.month}</span><small>{event.year}</small></div>
              <div className="event-copy">
                <span className="event-number">0{index + 1}</span>
                <h3>{event.name}</h3>
                <p className="event-note">{event.note}</p>
                <div className="detail"><Clock3 size={15} /><span>{event.time}</span></div>
                <div className="detail"><MapPin size={15} /><span>{event.venue}</span></div>
              </div>
              {event.name === 'Reception' && <a className="map-link" href={receptionMapUrl} target="_blank" rel="noreferrer"><Navigation size={15} /> View map</a>}
            </article>
          ))}
        </div>
      </section>

      <section className="venues decorated-section" id="venues">
        <LuxuryBorder bright variant="garden" />
        <div className="venue-intro">
          <p className="kicker">Find your way</p>
          <h2>Our Venues</h2>
          <p>Reception directions are linked below. We cannot wait to welcome you.</p>
        </div>
        <div className="venue-grid">
          <article className="venue-card"><span>Most ceremonies</span><h3>Kalpataru Niketan</h3><p>New HN Colony, Dhanbad</p></article>
          <a className="venue-card" href={receptionMapUrl} target="_blank" rel="noreferrer"><span>Reception</span><h3>Yamuna Banquet Hall</h3><p>Barmasia, Dhanbad</p><b>Open in Maps <Navigation size={14} /></b></a>
          <article className="venue-card"><span>Wedding destination</span><h3>Mirjanhat</h3><p>Bhagalpur, Bihar</p></article>
        </div>
        <div className="map-embed">
          <iframe
            title="Yamuna Banquet Hall location on Google Maps"
            src="https://www.google.com/maps?q=Yamuna%20Banquet%20Hall%2C%20Barmasia%2C%20Dhanbad&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-caption"><div><span>Reception venue</span><strong>Yamuna Banquet Hall</strong><small>Barmasia, Dhanbad</small></div><a href={receptionMapUrl} target="_blank" rel="noreferrer"><Navigation size={15} /> Get directions</a></div>
        </div>
      </section>

      <section className="portrait-finale decorated-section">
        <LuxuryBorder bright variant="sunburst" />
        <img src="/photos/optimized/DSC03760.jpg" alt="Abhishek and Anvi in formal attire beneath white palace arches" loading="lazy" />
        <div className="finale-shade" />
        <div className="finale-copy"><p>And so the adventure begins</p><h2>From this day<br />to every day</h2><span>30 · 11 · 2026</span></div>
      </section>

      <footer className="decorated-section">
        <LuxuryBorder bright variant="lotus-night" />
        <p className="sanskrit">शुभ विवाह</p>
        <h2>We look forward to celebrating with you</h2>
        <OrnateDivider />
        <p className="signature">Abhishek <span>&</span> Anvi</p>
        <p className="footer-date"><CalendarDays size={14} /> November — December 2026</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
