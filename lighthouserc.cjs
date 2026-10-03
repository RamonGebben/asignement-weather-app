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
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
