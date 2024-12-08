const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');

// Список вкусов
const segments = [
  'Ваниль',
  'Шоколад',
  'Клубника',
  'Малина',
  'Фисташка',
  'Карамель',
];

spinButton.addEventListener('click', () => {
  // Случайное вращение (от 3 до 5 оборотов)
  const spins = Math.floor(Math.random() * 3) + 3;
  const segmentAngle = 360 / segments.length;
  const randomAngle = Math.floor(Math.random() * 360);

  const rotation = spins * 360 + randomAngle;

  // Анимация вращения
  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${rotation}deg)`;

  // Определение результата
  setTimeout(() => {
    const normalizedRotation = rotation % 360;
    const selectedSegment = Math.floor(normalizedRotation / segmentAngle);
    const resultText = segments[(segments.length - selectedSegment) % segments.length];
    result.textContent = `Вы выбрали: ${resultText}`;
  }, 4000); // Таймаут совпадает с длительностью анимации
});




