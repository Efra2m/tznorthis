/**
 * RTK Query API для работы с GitHub API.
 * - Поиск репозиториев с пагинацией и сортировкой
 * - Получение детальной информации о репозитории
 * - Типизированные запросы и ответы
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GitHubRepo {
  id: number; // Id  репозитория
  name: string; //Название репозитория
  full_name: string; //Полное название
  description: string | null; //  Описание репозитория
  language: string | null; // Язык программирования
  stargazers_count: number; // Кол-во звезд
  forks_count: number; // Кол-во форков
  updated_at: string; // Дата обновления
  owner: {
    login: string; // Логин владельца
  };
  license: {
    name: string; // Название лицензии
  } | null;
  score?: number;
  topics?: string[]; //Массив топиков
}

/**
 * Параметры для запроса поиска репозиториев
 */
export interface SearchReposParams {
  query: string; // Строка поиска
  page: number; // Номер страницы
  perPage: number; // Количество репо на странице
  sort?: "stars" | "forks" | "updated"; // Поле для сортировки
  order?: "asc" | "desc"; // Направление сортировки
}
/**
 * Ответ GitHub на /search/repositories
 */
export interface SearchReposResponse {
  total_count: number; // Общее кол-во репозиториев
  items: GitHubRepo[]; // Массив репозиториев
}

/**
 * Параметры для получения одного репо
 */
export interface GetRepoParams {
  owner: string; //Логин владельца
  repo: string; //Название репозитория
}

/**
 * RTK Query API для GitHub Основной экземпляр API для работы с GitHub.
 */
export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  endpoints: (builder) => ({
    /**
     * Поиск репозиториев
     * GET /search/repositories?q=<query>&page=&per_page=&sort=&order=
     */
    searchRepos: builder.query<SearchReposResponse, SearchReposParams>({
      query: ({ query, page, perPage, sort, order }) => {
        const params = new URLSearchParams({
          q: query,
          page: String(page),
          per_page: String(perPage),
        });
        if (sort) {
          params.set("sort", sort);
          if (order) {
            params.set("order", order);
          }
        }
        return `search/repositories?${params.toString()}`;
      },
    }),

    /**
     * Получить детальную информацию о репо
     * GET /repos/:owner/:repo
     */
    getRepo: builder.query<GitHubRepo, GetRepoParams>({
      query: ({ owner, repo }) => `repos/${owner}/${repo}`,
    }),
  }),
});

export const { useSearchReposQuery, useGetRepoQuery } = githubApi;
