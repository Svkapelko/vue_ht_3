// На странице отображается подробное описание статьи, а под ней размещаются остальные статьи. Необходимо, чтобы на выборе “Тэги” происходила сортировка статей по выбранному тегу. Тег можно выбрать только один.

// Определение компонента ArticleItem
const { createApp, ref } = Vue

const ArticleItem = {
    props: {
        article: Object
      },
    template: `
      <div class="article-item">
        <h2 class="title-text"> {{ article.title }} </h2>
        <p class="post-desc-text"> {{ article.descriptionText }} </p>
        
        <ol class="footnotes-list">
          <li v-for="footnote in article.footnotes" :key="footnote.id" class="footnotes post-desc-text">{{ footnote.text }}</li>
        </ol>

       
        <img :src="article.imageUrl" :alt="article.title"> 

        <div class="info-block">    
          <a href="#" class="blog-card-text-date"> {{ article.date }} </a>
          <div class="route">
            <a href="#" class="blog-card-text-date"> {{ article.info }} </a>
            <a href="#" class="blog-card-text-date"> {{ article.infoRoute }} </a>
            <a href="#" class="blog-card-text-date"> {{ article.infoRouteLast }} </a>
          </div>
        </div>

        <p class="post-desc-text"> {{ article.description }} </p>
       
        <p class="post-desc-text"> {{ article.description }} </p>
        

        <div class="quotes">
          <span>,,</span>
          <h1 class="quotes-text">Какая-то умная и красивая <br>
          цитата</h1>
         
      </div>
        
        <ul class="tags">
          <li v-for="tag in article.tags" :key="tag" class="blog-card-text-date">
            {{ tag }}
          </li>
        </ul>
      </div>
    `    
  };
  

  // Определение компонента ArticleList, отвечает за отображение списка статей и управление фильтрами. Использует дочерний компонент ArticleItem для рендеринга отдельных статей.

  const ArticleList = {
    props: {
      articles: Array, // хранится массив articles, содержащий объекты статей
    },
    components: {
        ArticleItem
      },
    data() {
      return {
        selectedTag: null, // переменная хранит выбранный тег
      };
    },
    computed: {
      filteredArticles() { // свойство фильтрует статьи на основе текущего выбранного тега
        if (this.selectedTag) {
            return this.articles.filter(article => article.tags.includes(this.selectedTag))
        } else { // eсли тег не выбран, возвращаются все статьи
            return this.articles;
        }
      },
      uniqueTags() { // свойство выводит уникальные теги
        let allTags = [];
        this.articles.forEach(article => {
          allTags.push(...article.tags);
        });
        return [...new Set(allTags)];
      }, 
    },
    methods: {
      selectTag(tag) { // метод обновляет состояние выбранного тега
        this.selectedTag = tag;
      },
    },
    template: 
    `
      <div class="articles">
        <div v-for="article in filteredArticles" :key="article.id">
          <ArticleItem :article="article"/>
        </div>
      </div>
    
      <div class="blog-sidebar">
        <div class="tags">
          <h3 class="blog-card-text">Тэги</h3>
          <div class="tags-wrapper">
            <span v-for="tag in uniqueTags" :key="tag" class="blog-card-text-date">
            <button class="button-tags" @click="selectTag(tag)" :class="{ active: selectedTag === tag}">{{ tag }}</button>
            </span>
          </div>
        </div>
      </div>   
    `
  };
  
  // Главный компонент приложения, передает данные статей в компонент ArticleList.
  
  const app = createApp({
    data() {
      return {
        articles: [
          {
            id: 1,
            title: 'Создадим лучший макет перепланировки',
            description: 'В своей статье от 1994-го года журнал «Before & After» отследил фразу «Lorem ipsum ...» до философского трактата Цицерона О пределах добра и зла, написанного в 45 году до нашей эры на латинском языке. В оригинале текст выглядит так «Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit ...», и переводится как «Нет никого, кто любил бы свою боль, кто искал бы ее и хотел бы чтобы она была у него. Потому что это боль...»',
            imageUrl: 'img/kitch_art1.png',
            date: '26 Декабря, 2022',
            info: 'Интерьер /', 
            infoRoute: 'Домой /', 
            infoRouteLast: 'Декор',
            tags: ['кухня']
          },
          {
            id: 2,
            title: 'Design sprints are great',
            description: 'В оригинале текст выглядит так «Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit ...», и переводится как «Нет никого, кто любил бы свою боль, кто искал бы ее и хотел бы чтобы она была у него. Потому что это боль...»',
            imageUrl: 'img/kitch_art2.png',
            descriptionText:'В своей статье от 1994-го года журнал «Before & After» отследил фразу «Lorem ipsum ...» до философского трактата Цицерона О пределах добра и зла, написанного в 45 году до нашей эры на латинском языке. ',
            date: '20 Декабря, 2022', 
            info: 'Интерьер /', 
            infoRoute: 'Домой /', 
            infoRouteLast: 'Декор',
            tags: ['кухня'],
            footnotes: [
              {
              id: 1,
              text: 'С того времени этот, похожий на латинский, текст стал стандартом в печатной промышленности для примеров шрифтов и текстов.',
            },
            {
              id: 2,
              text: 'Этот, похожий на латинский, текст стал стандартом в печатной промышленности для примеров шрифтов и текстов.',
            },
            {
              id: 3,
              text: 'С того времени этот, похожий на латинский.',
            },
          ]
          },
          {
            id: 3,
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quae odio id quis in qui, eius itaque, dicta fugiat enim deleniti. Amet, neque dolorem tenetur possimus voluptate molestias recusandae reprehenderit dolorum obcaecati earum provident sapiente quis a illo consequatur beatae praesentium? Unde doloremque deleniti labore nihil amet velit consectetur iste?',
            imageUrl: 'img/kitch_art1.png',
            date: '18 Декабря, 2022', 
            info: 'Интерьер /', 
            infoRoute: 'Домой /', 
            infoRouteLast: 'Декор',
            tags: ['здание', 'архитектура'],
          },
          {
            id: 4,
            title: 'Lorem Ipsum Dolor',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis et aperiam unde ipsam doloremque, expedita incidunt, enim iste consectetur perferendis vel repudiandae asperiores consequatur',
            imageUrl: 'img/kitch_art2.png',
            descriptionText:'В своей статье от 1994-го года журнал «Before & After» отследил фразу «Lorem ipsum ...» до философского трактата Цицерона О пределах добра и зла, написанного в 45 году до нашей эры на латинском языке. ',
            date: '15 Декабря, 2022', 
            info: 'Интерьер /', 
            infoRoute: 'Домой /', 
            infoRouteLast: 'Декор',
            tags: ['планировка', 'спальня'],
            footnotes: [
              {
              id: 1,
              text: 'С того времени этот, похожий на латинский, текст стал стандартом в печатной промышленности для примеров шрифтов и текстов.',
            },
            {
              id: 2,
              text: 'Этот, похожий на латинский, текст стал стандартом в печатной промышленности для примеров шрифтов и текстов.',
            },
          ]
          }
        ],

      };
    },
    components: {
        ArticleList
      },
    template: `
    <div class="container">
      <nav class="header">
                <div class="header-container">
                    <div class="logo-nav">
                        <a href="#"><img class="logo-img" src="img/logo.png" alt="logo">
                            <span class="logo-text h1-text">Interno</span>
                        </a>
                    </div>
                    <div class="menubar">
                        <ul class="nav">
                            <li class="nav-item"><a href="#" class="nav-link">Домой</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">Проект</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">Блог</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="blog-banner">
                <div class="blog-banner-wrapper">
                </div>
            </div>
    <div class="blog">
      <div class="blog-wrapper blog-details-wrapper">
        <div class="blog-main">
          <ArticleList :articles="articles"/>
        </div>
      </div>
    </div>

     <nav class="footer">
                <div class="footer-wrapper">
                    <div class="logo">
                        <div class="logo-nav">
                            <a href="#"><img class="logo-img" src="img/logo.png" alt="logo">
                                <span class="logo-text h1-text">Interno</span>
                            </a>
                        </div>
                        <div class="icons">
                            <a href="https://twitter.com"><i class="fa-brands fa-twitter"></i></a>
                            <a href="https://linkedin.com"><i class="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div class="pages">
                        <h1 class="blog-card-text">Страницы</h1>
                        <ul class="nav-footer">
                            <li class="nav-item nav-item-footer"><a href="#" class="nav-link">Домой</a></li>
                            <li class="nav-item nav-item-footer"><a href="#" class="nav-link">Проект</a></li>
                            <li class="nav-item nav-item-footer"><a href="#" class="nav-link">Блог</a></li>
                        </ul>
                    </div>
                    <div class="contacts">
                        <h1 class="blog-card-text">Контакты</h1>
                        <ul class="nav-footer">
                            <li class="nav-item nav-item-footer nav-link nav-link-footer">55 East Birchwood Ave. <br>
                                Brooklyn, New York 11201 </li>
                            <li class="nav-item nav-item-footer nav-link nav-link-footer">contact@interno.com
                            </li>
                            <li class="nav-item nav-item-footer nav-link nav-link-footer">(123) 456 - 7890</li>
                        </ul>
                    </div>
                </div>
            </nav>
    </div>
    `
  });
  app.mount('#app');
