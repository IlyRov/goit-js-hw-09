const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a=null;function d(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}t.addEventListener("click",(()=>{a||(t.disabled=!0,a=setInterval(d,1e3))})),e.addEventListener("click",(()=>{a&&(t.disabled=!1,clearInterval(a),a=null)}));
//# sourceMappingURL=01-color-switcher.71de2130.js.map