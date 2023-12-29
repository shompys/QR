const form = document.querySelector("#formulario");
const list = document.querySelector("#list");
const fragment = new DocumentFragment();
const canvas = document.getElementById("canvas");

const QR = ({ canvas, value }) => {
  return new Promise((resolve, reject) => {
    QRCode.toCanvas(canvas, value, (e) => {
      if (e) {
        reject(e);
        return;
      }
      resolve(true);
    });
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input[type="text"]');
  const value = input.value;

  QR({ canvas, value }).then(() => {
    input.value = "";
    const p = document.createElement("p");
    p.textContent = value;
    fragment.appendChild(p);
    list.insertBefore(fragment, list.firstChild);
  });
});
