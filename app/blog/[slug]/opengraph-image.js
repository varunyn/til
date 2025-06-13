import { ImageResponse } from 'next/og';
import { getPostData } from '@/lib/mdx';

export const runtime = 'edge';

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = params;

  try {
    const postData = await getPostData('blog', slug);
    const title = postData.title || 'Blog Post';
    const description = postData.desc || '';
    const tags = postData.tags || [];

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#1e293b',
            backgroundImage:
              'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            padding: '60px',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e40af'
              }}
            >
              VY
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '4px'
                }}
              >
                Varun Yadav
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                til.varunyadav.com
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? '48px' : '64px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '24px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              {title}
            </h1>

            {description && (
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.4,
                  margin: 0,
                  maxWidth: '80%'
                }}
              >
                {description.length > 120
                  ? description.substring(0, 120) + '...'
                  : description}
              </p>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '40px'
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              📝 Blog Post
            </div>

            {tags && tags.length > 0 && (
              <div
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                {tags.slice(0, 3).join(' • ')}
              </div>
            )}
          </div>
        </div>
      ),
      {
        ...size
      }
    );
  } catch (error) {
    // Fallback image if post data can't be loaded
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
            backgroundImage:
              'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px'
            }}
          >
            Varun Yadav
          </div>
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)'
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
}
