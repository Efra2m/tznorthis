"use client";
import { TextField, Button } from "@mui/material";
import styles from "./Header.module.scss";
import { memo } from "react";

interface SearchFormProps {
  query: string; //поисковый запроса
  setQuery: (value: string) => void; // fun обновления поискового запроса
  onSearch: () => void; // fun для выполнения поиска
}

/**
 * Компонент Header - поисковая форма для GitHub репозиториев.
 */
export const Header = memo(function Header({
  query,
  setQuery,
  onSearch,
}: SearchFormProps) {
  return (
    <div className={styles.formContainer}>
      <TextField
        placeholder="Введите поисковый запрос"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: 10 }}
        onKeyPress={(e) => e.key === "Enter" && onSearch()}
        className={styles.inputCustom}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        style={{ width: 105, height: 42 }}
      >
        ИСКАТЬ
      </Button>
    </div>
  );
});
