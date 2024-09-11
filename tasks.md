1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md
2. Screenshot:
3. Deployment: None
4. Done 15.09.2024 / deadline 16.09.2024
5. Score: 100 / 400

### Main route - (30/50)

- [x] The Main page should contain general information about the developers, project, and course. - **(10/10)**
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. - **(10/10)**
- [x] If the login token is valid and unexpired, the Sign In and Sign Up buttons are replaced with the "Main Page" button. - **(10/10)**
- [x] When the token expires - the user should be redirected to the Main page automatically. - **(10/10)**
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. - **(10/10)**

### Sign In / Sign Up - (50/50)

- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be. - **(10/10)**
- [x] Client-side validation is implemented. - **(20/20)**
- [x] Upon successful login, the user is redirected to the Main page. - **(10/10)**
- [x] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page. - **(10/10)**

### RESTfull client - max 120 points

- [x] Functional editor enabling query editing and prettifying, request body provided in the url as base64-encoded on focus out. - **(40/40)**
- [x] Functional read-only response section, with information about HTTP status and the code. - **(30/30)**
- [x] Method selector, shows all the valid HTTP verbs, value is provided in the url on change. - **(10/10)**
- [x] Input for the url, entered value is provided in base64-encoded way on change. - **(15/15)**
- [x] Variables section that can shown or hidden, specified variables are included in the body. - **(15/15)**
- [x] Headers section, value is provided in the url on header add/change. - **(20/20)**

### GraphiQL route - max 80 points

- [x] Functional editor enabling query editing and prettifying, request body provided in the url as base64-encoded on focus out. - **(35/35)**
- [x] Read-only response section, with information about HTTP status and the code, reused from the RESTfull client. - **(5/5)**
- [x] Operational documentation explorer, visible _only_ upon successful SDL request. - **(20/20)**
- [x] Variables section that can shown or hidden, specified variables are included in the body. - **(10/10)**
- [x] Header section that can be shown or hidden, value is provided in the url on header add/change. - **(10/10)**

### History route - max 50 points

- [x] History shows informational message with links to the clients when there are no requests in the local storage. - **(10/10)**
- [x] User can navigate to the previoulsy executed HTTP request to the RESTfull client, HTTP method, url, body, headers, variables are restored. **(20/20)**
- [x] User can navigate to the previoulsy executed GraphQL request to the GraphiQL client, url, SDL url, body, headers, variables are restored. **(20/20)**

### General requirements - max 50 points

- [x] Multiple (at lest 2) languages support / i18n. - **(30/30)**
- [x] Sticky header. - **(10/10)**
- [x] Errors are displayed in the user friendly format. - **(10/10)**

Потенциальные улучшения:

1. Глаз на пароль
2. Подтянуть либу под чек силы пароля
3. Полностью вырезать бекграунд у лого, чтобы смена цвета не бросалась в глаза при стики хедере
4. Регистрация через гугл

5. Проверить протектед роуты и вообще логгининг
6. Убрать комменты в стейте регистрации
7. Убрать коммент из контекста с авторизацией

Первый запрос не добавляется в историю
Первый хедер не добавляется

Добавить плюшки в код миррор типо автокомплита в графкуэль
Сделать парсинг переменных в боди в ресте
Респонсивнес эдиторы
Null у имени пользователя когда он только зарегистрировался
Стейт окошка с ответом после перезагрузки и редайректа не должен сохранятся
Вижу страницу для незарегестрированного, и только потом для зарегшестрированного когда зашел
Prettify не работает c переменными в REST
