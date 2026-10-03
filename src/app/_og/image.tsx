export const ogImageSize = { width: 1200, height: 630 } as const;

export const ogImageAlt =
  'Weather: current conditions and a five-day forecast, on a glass panel over a clear sky.';

/** Matches `skies.clear.day` in `theme/sky`, kept as a literal since Satori can't import the themed value. */
const clearDaySky = 'linear-gradient(to bottom, #3f86d6, #a9d3f5)';

export const OgImage = () => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: clearDaySky,
      fontFamily: 'sans-serif',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 70,
        right: 110,
        width: 150,
        height: 150,
        display: 'flex',
        borderRadius: '50%',
        background: '#fff6d8',
        boxShadow: '0 0 90px 30px rgba(255, 246, 216, 0.55)',
      }}
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '56px 64px',
        borderRadius: 32,
        background: 'rgba(255, 255, 255, 0.72)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 20px 60px rgba(15, 35, 65, 0.25)',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          letterSpacing: 6,
          textTransform: 'uppercase',
          color: '#2c4a6e',
        }}
      >
        Weather
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          fontWeight: 700,
          color: '#10233f',
        }}
      >
        Current conditions,
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          fontWeight: 700,
          color: '#10233f',
        }}
      >
        five-day forecast.
      </div>
    </div>
  </div>
);
