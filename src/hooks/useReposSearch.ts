"use client";
import { useState, useCallback } from "react";
import { GitHubRepo, useSearchReposQuery } from "@/store/githubApi";
// Тип для полей сортировки репозиториев.
type SortField = "stars" | "forks" | "updated" | undefined;

/**
 * Кастомный хук Управляет состоянием поиска, пагинацией, сортировкой и выбором репозиториев.
 *
 */
export const useReposSearch = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const { data, isFetching, isError } = useSearchReposQuery(
    {
      query: searchQuery,
      page,
      perPage: rowsPerPage,
      sort: sortField,
      order: sortOrder,
    },
    { skip: !searchQuery }
  );

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setSearchQuery(query);
      setPage(1);
      setSelectedRepo(null);
    }
  }, [query]);

  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        setSortOrder("desc");
        return field;
      }
      return prev;
    });
    setPage(1);
  }, []);

  return {
    query, // поисковый запрос
    setQuery, //  обновление поискового запроса
    searchQuery, // Актуальный запрос
    page, // Текущая страница пагинации
    setPage, // Метод для изменения страницы
    sortField, // Поле для сортировки (stars/forks/updated)
    sortOrder, // Порядок сортировки (asc/desc)
    rowsPerPage, // Количество строк на странице
    setRowsPerPage, // изменения количества строк
    selectedRepo, // Выбранный репозиторий для просмотра
    setSelectedRepo, // Метод для выбора репозитория
    data, // Данные с результатами
    isFetching, // Флаг загрузки
    isError, // Флаг ошибки
    handleSearch, // Обработчик отправки поискового запроса
    handleSort, // Обработчик сортировки таблицы
  };
};
