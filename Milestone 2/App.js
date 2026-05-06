import { useState } from "react";

const TOTAL_TICKETS = 50;
const PRICE = 100;

const EVENT = {
  name: "Tantraz 2k26",
  tagline: "The Ultimate College Tech Extravaganza",
  date: "20 April 2026",
  day: "Monday",
  time: "10:00 AM – 6:00 PM",
  venue: "Main Auditorium, Block A",
  college: "Vel Tech University",
  city: "Avadi, Chennai, Tamil Nadu",
  upiId: "tantraz2k26@okaxis",
  highlights: ["Hackathon", "Paper Presentation", "Tech Quiz", "AI Workshop", "Robotics", "Cultural Night"],
  schedule: [
    { time: "10:00 AM", title: "Inauguration & Keynote", icon: "01" },
    { time: "11:00 AM", title: "Hackathon Begins", icon: "02" },
    { time: "01:00 PM", title: "Paper Presentations", icon: "03" },
    { time: "02:30 PM", title: "AI & Robotics Workshop", icon: "04" },
    { time: "04:00 PM", title: "Tech Quiz Finals", icon: "05" },
    { time: "05:30 PM", title: "Prize Distribution & Cultural Night", icon: "06" },
  ],
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1209;
    --paper: #faf6ee;
    --cream: #f2ead8;
    --saffron: #e8820c;
    --amber: #f5a623;
    --rust: #c0440a;
    --sage: #4a7c59;
    --dust: #8a7560;
    --light-dust: #c4b49a;
    --white: #fffdf7;
  }

  body { background: var(--paper); }

  .app {
    min-height: 100vh;
    background: var(--paper);
    font-family: 'Outfit', sans-serif;
    color: var(--ink);
  }

  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  .page-wrap {
    position: relative;
    z-index: 1;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 20px 40px;
    min-height: 100vh;
  }

  .header-strip {
    background: var(--ink);
    color: var(--amber);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-align: center;
    padding: 6px;
    margin: 0 -20px 0;
    text-transform: uppercase;
  }

  .masthead {
    padding: 28px 0 20px;
    border-bottom: 3px solid var(--ink);
    margin-bottom: 28px;
    position: relative;
  }
  .masthead-overline {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    color: var(--saffron);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .masthead-title {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -1px;
    color: var(--ink);
  }
  .masthead-title em { font-style: italic; color: var(--saffron); }
  .masthead-sub {
    margin-top: 10px;
    font-size: 12px;
    color: var(--dust);
    font-weight: 300;
    letter-spacing: 1px;
  }
  .masthead-rule {
    position: absolute;
    bottom: -6px; right: 0;
    width: 40%; height: 3px;
    background: var(--saffron);
  }

  .auth-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--dust);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .auth-eyebrow::after {
    content: ''; flex: 1;
    height: 1px; background: var(--light-dust);
  }

  .tab-row {
    display: flex;
    border: 1.5px solid var(--ink);
    margin-bottom: 24px;
    overflow: hidden;
  }
  .tab-btn {
    flex: 1; padding: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase;
    border: none; cursor: pointer;
    transition: all 0.2s;
    background: transparent; color: var(--dust);
  }
  .tab-btn.active { background: var(--ink); color: var(--amber); }
  .tab-btn:not(.active):hover { background: var(--cream); }

  .field-group { margin-bottom: 16px; }
  .field-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; color: var(--dust);
    margin-bottom: 6px;
  }
  .field-input {
    width: 100%; padding: 11px 14px;
    border: 1.5px solid var(--light-dust);
    background: var(--white);
    font-family: 'Outfit', sans-serif;
    font-size: 14px; color: var(--ink);
    outline: none; transition: border-color 0.2s;
    border-radius: 0;
  }
  .field-input:focus { border-color: var(--saffron); }
  .field-input::placeholder { color: var(--light-dust); }

  .pw-wrap { position: relative; }
  .pw-toggle {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: var(--dust); font-size: 11px;
    font-family: 'DM Mono', monospace; letter-spacing: 1px;
  }
  .pw-input { padding-right: 52px !important; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .btn-primary {
    width: 100%; padding: 14px;
    background: var(--ink); color: var(--amber);
    border: none; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 3px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; border-radius: 0; margin-top: 4px;
  }
  .btn-primary:hover { background: var(--rust); color: var(--white); }

  .btn-secondary {
    width: 100%; padding: 13px;
    background: transparent; color: var(--ink);
    border: 1.5px solid var(--ink);
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 3px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; border-radius: 0;
  }
  .btn-secondary:hover { background: var(--cream); }

  .btn-saffron {
    width: 100%; padding: 14px;
    background: var(--saffron); color: var(--white);
    border: none; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 3px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; border-radius: 0;
  }
  .btn-saffron:hover { background: var(--rust); }

  .btn-back {
    display: flex; align-items: center; gap: 8px;
    background: none; border: none; cursor: pointer;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 2px; color: var(--dust);
    text-transform: uppercase; padding: 0; transition: color 0.2s;
  }
  .btn-back:hover { color: var(--ink); }

  .alert {
    margin-top: 14px; padding: 10px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 1px; border-left: 3px solid;
  }
  .alert-error { border-color: var(--rust); background: #fff1ec; color: var(--rust); }
  .alert-success { border-color: var(--sage); background: #f0faf3; color: var(--sage); }

  .helper-text { font-size: 12px; color: var(--dust); text-align: center; margin-top: 16px; }
  .helper-link { color: var(--saffron); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }

  /* ── TOPBAR ── */
  .topbar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 0; border-bottom: 1px solid var(--light-dust); margin-bottom: 24px;
  }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .user-badge { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; color: var(--dust); }
  .user-badge strong { color: var(--ink); }
  .sign-out-btn {
    font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--dust); background: none;
    border: 1px solid var(--light-dust); padding: 5px 10px; cursor: pointer; transition: all 0.2s;
  }
  .sign-out-btn:hover { border-color: var(--ink); color: var(--ink); }

  /* ── NAV TABS ── */
  .nav-tabs {
    display: flex; gap: 0;
    border: 1.5px solid var(--ink);
    margin-bottom: 24px; overflow: hidden;
  }
  .nav-tab {
    flex: 1; padding: 9px 6px;
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 2px;
    text-transform: uppercase; border: none; cursor: pointer;
    transition: all 0.2s; background: transparent; color: var(--dust);
    position: relative;
  }
  .nav-tab.active { background: var(--ink); color: var(--amber); }
  .nav-tab:not(.active):hover { background: var(--cream); }
  .nav-tab-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--saffron); color: white;
    font-size: 8px; margin-left: 4px;
    font-family: 'DM Mono', monospace;
  }
  .nav-tab.active .nav-tab-badge { background: var(--amber); color: var(--ink); }

  /* ── EVENT HERO ── */
  .event-hero {
    background: var(--ink); padding: 30px 24px;
    margin-bottom: 20px; position: relative; overflow: hidden;
  }
  .event-hero::before {
    content: '2K26'; position: absolute; right: -10px; top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif; font-size: 100px; font-weight: 900;
    color: rgba(255,255,255,0.04); line-height: 1; pointer-events: none;
  }
  .hero-badge {
    display: inline-block; font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--amber); border: 1px solid rgba(245,166,35,0.4);
    padding: 4px 10px; margin-bottom: 14px;
  }
  .hero-name { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 900; color: var(--white); line-height: 1; margin-bottom: 6px; }
  .hero-tagline { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 300; margin-bottom: 20px; }
  .tags-row { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1.5px;
    text-transform: uppercase; color: rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.15); padding: 4px 9px;
  }

  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .info-card {
    background: var(--white); border: 1.5px solid var(--cream);
    padding: 16px; position: relative;
  }
  .info-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 100%; background: var(--saffron);
  }
  .info-icon { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; color: var(--saffron); text-transform: uppercase; margin-bottom: 8px; }
  .info-main { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--ink); line-height: 1.2; margin-bottom: 4px; }
  .info-sub { font-size: 11px; color: var(--dust); line-height: 1.4; }
  .info-accent { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--saffron); margin-top: 4px; letter-spacing: 1px; }

  .section-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .section-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--dust); white-space: nowrap; }
  .section-rule { flex: 1; height: 1px; background: var(--light-dust); }

  .schedule-list { margin-bottom: 20px; }
  .schedule-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 12px 0; border-bottom: 1px solid var(--cream); position: relative;
  }
  .schedule-item:last-child { border-bottom: none; }
  .sched-num { font-family: 'Playfair Display', serif; font-style: italic; font-size: 22px; color: var(--light-dust); line-height: 1; min-width: 28px; }
  .sched-content { flex: 1; }
  .sched-title { font-size: 14px; font-weight: 500; color: var(--ink); margin-bottom: 2px; }
  .sched-time { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--dust); letter-spacing: 1px; }
  .sched-badge { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 2px; text-transform: uppercase; background: var(--saffron); color: var(--white); padding: 2px 7px; align-self: center; }

  .cta-box {
    background: var(--cream); border: 1.5px solid var(--light-dust);
    padding: 20px; margin-bottom: 20px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .cta-price { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: var(--ink); line-height: 1; }
  .cta-price span { font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400; color: var(--dust); }
  .cta-seats { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--dust); letter-spacing: 1px; margin-top: 4px; }
  .cta-btn-wrap { flex: 1; min-width: 140px; }

  .avail-box { background: var(--white); border: 1.5px solid var(--cream); padding: 16px; margin-bottom: 20px; }
  .avail-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  .avail-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--dust); }
  .avail-count { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }
  .avail-track { height: 4px; background: var(--cream); position: relative; overflow: hidden; }
  .avail-fill { height: 100%; transition: width 0.5s ease; }

  .form-card { background: var(--white); border: 1.5px solid var(--cream); padding: 24px; margin-bottom: 16px; }
  .divider { height: 1px; background: var(--cream); margin: 16px 0; }
  .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .total-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--dust); }
  .total-amount { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: var(--saffron); }

  .pay-amount-box { background: var(--ink); padding: 24px; text-align: center; margin-bottom: 16px; }
  .pay-amount-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 4px; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 8px; }
  .pay-amount { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: var(--amber); line-height: 1; margin-bottom: 6px; }
  .pay-meta { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; }

  .upi-box { background: var(--cream); border: 1.5px solid var(--light-dust); padding: 16px; text-align: center; margin-bottom: 16px; }
  .upi-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--dust); margin-bottom: 6px; }
  .upi-id { font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; color: var(--ink); letter-spacing: 1px; }

  .qr-box { background: white; border: 1.5px solid var(--cream); padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 16px; }
  .qr-hint { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; color: var(--dust); text-align: center; }

  .or-divider { display: flex; align-items: center; gap: 12px; margin: 12px 0; }
  .or-divider::before, .or-divider::after { content: ''; flex: 1; height: 1px; background: var(--light-dust); }
  .or-text { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--dust); letter-spacing: 2px; text-transform: uppercase; }

  .processing-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; background: var(--ink); }
  .processing-spinner { width: 48px; height: 48px; border: 3px solid rgba(245,166,35,0.2); border-top-color: var(--amber); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .processing-text { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.5); }

  .ticket-wrap { margin-bottom: 20px; }
  .ticket-success-head { text-align: center; padding: 28px 0 24px; }
  .success-icon { width: 56px; height: 56px; background: var(--sage); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; font-size: 22px; }
  .success-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: var(--ink); margin-bottom: 6px; }
  .success-sub { font-size: 13px; color: var(--dust); }

  .ticket-card { background: var(--white); border: 1.5px solid var(--ink); overflow: hidden; box-shadow: 6px 6px 0 var(--ink); }
  .ticket-header { background: var(--saffron); padding: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
  .ticket-event-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: var(--white); line-height: 1.1; }
  .ticket-event-sub { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; color: rgba(255,255,255,0.7); margin-top: 4px; text-transform: uppercase; }
  .ticket-no-display { text-align: right; }
  .ticket-no-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 2px; color: rgba(255,255,255,0.6); text-transform: uppercase; }
  .ticket-no-val { font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500; color: var(--white); letter-spacing: 2px; }

  .ticket-body { padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ticket-field-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 2px; color: var(--dust); text-transform: uppercase; margin-bottom: 3px; }
  .ticket-field-val { font-size: 13px; font-weight: 500; color: var(--ink); }

  .ticket-footer { background: var(--cream); padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--light-dust); }
  .barcode { display: flex; gap: 2px; align-items: flex-end; height: 32px; }

  .confirm-box { background: var(--cream); border: 1.5px solid var(--light-dust); padding: 16px; margin-bottom: 16px; }
  .confirm-line { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; color: var(--dust); padding: 5px 0; border-bottom: 1px solid var(--light-dust); }
  .confirm-line:last-child { border-bottom: none; }
  .confirm-line strong { color: var(--ink); }
  .secure-note { text-align: center; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; color: var(--light-dust); text-transform: uppercase; margin-top: 12px; }

  /* ── BOOKING HISTORY ── */
  .history-empty {
    text-align: center;
    padding: 48px 20px;
    border: 1.5px dashed var(--light-dust);
    background: var(--white);
  }
  .history-empty-icon { font-size: 32px; margin-bottom: 12px; }
  .history-empty-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .history-empty-sub { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; color: var(--dust); }

  .history-summary {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 10px; margin-bottom: 20px;
  }
  .history-stat {
    background: var(--white); border: 1.5px solid var(--cream);
    padding: 14px 12px; text-align: center; position: relative;
  }
  .history-stat::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 100%; height: 3px; background: var(--saffron);
  }
  .history-stat-val { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: var(--ink); line-height: 1; }
  .history-stat-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: var(--dust); margin-top: 4px; }

  .history-list { display: flex; flex-direction: column; gap: 14px; }

  .history-card {
    background: var(--white);
    border: 1.5px solid var(--cream);
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .history-card:hover { box-shadow: 4px 4px 0 var(--light-dust); }

  .history-card-header {
    background: var(--ink); padding: 12px 16px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .history-card-event { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 900; color: var(--white); }
  .history-card-no { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--amber); letter-spacing: 2px; }

  .history-card-body { padding: 14px 16px; }
  .history-card-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 5px 0; border-bottom: 1px solid var(--cream);
  }
  .history-card-row:last-child { border-bottom: none; }
  .history-card-key { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--dust); }
  .history-card-val { font-size: 12px; font-weight: 500; color: var(--ink); }

  .history-card-footer {
    background: var(--cream); padding: 10px 16px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--light-dust);
  }
  .history-status {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--sage);
  }
  .history-status::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--sage);
  }
  .history-amount { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 900; color: var(--saffron); }

  .history-barcode { display: flex; gap: 2px; align-items: flex-end; height: 24px; }
`;

function PasswordField({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-wrap">
      <input className="field-input pw-input" type={show ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} />
      <button className="pw-toggle" onClick={() => setShow(!show)} type="button">{show ? "HIDE" : "SHOW"}</button>
    </div>
  );
}

function AuthPage({ onLogin, users, setUsers }) {
  const [tab, setTab] = useState("login");
  const [msg, setMsg] = useState(null);
  const [lEmail, setLEmail] = useState("");
  const [lPass, setLPass] = useState("");
  const [rFname, setRFname] = useState("");
  const [rLname, setRLname] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rDept, setRDept] = useState("");
  const [rPass, setRPass] = useState("");
  const [rPass2, setRPass2] = useState("");
  const switchTab = (t) => { setTab(t); setMsg(null); };

  const handleLogin = () => {
    if (!lEmail || !lPass) return setMsg({ text: "All fields required.", type: "error" });
    if (!lEmail.includes("@")) return setMsg({ text: "Invalid email address.", type: "error" });
    const user = users.find(u => u.email === lEmail && u.password === lPass);
    if (!user) return setMsg({ text: "Email or password incorrect.", type: "error" });
    setMsg({ text: `Welcome back, ${user.fname}.`, type: "success" });
    setTimeout(() => onLogin(user), 900);
  };

  const handleRegister = () => {
    if (!rFname || !rLname || !rEmail || !rDept || !rPass || !rPass2)
      return setMsg({ text: "All fields required.", type: "error" });
    if (!rEmail.includes("@")) return setMsg({ text: "Invalid email address.", type: "error" });
    if (rPass.length < 6) return setMsg({ text: "Password min 6 characters.", type: "error" });
    if (rPass !== rPass2) return setMsg({ text: "Passwords do not match.", type: "error" });
    if (users.find(u => u.email === rEmail)) return setMsg({ text: "Email already registered.", type: "error" });
    setUsers([...users, { fname: rFname, lname: rLname, email: rEmail, dept: rDept, password: rPass }]);
    setMsg({ text: "Account created. Redirecting…", type: "success" });
    setTimeout(() => switchTab("login"), 1200);
  };

  return (
    <div className="app">
      <div className="page-wrap">
        <div className="header-strip">Vel Tech University — Tech Fest 2026 — Limited Tickets</div>
        <div className="masthead">
          <div className="masthead-overline">Official Ticketing Portal</div>
          <div className="masthead-title">Tan<em>traz</em></div>
          <div className="masthead-sub">The Ultimate College Tech Extravaganza · 20 April 2026</div>
          <div className="masthead-rule" />
        </div>
        <div className="auth-eyebrow">{tab === "login" ? "Sign In" : "Create Account"}</div>
        <div className="tab-row">
          <button className={`tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>Sign In</button>
          <button className={`tab-btn ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>Register</button>
        </div>
        {tab === "login" && (
          <>
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input className="field-input" type="email" placeholder="you@college.edu" value={lEmail} onChange={e => setLEmail(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <PasswordField placeholder="Enter your password" value={lPass} onChange={e => setLPass(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={handleLogin}>Sign In →</button>
          </>
        )}
        {tab === "register" && (
          <>
            <div className="two-col">
              <div className="field-group">
                <label className="field-label">First Name</label>
                <input className="field-input" type="text" placeholder="Priya" value={rFname} onChange={e => setRFname(e.target.value)} />
              </div>
              <div className="field-group">
                <label className="field-label">Last Name</label>
                <input className="field-input" type="text" placeholder="Sharma" value={rLname} onChange={e => setRLname(e.target.value)} />
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input className="field-input" type="email" placeholder="you@college.edu" value={rEmail} onChange={e => setREmail(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Department</label>
              <input className="field-input" type="text" placeholder="e.g. CSE" value={rDept} onChange={e => setRDept(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <PasswordField placeholder="Create a password" value={rPass} onChange={e => setRPass(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Confirm Password</label>
              <PasswordField placeholder="Repeat password" value={rPass2} onChange={e => setRPass2(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={handleRegister}>Create Account →</button>
          </>
        )}
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <div className="helper-text">
          {tab === "login"
            ? <>No account? <span className="helper-link" onClick={() => switchTab("register")}>Register here</span></>
            : <>Have an account? <span className="helper-link" onClick={() => switchTab("login")}>Sign in</span></>}
        </div>
      </div>
    </div>
  );
}

/* ── BOOKING HISTORY PAGE ── */
function BookingHistoryPage({ user, bookingHistory, onLogout, onNav }) {
  const myBookings = bookingHistory.filter(b => b.userEmail === user.email);
  const totalTickets = myBookings.reduce((sum, b) => sum + b.tickets, 0);
  const totalSpent = myBookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="app">
      <div className="page-wrap">
        <div className="header-strip">Vel Tech University — Tech Fest 2026 — My Bookings</div>
        <div className="topbar">
          <div className="topbar-left">
            <div className="user-badge">Hi, <strong>{user.fname}</strong></div>
          </div>
          <button className="sign-out-btn" onClick={onLogout}>Sign Out</button>
        </div>

        <div className="nav-tabs">
          <button className="nav-tab" onClick={() => onNav("event")}>Event</button>
          <button className="nav-tab active">
            My Bookings
            {myBookings.length > 0 && <span className="nav-tab-badge">{myBookings.length}</span>}
          </button>
        </div>

        <div className="section-head">
          <div className="section-label">Booking History</div>
          <div className="section-rule" />
        </div>

        {myBookings.length === 0 ? (
          <div className="history-empty">
            <div className="history-empty-icon">🎟️</div>
            <div className="history-empty-title">No bookings yet</div>
            <div className="history-empty-sub">Your confirmed tickets will appear here</div>
            <div style={{ marginTop: 20 }}>
              <button className="btn-primary" onClick={() => onNav("event")}>Browse Event →</button>
            </div>
          </div>
        ) : (
          <>
            <div className="history-summary">
              <div className="history-stat">
                <div className="history-stat-val">{myBookings.length}</div>
                <div className="history-stat-label">Bookings</div>
              </div>
              <div className="history-stat">
                <div className="history-stat-val">{totalTickets}</div>
                <div className="history-stat-label">Tickets</div>
              </div>
              <div className="history-stat">
                <div className="history-stat-val">₹{totalSpent}</div>
                <div className="history-stat-label">Spent</div>
              </div>
            </div>

            <div className="history-list">
              {myBookings.map((b, i) => (
                <div className="history-card" key={b.ticketNo}>
                  <div className="history-card-header">
                    <div className="history-card-event">{EVENT.name}</div>
                    <div className="history-card-no">{b.ticketNo}</div>
                  </div>
                  <div className="history-card-body">
                    <div className="history-card-row">
                      <span className="history-card-key">Name</span>
                      <span className="history-card-val">{b.name}</span>
                    </div>
                    <div className="history-card-row">
                      <span className="history-card-key">Department</span>
                      <span className="history-card-val">{b.department}</span>
                    </div>
                    <div className="history-card-row">
                      <span className="history-card-key">Date</span>
                      <span className="history-card-val">{EVENT.date} · {EVENT.time}</span>
                    </div>
                    <div className="history-card-row">
                      <span className="history-card-key">Venue</span>
                      <span className="history-card-val">{EVENT.venue}</span>
                    </div>
                    <div className="history-card-row">
                      <span className="history-card-key">Seats</span>
                      <span className="history-card-val">{b.tickets} seat{b.tickets > 1 ? "s" : ""}</span>
                    </div>
                    <div className="history-card-row">
                      <span className="history-card-key">Booked On</span>
                      <span className="history-card-val">{b.bookedOn}</span>
                    </div>
                  </div>
                  <div className="history-card-footer">
                    <div className="history-status">Confirmed</div>
                    <div className="history-amount">₹{b.amount.toLocaleString("en-IN")}</div>
                    <div className="history-barcode">
                      {[8, 14, 6, 20, 10, 16, 6, 14, 8, 12, 18].map((h, j) => (
                        <div key={j} style={{ width: 3, height: h, background: `rgba(232,130,12,${0.3 + (j % 3) * 0.2})`, borderRadius: 1 }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 8 }}>
              <button className="btn-secondary" onClick={() => onNav("event")}>← Back to Event</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EventDetailsPage({ user, onBook, onLogout, onNav, bookingHistory }) {
  const myBookings = bookingHistory.filter(b => b.userEmail === user.email);
  return (
    <div className="app">
      <div className="page-wrap">
        <div className="header-strip">Vel Tech University — Tech Fest 2026 — Limited Tickets</div>
        <div className="topbar">
          <div className="topbar-left">
            <div className="user-badge">Signed in as <strong>{user.fname} {user.lname}</strong></div>
          </div>
          <button className="sign-out-btn" onClick={onLogout}>Sign Out</button>
        </div>

        <div className="nav-tabs">
          <button className="nav-tab active">Event</button>
          <button className="nav-tab" onClick={() => onNav("history")}>
            My Bookings
            {myBookings.length > 0 && <span className="nav-tab-badge">{myBookings.length}</span>}
          </button>
        </div>

        <div className="event-hero">
          <div className="hero-badge">✦ Tech Fest 2026</div>
          <div className="hero-name">{EVENT.name}</div>
          <div className="hero-tagline">{EVENT.tagline}</div>
          <div className="tags-row">
            {EVENT.highlights.map(h => <span key={h} className="tag">{h}</span>)}
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">Date & Time</div>
            <div className="info-main">{EVENT.date}</div>
            <div className="info-sub">{EVENT.day}</div>
            <div className="info-accent">{EVENT.time}</div>
          </div>
          <div className="info-card">
            <div className="info-icon">Venue</div>
            <div className="info-main">{EVENT.venue}</div>
            <div className="info-sub">{EVENT.college}</div>
          </div>
        </div>

        <div className="section-head">
          <div className="section-label">Schedule</div>
          <div className="section-rule" />
        </div>
        <div className="schedule-list">
          {EVENT.schedule.map((item, i) => (
            <div key={i} className="schedule-item">
              <div className="sched-num">{item.icon}</div>
              <div className="sched-content">
                <div className="sched-title">{item.title}</div>
                <div className="sched-time">{item.time}</div>
              </div>
              {i === 0 && <div className="sched-badge">Opening</div>}
            </div>
          ))}
        </div>

        <div className="cta-box">
          <div>
            <div className="cta-price">₹100 <span>/ ticket</span></div>
            <div className="cta-seats">Only {TOTAL_TICKETS} seats available</div>
          </div>
          <div className="cta-btn-wrap">
            <button className="btn-primary" onClick={onBook}>Book Tickets →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingPage({ user, onPayment, onLogout, ticketsLeft }) {
  const [form, setForm] = useState({
    name: `${user.fname} ${user.lname}`,
    email: user.email,
    department: user.dept || "",
    tickets: "",
  });
  const [msg, setMsg] = useState(null);
  const tix = parseInt(form.tickets) || 0;
  const subtotal = tix * PRICE;
  const pct = (ticketsLeft / TOTAL_TICKETS) * 100;
  const fillColor = pct <= 20 ? "#c0440a" : pct <= 50 ? "#e8820c" : "#4a7c59";
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleProceed = () => {
    if (!form.name || !form.email || !form.department || !form.tickets)
      return setMsg({ text: "All fields required.", type: "error" });
    if (!form.email.includes("@")) return setMsg({ text: "Invalid email.", type: "error" });
    if (!tix || tix <= 0) return setMsg({ text: "Enter a valid ticket count.", type: "error" });
    if (tix > ticketsLeft) return setMsg({ text: `Only ${ticketsLeft} tickets left.`, type: "error" });
    onPayment({ ...form, tickets: tix, amount: subtotal });
  };

  return (
    <div className="app">
      <div className="page-wrap">
        <div className="header-strip">Vel Tech University — Tech Fest 2026 — Limited Tickets</div>
        <div className="topbar">
          <button className="btn-back" onClick={() => onLogout("back")}>← Back</button>
          <button className="sign-out-btn" onClick={onLogout}>Sign Out</button>
        </div>
        <div className="section-head">
          <div className="section-label">Book Tickets</div>
          <div className="section-rule" />
        </div>
        <div className="avail-box">
          <div className="avail-row">
            <div className="avail-label">Tickets Available</div>
            <div className="avail-count" style={{ color: fillColor }}>{ticketsLeft} <span style={{ fontSize: 13, color: "var(--dust)", fontFamily: "DM Mono" }}>/ {TOTAL_TICKETS}</span></div>
          </div>
          <div className="avail-track">
            <div className="avail-fill" style={{ width: `${pct}%`, background: fillColor }} />
          </div>
        </div>
        <div className="form-card">
          <div className="section-head" style={{ marginBottom: 20 }}>
            <div className="section-label">Your Details</div>
            <div className="section-rule" />
          </div>
          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input className="field-input" type="text" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input className="field-input" type="email" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label className="field-label">Department</label>
              <input className="field-input" type="text" name="department" placeholder="CSE" value={form.department} onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="field-label">No. of Tickets</label>
              <input className="field-input" type="number" name="tickets" placeholder="1" min="1" max={ticketsLeft} value={form.tickets} onChange={handleChange} />
            </div>
          </div>
          <div className="divider" />
          <div className="total-row">
            <div>
              <div className="total-label">Total Amount</div>
              <div style={{ fontSize: 11, color: "var(--dust)", fontFamily: "DM Mono", marginTop: 2 }}>{tix} ticket{tix !== 1 ? "s" : ""} × ₹{PRICE}</div>
            </div>
            <div className="total-amount">₹{subtotal.toLocaleString("en-IN")}</div>
          </div>
          <button className="btn-primary" onClick={handleProceed}>Proceed to Payment →</button>
          {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        </div>
      </div>
    </div>
  );
}

function UpiPaymentPage({ booking, onSuccess, onBack }) {
  const [processing, setProcessing] = useState(false);
  const [upiRef, setUpiRef] = useState("");
  const [err, setErr] = useState(null);
  const txnId = useState(() => "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase())[0];

  const handleConfirm = () => {
    setErr(null);
    if (upiRef.trim().length < 4) return setErr("Enter a valid UPI reference / transaction ID.");
    setProcessing(true);
    setTimeout(() => { onSuccess(); }, 2500);
  };

  if (processing) return (
    <div className="app">
      <div className="processing-screen">
        <div className="processing-spinner" />
        <div className="processing-text">Verifying payment</div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="page-wrap">
        <div className="header-strip">Vel Tech University — Tech Fest 2026 — Secure Payment</div>
        <div className="topbar">
          <button className="btn-back" onClick={onBack}>← Back</button>
        </div>
        <div className="pay-amount-box">
          <div className="pay-amount-label">Amount to Pay</div>
          <div className="pay-amount">₹{booking.amount.toLocaleString("en-IN")}</div>
          <div className="pay-meta">{booking.tickets} ticket{booking.tickets > 1 ? "s" : ""} · {booking.name}</div>
          <div className="pay-meta" style={{ marginTop: 4 }}>Order: {txnId}</div>
        </div>
        <div className="qr-box">
          <svg width="140" height="140" viewBox="0 0 130 130">
            {[...Array(13)].map((_, r) =>
              [...Array(13)].map((__, c) => {
                const corner = (r < 4 && c < 4) || (r < 4 && c > 8) || (r > 8 && c < 4);
                if (corner) return null;
                const fill = ((r * 7 + c * 3) % 5 > 2) ? "#1a1209" : "none";
                return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="9" height="9" rx="1" fill={fill} />;
              })
            )}
            {[[0, 0], [0, 9], [9, 0]].map(([r, c]) => (
              <g key={`${r}-${c}`}>
                <rect x={c * 10} y={r * 10} width="39" height="39" rx="3" fill="#1a1209" />
                <rect x={c * 10 + 5} y={r * 10 + 5} width="29" height="29" rx="1" fill="white" />
                <rect x={c * 10 + 10} y={r * 10 + 10} width="19" height="19" rx="1" fill="#e8820c" />
              </g>
            ))}
          </svg>
          <div className="qr-hint">Scan with any UPI app · GPay · PhonePe · Paytm</div>
        </div>
        <div className="or-divider"><span className="or-text">or pay via UPI ID</span></div>
        <div className="upi-box">
          <div className="upi-label">UPI ID</div>
          <div className="upi-id">{EVENT.upiId}</div>
        </div>
        <div className="form-card">
          <div className="field-group">
            <label className="field-label">UPI Reference / Transaction ID</label>
            <input className="field-input" type="text" placeholder="e.g. 123456789012" value={upiRef} onChange={e => setUpiRef(e.target.value)} />
            <div style={{ marginTop: 6, fontFamily: "DM Mono", fontSize: 10, color: "var(--dust)", letterSpacing: 1 }}>
              Find this in your UPI app after payment is complete.
            </div>
          </div>
          <button className="btn-saffron" onClick={handleConfirm}>Confirm Payment ✓</button>
          {err && <div className="alert alert-error" style={{ marginTop: 12 }}>{err}</div>}
        </div>
        <div className="secure-note">⚿ Secure · Encrypted · Verified</div>
      </div>
    </div>
  );
}

function TicketPage({ booking, onDone, onViewHistory }) {
  return (
    <div className="app">
      <div className="page-wrap">
        <div className="header-strip">Vel Tech University — Booking Confirmed ✓</div>
        <div className="ticket-success-head">
          <div className="success-icon">✓</div>
          <div className="success-title">Booking Confirmed!</div>
          <div className="success-sub">Your ticket is ready. See you at Tantraz 2k26!</div>
        </div>
        <div className="ticket-wrap">
          <div className="ticket-card">
            <div className="ticket-header">
              <div>
                <div className="ticket-event-name">{EVENT.name}</div>
                <div className="ticket-event-sub">Admission Ticket</div>
              </div>
              <div className="ticket-no-display">
                <div className="ticket-no-label">Ticket No.</div>
                <div className="ticket-no-val">{booking.ticketNo}</div>
              </div>
            </div>
            <div className="ticket-body">
              {[
                { label: "Name", value: booking.name },
                { label: "Department", value: booking.department },
                { label: "Date", value: EVENT.date },
                { label: "Time", value: EVENT.time },
                { label: "Venue", value: EVENT.venue },
                { label: "Tickets", value: `${booking.tickets} seat${booking.tickets > 1 ? "s" : ""}` },
                { label: "Amount Paid", value: `₹${booking.amount.toLocaleString("en-IN")}` },
                { label: "Booked On", value: booking.bookedOn },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="ticket-field-label">{label}</div>
                  <div className="ticket-field-val">{value}</div>
                </div>
              ))}
            </div>
            <div className="ticket-footer">
              <div>
                <div className="ticket-field-label">Scan at Entry</div>
                <div style={{ fontFamily: "DM Mono", fontSize: 12, color: "var(--dust)", letterSpacing: 1 }}>{booking.ticketNo}</div>
              </div>
              <div className="barcode">
                {[10, 16, 8, 24, 12, 20, 8, 18, 10, 14, 22, 8, 12, 18].map((h, i) => (
                  <div key={i} style={{ width: 3, height: h, background: `rgba(232,130,12,${0.4 + (i % 3) * 0.2})`, borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="confirm-box">
          <div className="confirm-line">📧 Confirmation → <strong>{booking.email}</strong></div>
          <div className="confirm-line">📍 <strong>{EVENT.college}</strong>, {EVENT.city}</div>
          <div className="confirm-line">📅 <strong>{EVENT.date}</strong> · {EVENT.time}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn-saffron" onClick={onViewHistory}>View All My Bookings →</button>
          <button className="btn-secondary" onClick={onDone}>← Back to Event</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("event");
  const [booking, setBooking] = useState(null);
  const [ticketsLeft, setTicketsLeft] = useState(TOTAL_TICKETS);
  // bookingHistory stores ALL confirmed bookings across sessions
  const [bookingHistory, setBookingHistory] = useState([]);

  const handleSuccess = () => {
    const ticketNo = "T-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const bookedOn = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const confirmedBooking = {
      ...booking,
      ticketNo,
      bookedOn,
      userEmail: currentUser.email,
    };
    setBookingHistory(prev => [...prev, confirmedBooking]);
    setBooking(confirmedBooking);
    setTicketsLeft(t => t - booking.tickets);
    setPage("ticket");
  };

  return (
    <>
      <style>{styles}</style>
      {!currentUser && (
        <AuthPage onLogin={setCurrentUser} users={users} setUsers={setUsers} />
      )}
      {currentUser && page === "event" && (
        <EventDetailsPage
          user={currentUser}
          onBook={() => setPage("booking")}
          onLogout={() => setCurrentUser(null)}
          onNav={setPage}
          bookingHistory={bookingHistory}
        />
      )}
      {currentUser && page === "history" && (
        <BookingHistoryPage
          user={currentUser}
          bookingHistory={bookingHistory}
          onLogout={() => setCurrentUser(null)}
          onNav={setPage}
        />
      )}
      {currentUser && page === "booking" && (
        <BookingPage
          user={currentUser}
          ticketsLeft={ticketsLeft}
          onPayment={data => { setBooking(data); setPage("payment"); }}
          onLogout={x => x === "back" ? setPage("event") : setCurrentUser(null)}
        />
      )}
      {currentUser && page === "payment" && (
        <UpiPaymentPage
          booking={booking}
          onBack={() => setPage("booking")}
          onSuccess={handleSuccess}
        />
      )}
      {currentUser && page === "ticket" && (
        <TicketPage
          booking={booking}
          user={currentUser}
          onDone={() => setPage("event")}
          onViewHistory={() => setPage("history")}
        />
      )}
    </>
  );
}