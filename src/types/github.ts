/**
 * Интерфейс, описывающий структуру ответа на поиск репозиториев в GitHub.
 */
export interface IGithubSearchResponse {
  total_count: number; //Общее количество репозиториев
  incomplete_results: boolean; //Флаг, что результаты поиска неполные.
  items: IGithubRepository[]; //Массив репозиториев
}

/**
 * Интерфейс, описывающий репозиторий GitHub.
 */
export interface IGithubRepository {
  id: number; // id  репозитория
  name: string; //название репозитория
  full_name: string; //Полное название
  description: string; //  Описание репозитория
  language: string | null; // язык программирования
  forks_count: number; // Количество форков
  stargazers_count: number; // Количество звезд
  updated_at: string; // Дата обновления
  license: {
    key: string; // Короткий идентификатор лицензии
    name: string; // название лицензии
    spdx_id: string; // SPDX идентификатор
    url: string | null; // Ссылка
  } | null;
}
