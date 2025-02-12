/// execute_script.js
function p() {
  (async function() {
            const uBlockExploit = document.createElement("div");
            const textBox = document.createElement("textarea");
            const keysDown = {};
            let offsetX, offsetY, isDragging = false;
            
            uBlockExploit.style.display = "block";
            uBlockExploit.style.position = "fixed";
            uBlockExploit.style.background = "white";
            uBlockExploit.style.height = "225px";
            uBlockExploit.style.width = "350px";
            uBlockExploit.style.zIndex = "9999999999";
            uBlockExploit.style.boxShadow = "0px 0px 10px 1px rgba(0, 0, 0, 0.5)";
            textBox.style.width = "100%";
            textBox.style.height = "100%";
            textBox.style.outline = "none";
            textBox.style.resize = "none";
            textBox.style.top = "20px";
            textBox.style.fontFamily = "Monospace";
            textBox.id = "stupidPieceOfGarbageEditor";
            textBox.wrap = "off";
            textBox.value = `console.log("Hello world!")`;

            document.body.appendChild(uBlockExploit);
            uBlockExploit.appendChild(textBox);

            uBlockExploit.addEventListener("mousedown", (e) => {
                isDragging = true;

                offsetX = e.clientX - uBlockExploit.offsetLeft;
                offsetY = e.clientY - uBlockExploit.offsetTop;
            });

            document.addEventListener("mousemove", (e) => {
                if ( isDragging & keysDown["AltLeft"] == true ) {
                    uBlockExploit.style.left = `${e.clientX - offsetX}px`;
                    uBlockExploit.style.top = `${e.clientY - offsetY}px`;
                }
            });

            document.addEventListener("keydown", (event) => {
                keysDown[event.code] = true;
            });

            document.addEventListener("keyup", event => {
                keysDown[event.code] = false;

                if ( event.which == 90 & keysDown["AltLeft"] == true ) {
                    var scriptElm = document.createElement('script');
                    scriptElm.setAttribute('class', 'class-name');
                    var inlineCode = document.createTextNode(document.getElementById("stupidPieceOfGarbageEditor").value);
                    scriptElm.appendChild(inlineCode); 
                    document.body.appendChild(scriptElm);
                }
            });

            document.addEventListener("mouseup", () => isDragging = false);
        })();
}
window.addEventListener("keyup", event => {
  if (event.ctrlKey && event.which === 192) {
    p();
  }
});
