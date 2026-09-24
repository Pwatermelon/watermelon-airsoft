<p align="center">
  <img src="assets/icon.png" alt="Watermelon Airsoft" width="160" height="160" />
</p>

<h1 align="center">Watermelon Airsoft</h1>

<p align="center">
  Офлайн-калькулятор дульной энергии для страйкбола.<br/>
  Считал джоули, увидел класс и дистанцию — без интернета и без сервера.
</p>

<p align="center">
  <img alt="Android" src="https://img.shields.io/badge/Android-APK-3dd68c?style=flat-square&logo=android&logoColor=white" />
  <img alt="iOS" src="https://img.shields.io/badge/iOS-Expo-e84855?style=flat-square&logo=apple&logoColor=white" />
  <img alt="Offline" src="https://img.shields.io/badge/Offline-100%25-c9b896?style=flat-square" />
  <img alt="Expo" src="https://img.shields.io/badge/Expo-53-000?style=flat-square&logo=expo&logoColor=white" />
</p>

---

## Что делает

Перед хроном нужно понять три вещи: сколько джоулей у привода, в какой класс по регламенту ФССО он попадает и с какой минимальной дистанции можно стрелять.

Приложение считает энергию по весу шара и скорости вылета, показывает эквивалент на 0.20 г и подсвечивает активный класс. Рядом — короткая вики: зачем джоули, как мерить на хроне и какие ошибки бывают чаще всего.

Всё работает локально на телефоне. Сайт и сеть не нужны.

### Формула

```
E = ½ × m × v²
```

Пример: шар **0.25 г** при **120 м/с** → **1.80 Дж** (на 0.20 г это ≈ **134 м/с**).

### Классы ФССО

| Класс | Лимит | Мин. дистанция |
|-------|-------|----------------|
| Вторичка | ≤ 1.5 Дж | 0 м |
| Основное | ≤ 2.4 Дж | 10 м |
| Снайперка | ≤ 3.0 Дж | 30 м |
| Не допуск | > 3.0 Дж | — |

---

## Возможности

- Вес шара: пресеты и слайдер
- Скорость: 80–180 м/с
- Дульная энергия в джоулях + эквивалент на 0.20 г
- Подсветка класса и минимальной дистанции
- Вики по формуле, хрону и регламенту
- Портрет и ландшафт
- Тема Watermelon, иконка — абузик в прицеле

---

## Запуск

```bash
npm install
npx expo start
```

`a` — Android, `i` — iOS (Xcode на macOS).

Проверка расчёта:

```bash
npm run test:calc
```

---

## Сборка APK

Пуш в `main` / `master` или ручной запуск **Build Android APK** в GitHub Actions. Готовый файл — в Artifacts (`watermelon-airsoft-<sha>`).

CI-сборка подписана debug-ключом: для установки на своё устройство нормально. Для Google Play нужен свой keystore.

Стек: Expo 53, React Native, TypeScript. Один код на Android и iOS. На Android из манифеста убраны сетевые разрешения.

---

## Структура

```
app/                 экраны
src/components/      UI калькулятора
src/data/wiki.ts     вики
src/lib/calculator.ts
src/theme/           палитра Watermelon
assets/              иконки и splash
.github/workflows/   сборка APK
```
