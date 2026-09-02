(function(){var r=document.getElementById('vk-tracker'); if(!r) return; r.innerHTML="<style>\n#vk-tracker{--ink:#1C1F22;--soft:#5b6469;--rule:#dfe3e5;--accent:#0E5E56;--accent-soft:#e2efec;--warn:#b7791f;--warn-soft:#fbf1dc;--bad:#a33526;--bad-soft:#f6e3df;--ok:#2f6b3a;--ok-soft:#e2efe4;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Helvetica,Arial,sans-serif;color:var(--ink);max-width:720px;margin:0 auto;padding:8px 0 40px;line-height:1.45}\n#vk-tracker *{box-sizing:border-box}\n#vk-tracker h2{font-size:1.5rem;margin:0 0 4px}\n#vk-tracker .sub{color:var(--soft);margin:0 0 18px;font-size:.95rem}\n#vk-tracker .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px}\n#vk-tracker select,#vk-tracker input,#vk-tracker button{font:inherit;padding:8px 10px;border:1px solid var(--rule);border-radius:8px;background:#fff;color:var(--ink)}\n#vk-tracker button{cursor:pointer}\n#vk-tracker button.primary{background:var(--accent);color:#fff;border-color:var(--accent)}\n#vk-tracker button.ghost{background:transparent}\n#vk-tracker .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px}\n#vk-tracker .sock{border:1px solid var(--rule);border-radius:10px;padding:8px;min-height:84px;cursor:pointer;background:#fff;position:relative;transition:transform .08s}\n#vk-tracker .sock:hover{transform:translateY(-1px);border-color:#b9c2c6}\n#vk-tracker .sock .n{font-size:.7rem;color:var(--soft);font-weight:600;letter-spacing:.04em}\n#vk-tracker .sock .lbl{font-weight:600;font-size:.9rem;margin:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#vk-tracker .sock .d{font-size:.75rem;color:var(--soft)}\n#vk-tracker .sock.empty{background:#fafbfb;border-style:dashed}\n#vk-tracker .sock.empty .lbl{color:#9aa4a8;font-weight:400}\n#vk-tracker .sock.ok{background:var(--ok-soft);border-color:#bcd8c1}\n#vk-tracker .sock.warn{background:var(--warn-soft);border-color:#ecd39a}\n#vk-tracker .sock.bad{background:var(--bad-soft);border-color:#e6b3aa}\n#vk-tracker .pill{position:absolute;top:6px;right:6px;font-size:.66rem;font-weight:700;padding:2px 6px;border-radius:99px;background:#fff;border:1px solid var(--rule)}\n#vk-tracker .sock.ok .pill{color:var(--ok)} #vk-tracker .sock.warn .pill{color:var(--warn)} #vk-tracker .sock.bad .pill{color:var(--bad)}\n#vk-tracker .legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.8rem;color:var(--soft);margin:12px 0 0}\n#vk-tracker .legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px}\n#vk-tracker .modal{position:fixed;inset:0;background:rgba(20,24,26,.45);display:none;align-items:center;justify-content:center;z-index:9999;padding:16px}\n#vk-tracker .modal.open{display:flex}\n#vk-tracker .card{background:#fff;border-radius:14px;padding:20px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.25)}\n#vk-tracker .card h3{margin:0 0 12px;font-size:1.1rem}\n#vk-tracker .row{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}\n#vk-tracker .row label{font-size:.8rem;color:var(--soft);font-weight:600}\n#vk-tracker .row input,#vk-tracker .row select{width:100%}\n#vk-tracker .actions{display:flex;gap:8px;justify-content:space-between;margin-top:14px}\n#vk-tracker .note{font-size:.78rem;color:var(--soft);margin-top:18px;border-top:1px solid var(--rule);padding-top:12px}\n#vk-tracker .hint{font-size:.8rem;color:var(--soft)}\n@media print{#vk-tracker .bar,#vk-tracker .note,#vk-tracker .legend{display:none}}\n</style>\n\n<h2>VialHaus Date Tracker</h2>\n<p class=\"sub\">One socket, one vial, one date. Tap a socket to log what went in and when it should come out. Saved on this device only, nothing is sent anywhere.</p>\n\n<div class=\"bar\">\n  <label class=\"hint\">Case\n    <select id=\"vk-case\">\n      <option value=\"15\">VialHaus 15</option>\n      <option value=\"24\">VialHaus 26 Protocol (24 + 2 bays)</option>\n      <option value=\"30\">VialHaus 30</option>\n    </select>\n  </label>\n  <label class=\"hint\">Default days until out\n    <input id=\"vk-days\" type=\"number\" min=\"1\" max=\"365\" value=\"28\" style=\"width:74px\">\n  </label>\n  <button class=\"ghost\" id=\"vk-print\">Print</button>\n  <button class=\"ghost\" id=\"vk-export\">Copy as text</button>\n  <button class=\"ghost\" id=\"vk-clear\">Clear all</button>\n</div>\n\n<div class=\"grid\" id=\"vk-grid\"></div>\n<div class=\"legend\">\n  <span><i style=\"background:#2f6b3a\"></i>More than 7 days left</span>\n  <span><i style=\"background:#b7791f\"></i>7 days or fewer</span>\n  <span><i style=\"background:#a33526\"></i>Past the out date</span>\n  <span><i style=\"background:#cfd5d8\"></i>Empty</span>\n</div>\n\n<div class=\"note\">\n  Tip: order the case left to right by out date, so the next vial to retire is always at the far right. The \"days until out\" default is whatever you decide it should be; VialHaus does not give storage or dosing guidance. Bookmark this page. Add it to your phone home screen for a one-tap check.\n</div>\n\n<div class=\"modal\" id=\"vk-modal\">\n  <div class=\"card\">\n    <h3 id=\"vk-mtitle\">Socket 1</h3>\n    <div class=\"row\"><label>Contents (any name you like)</label><input id=\"vk-f-label\" placeholder=\"e.g. Vial A, blue cap, batch 3\"></div>\n    <div class=\"row\"><label>Went in on</label><input id=\"vk-f-in\" type=\"date\"></div>\n    <div class=\"row\"><label>Out by</label><input id=\"vk-f-out\" type=\"date\"></div>\n    <div class=\"row\"><label>Note</label><input id=\"vk-f-note\" placeholder=\"optional\"></div>\n    <div class=\"actions\">\n      <button class=\"ghost\" id=\"vk-f-empty\">Empty socket</button>\n      <span>\n        <button class=\"ghost\" id=\"vk-f-cancel\">Cancel</button>\n        <button class=\"primary\" id=\"vk-f-save\">Save</button>\n      </span>\n    </div>\n  </div>\n</div>\n\n";
(function(){
  var root=document.getElementById('vk-tracker');
  var KEY='vialhaus-tracker-v1';
  var state={caseSize:15,days:28,sockets:{}};
  try{var s=JSON.parse(localStorage.getItem(KEY)||'null'); if(s&&s.sockets){state=s;}}catch(e){}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  var grid=root.querySelector('#vk-grid'), sel=root.querySelector('#vk-case'), daysIn=root.querySelector('#vk-days');
  sel.value=String(state.caseSize); daysIn.value=state.days;
  function fmt(d){ if(!d) return ''; var p=d.split('-'); return p[2]+'/'+p[1]; }
  function today(){ var t=new Date(); t.setHours(0,0,0,0); return t; }
  function daysLeft(out){ if(!out) return null; var o=new Date(out+'T00:00:00'); return Math.round((o-today())/86400000); }
  function render(){
    grid.innerHTML='';
    var n=state.caseSize, extra = n===24?2:0;
    for(var i=1;i<=n+extra;i++){
      var s=state.sockets[i]; var el=document.createElement('div'); el.className='sock';
      var name = i>n ? '30ml bay '+(i-n) : 'Socket '+i;
      if(!s||!s.label&&!s.in){ el.className+=' empty'; el.innerHTML='<div class="n">'+name.toUpperCase()+'</div><div class="lbl">empty</div>'; }
      else{
        var dl=daysLeft(s.out); var cls = dl===null?'':(dl<0?'bad':(dl<=7?'warn':'ok'));
        el.className+=' '+cls;
        var pill = dl===null?'':(dl<0?(-dl)+'d over':dl+'d');
        el.innerHTML='<div class="n">'+name.toUpperCase()+'</div><div class="lbl">'+esc(s.label||'unnamed')+'</div><div class="d">in '+fmt(s.in)+(s.out?' · out '+fmt(s.out):'')+'</div>'+(pill?'<span class="pill">'+pill+'</span>':'');
      }
      el.setAttribute('data-i',i); el.addEventListener('click',function(){open(+this.getAttribute('data-i'));});
      grid.appendChild(el);
    }
  }
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var modal=root.querySelector('#vk-modal'), cur=0;
  var fL=root.querySelector('#vk-f-label'), fI=root.querySelector('#vk-f-in'), fO=root.querySelector('#vk-f-out'), fN=root.querySelector('#vk-f-note');
  function iso(d){return d.toISOString().slice(0,10);}
  function open(i){
    cur=i; var s=state.sockets[i]||{};
    root.querySelector('#vk-mtitle').textContent=(i>state.caseSize?'30ml bay '+(i-state.caseSize):'Socket '+i);
    fL.value=s.label||''; fI.value=s.in||iso(today()); fO.value=s.out||''; fN.value=s.note||'';
    if(!s.out){ var o=today(); o.setDate(o.getDate()+(+daysIn.value||28)); fO.value=iso(o); }
    modal.classList.add('open'); fL.focus();
  }
  fI.addEventListener('change',function(){ if(fI.value){ var o=new Date(fI.value+'T00:00:00'); o.setDate(o.getDate()+(+daysIn.value||28)); fO.value=iso(o);} });
  root.querySelector('#vk-f-save').addEventListener('click',function(){ state.sockets[cur]={label:fL.value.trim(),in:fI.value,out:fO.value,note:fN.value.trim()}; save(); modal.classList.remove('open'); render(); });
  root.querySelector('#vk-f-cancel').addEventListener('click',function(){modal.classList.remove('open');});
  root.querySelector('#vk-f-empty').addEventListener('click',function(){ delete state.sockets[cur]; save(); modal.classList.remove('open'); render(); });
  modal.addEventListener('click',function(e){ if(e.target===modal) modal.classList.remove('open'); });
  sel.addEventListener('change',function(){ state.caseSize=+sel.value; save(); render(); });
  daysIn.addEventListener('change',function(){ state.days=+daysIn.value||28; save(); });
  root.querySelector('#vk-print').addEventListener('click',function(){window.print();});
  root.querySelector('#vk-clear').addEventListener('click',function(){ if(confirm('Clear every socket?')){ state.sockets={}; save(); render(); } });
  root.querySelector('#vk-export').addEventListener('click',function(){
    var lines=['VialHaus tracker, '+iso(today())];
    Object.keys(state.sockets).sort(function(a,b){return a-b;}).forEach(function(k){var s=state.sockets[k]; lines.push('#'+k+': '+(s.label||'unnamed')+' | in '+s.in+' | out '+s.out+(s.note?' | '+s.note:''));});
    var t=lines.join('\n');
    if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){alert('Copied.');},function(){prompt('Copy this:',t);});} else prompt('Copy this:',t);
  });
  render();
})();

})();