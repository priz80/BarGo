document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    success.style.display = "block";
  });

  // Калькулятор
  function calculate() {
    const guests = parseInt(document.getElementById("guests").value) || 0;
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const bartenders = parseInt(document.getElementById("bartenders").value) || 1;
    const basePricePerGuest = {
      "classic": 150,
      "premium": 300,
      "author": 500,
      "nonalc": 100
    };
    const package = document.getElementById("package").value;
    let total = guests * basePricePerGuest[package];

    // Бармены: 2000₽/час на бармена
    total += bartenders * 2000 * hours;

    // Доп. услуги
    document.querySelectorAll(".addons input:checked").forEach(el => {
      total += parseInt(el.value);
    });

    document.getElementById("total").textContent = total.toLocaleString();
  }

  // Обновление при изменении
  document.querySelectorAll("#guests, #hours, #package, #bartenders, .addons input").forEach(el => {
    el.addEventListener("input", calculate);
    el.addEventListener("change", calculate);
  });

  calculate(); // начальный расчёт
});

function sendCalc() {
  const total = document.getElementById("total").textContent;
  alert("Ваш расчёт: " + total + " ₽. Мы свяжемся с вами для уточнения деталей.");
  // Здесь можно отправить данные в Telegram/email через бэкенд
}
