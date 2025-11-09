// animations.js — attach click handlers to section headings and trigger different animations
(function(){
  function pickAnim(){
    var arr=['anim-fade','anim-slide-left','anim-zoom','anim-rotate'];
    return arr[Math.floor(Math.random()*arr.length)];
  }

  function applyAnim(target, cls){
    if(!target) return;
    // add class to target or its children and remove after animation
    target.classList.add('anim-target');
    // prefer animating direct children cards if present
    var elems = target.querySelectorAll('.card');
    if(elems.length===0){ elems = [target]; }
    elems.forEach(function(el, i){
      // stagger slightly
      setTimeout(function(){
        el.classList.remove('anim-target');
        el.classList.add(cls);
        function cleanup(){ el.classList.remove(cls); el.removeEventListener('animationend',cleanup); }
        el.addEventListener('animationend', cleanup);
      }, i*80);
    });
  }

  // attach to h3/h4 headings inside sections
  var headings = document.querySelectorAll('section h3, section h4');
  headings.forEach(function(h){
    h.style.cursor = 'pointer';
    h.title = 'Click to animate this section';
    h.addEventListener('click', function(e){
      // try to find a target container: next sibling with .projects or .work-gallery or .card list
      var target = h.nextElementSibling || h.parentElement.querySelector('.projects') || h.parentElement.querySelector('.work-gallery') || h.parentElement;
      var cls = pickAnim();
      applyAnim(target, cls);
    });
  });

})();
