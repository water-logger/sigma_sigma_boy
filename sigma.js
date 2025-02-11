/// execute_script.js
function p() {
(async function() {
    if (document.getElementById("injectedExploitMonacoWindow")) {
        const b = document.getElementById("injectedExploitMonacoWindow");
        if (b.style.display == "flex") {
            return
        }
        b.style.display = "flex";
        return
    }
    const windowContainer = document.createElement("div");
    windowContainer.style.position = "fixed";
    windowContainer.style.top = "50px";
    windowContainer.style.left = "50px";
    windowContainer.style.width = "480px";
    windowContainer.style.height = "350px";
    windowContainer.style.background = "#1e1e1e";
    windowContainer.style.border = "1px solid #444";
    windowContainer.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.5)";
    windowContainer.style.display = "flex";
    windowContainer.style.flexDirection = "column";
    windowContainer.style.resize = "both";
    windowContainer.style.overflow = "hidden";
    windowContainer.style.zIndex = "99999999999";
    windowContainer.id = "injectedExploitMonacoWindow";
    document.body.appendChild(windowContainer);
    const titleBar = document.createElement("div");
    titleBar.style.background = "#333";
    titleBar.style.color = "white";
    titleBar.style.padding = "5px";
    titleBar.style.display = "flex";
    titleBar.style.justifyContent = "flex-end";
    titleBar.style.fontFamily = "Monospace";
    titleBar.style.alignItems = "center";
    windowContainer.appendChild(titleBar);
    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.background = "transparent";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontFamily = "Monospace";
    closeButton.onclick = () => windowContainer.style.display = "none";
    titleBar.appendChild(closeButton);
    const editorContainer = document.createElement("div");
    editorContainer.style.flex = "1";
    editorContainer.style.width = "100%";
    editorContainer.style.height = "100%";
    editorContainer.style.overflow = "hidden";
    windowContainer.appendChild(editorContainer);
    const runButton = document.createElement("button");
    runButton.innerText = "Run";
    runButton.style.width = "100%";
    runButton.style.background = "green";
    runButton.style.color = "white";
    runButton.style.border = "none";
    runButton.style.padding = "10px";
    runButton.style.cursor = "pointer";
    runButton.style.fontFamily = "Monospace";
    runButton.style.borderRadius = "0px";
    runButton.onclick = () => {
        const code = editor.getValue();
        try {
            eval(code);
        } catch (error) {
            console.error("Execution error:", error);
        }
    };
    windowContainer.appendChild(runButton);
    let offsetX, offsetY, isDragging = false;
    titleBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - windowContainer.offsetLeft;
        offsetY = e.clientY - windowContainer.offsetTop;
    });
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            windowContainer.style.left = `${e.clientX - offsetX}px`;
            windowContainer.style.top = `${e.clientY - offsetY}px`;
        }
    });
    document.addEventListener("mouseup", () => isDragging = false);
    const monacoScript = document.createElement("script");
    monacoScript.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.js";
    monacoScript.onload = () => {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
        require(["vs/editor/editor.main"], function() {
            window.editor = monaco.editor.create(editorContainer, {
                value: "console.log('Hello world!');",
                language: "javascript",
                theme: "vs-dark",
                automaticLayout: true
            });
        });
    };
    document.head.appendChild(monacoScript);
    new ResizeObserver(() => {
        if (window.editor) {
            window.editor.layout();
        }
    }).observe(windowContainer);
})();
}
window.addEventListener("keyup", event => {
  if (event.ctrlKey && event.which === 192) {
    p();
  }
});
