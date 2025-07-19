"use client";
import {
  PaginationItem,
  Pagination,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import styles from "./PaginationControls.module.scss";

interface PaginationControlsProps {
  page: number; // Текущая страница
  rowsPerPage: number; // Кол-во строк на странице
  totalCount: number; // Общее кол-во элементов
  onPageChange: (newPage: number) => void; // Обработчик смены страницы
  onRowsPerPageChange: (value: number) => void; // Обработчик изменения количества строк
}
/**
 * Компонент управления пагинацией
 */
export const PaginationControls = ({
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}: PaginationControlsProps) => (
  <Box className={styles.paginationContainer}>
    <Box className={styles.rowsPerPage}>
      <Typography variant="body2" className={styles.rowsPerPageText}>
        Rows per page:
      </Typography>
      <FormControl size="small" variant="standard">
        <Select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          disableUnderline
          className={styles.rowsSelect}
          inputProps={{
            className: styles.selectInput,
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Typography variant="body2" className={styles.pageInfo}>
      {`${(page - 1) * rowsPerPage + 1}-${Math.min(
        page * rowsPerPage,
        totalCount
      )} of ${totalCount}`}
    </Typography>

    <Pagination
      count={Math.ceil(totalCount / rowsPerPage)}
      page={page}
      onChange={(_, newPage) => onPageChange(newPage)}
      color="primary"
      shape="rounded"
      className={styles.pagination}
      renderItem={(item) => {
        if (item.type === "previous") {
          return (
            <PaginationItem
              {...item}
              components={{
                previous: () => (
                  <span className={styles.paginationArrow}>{"<"}</span>
                ),
              }}
            />
          );
        }
        if (item.type === "next") {
          return (
            <PaginationItem
              {...item}
              components={{
                next: () => (
                  <span className={styles.paginationArrow}>{">"}</span>
                ),
              }}
            />
          );
        }
        return null;
      }}
    />
  </Box>
);
