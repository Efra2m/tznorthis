"use client";
import { Box, Card, Chip, Typography } from "@mui/material";
import { GitHubRepo } from "@/store/githubApi";
import styles from "./RepoDetails.module.scss";
import Image from "next/image";

interface RepoDetailsCardProps {
  repo: GitHubRepo | null;
}

/**
 * Компонент детальной инфы о репозиториях
 */
export const RepoDetailsCard = ({ repo }: RepoDetailsCardProps) => (
  <div
    className={
      repo
        ? `${styles.sidebarPanel} ${styles.topContent}`
        : `${styles.sidebarPanel} ${styles.centerContent}`
    }
  >
    {repo ? (
      <Card className={styles.selectedRepoCard}>
        <Typography variant="h4" className={styles.repoName}>
          {repo.full_name}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={2}
        >
          <Chip
            label={repo.language || "Не указан"}
            size="medium"
            color="primary"
            variant="outlined"
            className={styles.bluechip}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Image
              src="/img/Star.svg"
              alt="Звезда"
              width={20}
              height={19}
              style={{ verticalAlign: "middle" }}
            />
            {repo.stargazers_count}
          </Typography>
        </Box>
        <div className={styles.tagsContainer}>
          {repo.topics?.slice(0, 5).map((topic) => (
            <Chip
              key={topic}
              label={topic}
              className={styles.tagChip}
              size="small"
            />
          ))}
        </div>
        <Typography variant="body1" className={styles.licenseText}>
          {repo.license?.name || "No license"}
        </Typography>
      </Card>
    ) : (
      <Typography variant="h6" className={styles.sidebarTitle}>
        Выберите репозиторий
      </Typography>
    )}
  </div>
);
