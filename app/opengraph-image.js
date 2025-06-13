import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Varun Yadav - Today I Learned';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e293b',
          backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1e40af'
          }}
        >
          VY
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            Today I Learned
          </h1>

          <p
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '16px'
            }}
          >
            Varun Yadav
          </p>

          <p
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Cloud Engineer sharing knowledge and insights
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          til.varunyadav.com
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
