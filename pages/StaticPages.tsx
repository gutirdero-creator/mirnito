import React from 'react';

// About Page
export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">О платформе Mirnito.Ru</h1>
    
    <div className="prose prose-lg text-gray-600">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Наша история</h2>
      <p className="mb-6">
        Проект "Mirnito.Ru" создан специально для жителей ЖК "Томилино Парк". Мы заметили, что в общедомовых чатах часто теряются сообщения о продаже вещей или поиске мастеров. Так появилась идея сделать удобную и красивую площадку, где каждый сосед может легко разместить объявление.
      </p>
      
      <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-500 mb-8">
        <h3 className="text-xl font-bold text-primary-800 mb-2">Миссия проекта</h3>
        <p className="text-primary-900">
          Сделать жизнь в нашем жилом комплексе комфортнее. Мы хотим, чтобы ремонт, переезд или поиск няни были простыми задачами, которые решаются с помощью соседей.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Преимущества</h2>
      <ul className="space-y-4 mb-8">
        <li className="flex items-start">
          <span className="font-bold text-gray-900 mr-2">Гиперлокальность:</span>
          Только ЖК Томилино Парк. Никакой лишней информации из других городов или районов Люберец.
        </li>
        <li className="flex items-start">
          <span className="font-bold text-gray-900 mr-2">Доверие:</span>
          Мы соседи. Это повышает уровень ответственности и безопасности сделок.
        </li>
        <li className="flex items-start">
          <span className="font-bold text-gray-900 mr-2">Удобство:</span>
          Сайт адаптирован для мобильных телефонов, чтобы вы могли пользоваться им на прогулке или в лифте.
        </li>
      </ul>

      <div className="grid grid-cols-3 gap-4 text-center mt-12 border-t pt-8">
        <div>
          <div className="text-3xl font-bold text-primary-600">2000+</div>
          <div className="text-sm text-gray-500">Жителей с нами</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600">4</div>
          <div className="text-sm text-gray-500">Улицы в охвате</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600">500+</div>
          <div className="text-sm text-gray-500">Объявлений</div>
        </div>
      </div>
    </div>
  </div>
);

// Safety Page
export const SafetyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Безопасность на Mirnito.Ru</h1>
    
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
      <p className="text-yellow-800">
        Несмотря на то, что мы — сообщество соседей, не забывайте о базовых правилах безопасности.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Как мы вас защищаем</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-center"><span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>Модерация объявлений на предмет спама</li>
          <li className="flex items-center"><span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>Возможность пожаловаться на пользователя</li>
          <li className="flex items-center"><span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>Скрытие контактов от незарегистрированных лиц</li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Советы соседям</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="font-bold mr-2 text-gray-900">1.</span>
            Лучшее место для сделки — ваш двор, подъезд или холл.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2 text-gray-900">2.</span>
            При покупке техники проверяйте её работоспособность сразу.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2 text-gray-900">3.</span>
            Если вам предлагают подозрительную предоплату — откажитесь.
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-12 bg-gray-100 p-6 rounded-lg">
      <h3 className="font-bold mb-2">Заметили подозрительную активность?</h3>
      <p className="text-gray-600 text-sm mb-4">Сообщите нам, и мы примем меры.</p>
      <a href="#/contacts" className="text-primary-600 font-medium hover:underline">Написать администратору →</a>
    </div>
  </div>
);

// Contacts Page
export const ContactsPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Свяжитесь с нами</h1>
    
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h3 className="font-bold text-lg mb-4">Контактная информация</h3>
        <ul className="space-y-4 text-gray-600">
          <li>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Email</div>
            <a href="mailto:support@mirnito.ru" className="text-primary-600 hover:underline">support@mirnito.ru</a>
          </li>
          <li>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Локация</div>
            <div>Люберцы, ЖК Томилино Парк</div>
          </li>
          <li>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Соцсети ЖК</div>
            <div className="flex space-x-3 mt-1">
               <span className="text-gray-400 hover:text-primary-600 cursor-pointer">VK Группа</span>
               <span className="text-gray-400 hover:text-primary-600 cursor-pointer">Telegram Чат</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h3 className="font-bold text-lg mb-4">Написать нам</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Ваше имя</label>
            <input type="text" className="w-full border-gray-300 border rounded-md p-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border-gray-300 border rounded-md p-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Тема</label>
            <select className="w-full border-gray-300 border rounded-md p-2 text-sm bg-white">
              <option>Проблема с объявлением</option>
              <option>Предложение по улучшению</option>
              <option>Жалоба</option>
              <option>Другое</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Сообщение</label>
            <textarea rows={3} className="w-full border-gray-300 border rounded-md p-2 text-sm"></textarea>
          </div>
          <button className="w-full bg-primary-600 text-white font-medium py-2 rounded-md hover:bg-primary-700 transition">
            Отправить
          </button>
        </form>
      </div>
    </div>
  </div>
);

// Blog Page
export const BlogPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Блог ЖК Томилино Парк</h1>
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Ремонт в новостройке: что можно продать?",
          desc: "Не спешите выбрасывать остатки плитки и ламината. Соседям они могут пригодиться.",
          img: "https://picsum.photos/400/250?random=20"
        },
        {
          title: "Как выбрать мастера в нашем районе",
          desc: "Почему лучше вызывать сантехника или электрика, который живет в соседнем доме.",
          img: "https://picsum.photos/400/250?random=21"
        },
        {
          title: "Экология ЖК: дарим вещам вторую жизнь",
          desc: "Как продажа ненужных вещей помогает делать наш комплекс чище и уютнее.",
          img: "https://picsum.photos/400/250?random=22"
        }
      ].map((post, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
          <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-900 leading-tight">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.desc}</p>
            <span className="text-primary-600 font-medium text-sm hover:underline">Читать статью →</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Terms Page
export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Условия использования</h1>
    <div className="prose prose-lg text-gray-600">
      <p className="mb-4">
        Добро пожаловать на Mirnito.Ru! Это локальная доска объявлений для жителей ЖК Томилино Парк.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">1. Для кого этот сайт</h3>
      <p>
        Сервис предназначен для жителей ЖК Томилино Парк и прилегающих территорий Люберец.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">2. Правила размещения</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Размещайте товары и услуги, актуальные для нашего района.</li>
        <li>Запрещена реклама, не имеющая отношения к локальному сообществу.</li>
        <li>Фотографии должны быть реальными.</li>
      </ul>

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">3. Ответственность</h3>
      <p>
        Администрация Mirnito.Ru не является стороной сделки. Мы лишь помогаем соседям найти друг друга. Будьте внимательны при совершении покупок.
      </p>
    </div>
  </div>
);

// Privacy Page
export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>
    <div className="prose prose-lg text-gray-600">
      <p className="mb-4">
        Мы уважаем приватность жителей нашего ЖК. Вот как мы работаем с данными на Mirnito.Ru.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-3">Сбор данных</h3>
          <ul className="space-y-2 text-sm">
            <li>• Контакты для связи с покупателями</li>
            <li>• Информация о продаваемом товаре</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-3">Использование</h3>
          <ul className="space-y-2 text-sm">
            <li>• Публикация объявлений на сайте</li>
            <li>• Связь службы поддержки с вами</li>
            <li>• Мы не передаем базы данных спамерам</li>
          </ul>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Вопросы?</h3>
      <p>
        Пишите на support@mirnito.ru
      </p>
    </div>
  </div>
);