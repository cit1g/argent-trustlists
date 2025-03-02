require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("dotenv").config();
const { spawn } = require("child_process");

const SCRIPTS = [
  "deploy-registries.js",
  "deploy-aave.js",
  "deploy-balancer.js",
  "deploy-compound.js",
  "deploy-curve.js",
  "deploy-lido.js",
  "deploy-uniswap.js",
  "deploy-weth.js",
  "deploy-yearn.js",
  "deploy-maker.js",
  "deploy-gro.js",
  "deploy-paraswap.js",
  "deploy-argent.js",
];

const runScript = (script) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn("npx", ["hardhat", "run", `./scripts/${script}`, "--network", hre.network.name], { stdio: "inherit" });
    childProcess.once("close", resolve);
    childProcess.once("error", reject);
  });
};

task("deploy-all", "Deploy all scripts", async () => {
  for (const script of SCRIPTS) {
    console.log("\n", `/////////////     Executing [${script}] on [${hre.network.name}]     ///////////////`, "\n");
    await runScript(script);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      },
    },
    test: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [`0x${process.env.TEST_PKEY}`],
      chainId: 3,
    },
    staging: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [`0x${process.env.STAGING_PKEY}`],
      chainId: 1,
    },
    prod: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [`0x${process.env.PROD_PKEY}`],
      chainId: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.3",
      },
    ],
  },
};
