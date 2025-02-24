const form = document.querySelector("#formulario");
const list = document.querySelector("#list");
const fragment = new DocumentFragment();
const canvas = document.getElementById("canvas");
const contentSVG = document.querySelector(".content");
const press = document.querySelector(".press");
const QR = ({ value }) => {
    return new Promise((resolve, reject) => {
        QRCode.toString(
            value,
            {
                width: 500,
                height: 500,
                errorCorrectionLevel: "H",
                type: "svg",
                margin: 0,
            },
            (e, str) => {
                if (e) {
                    reject(e);
                    return;
                }
                resolve(str);
            }
        );
    });
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="text"]');
    const value = input.value;

    QR({ canvas, value })
        .then((e) => {
            input.value = "";
            contentSVG.innerHTML = "";
            const p = document.createElement("p");
            p.textContent = value;
            const source = '<?xml version="1.0" standalone="no"?>\r\n' + e;
            const url =
                "data:image/svg+xml;charset=utf-8," +
                encodeURIComponent(source);
            const node = `<a download="qr.svg" href='${url}' >${e.replace(
                /width="500" height="500"/,
                ""
            )}</a>`;

            const rango = document.createRange();
            const fr = rango.createContextualFragment(node);

            contentSVG.appendChild(fr);
            press.style.display = "block";

            fragment.appendChild(p);
            list.insertBefore(fragment, list.firstChild);
        })
        .catch((e) => {
            alert("No escribiste nada");
            console.log(e);
            input.focus();
        });
});
