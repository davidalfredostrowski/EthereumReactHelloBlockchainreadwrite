module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "ec2-18-246-4-84.us-west-2.compute.amazonaws.com",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
}
