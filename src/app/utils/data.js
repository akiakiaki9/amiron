// Фото для блюд (URL из интернета)
export const menuData = {
    weddingHall: {
        title: "Свадебный зал",
        description: "Роскошный зал для проведения свадебных торжеств до 200 гостей",
        capacity: "до 200 гостей",
        area: "250 м²",
        features: ["VIP зона", "Танцпол", "Сцена", "Караоке", "Светомузыка"],
        image: "https://images.unsplash.com/photo-1519167758483-8c5e8c6a2b8d?w=800",
        menu: [
            {
                category: "Холодные закуски",
                items: [
                    { name: "Ассорти мясное", price: "120 000", description: "Три вида мяса с домашними соленьями", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
                    { name: "Сырная тарелка", price: "95 000", description: "5 сортов сыра с медом и орехами", image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400" },
                    { name: "Рыбное ассорти", price: "110 000", description: "Слабосоленый лосось, форель, семга", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" }
                ]
            },
            {
                category: "Салаты",
                items: [
                    { name: "Цезарь с креветками", price: "65 000", description: "Креветки, пармезан, соус Цезарь", image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=400" },
                    { name: "Греческий салат", price: "48 000", description: "Фета, оливки, свежие овощи", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400" },
                    { name: "Оливье с перепелкой", price: "55 000", description: "Классический с перепелиным филе", image: "https://images.unsplash.com/photo-1569058242567-097e3b6c0c8c?w=400" }
                ]
            },
            {
                category: "Горячие блюда",
                items: [
                    { name: "Плов узбекский", price: "85 000", description: "Классический плов с бараниной", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400" },
                    { name: "Казан кебаб", price: "110 000", description: "Нежнейшее мясо с овощами", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400" },
                    { name: "Люля-кебаб", price: "65 000", description: "Сочный люля на мангале", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400" }
                ]
            },
            {
                category: "Свадебный сет",
                items: [
                    { name: "Свадебный сет №1", price: "2 500 000", description: "На 10 персон: 5 холодных, 3 горячих, фрукты, чай", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400" },
                    { name: "Свадебный сет №2", price: "3 800 000", description: "На 10 персон: расширенное меню + торт", image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400" }
                ]
            }
        ]
    },
    banquetHall: {
        title: "Банкетный зал",
        description: "Просторный зал для банкетов, дней рождений и корпоративов",
        capacity: "до 150 гостей",
        area: "180 м²",
        features: ["Проектор", "Экран", "Колонки", "Микрофоны", "Wi-Fi"],
        image: "https://images.unsplash.com/photo-1519167758483-8c5e8c6a2b8d?w=800",
        menu: [
            {
                category: "Закуски",
                items: [
                    { name: "Овощной салат", price: "35 000", description: "Свежие овощи с авторской заправкой", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
                    { name: "Селедка под шубой", price: "48 000", description: "Традиционная с нори", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=400" },
                    { name: "Тартар из лосося", price: "78 000", description: "Свежий лосось, авокадо, соус понзу", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400" }
                ]
            },
            {
                category: "Основные блюда",
                items: [
                    { name: "Шашлык из говядины", price: "45 000", description: "Мраморная говядина, подается с лавашом", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
                    { name: "Курица-гриль", price: "38 000", description: "Цыпленок с пряными травами", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400" },
                    { name: "Стейк Рибай", price: "95 000", description: "Мраморная говядина, овощи гриль", image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400" }
                ]
            },
            {
                category: "Банкетный сет",
                items: [
                    { name: "Банкетный сет", price: "1 800 000", description: "На 10 персон: 4 холодных, 2 горячих, гарнир, напитки", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400" },
                    { name: "Корпоративный сет", price: "2 200 000", description: "На 10 персон: расширенное меню + фруктовая тарелка", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400" }
                ]
            }
        ]
    },
    terrace: {
        title: "Терраса",
        description: "Уютная летняя терраса с видом на город",
        capacity: "до 80 гостей",
        area: "120 м²",
        features: ["Летний душ", "Зонты", "Кальян", "Музыка", "Вечерняя подсветка"],
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800",
        menu: [
            {
                category: "Летнее меню",
                items: [
                    { name: "Греческий салат", price: "42 000", description: "С фетой и оливками", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400" },
                    { name: "Брускетты", price: "28 000", description: "3 шт: с томатами, лососем, авокадо", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400" },
                    { name: "Том Ям", price: "68 000", description: "Острый суп с креветками", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" }
                ]
            },
            {
                category: "Пицца и Паста",
                items: [
                    { name: "Пицца Маргарита", price: "42 000", description: "Томатный соус, моцарелла, базилик", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400" },
                    { name: "Пицца Пепперони", price: "52 000", description: "Пепперони, моцарелла, томатный соус", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" },
                    { name: "Паста Карбонара", price: "48 000", description: "С беконом и пармезаном", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400" }
                ]
            },
            {
                category: "Напитки",
                items: [
                    { name: "Лимонад домашний", price: "25 000", description: "Мята, лайм, имбирь", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400" },
                    { name: "Мохито", price: "28 000", description: "Спрайт, мята, лайм", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
                    { name: "Чай узбекский", price: "15 000", description: "Зеленый чай с медом", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" }
                ]
            }
        ]
    }
};

export const restaurantInfo = {
    name: "Amiron",
    tagline: "Семейный ресторан",
    phones: ["+998900830707", "+998945450606"],
    instagram: "https://www.instagram.com/amiron.uz/",
    googleMaps: "https://www.google.com/maps/place/RF25%2BF2+Amiron,+Bukhara/data=!4m2!3m1!1s0x3f500f021106f38b:0x12bbfd05731895cb",
    address: "г. Бухара, Узбекистан",
    addressFull: "Узбекистан, г. Бухара, ул. Мехтар Анбар, 123",
    description: "Первоклассный ресторан в Бухаре",
    chef: "Лучший шеф-повар",
    vibe: "Наполним вас эмоциями",
    workingHours: "Ежедневно: 10:00 - 23:00",
    email: "info@amiron.uz"
};