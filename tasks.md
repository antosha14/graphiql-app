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

1. Глаз на пароль
2. Конфирм пароль если написан первый должен убрать ошибку когда пароли стали одинаковыми
3. Типы в форме логина
4. Подтянуть либу под чек силы пароля

5. Добавить ошибки регистрации
6. Лоудер при регистрации и авторизации
7. Юзера полностью двинуть в контекст

8. Нормально сделать протектед роуты через мидлвару
9. Убрать комменты в стейте регистрации
10. Убрать коммент из контекста с авторизацией
11. Null у имени пользователя когда он только зарегистрировался

12. Добавить кнопки для сворачивания респонса, добавить курсор (ОПЦИОНАЛЬНО)
    АПИ КОЛЛЫ С СЕРВЕРА!!
13. Если юзер залогинен форма с регистрацией прогружается и только потом редайрект, сделай так чтобы не было показа формы
14. Полностью вырезать бекграунд у лого, чтобы смена цвета не бросалась в глаза при стики хедере
15. Добавить переключалку с текста на джейсон в боди эдиторе??????

16. Фикс бага с локал стораджом и и стораджом сессии
    Добавить плюшки в код миррор типо автокомплита

17. Сделать и проверить хедеры, боди и квери параметры. Поискать другие публичные апи, принимающие пост запросы c JSON
18. Баг с 2, 3 строкой хедеров и велью. Пишешь в первое и пишет во все. В хедере создаёт новый энтри но в последнем не печатает
19. ctrl+v в url вставляет в code mirroir
20. Variables из сессион стораджа подтянуть и привязать к реквесту?

!!!ПЕРЕКЛЮЧАЛКА РЕЖИМА ЭДИТОРА
Боди нужно сохранить с уже распаршенными переменными

Есть копи паст логики в графкуэль точно такой же как в ресте, не есть хорошо
Убрать рестфул и графкуэль разделы в раутинге
