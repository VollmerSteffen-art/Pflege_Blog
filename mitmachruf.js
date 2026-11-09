
(function(){
  var ruf=document.getElementById('mr-ruf'), stage=document.getElementById('mr-stage');
  var eq=document.getElementById('mr-eq'), chev=document.getElementById('mr-chev');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile=function(){return innerWidth<=860};

  // Equalizer-Balken
  var bars=[]; for(var i=0;i<30;i++){var b=document.createElement('b');eq.appendChild(b);bars.push(b)}
  // Pfeile (Markenzeichen von Pflege weitergedacht)
  var chevs=[]; for(var j=0;j<6;j++){chevs.push(chev.appendChild(Object.assign(document.createElementNS('http://www.w3.org/2000/svg','svg'),{})))}
  chevs.forEach(function(s){s.setAttribute('viewBox','0 0 40 60');s.innerHTML='<path d="M8 6l24 24-24 24"/>'});

  var fills=document.querySelectorAll('.mr-fill'), lastP=-1;
  function render(p){
    if(Math.abs(p-lastP)<0.002&&p!==0&&p!==1)return; lastP=p;
    stage.style.setProperty('--p',p.toFixed(4));
    var e=Math.min(1,.18+p*1.6);
    bars.forEach(function(b,i){
      var w=.5+.5*Math.sin(i*.55+p*16);
      b.style.transform='scaleY('+(.14+.86*e*(.25+.75*w)).toFixed(3)+')';
    });
    var n=Math.round(p*chevs.length*1.15);
    chevs.forEach(function(s,i){s.classList.toggle('mr-on',i<n)});
    // Wörter füllen sich zwischen 8 % und 55 %
    var f=Math.max(0,Math.min(1,(p-.06)/.42));
    stage.style.setProperty('--f',f.toFixed(3));
    fills.forEach(function(el){el.style.setProperty('--f',f.toFixed(3))});
  }
  function onScroll(){
    if(reduce){render(.7);return}
    if(mobile()){return}
    var r=ruf.getBoundingClientRect(), max=r.height-innerHeight;
    if(r.bottom<-200||r.top>innerHeight+200)return;
    var p=Math.max(0,Math.min(1,-r.top/max));
    render(p);
  }
  var tick=false;
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;onScroll()})}},{passive:true});
  addEventListener('resize',onScroll);
  onScroll();

  // Handy: jede Hälfte beim Einblenden
  var io=new IntersectionObserver(function(es){es.forEach(function(x){
    if(x.isIntersecting){x.target.classList.add('mr-vis');
      if(mobile()){var t=0;var h=x.target;var iv=setInterval(function(){t+=.04;render(Math.min(1,t));if(t>=1)clearInterval(iv)},30);
        h.querySelectorAll('.mr-sc').forEach(function(el,k){el.style.transitionDelay=(k*90)+'ms'})}
    }})},{threshold:.25});
  document.querySelectorAll('[data-half]').forEach(function(h){io.observe(h)});
  setTimeout(function(){stage.classList.remove('mr-boot')},1500);
})();
