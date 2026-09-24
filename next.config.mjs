const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/login', destination: '/sign-in', permanent: false },
      { source: '/sign-up', destination: '/register', permanent: false },
      { source: '/sign-in/:path+', destination: '/sign-in', permanent: false },
      { source: '/sign-up/:path+', destination: '/register', permanent: false }
    ]
  }
}

export default nextConfig
