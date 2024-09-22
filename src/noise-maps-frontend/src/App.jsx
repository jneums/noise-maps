import { useState, useEffect, useRef } from 'react';
import { noise_maps_backend } from 'declarations/noise-maps-backend';

const width = 854; // Set the width of the noise map
const height = 480; // Set the height of the noise map

function App() {
  const [noiseMap, setNoiseMap] = useState();
  const [seed, setSeed] = useState(0);
  const canvasRef = useRef(null);

  function handleNext() {
    setSeed(seed + 1);
    noise_maps_backend.greet(seed + 1).then((noiseMap) => {
      setNoiseMap(new Uint8Array(noiseMap));
    });
    return false;
  }

  function handlePrevious() {
    setSeed(seed - 1);
    noise_maps_backend.greet(seed - 1).then((noiseMap) => {
      setNoiseMap(new Uint8Array(noiseMap));
    });
    return false;
  }

  useEffect(() => {
    if (noiseMap && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        for (let i = 0; i < noiseMap.length; i++) {
          const value = noiseMap[i];
          imageData.data[i * 4] = value; // Red
          imageData.data[i * 4 + 1] = value; // Green
          imageData.data[i * 4 + 2] = value; // Blue
          imageData.data[i * 4 + 3] = 255; // Alpha
        }
        ctx.putImageData(imageData, 0, 0);
      }
    } else {
      handleNext();
    }
  }, [noiseMap]);

  return (
    <main>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: ' 32px auto',
          gap: '24px',
        }}>
        <img src="/logo2.svg" alt="DFINITY logo" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <form>
            <label htmlFor="seed">Enter your seed: &nbsp;</label>
            <input
              id="seed"
              alt="Seed"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={handlePrevious}>
                Previous
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a
                href="https://en.wikipedia.org/wiki/Perlin_noise"
                rel="noreferrer"
                target="_blank"
                style={{ marginRight: '1rem' }}>
                <p style={{ fontSize: '1rem', textAlign: 'center' }}>
                  Wikipedia
                </p>
              </a>
              <a
                href="https://mops.one/noise"
                rel="noreferrer"
                target="_blank"
                style={{ marginRight: '1rem' }}>
                <p style={{ fontSize: '1rem', textAlign: 'center' }}>
                  Mops Package
                </p>
              </a>
              <a
                href="https://github.com/jneums/noise-maps"
                rel="noreferrer"
                target="_blank">
                <p style={{ fontSize: '1rem', textAlign: 'center' }}>
                  Github Repo
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
