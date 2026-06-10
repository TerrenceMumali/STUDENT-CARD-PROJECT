// ─── STATE MANAGEMENT ───
let current = 0;
const TOTAL = 14;
const slides = document.querySelectorAll('.slide');
let walletBal = 500;
let demoRunning = false;

// ─── NAV ENGINE ───
function show(n) {
  slides[current].classList.remove('active');
  slides[current].classList.add('exit');
  setTimeout(() => slides[current < TOTAL ? current : current].classList.remove('exit'), 500);

  const prev_idx = current;
  current = n;

  setTimeout(() => slides[prev_idx].classList.remove('exit'), 520);
  slides[current].classList.add('active');

  document.getElementById('progress').style.width = ((current + 1) / TOTAL * 100) + '%';
  document.getElementById('slide-counter').textContent = (current + 1) + ' / ' + TOTAL;

  if (current === 9) resetDemo();
}

function next() { if (current < TOTAL - 1) show(current + 1); }
function prev() { if (current > 0) show(current - 1); }

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

// ─── SIMULATION: LIVE DEMO ENGINE ───
function resetDemo() {
  demoRunning = false;
  ['ds1','ds2','ds3','ds4'].forEach(id => document.getElementById(id).classList.remove('show'));
  document.getElementById('tapBtn').classList.remove('pulsing');
  document.getElementById('demo-hint').textContent = 'Click to simulate an NFC tap';
}

function runDemo() {
  if (demoRunning) return;
  demoRunning = true;
  const btn = document.getElementById('tapBtn');
  btn.classList.add('pulsing');
  document.getElementById('demo-hint').textContent = 'Processing Unified Card Pass…';
  const steps = ['ds1','ds2','ds3','ds4'];
  steps.forEach((id, i) => {
    setTimeout(() => {
      document.getElementById(id).classList.add('show');
      if (i === steps.length - 1) {
        btn.classList.remove('pulsing');
        document.getElementById('demo-hint').textContent = 'Tap again to verify ecosystem logs';
        demoRunning = false;
      }
    }, 400 + i * 500);
  });
}

// ─── SIMULATION: STUDENT DIGITAL WALLET ───
function buyItem(name, amount, emoji) {
  if (walletBal < amount) {
    document.getElementById('wallet-feedback').textContent = '❌ Insufficient balance!';
    setTimeout(() => document.getElementById('wallet-feedback').textContent = '', 2000);
    return;
  }
  walletBal -= amount;
  document.getElementById('wallet-num').textContent = walletBal;
  document.getElementById('wallet-feedback').textContent = `✅ ${name} purchased successfully!`;
  addTx(emoji, name, '-KES ' + amount, false);
  setTimeout(() => document.getElementById('wallet-feedback').textContent = '', 2000);
}

function topUp() {
  walletBal += 200;
  document.getElementById('wallet-num').textContent = walletBal;
  document.getElementById('wallet-feedback').textContent = '💳 Top up successful!';
  addTx('💳', 'Top Up', '+KES 200', true);
  setTimeout(() => document.getElementById('wallet-feedback').textContent = '', 2000);
}

function addTx(icon, name, amt, isPos) {
  const list = document.getElementById('wallet-tx-list');
  const div = document.createElement('div');
  div.className = 'tx-item';
  div.style.opacity = '0';
  div.style.transition = 'opacity .4s';
  div.innerHTML = `<div class="tx-icon">${icon}</div><div class="tx-info"><strong>${name}</strong><span>Just now</span></div><div class="tx-amt ${isPos?'pos':'neg'}">${amt}</div>`;
  list.prepend(div);
  setTimeout(() => div.style.opacity = '1', 50);
  while (list.children.length > 4) list.removeChild(list.lastChild);
}

// ─── MODAL CONTROLLERS (TEACHER, PARENT, LIBRARY, SPORTS) ───
function openDash() { document.getElementById('modal').classList.add('open'); }
function closeDash() { document.getElementById('modal').classList.remove('open'); }

function openParentDash() { document.getElementById('parentModal').classList.add('open'); }
function closeParentDash() { document.getElementById('parentModal').classList.remove('open'); }

function openLibDash() { document.getElementById('libraryModal').classList.add('open'); }
function closeLibDash() { document.getElementById('libraryModal').classList.remove('open'); }

function openSportsDash() { document.getElementById('sportsModal').classList.add('open'); }
function closeSportsDash() { document.getElementById('sportsModal').classList.remove('open'); }

function updateLimitValue(val) {
  document.getElementById('limitValDisplay').textContent = 'KES ' + val + '.00';
}

// Global dismiss interceptor
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('open');
  }
});
