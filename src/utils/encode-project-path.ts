/**
 * Claude Code project-directory name encoding.
 *
 * Claude Code stores a project's transcripts under
 * `~/.claude/projects/<encoded>` where `<encoded>` is the project's absolute
 * path with **every character that is not an ASCII letter or digit** replaced
 * by `-`. That covers path separators, dots, and the Windows drive colon, but
 * also — importantly — underscores, spaces, and non-ASCII characters. For
 * example:
 *
 *   POSIX:    /home/me/proj        -> -home-me-proj
 *   POSIX:    /home/me/my.proj     -> -home-me-my-proj
 *   POSIX:    /home/me/00_proj     -> -home-me-00-proj
 *   Windows:  C:\Users\me\proj     -> C--Users-me-proj
 *
 * Any character left unconverted produces a name that never matches the real
 * directory, so any lookup keyed on the encoded name finds zero transcripts.
 * Replacing only `/ \ . :` left underscores intact, which broke `session_search`
 * in `current` scope for every project whose path contained `_` (see #3329); the
 * earlier drive-colon-only fix had the same shape on Windows.
 *
 * This is the single source of truth for that encoding. Both the session
 * history search (`features/session-history-search`) and the worktree
 * transcript resolver (`lib/worktree-paths`) must encode identically — keeping
 * the rule in one place prevents the two from drifting apart (the drive-colon
 * fix originally landed only in session-history-search; see PR #3274).
 */
export function encodeProjectPath(projectPath: string): string {
  return projectPath.replace(/[^a-zA-Z0-9]/g, '-');
}
