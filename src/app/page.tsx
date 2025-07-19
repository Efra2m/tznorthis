"use client";

import styles from "./page.module.css";
import { Typography, CircularProgress, Box } from "@mui/material";

import { Header } from "@/Components/Header/Header";
import { ReposTable } from "@/Components/ReposTable/ReposTable";
import { PaginationControls } from "@/Components/PaginationControls/PaginationControls";
import { RepoDetailsCard } from "@/Components/RepoDetails/RepoDetails";

import { useReposSearch } from "@/hooks/useReposSearch";

/**
 * Главная страница приложения -  поиск репозиториев GitHub
 *
 * - Xедер
 * - Таблица с результатами
 * - более детальная инфа
 */
export default function HomePage() {
  const {
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
    handleSearch, // Обработчик поискового запроса
    handleSort, // Обработчик сортировки
  } = useReposSearch(); //кастомный хук

  return (
    <div className={styles.container}>
      <Header query={query} setQuery={setQuery} onSearch={handleSearch} />
      {!searchQuery && (
        <Box className={styles.welcomeMessage}>
          <Typography variant="h3" gutterBottom>
            Добро пожаловать!
          </Typography>
        </Box>
      )}
      {isFetching && (
        <div className={styles.loadingOverlay}>
          <CircularProgress size={24} thickness={4} sx={{ color: "#1976d2" }} />
        </div>
      )}
      {isError && (
        <Typography
          className={styles.errorMessage}
          color="error"
          style={{ margin: "20px 0" }}
        >
          Произошла ошибка при загрузке данных
        </Typography>
      )}
      {data && (
        <div className={styles.mainLayout}>
          <div className={styles.tableSection}>
            <ReposTable
              items={data.items}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onRowClick={setSelectedRepo}
              selectedRepoId={selectedRepo?.id || null}
            />

            <PaginationControls
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={data.total_count}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
          <div className={styles.sidebarSection}>
            <RepoDetailsCard repo={selectedRepo} />
          </div>
        </div>
      )}
    </div>
  );
}
