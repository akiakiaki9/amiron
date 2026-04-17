// Фото для блюд (локальные пути)
export const menuData = {
    weddingHall: {
        title: "Свадебный зал",
        description: "Роскошный зал для проведения свадебных торжеств до 200 гостей",
        capacity: "до 200 гостей",
        area: "250 м²",
        features: ["VIP зона", "Танцпол", "Сцена", "Караоке", "Светомузыка"],
        image: "https://images.unsplash.com/photo-1519167758483-8c5e8c6a2b8d?w=800",
        video: "/videos/wedding-hall.mp4",
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
    commonHall: {
        title: "Общий зал",
        description: "Уютный зал для семейных обедов и встреч с друзьями",
        capacity: "до 50 гостей",
        area: "80 м²",
        features: ["Уютная атмосфера", "Семейная обстановка", "Быстрое обслуживание", "Детское меню", "Wi-Fi"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        video: "/videos/common-hall.mp4",
        menu: [
            {
                category: "Салаты",
                items: [
                    { name: "Салат греческий", price: "25 000", description: "Свежие овощи, фета, оливки, соус", image: "/images/menu/1.png" },
                    { name: "Амирон салат", price: "30 000", description: "Авторский салат от шеф-повара", image: "/images/menu/2.png" },
                    { name: "Салат баклажан", price: "30 000", description: "Печеные баклажаны с орехами", image: "/images/menu/3.png" }
                ]
            },
            {
                category: "Горячие блюда",
                items: [
                    { name: "Шашлык Кусквой", price: "130 000", description: "Нежнейший шашлык из вырезки", image: "/images/menu/4.png" },
                    { name: "Шашлык Куфта", price: "120 000", description: "Сочный шашлык из фарша", image: "/images/menu/5.png" },
                    { name: "Парной тушёнка", price: "270 000", description: "Тушеная говядина с овощами (1 кг)", image: "/images/menu/6.png" },
                    { name: "Вагурри", price: "250 000", description: "Мраморная говядина по-восточному (1 кг)", image: "/images/menu/7.png" },
                    { name: "Мангал куриный", price: "95 000", description: "Курица на мангале с пряностями", image: "/images/menu/8.png" }
                ]
            },
            {
                category: "Выпечка",
                items: [
                    { name: "Самса", price: "10 000", description: "Сочная самса с мясом (1 шт)", image: "/images/menu/9.png" }
                ]
            }
        ]
    },
    terrace: {
        title: "Терраса",
        description: "Уютная летняя терраса с видом на город",
        capacity: "до 80 гостей",
        area: "120 м²",
        features: ["Летний душ", "Зонты", "Музыка", "Вечерняя подсветка"],
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800",
        video: "/videos/terrace.MP4",
        menu: [] // Пока пусто, добавите позже
    }
};

// Данные для VIP залов
export const vipHallsData = {
    title: "VIP залы",
    description: "Эксклюзивные пространства для особых мероприятий",
    vipHalls: [
        {
            id: 1,
            title: "VIP зал 1",
            description: "Роскошный зал в золотых тонах для самых взыскательных гостей",
            longDescription: "Эксклюзивный VIP зал оформлен в премиальном золотом стиле с использованием дорогих материалов. Идеальное место для проведения статусных мероприятий, деловых ужинов и семейных торжеств.",
            image: "/images/halls/vip1.png",
            video: "/videos/vip1.mp4",
            gallery: [
                "/images/halls/vip1.png"
            ],
            capacity: "до 18 гостей",
            area: "120 м²",
            price: "от 5 000 000 сум",
            features: [
                "Отдельный вход",
                "Персональный шеф-повар",
                "VIP меню",
                "Караоке система",
                "LED экран",
                "Премиум аудиосистема",
                "Отдельная парковка",
                "Персональный официант"
            ],
            menu: [] // У VIP залов нет меню
        },
        {
            id: 2,
            title: "VIP зал 2",
            description: "Элегантный зал в изумрудных тонах с панорамным видом",
            longDescription: "Изысканный VIP зал оформлен в благородных изумрудных оттенках. Панорамные окна открывают захватывающий вид на город.",
            image: "/images/halls/vip2.png",
            video: "/videos/vip2.mp4",
            gallery: [
                "/images/halls/vip2.png"
            ],
            capacity: "до 10 гостей",
            area: "90 м²",
            price: "от 4 000 000 сум",
            features: [
                "Панорамный вид",
                "Персональный шеф-повар",
                "Эксклюзивное меню",
                "Кальянная комната",
                "DJ пульт",
                "Светомузыка",
                "Отдельная терраса",
                "VIP трансфер"
            ],
            menu: [] // У VIP залов нет меню
        }
    ]
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