import DotEnv from 'dotenv'
DotEnv.config()

const siteUrl = process.env.SITE_URL
const managerUrl = process.env.MANAGER_URL || `${siteUrl}/manager/`
const connectorsrUrl = process.env.CONNECTORS_URL || `${siteUrl}/connectors/`

export default {
  siteUrl,
  managerUrl,
  connectorsrUrl,
}
