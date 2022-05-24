const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy();

  await crowdfunding.deployed();
  const [signer, buyerAddress] = await hre.ethers.getSigners();

  console.log("Crowdfunding deployed to:", crowdfunding.address);
  console.log("Crowdfunding deployed by:", signer.address);

  fs.writeFileSync(
    "./config.js",
    `
  export const crowdfundingAddress = "${crowdfunding.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//npx hardhat run scripts/deploy.js --network localhost
