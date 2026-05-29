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
