import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Heera Panna Saree';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFAF0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '20px solid #591C21',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#591C21',
              marginBottom: 20,
              fontFamily: 'serif',
            }}
          >
            Heera Panna Saree
          </h1>
          <p
            style={{
              fontSize: 30,
              color: '#2C1810',
              fontFamily: 'sans-serif',
              maxWidth: 800,
            }}
          >
            Premium Maheshwari & Silk Sarees in Indore
          </p>
          <div
            style={{
              marginTop: 40,
              padding: '10px 30px',
              background: '#D4AF37',
              color: '#591C21',
              fontSize: 24,
              borderRadius: 50,
              fontWeight: 'bold',
            }}
          >
            www.heerapannasaree.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
