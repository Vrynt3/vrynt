// Progress bar
var pb=document.querySelector('.progress-bar');
if(pb){window.addEventListener('scroll',function(){var h=document.documentElement;var pct=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;pb.style.width=pct+'%'})}

// Mobile menu
var mt=document.querySelector('.menu-toggle');
var nl=document.querySelector('.nav-links');
if(mt&&nl){mt.addEventListener('click',function(){nl.classList.toggle('open');mt.textContent=nl.classList.contains('open')?'✕':'☰'})}

// Back to top
var bt=document.querySelector('.back-top');
if(bt){window.addEventListener('scroll',function(){if(window.scrollY>400){bt.classList.add('show')}else{bt.classList.remove('show')}});bt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}

// Copy link
document.querySelectorAll('.share-copy').forEach(function(b){b.addEventListener('click',function(){navigator.clipboard.writeText(window.location.href);b.textContent='Copied!';setTimeout(function(){b.textContent='Copy link'},2000)})});

// TradingView Ticker Widget
(function(){
  var wrap=document.createElement('div');
  wrap.className='tv-ticker-wrap';
  var container=document.createElement('div');
  container.className='tradingview-widget-container';
  var widgetDiv=document.createElement('div');
  widgetDiv.className='tradingview-widget-container__widget';
  container.appendChild(widgetDiv);
  wrap.appendChild(container);
  var nav=document.querySelector('nav');
  if(nav)nav.parentNode.insertBefore(wrap,nav.nextSibling);

  var script=document.createElement('script');
  script.type='text/javascript';
  script.src='https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async=true;
  script.innerHTML=JSON.stringify({
    "symbols":[
      {"proName":"FOREXCOM:SPXUSD","title":"S&P 500"},
      {"proName":"FOREXCOM:DJI","title":"Dow 30"},
      {"proName":"BITSTAMP:BTCUSD","title":"Bitcoin"},
      {"proName":"BITSTAMP:ETHUSD","title":"Ethereum"},
      {"proName":"FOREXCOM:NSXUSD","title":"Nasdaq"},
      {"description":"Gold","proName":"TVC:GOLD"}
    ],
    "showSymbolLogo":false,
    "isTransparent":true,
    "displayMode":"regular",
    "colorTheme":"dark",
    "locale":"en"
  });
  container.appendChild(script);
})();

// Auto-inject CTA on article pages
(function(){
  var art=document.querySelector('article');
  if(!art)return;
  var path=window.location.pathname;

  var cta='';
  if(path.indexOf('/cars/')>-1){
    cta='<div class="article-cta"><h3>Planning to buy a car?</h3><p>Run the real numbers before you walk into the dealership.</p><a href="/tools/car-affordability-calculator/" class="cta-btn">Try the Car Affordability Calculator →</a></div>';
  }else if(path.indexOf('/investing/')>-1){
    cta='<div class="article-cta"><h3>How much are fees costing you?</h3><p>The difference between a high-fee fund and an index fund can be six figures. See your number.</p><a href="/tools/fee-calculator/" class="cta-btn">Try the 401(k) Fee Calculator →</a></div>';
  }else if(path.indexOf('/crypto/')>-1){
    cta='<div class="article-cta"><h3>Got a plan for taking profits?</h3><p>A sell ladder takes the emotion out of the hardest decision in crypto.</p><a href="/crypto/bitcoin-sell-ladder/" class="cta-btn">Read: How to Build a Sell Ladder →</a></div>';
  }else if(path.indexOf('/money/')>-1){
    cta='<div class="article-cta"><h3>Want to get your money right?</h3><p>Start with the foundation — an emergency fund and a budget that actually works.</p><a href="/money/budgeting-guide/" class="cta-btn">Read: Budgeting Guide →</a></div>';
  }

  if(cta){
    var div=document.createElement('div');
    div.innerHTML=cta;
    var shareBar=art.querySelector('.share-bar');
    if(shareBar){art.insertBefore(div.firstChild,shareBar)}
    else{art.appendChild(div.firstChild)}
  }

  var text=art.textContent||'';
  var hasProducts=text.match(/Fidelity|Vanguard|Schwab|Coinbase|Kraken|CarMax|KBB|Kelley Blue Book|Marcus|Ally Bank|Capital One|Credit Karma/i);
  if(hasProducts){
    var disc=document.createElement('p');
    disc.className='affiliate-note';
    disc.textContent='Some links in this article may be affiliate links. If you sign up or make a purchase through them, Vrynt may earn a small commission at no extra cost to you. We only recommend products and services we genuinely believe in.';
    art.appendChild(disc);
  }
})();
