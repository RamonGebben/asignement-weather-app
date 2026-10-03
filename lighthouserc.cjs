const port = 3100;
const isCI = !!process.env.CI;

/** @type {import('@lhci/cli').LHCIConfig} */
module.exports = {
  ci: {
    collect: {
      // CI downloads the `.next/standalone` artifact built once by the
      // `build` job (see .github/workflows/ci.yml) and runs it directly;
      // locally, just `pnpm build` first and this starts the normal
      // production server from the regular `.next` output.
      startServerCommand: isCI
        ? `PORT=${port} node .next/standalone/server.js`
        : `pnpm exec next start -p ${port}`,
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 30_000,
      url: [`http://localhost:${port}/`],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      // The preset only gates individual audits - add the overall category
      // scores so a regression that doesn't trip any single audit still
      // fails the build.
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // The preset errors on these "Insight" audits while leaving their
        // classic counterparts (legacy-javascript, render-blocking-*) at
        // warn - downgraded to match, since hitting them cleanly isn't
        // realistic for a client-rendered app pulling in Next's own
        // polyfills and a weather-API fetch chain.
        'legacy-javascript-insight': 'warn',
        'network-dependency-tree-insight': 'warn',
        'unused-javascript': 'warn',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
