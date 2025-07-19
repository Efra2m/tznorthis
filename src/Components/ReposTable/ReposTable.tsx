"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GitHubRepo } from "@/store/githubApi";
import styles from "./ReposTable.module.scss";

interface ReposTableProps {
  items: GitHubRepo[];
  sortField: "stars" | "forks" | "updated" | undefined;
  sortOrder: "asc" | "desc";
  onSort: (field: "stars" | "forks" | "updated" | undefined) => void;
  onRowClick: (repo: GitHubRepo) => void;
  selectedRepoId: number | null;
}

export const ReposTable = ({
  items,
  sortField,
  sortOrder,
  onSort,
  onRowClick,
  selectedRepoId,
}: ReposTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      className={styles.tableWrapper}
    >
      <Typography variant="h3" className={styles.tableTitle}>
        Результаты поиска
      </Typography>

      {isMobile ? (
        <div className={styles.mobileList}>
          {items.map((repo) => (
            <Paper
              key={repo.id}
              className={`${styles.mobileItem} ${
                selectedRepoId === repo.id ? styles.selected : ""
              }`}
              onClick={() => onRowClick(repo)}
            >
              <div className={styles.mobileRow}>
                <span className={styles.label}>Название:</span>
                <span className={styles.value}>{repo.full_name}</span>
              </div>
              <div className={styles.mobileRow}>
                <span className={styles.label}>Форки:</span>
                <span className={styles.value}>{repo.forks_count}</span>
              </div>
              <div className={styles.mobileRow}>
                <span className={styles.label}>Язык:</span>
                <span className={styles.value}>{repo.language || "-"}</span>
              </div>
              <div className={styles.mobileRow}>
                <span className={styles.label}>Звезды:</span>
                <span className={styles.value}>{repo.stargazers_count}</span>
              </div>
              <div className={styles.mobileRow}>
                <span className={styles.label}>Обновлено:</span>
                <span className={styles.value}>
                  {new Date(repo.updated_at).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </Paper>
          ))}
        </div>
      ) : (
        <Table className={styles.responsiveTable}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Название</TableCell>
              <TableCell className={styles.tableHeader}>Язык</TableCell>
              {!isTablet && (
                <>
                  <TableCell className={styles.tableHeader}>
                    <TableSortLabel
                      active={sortField === "forks"}
                      direction={sortOrder}
                      onClick={() => onSort("forks")}
                    >
                      Форки
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className={styles.tableHeader}>
                    <TableSortLabel
                      active={sortField === "stars"}
                      direction={sortOrder}
                      onClick={() => onSort("stars")}
                    >
                      Звезды
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className={styles.tableHeader}>
                    <TableSortLabel
                      active={sortField === "updated"}
                      direction={sortOrder}
                      onClick={() => onSort("updated")}
                    >
                      Обновлено
                    </TableSortLabel>
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((repo) => (
              <TableRow
                key={repo.id}
                hover
                onClick={() => onRowClick(repo)}
                selected={selectedRepoId === repo.id}
                className={styles.tableRow}
              >
                <TableCell className={styles.nameCell}>
                  {repo.full_name}
                </TableCell>
                <TableCell>{repo.language || "-"}</TableCell>
                {!isTablet && (
                  <>
                    <TableCell>{repo.forks_count}</TableCell>
                    <TableCell>{repo.stargazers_count}</TableCell>
                    <TableCell>
                      {new Date(repo.updated_at).toLocaleDateString("ru-RU")}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
