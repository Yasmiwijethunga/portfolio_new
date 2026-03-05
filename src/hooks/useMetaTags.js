import { useEffect } from 'react'

export const useMetaTags = (title, description, image) => {
  useEffect(() => {
    // Update title
    document.title = title || 'Software Engineer Portfolio'

    // Update meta descriptions
    const metaTags = {
      description,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)

      if (!tag) {
        tag = document.createElement('meta')
        if (name.startsWith('og:')) {
          tag.setAttribute('property', name)
        } else {
          tag.setAttribute('name', name)
        }
        document.head.appendChild(tag)
      }

      tag.setAttribute('content', content)
    })

    return () => {
      document.title = 'Software Engineer Portfolio'
    }
  }, [title, description, image])
}

export const usePerformanceMetrics = () => {
  useEffect(() => {
    if ('web-vital' in window) {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = window['web-vital']

      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    }
  }, [])
}

export default useMetaTags
