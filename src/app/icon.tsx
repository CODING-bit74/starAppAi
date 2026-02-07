import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'linear-gradient(135deg, #FDE047 0%, #EAB308 100%)', // Gold gradient
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                S
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
