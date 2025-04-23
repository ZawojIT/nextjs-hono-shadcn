import fs from 'fs'
import path from 'path'

interface SSLConfig {
  rejectUnauthorized: boolean
  ca?: string
  cert?: string
  key?: string
}

export function getSSLConfig(certPath?: string, keyPath?: string): SSLConfig {
  // If no certificate path is provided, use strict SSL verification
  if (!certPath) {
    return {
      rejectUnauthorized: true,
    }
  }

  try {
    const certContent = fs.readFileSync(path.resolve(certPath), 'utf-8')
    const keyContent = keyPath ? fs.readFileSync(path.resolve(keyPath), 'utf-8') : undefined

    return {
      rejectUnauthorized: false,
      ca: certContent,
      cert: certContent,
      key: keyContent,
    }
  } catch (error) {
    console.error('Error reading SSL certificates:', error)
    // If there's an error reading certificates, fall back to strict SSL verification
    return {
      rejectUnauthorized: true,
    }
  }
}
