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

// Market Ticker Bar
(function(){
  var bar=document.createElement('div');
  bar.className='market-bar';
  bar.innerHTML='<div class="market-scroll"></div>';
  var nav=document.querySelector('nav');
  if(nav)nav.parentNode.insertBefore(bar,nav.nextSibling);

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,dogecoin&order=market_cap_desc&sparkline=true&price_change_percentage=24h')
    .then(function(r){return r.json()})
    .then(function(coins){
      var scroll=bar.querySelector('.market-scroll');
      scroll.innerHTML='';
      coins.forEach(function(coin){
        var change=coin.price_change_percentage_24h||0;
        var color=change>=0?'#22c55e':'#ef4444';
        var arrow=change>=0?'▲':'▼';
        var price=coin.current_price;
        var priceStr=price>=1000?'$'+price.toLocaleString('en-US',{maximumFractionDigits:0}):'$'+price.toFixed(2);
        var changeStr=arrow+' '+Math.abs(change).toFixed(2)+'%';
        var sym=coin.symbol.toUpperCase();

        var item=document.createElement('div');
        item.className='market-item';
        item.innerHTML=
          '<div class="mi-left">'+
            '<span class="mi-name">'+sym+'</span>'+
            '<span class="mi-price">'+priceStr+'</span>'+
            '<span class="mi-change" style="color:'+color+'">'+changeStr+'</span>'+
          '</div>'+
          '<canvas class="mi-spark" width="60" height="24"></canvas>';
        scroll.appendChild(item);

        // Draw sparkline
        var canvas=item.querySelector('.mi-spark');
        var ctx=canvas.getContext('2d');
        var data=coin.sparkline_in_7d?coin.sparkline_in_7d.price.slice(-48):[];
        if(data.length>1){
          var min=Math.min.apply(null,data);
          var max=Math.max.apply(null,data);
          var range=max-min||1;
          ctx.strokeStyle=color;
          ctx.lineWidth=1.5;
          ctx.beginPath();
          data.forEach(function(v,i){
            var x=(i/(data.length-1))*60;
            var y=24-((v-min)/range)*20-2;
            i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
          });
          ctx.stroke();
        }
      });
    })
    .catch(function(){bar.style.display='none'});
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
