/**
 * Claude Code project-directory name encoding (hook-runtime mirror).
 *
 * Mirror of `src/utils/encode-project-path.ts` — keep the two in sync. The TS
 * helper is the source of truth; this `.mjs` copy exists because the hook
 * runtime loads raw scripts and cannot import the compiled `dist/` util.
 *
 * Claude Code stores a project's transcripts under
 * `~/.claude/projects/<encoded>` where `<encoded>` is the project's absolute
 * path with **every character that is not an ASCII letter or digit** replaced
 * by `-` (path separators, dots, the Windows drive colon, and also underscores,
 * spaces, and non-ASCII characters). For example:
 *
 *   POSIX:    /home/me/proj        -> -home-me-proj
 *   POSIX:    /home/me/my.proj     -> -home-me-my-proj
 *   POSIX:    /home/me/00_proj     -> -home-me-00-proj
 *   Windows:  C:\Users\me\proj     -> C--Users-me-proj
 *
 * Any character left unconverted produces a name that never matches the real
 * directory, so any lookup keyed on the encoded name silently finds nothing.
 */
export function encodeProjectPath(projectPath) {
  return projectPath.replace(/[^a-zA-Z0-9]/g, '-');
}
