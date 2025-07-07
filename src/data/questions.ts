import { Archetypes, ArchetypeEnum } from '../types';

const quizData = {
  options: [
    { label: 'Це точно про мене', weight: 3 },
    { label: 'Скоріше про мене', weight: 2 },
    { label: 'Не знаю / Нейтрально', weight: 1 },
    { label: 'Скоріше не про мене', weight: 0 },
    { label: 'Зовсім не про мене', weight: 0 }
  ],
  questions: [
    { id: 1, archetypes: [ArchetypeEnum.Jester], text: 'Я люблю веселитися та жартувати.' },
    { id: 2, archetypes: [ArchetypeEnum.Ruler], text: 'Я відчуваю себе впевнено, коли володію інформацією.' },
    { id: 3, archetypes: [ArchetypeEnum.Lover, ArchetypeEnum.Creator], text: 'Мені подобається створювати красу навколо себе.' },
    { id: 4, archetypes: [ArchetypeEnum.Outlaw, ArchetypeEnum.Hero], text: 'Я готова ризикувати заради правди.' },
    { id: 5, archetypes: [ArchetypeEnum.Hero], text: 'Я люблю змагання.' },
    { id: 6, archetypes: [ArchetypeEnum.Sage], text: 'Мені подобається вчитись і вчити інших.' },
    { id: 7, archetypes: [ArchetypeEnum.Everyman, ArchetypeEnum.Innocent], text: 'Я часто відчуваю, що мене не цінують так, як я заслуговую.' },
    { id: 8, archetypes: [ArchetypeEnum.Explorer, ArchetypeEnum.Outlaw], text: 'Мені потрібно відчуття свободи.' },
    { id: 9, archetypes: [ArchetypeEnum.Magician], text: 'Я люблю трансформувати себе та інших.' },
    { id: 10, archetypes: [ArchetypeEnum.Jester], text: 'Мені легко підняти настрій іншим.' },

    { id: 11, archetypes: [ArchetypeEnum.Lover], text: 'Мені важливо виглядати привабливою.' },
    { id: 12, archetypes: [ArchetypeEnum.Hero, ArchetypeEnum.Ruler], text: 'Я завжди прагну досягати своїх цілей.' },
    { id: 13, archetypes: [ArchetypeEnum.Caregiver], text: 'Я відчуваю себе винною, коли не можу допомогти.' },
    { id: 14, archetypes: [ArchetypeEnum.Innocent, ArchetypeEnum.Jester], text: 'Я вважаю, що життя створене для радості.' },
    { id: 15, archetypes: [ArchetypeEnum.Sage], text: 'Я завжди прагну до знань.' },
    { id: 16, archetypes: [ArchetypeEnum.Explorer], text: 'Я часто мрію про подорожі та пригоди.' },
    { id: 17, archetypes: [ArchetypeEnum.Caregiver], text: 'Мені складно відмовити, коли просять допомоги.' },
    { id: 18, archetypes: [ArchetypeEnum.Magician], text: 'Я вірю, що думки можуть матеріалізуватись.' },
    { id: 19, archetypes: [ArchetypeEnum.Lover], text: 'Я люблю почуття закоханості та пристрасті.' },
    { id: 20, archetypes: [ArchetypeEnum.Caregiver], text: 'Я завжди думаю про потреби інших.' },

    { id: 21, archetypes: [ArchetypeEnum.Magician], text: 'Я відчуваю, що у світі існує магія.' },
    { id: 22, archetypes: [ArchetypeEnum.Explorer], text: 'Я не терплю рутини.' },
    { id: 23, archetypes: [ArchetypeEnum.Outlaw], text: 'Я часто йду проти встановлених правил.' },
    { id: 24, archetypes: [ArchetypeEnum.Caregiver], text: 'Я прагну створювати комфорт та затишок для близьких.' },
    { id: 25, archetypes: [ArchetypeEnum.Sage], text: 'Мені подобається аналізувати ситуації та людей.' },
    { id: 26, archetypes: [ArchetypeEnum.Creator], text: 'Я люблю створювати щось нове.' },
    { id: 27, archetypes: [ArchetypeEnum.Everyman], text: 'Я боюся бути покинутою чи ізольованою.' },
    { id: 28, archetypes: [ArchetypeEnum.Innocent], text: 'Я вірю, що життя просте, якщо правильно його проживати.' },
    { id: 29, archetypes: [ArchetypeEnum.Ruler, ArchetypeEnum.Hero], text: 'Люди кажуть, що я дуже цілеспрямована.' },
    { id: 30, archetypes: [ArchetypeEnum.Creator, ArchetypeEnum.Magician], text: 'Я часто шукаю, як покращити речі навколо себе.' },

    { id: 31, archetypes: [ArchetypeEnum.Everyman], text: 'Я вважаю, що всі люди рівні.' },
    { id: 32, archetypes: [ArchetypeEnum.Jester], text: 'Я не сприймаю життя надто серйозно.' },
    { id: 33, archetypes: [ArchetypeEnum.Ruler], text: 'Я люблю, коли все відбувається за правилами.' },
    { id: 34, archetypes: [ArchetypeEnum.Lover], text: 'Я насолоджуюсь красою та чуттєвістю.' },
    { id: 35, archetypes: [ArchetypeEnum.Explorer], text: 'Я легко починаю щось нове.' },
    { id: 36, archetypes: [ArchetypeEnum.Hero], text: 'Я вважаю, що наполеглива праця винагороджується.' },
    { id: 37, archetypes: [ArchetypeEnum.Outlaw], text: 'Мені подобається ламати стереотипи.' },
    { id: 38, archetypes: [ArchetypeEnum.Creator], text: 'Я прагну залишити унікальний слід у своїй справі.' },
    { id: 39, archetypes: [ArchetypeEnum.Caregiver, ArchetypeEnum.Everyman], text: 'Я глибоко співчуваю людям, які переживають труднощі.' },
    { id: 40, archetypes: [ArchetypeEnum.Innocent], text: 'Я завжди намагаюся бачити у всьому хороше.' },

    { id: 41, archetypes: [ArchetypeEnum.Sage], text: 'Люди кажуть, що я мудра.' },
    { id: 42, archetypes: [ArchetypeEnum.Outlaw], text: 'Я люблю відчуття свободи від системи.' },
    { id: 43, archetypes: [ArchetypeEnum.Magician, ArchetypeEnum.Creator], text: 'Мені подобається покращувати реальність навколо.' },
    { id: 44, archetypes: [ArchetypeEnum.Innocent], text: 'Я прагну відчувати себе захищеною.' },
    { id: 45, archetypes: [ArchetypeEnum.Hero], text: 'Я люблю жертвувати своїм комфортом заради мети.' },
    { id: 46, archetypes: [ArchetypeEnum.Caregiver], text: 'Мені боляче бачити чужі страждання.' },
    { id: 47, archetypes: [ArchetypeEnum.Creator, ArchetypeEnum.Lover], text: 'Мені подобається візуальна естетика та дизайн.' },
    { id: 48, archetypes: [ArchetypeEnum.Sage], text: 'Я шукаю сенс у всьому.' },
    { id: 49, archetypes: [ArchetypeEnum.Lover], text: 'Мені важливо подобатись людям.' },
    { id: 50, archetypes: [ArchetypeEnum.Innocent], text: 'Я вірю, що якщо я роблю добро, мені повернеться добром.' },

    { id: 51, archetypes: [ArchetypeEnum.Outlaw], text: 'Я можу різко висловлювати свою думку.' },
    { id: 52, archetypes: [ArchetypeEnum.Sage], text: 'Я читаю або навчаюсь щодня.' },
    { id: 53, archetypes: [ArchetypeEnum.Lover], text: 'Мені потрібне відчуття емоційної та фізичної близькості у стосунках.' },
    { id: 54, archetypes: [ArchetypeEnum.Caregiver], text: 'Я готова жертвувати власним комфортом заради інших.' },
    { id: 55, archetypes: [ArchetypeEnum.Explorer], text: 'Я люблю досліджувати нові місця та ідеї.' },
    { id: 56, archetypes: [ArchetypeEnum.Magician], text: 'Я часто прагну до трансформацій.' },
    { id: 57, archetypes: [ArchetypeEnum.Jester], text: 'Я люблю жартувати навіть у складних ситуаціях.' },
    { id: 58, archetypes: [ArchetypeEnum.Innocent], text: 'Я вважаю, що якщо я добра, зі мною все буде добре.' },
    { id: 59, archetypes: [ArchetypeEnum.Jester], text: 'Мені подобається жартувати про себе, щоб зняти напругу.' },
    { id: 60, archetypes: [ArchetypeEnum.Outlaw], text: 'Я не терплю авторитарності.' },

    { id: 61, archetypes: [ArchetypeEnum.Sage], text: 'Я завжди прагну дізнаватися більше.' },
    { id: 62, archetypes: [ArchetypeEnum.Hero], text: 'Я відчуваю покликання захищати інших.' },
    { id: 63, archetypes: [ArchetypeEnum.Creator, ArchetypeEnum.Lover], text: 'Мені подобається залишати красу після себе.' },
    { id: 64, archetypes: [ArchetypeEnum.Lover], text: 'Я часто прагну романтики у житті.' },
    { id: 65, archetypes: [ArchetypeEnum.Caregiver], text: 'Я часто прагну бути потрібною.' },
    { id: 66, archetypes: [ArchetypeEnum.Explorer], text: 'Я люблю свободу та нові горизонти.' },
    { id: 67, archetypes: [ArchetypeEnum.Everyman], text: 'Я вважаю, що всі повинні бути рівними перед законом.' },
    { id: 68, archetypes: [ArchetypeEnum.Sage], text: 'Я часто шукаю глибинні сенси у всьому.' },
    { id: 69, archetypes: [ArchetypeEnum.Hero], text: 'Я люблю відчуття перемоги.' },

    { id: 70, archetypes: [ArchetypeEnum.Innocent, ArchetypeEnum.Jester], text: 'Я люблю знаходити радість у дрібницях.' },
    { id: 71, archetypes: [ArchetypeEnum.Everyman], text: 'Я часто відчуваю себе «своєю людиною» у будь-якому колективі.' },
    { id: 72, archetypes: [ArchetypeEnum.Creator], text: 'Я люблю творити щось руками.' },
    { id: 73, archetypes: [ArchetypeEnum.Magician], text: 'Я вірю у свою здатність впливати на реальність.' },
    { id: 74, archetypes: [ArchetypeEnum.Ruler], text: 'Я люблю, коли все відбувається гармонійно та правильно.' },
    { id: 75, archetypes: [ArchetypeEnum.Ruler], text: 'Я люблю брати на себе відповідальність за спільний результат.' },
    { id: 76, archetypes: [ArchetypeEnum.Ruler], text: 'Мені подобається встановлювати правила або стандарти у колективі.' },
    { id: 77, archetypes: [ArchetypeEnum.Everyman], text: 'Мені легко знаходити спільну мову з різними людьми.' },
    { id: 78, archetypes: [ArchetypeEnum.Everyman], text: 'Я ціную простоту у стосунках і у житті.' },
    { id: 79, archetypes: [ArchetypeEnum.Explorer], text: 'Мені цікаво пробувати нові захоплення або хобі.' },
    { id: 80, archetypes: [ArchetypeEnum.Explorer], text: 'Я відчуваю натхнення, коли відкриваю щось нове для себе.' },
    { id: 81, archetypes: [ArchetypeEnum.Jester], text: 'Мені подобається робити буденні речі веселішими чи незвичайними.' }
  ],
};


export default quizData;

export const archetypes: Archetypes = {
  "Explorer": {
    name: "Шукач",
    description: "Ти любиш відкривати нове, подорожувати та досліджувати світ. Твоя енергія та цікавість допомагають тобі знаходити нові можливості.",
    traits: ["Цікавість", "Незалежність", "Сміливість", "Адаптивність"],
    fullDescription: ` `
  },
  "Sage": {
    name: "Мудрець",
    description: "Ти цінуєш знання та мудрість. Твоя здатність аналізувати та розуміти глибокі речі робить тебе надійним порадником.",
    traits: ["Мудрість", "Аналітичність", "Розважливість", "Навчання"],
    fullDescription: ``
  },
  "Hero": {
    name: "Герой",
    description: "Ти сміливий та готовий до викликів. Твоя сила та відвага допомагають тобі подолати труднощі та захистити інших.",
    traits: ["Сміливість", "Відвага", "Лідерство", "Визначеність"],
    fullDescription: ``
  },
  "Creator": {
    name: "Творець",
    description: "Ти маєш багату уяву та творчий підхід до життя. Твоя здатність створювати щось нове та унікальне надихає інших.",
    traits: ["Творчість", "Уява", "Інноваційність", "Експресія"],
    fullDescription: ``
  },
  "Caregiver": {
    name: "Турботливий",
    description: "Ти турбуєшся про інших та готовий підтримувати їх у складні моменти. Твоя доброта та емпатія роблять світ кращим.",
    traits: ["Турбота", "Емпатія", "Підтримка", "Доброта"],
    fullDescription: ``
  },
  "Jester": {
    name: "Блазень",
    description: "Ти приносиш радість та сміх у життя інших. Твоя здатність бачити світло у будь-якій ситуації піднімає настрій.",
    traits: ["Гумор", "Оптимізм", "Легкість", "Розваги"],
    fullDescription: ``
  },
  "Lover": {
    name: "Коханка",
    description: "Ти цінуєш близькі стосунки та емоційні зв'язки. Твоя здатність любити та бути любимим робить життя багатшим.",
    traits: ["Любов", "Емоційність", "Близькість", "Чуттєвість"],
    fullDescription: ``
  },
  "Ruler": {
    name: "Правитель",
    description: "Ти маєш природну здатність керувати та організовувати. Твоя відповідальність та лідерські якості допомагають досягати цілей.",
    traits: ["Лідерство", "Відповідальність", "Організація", "Влада"],
    fullDescription: ``
  },
  "Magician": {
    name: "Маг",
    description: "Ти маєш здатність бачити можливості там, де інші бачать проблеми. Твоя інтуїція та трансформаційна енергія змінюють світ.",
    traits: ["Інтуїція", "Трансформація", "Можливості", "Віра"],
    fullDescription: ``
  },
  "Everyman": {
    name: "Своя людина",
    description: "Ти цінуєш простоту та щирість. Твоя здатність бути собою та приймати інших такими, які вони є, створює гармонію.",
    traits: ["Щирість", "Простота", "Прийняття", "Гармонія"],
    fullDescription: ``
  },
  "Outlaw": {
    name: "Бунтар",
    description: "Ти не боязкий кидати виклик статус-кво та йти власним шляхом. Твоя сміливість та незалежність надихають на зміни.",
    traits: ["Бунтарство", "Незалежність", "Сміливість", "Зміни"],
    fullDescription: ``
  },
  "Innocent": {
    name: "Невинний",
    description: "Ти віриш у добро, простоту та щирість. Твоя присутність дарує іншим відчуття легкості, спокою та надії.",
    traits: ["Доброта", "Віра", "Чистота", "Оптимізм"],
    fullDescription: ``
  }
};